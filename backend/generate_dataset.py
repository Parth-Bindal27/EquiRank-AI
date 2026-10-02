import json
import random
import uuid

# Realistic data pools
first_names = [
    "Aarav", "Ananya", "Rohan", "Priya", "Vikram", "Sneha", "Aditya", "Neha", "Rahul", "Kavya",
    "John", "Sarah", "Michael", "Emma", "David", "Jessica", "James", "Emily", "Daniel", "Olivia",
    "Wei", "Li", "Chen", "Wang", "Min", "Ji-hoon", "Seo-yeon", "Yuki", "Hina", "Kenji",
    "Omar", "Fatima", "Ali", "Aisha", "Tariq", "Zahra", "Hassan", "Maryam", "Kwame", "Amara"
]
last_names = [
    "Sharma", "Patel", "Kumar", "Singh", "Gupta", "Deshmukh", "Reddy", "Nair", "Iyer", "Joshi",
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Zhang", "Liu", "Yang", "Wu", "Zhao", "Kim", "Lee", "Park", "Choi", "Tanaka",
    "Ahmed", "Mahmoud", "Haddad", "Kazmi", "Bello", "Mensah", "Okafor", "Onyeka", "Diallo", "Traore"
]

universities = [
    "IIT Bombay", "MIT", "Stanford", "BITS Pilani", "University of Toronto", 
    "State University", "Community College", "Self-Taught / Bootcamp", 
    "NIT Trichy", "University of Waterloo", "Local Tech Institute"
]

locations = [
    "Bangalore, India", "San Francisco, CA", "New York, NY", "London, UK", 
    "Toronto, Canada", "Remote", "Pune, India", "Berlin, Germany", "Austin, TX", "Singapore"
]

roles = [
    {"title": "Senior ML Engineer", "skills": ["Python", "PyTorch", "TensorFlow", "MLOps", "CUDA"]},
    {"title": "Backend Developer", "skills": ["Java", "Spring Boot", "PostgreSQL", "Docker", "Kubernetes"]},
    {"title": "Frontend Architect", "skills": ["React", "TypeScript", "TailwindCSS", "Next.js", "GraphQL"]},
    {"title": "DevOps Engineer", "skills": ["AWS", "Terraform", "CI/CD", "Linux", "Bash"]},
    {"title": "Data Scientist", "skills": ["SQL", "Pandas", "Scikit-Learn", "Tableau", "Statistics"]}
]

def generate_skills(role):
    # Pick 3 to 5 skills from the role
    num_skills = random.randint(3, 5)
    selected = random.sample(role["skills"], num_skills)
    skills_data = []
    for s in selected:
        prof = random.uniform(70.0, 99.0)
        skills_data.append({
            "skill_name": s,
            "proficiency": round(prof, 1),
            "evidence": [
                {
                    "id": f"EV-{uuid.uuid4().hex[:6].upper()}",
                    "description": f"Architected and deployed {s} solutions in production.",
                    "type": random.choice(["project", "experience", "certification"]),
                    "confidence": round(random.uniform(0.65, 0.99), 2),
                    "recency_months": random.randint(1, 48)
                }
            ]
        })
    return skills_data

def generate_proxy_risks():
    risks = []
    if random.random() < 0.3:
        risks.append({
            "attribute": "Career Gap",
            "risk_level": random.choice(["Medium", "High"]),
            "reason": "14-month gap detected, commonly penalized by traditional ATS."
        })
    if random.random() < 0.2:
        risks.append({
            "attribute": "Institutional Prestige",
            "risk_level": "High",
            "reason": "Non-target university algorithmically penalized historically."
        })
    if random.random() < 0.15:
        risks.append({
            "attribute": "Geographic Origin",
            "risk_level": "Medium",
            "reason": "Tier-3 city postal code correlated with historical rejection rates."
        })
    return risks

candidates = []

# Generate 250 realistic candidates
for i in range(250):
    role = random.choice(roles)
    yoe = random.randint(1, 12)
    name = f"{random.choice(first_names)} {random.choice(last_names)}"
    
    # Simulate a realistic baseline score (biased) and equirank score (fair)
    baseline_score = round(random.uniform(40.0, 95.0), 1)
    # Add noise or correct bias for equirank score
    equirank_score = min(max(baseline_score + random.uniform(-15.0, 20.0), 40.0), 99.0)
    
    proxy_risks = generate_proxy_risks()
    human_review = len(proxy_risks) > 0 and random.random() < 0.4
    
    candidate = {
        "id": f"CAND-GEN-{1000+i}",
        "name": name,
        "email": f"{name.lower().replace(' ', '.')}@example.com",
        "location": random.choice(locations),
        "experience_years": yoe,
        "education": random.choice(universities),
        "baseline_ats_score": baseline_score,
        "overall_match": round(equirank_score, 1),
        "evidence_score": round(random.uniform(5.0, 9.9), 1),
        "decision_confidence": round(random.uniform(75.0, 99.0), 1),
        "proxy_risks": proxy_risks,
        "skills": generate_skills(role),
        "fairness": {
            "human_review_required": human_review,
            "total_proxy_tests": 20,
            "proxy_tests_passed": random.randint(15, 20)
        }
    }
    candidates.append(candidate)

# Save to dataset file
with open('enterprise_dataset.json', 'w') as f:
    json.dump({"candidates": candidates}, f, indent=2)

print(f"Successfully generated {len(candidates)} highly realistic enterprise candidates!")
