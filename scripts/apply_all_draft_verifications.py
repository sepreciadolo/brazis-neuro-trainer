"""Audit and verify all draft questions across all chapters.

Finds verified quotes from content/audit/chapterNN_review.json and extracted texts,
computes exact printed page numbers, verifies word count <= 35,
and upgrades verifiable draft questions to ai_checked.
"""
import json
import glob
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import quote_utils
import validate_questions as vq

ROOT = quote_utils.ROOT

# Custom overrides or quote refinements for draft questions
MANUAL_QUOTES = {
    'ch08-001': 'because the lesion is confined to the core of the nerve and spares peripherally situated pupillomotor fibers',
    'ch19-003': 'STN lesions result in contralateral hemiballism',
    'ch22-007': 'often result from embolic occlusion of the rostral basilar artery (top of the basilar syndrome)',
    'ch23-001': 'compresses the third cranial nerve and posterior cerebral artery',
    'ch23-003': 'affect pupillary function earlier and more noticeably than the extrinsic eye movements',
    'ch23-005': 'decerebrate rigidity results from brainstem transection at the collicular level, below the red nuclei',
}

OUT_OF_CHAPTER_DISCARDS = {
    'ch04-003': 'Conus medullaris vs cauda equina is covered in Chapter 5 (Spinal Cord); not discussed in Chapter 4. Chapter 4 has 16 verified radiculopathy questions.',
    'ch04-006': 'Conus medullaris vs cauda equina is covered in Chapter 5 (Spinal Cord); not discussed in Chapter 4.',
    'ch04-008': 'T6-xiphoid sensory landmark is covered in Chapter 5 p. 119; not in Chapter 4 text.',
    'ch19-006': 'Molecular genetics of ATP7B mutation is not covered in Brazis Chapter 19 neuro-localization. Chapter 19 has 14 verified localization questions.',
    'ch20-008': 'Frontal eye field saccadic pathway is covered in Chapter 8 and Chapter 1; only in a connection table in Chapter 20. Chapter 20 has 18 verified cortical questions.',
    'ch21-001': 'Horner syndrome is covered in Chapter 8; Chapter 21 text (p. 646) explicitly cross-references Chapter 8. Chapter 21 has 12 verified autonomic questions.',
    'ch21-002': 'Horner pharmacologic testing is covered in Chapter 8; Chapter 21 text refers to Chapter 8.',
    'ch21-003': 'Autonomic dysreflexia is only listed in a table in Chapter 21; covered in Chapter 5.',
    'ch21-004': 'Adie tonic pupil is covered in Chapter 8; Chapter 21 refers to Chapter 8.',
    'ch21-005': 'Pure autonomic failure vs MSA pathophysiology covered in Chapter 19; Chapter 21 has verified questions ch21-007..018.',
    'ch21-006': 'Neurogenic bladder levels covered in Chapter 5 (Spinal Cord); Chapter 21 has verified questions ch21-007..018.',
    'ch23-006': 'Tonsillar and subfalcine herniation details covered in Chapter 16 and Chapter 22; Chapter 23 focuses on uncal and central herniation.',
}

def main():
    upgraded_count = 0
    discarded_count = 0
    
    for path in sorted(glob.glob(os.path.join(ROOT, 'content', 'approved', 'chapter*.json'))):
        ch_num = int(os.path.basename(path)[7:9])
        with open(path, 'r', encoding='utf-8') as f:
            questions = json.load(f)
            
        rev_path = os.path.join(ROOT, 'content', 'audit', f'chapter{ch_num:02d}_review.json')
        rev_by_id = {}
        if os.path.exists(rev_path):
            with open(rev_path, 'r', encoding='utf-8') as rf:
                rev_by_id = {r['id']: r for r in json.load(rf).get('reviewed', [])}
                
        changed = False
        for q in questions:
            qid = q['id']
            if q.get('status') != 'draft':
                continue
                
            if qid in OUT_OF_CHAPTER_DISCARDS:
                q['status'] = 'discarded'
                discarded_count += 1
                changed = True
                print(f'Discarded (out of chapter): {qid}')
                continue
                
            quote = MANUAL_QUOTES.get(qid)
            if not quote and qid in rev_by_id:
                candidate = (rev_by_id[qid].get('source_quote') or '').strip()
                if candidate:
                    quote = candidate
                    
            if quote:
                page = quote_utils.find_quote(ch_num, quote)
                wc = quote_utils.word_count(quote)
                if page is not None and wc <= 35:
                    q['source_quote'] = quote
                    q['page'] = page
                    q['status'] = 'ai_checked'
                    upgraded_count += 1
                    changed = True
                    print(f'Upgraded {qid} -> ai_checked (p. {page}, {wc} words)')
                else:
                    print(f'WARN: Quote for {qid} not found or too long ({wc} w): "{quote[:40]}"')
            else:
                print(f'WARN: No quote for {qid}')
                
        if changed:
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(questions, f, indent=2, ensure_ascii=False)
                f.write('\n')
                
    print(f'\nTotal upgraded to ai_checked: {upgraded_count}')
    print(f'Total discarded with justification: {discarded_count}')

if __name__ == '__main__':
    main()
