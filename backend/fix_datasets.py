import json

def fix_dataset(filename):
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
            
        for c in data.get('candidates', []):
            if 'role' not in c:
                c['role'] = "Software Engineer"
            if 'fairness' in c and 'status' not in c['fairness']:
                c['fairness']['status'] = "Review" if c['fairness'].get('human_review_required') else "Stable"
            
            for s in c.get('skills', []):
                if 'is_critical' not in s:
                    s['is_critical'] = True
                    
            if 'career_gap_years' not in c:
                c['career_gap_years'] = 0
            if 'university_tier' not in c:
                c['university_tier'] = "Tier-1 Public"
            if 'writing_style' not in c:
                c['writing_style'] = "Professional"
                
        with open(filename, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"Fixed {filename}")
    except Exception as e:
        print(f"Error fixing {filename}: {e}")

fix_dataset('enterprise_dataset.json')
fix_dataset('real_online_dataset.json')
