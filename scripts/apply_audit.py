"""Apply a chapter audit (content/audit/chapterNN_review.json) to content/approved/chapterNN.json.

This is the ONLY script that turns audit proposals into question data. Safeguards:
  * a source_quote is accepted only if it appears in the extracted book text
    (scripts/quote_utils.py); otherwise it is rejected and the question stays draft
  * `page` is always computed from the quote, never taken from the audit
  * 'approved' is never written; verified questions become 'ai_checked'
  * contradicted / partial / unverifiable questions are NOT edited; they are reported
  * new questions are added only if their quote verifies and they pass the contract validator

Usage:
    python scripts/apply_audit.py content/audit/chapter09_review.json [--dry-run] [--force]
Writes content/audit/chapterNN_findings.md (a human-readable report) and
content/audit/chapterNN_applied.json (log; a second run is refused unless --force).
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import quote_utils  # noqa: E402
import validate_questions as vq  # noqa: E402

ROOT = quote_utils.ROOT
VERDICTS = {"supported", "partial", "contradicted", "unverifiable"}
NEW_FIELDS = ["section", "vignette", "question", "options", "correct", "explanation", "source_quote"]


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def dump_json(path, data):
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def next_number(questions, chapter):
    nums = [int(m.group(2)) for q in questions if (m := vq.ID_PATTERN.match(q["id"])) and int(m.group(1)) == chapter]
    return max(nums, default=0) + 1


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry, force = "--dry-run" in sys.argv, "--force" in sys.argv
    if len(args) != 1:
        print(__doc__)
        return 2
    audit_path = os.path.abspath(args[0])
    audit = load_json(audit_path)
    ch = int(audit["chapter"])
    qpath = os.path.join(ROOT, "content", "approved", f"chapter{ch:02d}.json")
    log_path = os.path.join(ROOT, "content", "audit", f"chapter{ch:02d}_applied.json")
    report_path = os.path.join(ROOT, "content", "audit", f"chapter{ch:02d}_findings.md")
    if os.path.exists(log_path) and not force and not dry:
        print(f"Chapter {ch} already applied ({os.path.basename(log_path)}). Use --force to reapply.")
        return 1

    questions = load_json(qpath)
    by_id = {q["id"]: q for q in questions}
    chapter_title = questions[0]["chapter"]

    counts = {"supported_verified": 0, "quote_rejected": 0, "partial": 0, "contradicted": 0, "unverifiable": 0,
              "new_added": 0, "new_rejected": 0}
    lines_detail, rejected, contradicted, new_log = [], [], [], []

    # ---- reviewed questions
    seen = set()
    for r in audit.get("reviewed", []):
        qid, verdict = r.get("id"), r.get("verdict")
        if qid not in by_id:
            rejected.append(f"{qid}: unknown question id")
            continue
        if verdict not in VERDICTS:
            rejected.append(f"{qid}: invalid verdict '{verdict}'")
            continue
        seen.add(qid)
        q, quote, note = by_id[qid], (r.get("source_quote") or "").strip(), (r.get("note") or "").strip()
        if "figure" in r:  # asset mapping fix (e.g. swapped chapter 15 figures); not clinical text
            fig = r["figure"]
            if fig is None or os.path.exists(os.path.join(ROOT, fig)):
                if not dry:
                    q["figure"] = fig
            else:
                rejected.append(f"{qid}: figure path does not exist: {fig}")
        if verdict == "supported":
            if not quote:
                counts["quote_rejected"] += 1
                rejected.append(f"{qid}: supported but no source_quote")
                lines_detail.append((qid, "rejected", "-", note))
                continue
            words = quote_utils.word_count(quote)
            page = quote_utils.find_quote(ch, quote) if words <= vq.QUOTE_MAX_WORDS else None
            if page is None:
                counts["quote_rejected"] += 1
                why = f"quote has {words} words" if words > vq.QUOTE_MAX_WORDS else "quote not found in the chapter text"
                rejected.append(f"{qid}: {why}: \"{quote}\"")
                lines_detail.append((qid, "rejected", "-", note))
                continue
            if not dry:
                q["source_quote"], q["page"], q["status"] = quote, page, "ai_checked"
            counts["supported_verified"] += 1
            lines_detail.append((qid, "ai_checked", str(page), note))
        else:
            counts[verdict] += 1
            if verdict == "contradicted":
                contradicted.append((qid, note, quote))
            lines_detail.append((qid, verdict, "-", note))
    for q in questions:
        if q["id"] not in seen:
            lines_detail.append((q["id"], "NOT REVIEWED", "-", "The audit did not mention this question."))

    # ---- new questions
    n = next_number(questions, ch)
    added = []
    for i, nq in enumerate(audit.get("new_questions", []), 1):
        label = f"new#{i}"
        missing = [f for f in NEW_FIELDS if f not in nq]
        if missing:
            counts["new_rejected"] += 1
            rejected.append(f"{label}: missing fields {missing}")
            continue
        quote = nq["source_quote"].strip()
        words = quote_utils.word_count(quote)
        page = quote_utils.find_quote(ch, quote) if words <= vq.QUOTE_MAX_WORDS else None
        if page is None:
            counts["new_rejected"] += 1
            rejected.append(f"{label}: quote not verifiable (or > {vq.QUOTE_MAX_WORDS} words): \"{quote}\"")
            continue
        qid = f"ch{ch:02d}-{n:03d}"
        item = {
            "id": qid, "chapter": chapter_title, "section": nq["section"], "page": page,
            "source_quote": quote, "vignette": nq["vignette"], "question": nq["question"],
            "options": nq["options"], "correct": nq["correct"], "explanation": nq["explanation"],
            "figure": nq.get("figure"), "status": "ai_checked",
            "confidence": nq.get("confidence", "medium"), "external_source": None,
        }
        errs, _ = vq.validate_questions([item], qpath, vq.load_page_ranges(), check_quotes=True)
        if errs:
            counts["new_rejected"] += 1
            rejected.append(f"{label}: failed validation: {errs}")
            continue
        added.append(item)
        new_log.append(qid)
        counts["new_added"] += 1
        lines_detail.append((qid, "NEW ai_checked", str(page), nq.get("note", "")))
        n += 1

    # ---- write
    report = [f"# Chapter {ch} audit findings", "",
              f"Applied from `{os.path.basename(audit_path)}`" + (" (DRY RUN, nothing written)" if dry else ""), "",
              "| Result | Count |", "|---|---|"]
    for k, v in counts.items():
        report.append(f"| {k} | {v} |")
    if contradicted:
        report += ["", "## Possible clinical errors (original left unchanged; decide in the review tool)", ""]
        for qid, note, quote in contradicted:
            report.append(f"- **{qid}**: {note}" + (f' Book says: "{quote}"' if quote else ""))
    if rejected:
        report += ["", "## Rejected by the script", ""] + [f"- {x}" for x in rejected]
    report += ["", "## Per question", "", "| Id | Result | Page | Note |", "|---|---|---|---|"]
    for qid, res, page, note in lines_detail:
        report.append(f"| {qid} | {res} | {page} | {note.replace('|', '/')} |")

    if not dry:
        questions.extend(added)
        dump_json(qpath, questions)
        with open(report_path, "w", encoding="utf-8", newline="\n") as f:
            f.write("\n".join(report) + "\n")
        dump_json(log_path, {"chapter": ch, "audit": os.path.basename(audit_path), "counts": counts, "added": new_log})
    print(f"Chapter {ch}: {counts}")
    if rejected:
        print(f"  {len(rejected)} item(s) rejected, see {os.path.basename(report_path)}" if not dry else f"  {len(rejected)} item(s) would be rejected")
    return 0


if __name__ == "__main__":
    sys.exit(main())
