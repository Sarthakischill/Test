import json

# Load university courses
with open('university-courses.json') as f:
    courses_data = json.load(f)

# Build course-institute mapping from the JSON file
course_institute_mapping = {}
for institute in courses_data["undergraduate_programs"]:
    institute_name = institute["institute_name"]
    for course in institute["courses"]:
        course_institute_mapping[course] = institute_name

def define_rules():
    """Comprehensive ruleset with strategic redundancy and balanced weights"""
    
        # --------------------------------------------------
        # Academic Strengths (Foundational, Higher Weights)
        # --------------------------------------------------
    rules = { "Academic Strengths": {
            "Mathematics/Statistics": {
                "B Tech Computer Science and Engineering": 6,
                "B Sc. (Hons.) Mathematics": 5,
                "B Tech Data Science": 5,
                "BBA Business Analytics": 4,
                "B Tech Artificial Intelligence & Data Science": 5,
                "B Sc.-M Sc. Data Science (Integrated)": 5
            },
            "Physics/Chemistry": {
                "B Tech Mechanical Engineering": 5,
                "Bachelor of Architecture": 5,
                "B Tech Civil Engineering": 4,
                "B.Sc (Hons.) Physics": 4,
                "B Tech Electronics and Computer Engineering": 4
            },
            "Biology/Environmental Science": {
                "B.Sc (Hons.) Biotechnology": 5,
                "B.Sc (Hons.) Environmental Science": 6,
                "B.Tech. Biomedical Engineering": 5,
                "B.Sc (Hons.) Forensic Science": 4
            },
            "Computer Science/Programming": {
                "B Tech Computer Science & Engineering (IoT, Cyber Security)": 6,
                "B Tech (AI & ML)": 5,
                "B Sc. (Hons.) Computer Science": 5,
                "BCA (Cloud Technology & Information Security)": 4
            },
            "Literature/Languages": {
                "B.A. (Hons.) English": 4,
                "B.A International Journalism & Electronic Media": 4,
                "B.A. (Hons.) Film Direction": 3
            },
            "Social Sciences": {
                "B.A. (Hons.) Psychology": 5,
                "B.A. (Hons.) Economics": 4,
                "Bachelor in Social Work (BSW)": 4
            },
            "Arts": {
                "BFA Applied Art": 5,
                "B. Des. Fashion Design": 4,
                "BPA in Theatre": 4,
                "B. Des. Visual Communication": 4
            },
            "Commerce/Business Studies": {
                "BBA (Hons.) Business Analytics": 5,
                "BBA FinTech (Hons.)": 4,
                "B.Com (Hons.)": 4,
                "BMS (Entrepreneurship, Family Business and Innovation)": 4
            }
        },

        # --------------------------------------------------
        # Confidence Tasks (Skill-Based, Multiplicative Weights)
        # --------------------------------------------------
        "Confidence Tasks": {
            "Solving math/logic puzzles": {
                "B Tech Artificial Intelligence & Data Science": 0.8,
                "B Sc. (Hons.) Statistics": 0.8,
                "B Tech Robotics and AI": 0.7,
                "BBA Business Analytics": 0.6
            },
            "Writing research reports": {
                "B.A. (Hons.) Psychology": 0.8,
                "B.A International Journalism": 0.8,
                "B.Sc (Hons.) Environmental Science": 0.7
            },
            "Coding a simple app/website": {
                "B Tech Computer Science and Engineering": 1.0,
                "BCA (Cloud Technology)": 0.9,
                "B Tech Information Technology": 0.8
            },
            "Designing posters/digital art": {
                "B. Des. Visual Communication": 0.8,
                "BFA Applied Art": 0.8,
                "B.A. (Hons.) VFX and Animation": 0.7
            },
            "Conducting lab experiments": {
                "B.Sc (Hons.) Biotechnology": 0.8,
                "B.Tech. Biomedical Engineering": 0.8,
                "B.Sc (Hons.) Chemistry": 0.7
            }
        },

        # --------------------------------------------------
        # Interests & Passions (Passion-Driven, High Redundancy)
        # --------------------------------------------------
        "Interests & Passions": {
            "Building robots/automated systems": {
                "B Tech Robotics and AI": 5,
                "B Tech Advanced Mechatronics": 4,
                "B Sc. (Hons.) Robotics": 4,
                "B Tech Computer Science and Engineering": 3
            },
            "Debating social/environmental issues": {
                "Bachelor of Law (LL.B.)": 5,
                "BSW Social Work": 4,
                "B.A. (Hons.) Economics": 3
            },
            "Creating digital art or animations": {
                "B.A. (Hons.) VFX and Animation": 5,
                "B. Des. Visual Communication": 4,
                "BFA Contemporary Art": 4
            },
            "Managing events/budgets": {
                "BBA (Hons.) Business Analytics": 5,
                "BMS Entrepreneurship": 4,
                "B.Com (Hons.)": 3
            },
            "Conducting biology experiments": {
                "B.Sc (Hons.) Biotechnology": 5,
                "B.Tech. Biomedical Engineering": 4,
                "Bachelor of Pharmacy": 3
            },
            "Writing stories/scripts": {
                "B.A. (Hons.) Film Direction": 5,
                "B.A International Journalism": 4,
                "B.A. (Hons.) English": 3
            },
            "Designing interiors/fashion": {
                "B. Des. Interior Design": 5,
                "B. Des. Fashion Design": 4,
                "B. Des. Textile Design": 3
            },
            "Working in healthcare labs": {
                "B.Tech. Biomedical Engineering": 5,
                "Bachelor of Pharmacy": 4,
                "B.Sc (Hons.) Food Nutrition": 3
            }
        },

        # --------------------------------------------------
        # Interest Ratings (Multiplicative Weights)
        # --------------------------------------------------
        "Interest Ratings": {
            "Artificial Intelligence & Data Science": {
                "B Tech (AI & ML)": 1.5,
                "MCA (Artificial Intelligence - Data Science)": 1.5,
                "B Tech Robotics and Automation": 1.2
            },
            "Environmental Sustainability": {
                "B.Sc (Hons.) Environmental Science": 1.5,
                "B Tech Agriculture Engineering": 1.2,
                "B Tech Civil Engineering": 1.0
            },
            "Biotechnology/Genetic Engineering": {
                "B.Sc (Hons.) Biotechnology": 1.5,
                "B.Tech. Biomedical Engineering": 1.2,
                "B.Sc (Hons.) Microbiology": 1.0
            },
            "Film Production/Animation": {
                "B.A. (Hons.) VFX and Animation": 1.5,
                "B.A. (Hons.) Film Direction": 1.2,
                "B. Des. Visual Communication": 1.0
            },
            "Business Analytics/FinTech": {
                "BBA Business Analytics": 1.5,
                "BBA FinTech": 1.2,
                "B Tech Data Science": 1.0
            },
            "Robotics & Industrial Automation": {
                "B Tech Robotics and Automation": 1.5,
                "B Tech Advanced Mechatronics": 1.2,
                "B Tech Mechanical and Mechatronics": 1.0
            },
            "Law & Social Justice": {
                "Bachelor of Law (LL.B.)": 1.5,
                "BSW Social Work": 1.2,
                "B.A. (Hons.) Psychology": 1.0
            },
            "Pharmaceutical Sciences": {
                "Bachelor of Pharmacy": 1.5,
                "B.Sc (Hons.) Pharmaceutical Chemistry": 1.2,
                "B.Tech. Biomedical Engineering": 1.0
            }
        },

        # --------------------------------------------------
        # Career Goals (High Impact, Single Select)
        # --------------------------------------------------
        "Career Goals": {
            "Tech labs/research facilities": {
                "B Tech Biomedical Engineering": 5,
                "B.Sc (Hons.) Biotechnology": 4,
                "B Tech Computer Science and Engineering": 4
            },
            "Creative studios (art, design, film)": {
                "BFA Applied Art": 5,
                "B.A. (Hons.) VFX and Animation": 4,
                "B. Des. Fashion Design": 4
            },
            "Corporate offices/banks": {
                "BBA FinTech": 5,
                "B.Com (Hons.)": 4,
                "BBA Business Analytics": 4
            },
            "Outdoor fieldwork (agriculture, environment)": {
                "B Tech Agriculture Engineering": 5,
                "B.Sc (Hons.) Environmental Science": 4,
                "B.Sc (Hons.) Geology": 3
            },
            "Courtrooms/NGOs": {
                "Bachelor of Law (LL.B.)": 5,
                "BSW Social Work": 4,
                "B.A. (Hons.) Psychology": 3
            }
        },

        # --------------------------------------------------
        # Career Factor Rankings (Balanced Base Weights)
        # --------------------------------------------------
        "Career Factor Rankings": {
            "High salary": {
                "BBA FinTech": 2.5,
                "B Tech Computer Science & Engineering (IoT)": 2.5,
                "B Tech Artificial Intelligence & Data Science": 2.5
            },
            "Creativity/innovation": {
                "B. Des. Industrial Design": 2.5,
                "BPA in Theatre": 2.5,
                "BFA Contemporary Art": 2.5
            },
            "Social impact": {
                "BSW Social Work": 2.5,
                "B.Sc (Hons.) Environmental Science": 2.5,
                "Bachelor of Law (LL.B.)": 2.5
            },
            "Job stability": {
                "B Tech Civil Engineering": 2.5,
                "Bachelor of Pharmacy": 2.5,
                "B.Sc (Hons.) Food Technology": 2.5
            },
            "Leadership opportunities": {
                "BBA (Hons.) Business Analytics": 2.5,
                "BMS Entrepreneurship": 2.5,
                "B Tech Mechanical Engineering": 2.5
            }
        },

        # --------------------------------------------------
        # Scenario-Based Questions (High Impact, Narrow Focus)
        # --------------------------------------------------
        "Scenario-Based Q7": {
            "Designing AI-powered waste management systems": {
                "B Tech Environmental Engineering": 8,
                "B Tech AI & Data Science": 6,
                "B.Sc (Hons.) Environmental Science": 7
            },
            "Creating campaigns to reduce plastic usage": {
                "BSW Social Work": 7,
                "B.Sc (Hons.) Environmental Science": 6,
                "B.A International Journalism": 5
            },
            "Developing renewable energy solutions": {
                "B Tech Agriculture Engineering": 7,
                "B Tech Mechanical Engineering": 6,
                "B.Sc (Hons.) Physics": 5
            },
            "Building eco-friendly architectural models": {
                "Bachelor of Architecture": 8,
                "B. Des. Interior Design": 7,
                "B Tech Civil Engineering": 6
            }
        },

        "Scenario-Based Q8": {
            "Market research & data analysis": {
                "BBA Business Analytics": 9,
                "B.Sc-M.Sc Data Science": 8,
                "B.A. (Hons.) Economics": 7
            },
            "Product design & prototyping": {
                "B. Des. Industrial Design": 8,
                "B Tech Mechanical Engineering": 7,
                "BFA Applied Art": 6
            },
            "Legal compliance & patent filing": {
                "Bachelor of Law (LL.B.)": 8,
                "B.Tech. Biomedical Engineering": 7,
                "BBA FinTech": 6
            },
            "Digital marketing campaigns": {
                "B Sc. (Hons.) Digital Marketing": 8,
                "BBA Business Analytics": 7,
                "B. Des. Visual Communication": 6
            }
        },

        # --------------------------------------------------
        # Skills & Personality (Moderate Multiplicative Weights)
        # --------------------------------------------------
        "Skills & Personality": {
            "Analyze data and find logical solutions": {
                "B Tech Information Technology": 2.0,
                "B Sc. (Hons.) Computer Science": 1.8,
                "BBA Business Analytics": 1.5
            },
            "Brainstorm creative ideas with a team": {
                "B. Des. Visual Communication": 2.0,
                "B.A. (Hons.) Film Direction": 1.8,
                "BFA Applied Art": 1.5
            },
            "Follow structured plans/guidelines": {
                "B Tech Civil Engineering": 2.0,
                "Bachelor of Pharmacy": 1.8,
                "B.Sc (Hons.) Chemistry": 1.5
            },
            "Advocate for ethical/social considerations": {
                "Bachelor of Law (LL.B.)": 2.0,
                "BSW Social Work": 1.8,
                "B.A. (Hons.) Psychology": 1.5
            },
            "Public speaking/presentations": {
                "B.A International Journalism": 2.0,
                "BBA (Hons.) Business Analytics": 1.8,
                "BPA in Theatre": 1.5
            },
            "Writing code for 6+ hours": {
                "B Tech Computer Science and Engineering": 2.0,
                "BCA (Cloud Technology)": 1.8,
                "B Tech (AI & ML)": 1.5
            },
            "Editing videos/animations": {
                "B.A. (Hons.) VFX and Animation": 2.0,
                "B. Des. Visual Communication": 1.8,
                "BFA Contemporary Art": 1.5
            },
            "Handling financial calculations": {
                "BBA FinTech": 2.0,
                "B.Com (Hons.)": 1.8,
                "B Tech Data Science": 1.5
            }
        },

        # --------------------------------------------------
        # Program-Specific Preferences (High Redundancy)
        # --------------------------------------------------
        "Program-Specific Preferences": {
            "Working with AI/robotics": {
                "B Tech Robotics and Automation": 7,
                "B Sc. (Hons.) Robotics": 6,
                "B Tech Advanced Mechatronics": 6
            },
            "Developing mobile apps/software": {
                "B Tech Computer Science and Engineering": 7,
                "BCA (Cloud Technology)": 6,
                "B Tech Information Technology": 5
            },
            "Studying human behavior/psychology": {
                "B.A. (Hons.) Psychology": 7,
                "BSW Social Work": 6,
                "B.A. (Hons.) Economics": 5
            },
            "Designing fashion/interiors": {
                "B. Des. Fashion Design": 7,
                "B. Des. Interior Design": 6,
                "B. Des. Textile Design": 5
            },
            "Researching diseases/drugs": {
                "B.Tech. Biomedical Engineering": 7,
                "Bachelor of Pharmacy": 6,
                "B.Sc (Hons.) Microbiology": 5
            },
            "Making short films/animations": {
                "B.A. (Hons.) VFX and Animation": 7,
                "B.A. (Hons.) Film Direction": 6,
                "B. Des. Visual Communication": 5
            },
            "Managing business startups": {
                "BMS Entrepreneurship": 7,
                "BBA Business Analytics": 6,
                "BBA FinTech": 5
            },
            "Practicing law/rights advocacy": {
                "Bachelor of Law (LL.B.)": 7,
                "BSW Social Work": 6,
                "B.A. (Hons.) Psychology": 5
            }
        }
    }
    return rules

def calculate_scores(responses, rules):
    """Calculate course scores with proper rating/ranking handling"""
    course_scores = {}
    course_details = {}
    
    for section, answers in responses.items():
        if section not in rules:
            continue
            
        section_rules = rules[section]
        
        for answer in answers:
            if isinstance(answer, dict):  # Rating/Ranking questions
                for item, value in answer.items():
                    if item not in section_rules:
                        continue
                        
                    # Handle ranking inversion
                    multiplier = (6 - value) if section == "Career Factor Rankings" else value
                    
                    for course, weight in section_rules[item].items():
                        points = weight * multiplier
                        course_scores[course] = course_scores.get(course, 0) + points
                        course_details.setdefault(course, []).append(
                            f"{section}: {item} → +{points} ({weight} × {multiplier})"
                        )
            else:  # Single/Multiple select questions
                if answer not in section_rules:
                    continue
                for course, weight in section_rules[answer].items():
                    course_scores[course] = course_scores.get(course, 0) + weight
                    course_details.setdefault(course, []).append(
                        f"{section}: {answer} → +{weight}"
                    )
    
    return course_scores, course_details

def rank_courses(course_scores):
    """Return sorted list of (course, score) tuples"""
    return sorted(course_scores.items(), key=lambda x: x[1], reverse=True)

def submit_responses(responses):
    # Process the responses and generate the output
    rules = define_rules()
    scores, details = calculate_scores(responses, rules)
    ranked = rank_courses(scores)
    results = []
    for i, (course, score) in enumerate(ranked[:10], 1):
        institute = course_institute_mapping.get(course, "Unknown Institute")
        result = {
            "rank": i,
            "course": course,
            "score": score,
            "institute": institute,
            "details": details.get(course, [])
        }
        results.append(result)
    return results

# Example usage
if __name__ == "__main__":
    # Load rules and sample responses
    rules = define_rules()
    
    # Sample response matching test.md format
responses = {
    # Q1: Academic Strengths (Multiple Select)
    "Academic Strengths": [
        "Literature/Languages",
        "Social Sciences (Psychology, Economics)",
        "Arts (Music, Design, Theater)"
    ],

    # Q2: Confidence Tasks (All 5 rated 1-5)
    "Confidence Tasks": [
        {"Solving math/logic puzzles": 2},  # Prefers abstract thought over numbers
        {"Writing research reports": 5},  # Enjoys crafting well-researched arguments
        {"Coding a simple app/website": 2},  # Finds technology intriguing but not a strength
        {"Designing posters/digital art": 4},  # Creative visual expression is a passion
        {"Conducting lab experiments": 3}  # Curious but prefers observational roles
    ],

    # Q3: Interests & Passions (Multiple Select)
    "Interests & Passions": [
        "Debating social/environmental issues",  # Driven by social justice causes
        "Creating digital art or animations",  # Finds solace in visual storytelling
        "Writing stories/scripts",  # Passionate about capturing human narratives
        "Managing events/budgets"  # Thrives in fast-paced environments with organizational tasks
    ],

    # Q4: Interest Ratings (All 8 fields rated 1-5)
    "Interest Ratings": [
        {"Artificial Intelligence & Data Science": 3},  # Intrigued but wary of complexity
        {"Environmental Sustainability": 5},  # Deeply invested in ecological solutions
        {"Biotechnology/Genetic Engineering": 2},  # Limited curiosity
        {"Film Production/Animation": 5},  # Dreams of creating cinematic magic
        {"Business Analytics/FinTech": 3},  # Interested in market trends and strategies
        {"Robotics & Industrial Automation": 2},  # Not a primary interest
        {"Law & Social Justice": 5},  # A fierce advocate for equity and justice
        {"Pharmaceutical Sciences": 1}  # Minimal interest
    ],

    # Q5: Career Goals (Single Select)
    "Career Goals": ["Creative studios (art, design, film)"],  # Passionate about storytelling and visual design

    # Q6: Career Factor Rankings (All 5 ranked 1-5)
    "Career Factor Rankings": [
        {"High salary": 4},  # Financial stability is important but not the top priority
        {"Creativity/innovation": 1},  # The primary driving force
        {"Social impact": 2},  # Driven by meaningful work that changes perspectives
        {"Job stability": 5},  # Views risk as part of the creative journey
        {"Leadership opportunities": 3}  # Prefers to inspire through work rather than hierarchy
    ],

    # Q7: Sustainability Scenario
    "Scenario-Based Q7": ["Creating campaigns to reduce plastic usage"],  # Believes in the power of storytelling for awareness

    # Q8: Product Launch Role
    "Scenario-Based Q8": ["Digital marketing campaigns"],  # Excited by creative communication strategies

    # Q9: Problem-Solving Approach (Single Select)
    "Skills & Personality": ["Brainstorm creative ideas with a team"],  # Thrives on collaborative ideation sessions

    # Q10: Comfort Tasks (All 4 rated 1-5)
    "Skills & Personality": [
        {"Public speaking/presentations": 4},  # Confident speaker when discussing passionate topics
        {"Writing code for 6+ hours": 1},  # Finds it tedious and uninspiring
        {"Editing videos/animations": 5},  # Immerses deeply in post-production creativity
        {"Handling financial calculations": 3}  # Functional but not a preferred task
    ],

    # Q11: Program Preferences (Multiple Select)
    "Program-Specific Preferences": [
        "Making short films/animations",  # Visual storytelling excites them
        "Studying human behavior/psychology",  # Curious about what makes people tick
        "Designing fashion/interiors",  # Finds beauty in form and function
        "Practicing law/rights advocacy"  # Passionate about justice and human rights
    ]
}

# Calculate and display results
rules = define_rules()
scores, details = calculate_scores(responses, rules)
ranked = rank_courses(scores)

# print("Top Course Recommendations:")
for i, (course, score) in enumerate(ranked[:10], 1):
    institute = course_institute_mapping.get(course, "Unknown Institute")
    print(f"\n{i}. {course} ({score} points) - Offered by {institute}")
    print("Scoring Details:")
    for detail in details.get(course, []):
        print(f" - {detail}")