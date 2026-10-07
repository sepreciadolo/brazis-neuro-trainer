"""Validate content/sources.json (asset registry, AGENTS.md section 7).

Usage:  python scripts/validate_sources.py [path/to/sources.json]

Rules:
  * every entry has asset (unique id), type, title, source, status, external_source, notes
  * status is unverified | ai_checked | approved
  * 'approved' is only valid with provenance: approved_by == "user" and an approved_at date.
    Scripts and the AI must never write it; it comes from the user's review export.
  * figure and vector assets must point at files that exist on disk
"""
import json
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DEFAULT_PATH = os.path.join(ROOT, "content", "sources.json")

VALID_STATUSES = {"unverified", "ai_checked", "approved"}
VALID_TYPES = {
    "figure", "plate", "hotspots", "structures", "schematic", "lesion_overlay",
    "vascular_territory", "model_3d", "vector_image", "flowchart", "syndrome",
    "rule_engine", "chapter_digest",
}
ASSET_PATTERN = re.compile(r"^[a-z0-9_]+(/[A-Za-z0-9_\-]+)+$")
DATE_PATTERN = re.compile(r"^\d{4}-\d{2}-\d{2}")


def validate_sources(doc):
    """Return (errors, warnings) for a parsed sources document."""
    errors, warnings = [], []
    if not isinstance(doc, dict) or not isinstance(doc.get("assets"), list):
        return ["Root must be an object with an 'assets' array."], warnings

    seen = set()
    for i, a in enumerate(doc["assets"]):
        aid = a.get("asset", f"index-{i}") if isinstance(a, dict) else f"index-{i}"
        prefix = f"[{aid}]"
        if not isinstance(a, dict):
            errors.append(f"{prefix} entry must be an object")
            continue

        for field in ("asset", "type", "title", "source", "status", "external_source", "notes"):
            if field not in a:
                errors.append(f"{prefix} Missing required field '{field}'")

        if not isinstance(a.get("asset"), str) or not ASSET_PATTERN.match(a.get("asset", "")):
            errors.append(f"{prefix} 'asset' must look like 'group/name'")
        if aid in seen:
            errors.append(f"{prefix} Duplicate asset id")
        seen.add(aid)

        if a.get("type") not in VALID_TYPES:
            errors.append(f"{prefix} 'type' must be one of {sorted(VALID_TYPES)}, got '{a.get('type')}'")
        for field in ("title", "source"):
            if not isinstance(a.get(field), str) or not a.get(field, "").strip():
                errors.append(f"{prefix} '{field}' must be a non-empty string")

        status = a.get("status")
        if status not in VALID_STATUSES:
            errors.append(f"{prefix} 'status' must be one of {sorted(VALID_STATUSES)}, got '{status}'")
        if status == "approved":
            if a.get("approved_by") != "user":
                errors.append(f"{prefix} status 'approved' requires approved_by == 'user' (only the user approves)")
            if not (isinstance(a.get("approved_at"), str) and DATE_PATTERN.match(a["approved_at"])):
                errors.append(f"{prefix} status 'approved' requires approved_at (ISO date)")

        ext = a.get("external_source")
        if ext is not None and (not isinstance(ext, str) or not ext.strip()):
            errors.append(f"{prefix} 'external_source' must be null or a non-empty citation string")

        notes = a.get("notes")
        if not isinstance(notes, list) or not all(isinstance(n, str) and n.strip() for n in notes):
            errors.append(f"{prefix} 'notes' must be a list of non-empty strings")

        # Files referenced by the asset id must exist.
        if isinstance(a.get("asset"), str):
            if a["asset"].startswith("figures/"):
                path = os.path.join(ROOT, a["asset"] + ".png")
                if not os.path.exists(path):
                    errors.append(f"{prefix} figure file not found: {a['asset']}.png")
            elif a["asset"].startswith("atlas/vector/"):
                path = os.path.join(ROOT, "app", "public", "atlas", a["asset"].split("/")[-1] + ".svg")
                if not os.path.exists(path):
                    errors.append(f"{prefix} vector file not found: {os.path.relpath(path, ROOT)}")
            if a.get("type") == "vector_image" and not a.get("external_source"):
                warnings.append(f"{prefix} vector image without external_source (author/licence must be recorded)")

    return errors, warnings


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_PATH
    print(f"Validating {path}...")
    if not os.path.exists(path):
        print(f"Error: File {path} does not exist.")
        return 1
    with open(path, "r", encoding="utf-8") as f:
        try:
            doc = json.load(f)
        except Exception as e:  # noqa: BLE001 - report any parse problem
            print(f"JSON Parse Error: {e}")
            return 1

    errors, warnings = validate_sources(doc)
    for w in warnings:
        print("  [warn]", w)
    if errors:
        print(f"\n[FAILED] Found {len(errors)} validation errors:")
        for err in errors:
            print("  -", err)
        return 1

    counts = {}
    for a in doc["assets"]:
        counts[a["status"]] = counts.get(a["status"], 0) + 1
    print(f"\n[PASSED] {len(doc['assets'])} assets validated {counts} ({len(warnings)} warnings).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
