import json
import os
import sys

def validate_question_file(file_path):
    print(f"Validating {file_path}...")
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} does not exist.")
        return False

    with open(file_path, "r", encoding="utf-8") as f:
        try:
            questions = json.load(f)
        except Exception as e:
            print(f"JSON Parse Error: {e}")
            return False

    if not isinstance(questions, list):
        print("Error: Root must be a JSON array of question objects.")
        return False

    valid_statuses = {"draft", "approved", "discarded"}
    valid_confidences = {"high", "medium", "low"}
    errors = []

    for idx, q in enumerate(questions):
        qid = q.get("id", f"index-{idx}")
        prefix = f"[{qid}]"

        # Required fields
        for field in ["id", "chapter", "section", "page", "vignette", "question", "options", "correct", "explanation", "figure", "status", "confidence"]:
            if field not in q:
                errors.append(f"{prefix} Missing required field '{field}'")

        # Options check
        options = q.get("options", [])
        if not isinstance(options, list) or len(options) not in (4, 5):
            errors.append(f"{prefix} 'options' must be a list of 4 or 5 strings, got {len(options) if isinstance(options, list) else type(options)}")
        
        # Correct index check
        correct = q.get("correct")
        if not isinstance(correct, int) or correct < 0 or (isinstance(options, list) and correct >= len(options)):
            errors.append(f"{prefix} 'correct' must be a 0-based integer index into options, got {correct}")

        # Explanation check
        exp = q.get("explanation")
        if not isinstance(exp, dict):
            errors.append(f"{prefix} 'explanation' must be an object")
        else:
            if not exp.get("why_correct") or not isinstance(exp.get("why_correct"), str):
                errors.append(f"{prefix} explanation.why_correct is missing or not a string")
            if not exp.get("key_point") or not isinstance(exp.get("key_point"), str):
                errors.append(f"{prefix} explanation.key_point is missing or not a string")
            
            distractors = exp.get("distractors")
            if not isinstance(distractors, list):
                errors.append(f"{prefix} explanation.distractors must be a list")
            elif isinstance(options, list):
                expected_distractors = len(options) - 1
                if len(distractors) != expected_distractors:
                    errors.append(f"{prefix} explanation.distractors must have {expected_distractors} items (one per wrong option), got {len(distractors)}")

        # Figure check
        figure = q.get("figure")
        if figure is not None:
            if not isinstance(figure, str):
                errors.append(f"{prefix} 'figure' must be a string path or null")
            elif not os.path.exists(figure):
                errors.append(f"{prefix} Figure path does not exist on disk: '{figure}'")

        # Status and confidence
        if q.get("status") not in valid_statuses:
            errors.append(f"{prefix} 'status' must be one of {valid_statuses}, got '{q.get('status')}'")
        if q.get("confidence") not in valid_confidences:
            errors.append(f"{prefix} 'confidence' must be one of {valid_confidences}, got '{q.get('confidence')}'")

    if errors:
        print(f"\n[FAILED] Found {len(errors)} validation errors:")
        for err in errors:
            print("  -", err)
        return False

    print(f"\n[PASSED] Successfully validated {len(questions)} questions in {file_path}.")
    return True

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "content/drafts/chapter15_drafts.json"
    success = validate_question_file(target)
    sys.exit(0 if success else 1)
