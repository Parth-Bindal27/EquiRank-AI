import pandas as pd
import requests
import json
import random
import os

CSV_URL = "https://raw.githubusercontent.com/anukalp-mishra/Resume-Screening/master/resume_dataset.csv"
DATA_FILE = "real_candidates.json"

def fetch_and_transform_dataset():
    print(f"Downloading real resume dataset from {CSV_URL}...")
    response = requests.get(CSV_URL)
    with open("temp_resumes.csv", "wb") as f:
        f.write(response.content)
        
    df = pd.read_csv("temp_resumes.csv")
    print(f"Loaded {len(df)} resumes.")
    
    # We will pick 15 realistic candidates to seed the demo to keep the UI fast and focused
    # Filter for Data Science / IT roles
    target_categories = ["Data Science", "Python Developer", "Machine Learning", "DevOps Engineer"]
    filtered_df = df[df['Category'].isin(target_categories)]
    
    if len(filtered_df) < 15:
        # Fallback if categories are named differently
        filtered_df = df.sample(n=min(15, len(df)))
    else:
        filtered_df = filtered_df.sample(n=15)
        
    real_candidates = {}
    
    cities = ["San Francisco", "Austin", "New York", "Seattle", "Chicago", "Remote", "Detroit", "Atlanta"]
    tiers = ["Tier-1 Public", "Tier-2 State", "Ivy League", "Bootcamp", "Self-Taught"]
    styles = ["Corporate", "Academic", "Conversational", "Direct/Technical"]
    
    for idx, row in filtered_df.iterrows():
        cat = row['Category']
        resume_text = row['Resume']
        
        # We will parse out some fake skills based on category for the visualization
        skills = []
        overall_match = random.uniform(65.0, 96.0)
        
        if "Python" in cat or "Data" in cat:
            skills.append({
                "skill_name": "Python",
                "proficiency": random.uniform(70.0, 98.0),
                "is_critical": True,
                "evidence": [
                    {"id": f"ev_p_{idx}_1", "description": "Extracted from resume corpus", "type": "experience", "confidence": random.uniform(0.7, 0.99), "recency_months": random.randint(1, 24)}
                ]
            })
            skills.append({
                "skill_name": "Machine Learning",
                "proficiency": random.uniform(60.0, 95.0),
                "is_critical": True,
                "evidence": [
                    {"id": f"ev_ml_{idx}_1", "description": "Project mention in resume", "type": "project", "confidence": random.uniform(0.6, 0.95), "recency_months": random.randint(1, 12)}
                ]
            })
        else:
            skills.append({
                "skill_name": cat,
                "proficiency": random.uniform(70.0, 95.0),
                "is_critical": True,
                "evidence": [
                    {"id": f"ev_c_{idx}_1", "description": f"{cat} experience in resume", "type": "experience", "confidence": random.uniform(0.7, 0.95), "recency_months": random.randint(1, 18)}
                ]
            })
            
        proxy_risks = []
        loc = random.choice(cities)
        tier = random.choice(tiers)
        gap = random.choice([0, 0, 0, 1, 2, 5])
        
        if loc in ["San Francisco", "Seattle"]:
            proxy_risks.append({"attribute": "Location", "risk_level": "Medium", "reason": "Tech hub proxy"})
        if tier == "Ivy League":
            proxy_risks.append({"attribute": "University", "risk_level": "High", "reason": "Elite university proxy bias historically detected"})
        if gap > 1:
            proxy_risks.append({"attribute": "Career Gap", "risk_level": "High", "reason": f"{gap}-year gap detected"})
            
        is_review = len(proxy_risks) > 1 or (len(proxy_risks) == 1 and proxy_risks[0]["risk_level"] == "High")
            
        cand_id = f"REAL-{1000 + idx}"
        
        candidate = {
            "id": cand_id,
            "name": f"Candidate {1000 + idx} ({cat})",
            "role": "Senior ML Engineer",
            "overall_match": round(overall_match, 1),
            "evidence_score": round(overall_match + random.uniform(-10, 5), 1),
            "decision_confidence": round(random.uniform(70.0, 98.0), 1),
            "fairness": {
                "status": "Review" if is_review else "Stable",
                "proxy_tests_passed": 20 if not is_review else random.randint(10, 16),
                "total_proxy_tests": 20,
                "human_review_required": is_review,
                "reason": "Proxy sensitivity triggered during automated audit" if is_review else None
            },
            "skills": skills,
            "experience_years": random.randint(2, 10),
            "career_gap_years": gap,
            "university_tier": tier,
            "location": loc,
            "writing_style": random.choice(styles),
            "proxy_risks": proxy_risks,
            "raw_resume_snippet": resume_text[:200] + "..." # Include a snippet of real text
        }
        
        real_candidates[cand_id] = candidate
        
    with open(DATA_FILE, "w") as f:
        json.dump(real_candidates, f, indent=4)
        
    print(f"Saved {len(real_candidates)} candidates to {DATA_FILE}")

if __name__ == "__main__":
    fetch_and_transform_dataset()
