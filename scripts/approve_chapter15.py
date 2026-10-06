import json
import os
import subprocess

draft_path = "content/drafts/chapter15_drafts.json"
approved_path = "content/approved/chapter15.json"

os.makedirs("content/approved", exist_ok=True)

with open(draft_path, "r", encoding="utf-8") as f:
    questions = json.load(f)

for q in questions:
    q["status"] = "approved"

with open(approved_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

print(f"Approved {len(questions)} questions saved to {approved_path}")

# Validate approved file
res = subprocess.run(["python", "scripts/validate_questions.py", approved_path], capture_output=True, text=True)
print(res.stdout)
if res.returncode != 0:
    print("Validation failed!")
    exit(1)
