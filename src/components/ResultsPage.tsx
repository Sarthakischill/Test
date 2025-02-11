import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { CourseRecommendation } from '../types';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// ---------- Helper Functions Porting ct.py Logic ----------

// Returns the full ruleset (port of ct.py's define_rules)
const defineRules = () => {
  return {
    "Academic Strengths": {
      "Mathematics/Statistics": {
        "B Tech Computer Science and Engineering": 7,
        "B Tech Artificial Intelligence & Data Science": 7,
        "B Tech Data Science": 7,
        "B Sc. (Hons.) Mathematics": 6,
        "B Sc. (Hons.) Statistics": 6,
        "BBA (Hons./ Hons. with Research) Business Analytics": 5,
        "BBA FinTech (Hons./ Hons. with Research)": 4,
        "B Tech Robotics and Artificial Intelligence": 5,
        "B Tech Electrical and computer Engineering": 4,
        "B.Com (Hons./ Hons. with Research)":3,
        "B Tech Robotics and Automation": 5,
        "MCA (Digital Product Technology)": 4,
        "MCA (Artificial Intelligence - Data Science)": 6,
        "BCA (Cloud Technology & Information Security)": 4,
      },
      "Physics/Chemistry": {
        "B Tech Chemical Engineering": 7,
        "B Tech Mechanical Engineering": 7,
        "B Tech Civil Engineering": 6,
        "B Tech Electrical and computer Engineering": 5,
        "B Tech Electronics and Computer Engineering": 5,
        "B Tech Robotics and Artificial Intelligence": 4,
        "B Tech Mechanical and Mechatronics Engineering (Additive Manufacturing)": 6,
        "Bachelor of Architecture": 6,
        "B.Sc (Hons.) Physics": 6,
        "B.Sc (Hons.) Chemistry": 6,
        "B.Tech. Cosmetic Technology": 5,
        "B.Tech. Biomedical Engineering": 4,
        "B Tech Robotics and Automation": 4,
        "B Tech Agriculture Engineering": 4,
        "B Tech Electrical and Instrumentation Engineering": 4,
        "B Tech (Integrated) Advanced Mechatronics and Industrial Automation": 5,
        "B Tech (Integrated) Electrical and Computer Engineering": 4,
      },
      "Biology/Environmental Science": {
        "B.Sc (Hons.) Biotechnology": 7,
        "B.Sc (Hons.) Environmental Science": 7,
        "B.Sc (Hons.) Microbiology": 6,
        "B.Sc (Hons.) Food Technology & Processing": 6,
        "B.Sc (Hons.) Food Nutrition & Dietetics": 6,
        "B.Tech. (Biotechnology)": 6,
        "B.Tech. Food Processing Technology": 6,
        "B.Tech. Biomedical Engineering": 6,
        "B.Sc (Hons.) Zoology": 6,
        "B.Sc (Hons.) Forensic Science": 5,
        "B Tech Chemical Engineering": 4,
        "B Tech Agriculture Engineering": 5,
        "B Sc. Fire and Safety": 4,
        "B.Sc (Hons.) Geology": 4,
      },
      "Computer Science/Programming": {
        "B Tech Computer Science and Engineering": 8,
        "B Tech (AI & ML)": 8,
        "B Tech Data Science": 8,
        "B Sc. (Hons.) Computer Science": 7,
        "B Sc. (Hons.) Information technology": 7,
        "B Tech Computer Science & Engineering (IoT, Cyber Security)": 7,
        "B Tech Artificial Intelligence & Data Science": 7,
        "BCA (Cloud Technology & Information Security)": 6,
        "MCA (Digital Product Technology)": 6,
        "MCA (Artificial Intelligence - Data Science)": 7,
        "B Tech Robotics and Automation": 6,
        "B Tech (Computer Science and Design)": 6,
        "B Tech (Integrated) Computer Science and Engineering (Data Science)": 6,
        "B Tech (Integrated) Computer Science and Engineering (IoT)": 6,
        "B Tech Robotics and Artificial Intelligence": 6,
        "B Tech Electrical and computer Engineering": 5,
        "B Tech Electronics and Computer Engineering": 5,
      },
      "Literature/Languages": {
        "B.A. (Hons.) English": 7,
        "B.A International Journalism & Electronic Media": 7,
        "B.A (Hons./Reg. with Research) Mass Communication and Media": 6,
        "B.A. (Hons.) Film Direction": 5,
        "B.A. (Hons.) Film Editing": 5,
        "B.A. (Hons.) Sound Designing & Music Production": 4,
        "BPA in Theatre": 4,
        "B. Des. Visual Communication": 4,
      },
      "Social Sciences (Psychology, Economics)": {
        "B.A. (Hons.) Psychology": 7,
        "B.A. (Hons.) Economics": 7,
        "Bachelor in Social Work (BSW)": 6,
        "B.A (Hons./Reg. with Research) Mass Communication and Media": 5,
        "Bachelor of Law (LL.B.)": 5,
        "Bachelor of Business Administration and Bachelor of Law": 4,
        "BBA (Hons./ Hons. with Research) Business Analytics": 4,
        "BMS (Entrepreneurship, Family Business and Innovation)": 3,
      },
      "Arts (Music, Design, Theater)": {
        "BFA Applied Art": 7,
        "B. Des. Interior Design": 7,
        "B. Des. Fashion Design": 7,
        "B. Des. Textile Design": 6,
        "B. Des. Industrial Design": 6,
        "B. Des. Visual Communication": 7,
        "BFA Contemporary Art": 7,
        "BFA Traditional Art and Craft": 6,
        "B.A. (Hons.) Cinematography": 5,
        "B.A. (Hons.) Film Direction": 5,
        "B.A. (Hons.) Film Editing": 4,
        "B.A. (Hons.) Sound Designing & Music Production": 4,
        "B.A. (Hons.) VFX and Animation": 6,
        "BPA in Music": 5,
        "BPA in Theatre": 5,
        "B. Sc. (Hons.) Animation": 5,
      },
      "Commerce/Business Studies": {
        "BBA (Hons./ Hons. with Research)": 7,
        "B.Com (Hons./ Hons. with Research)": 7,
        "BBA FinTech (Hons./ Hons. with Research)": 7,
        "BBA (Hons./ Hons. with Research) Business Analytics": 7,
        "BMS (Entrepreneurship, Family Business and Innovation)": 6,
        "Bachelor of Business Administration and Bachelor of Law": 5,
        "B.A. (Hons.) Economics": 4,
      }
    },
    "Confidence Tasks": {
      "Solving math/logic puzzles": {
        "B Tech Computer Science and Engineering": 0.7,
        "B Tech Artificial Intelligence & Data Science": 0.9,
        "B Tech Data Science": 0.9,
        "B Sc. (Hons.) Mathematics": 0.8,
        "B Sc. (Hons.) Statistics": 0.9,
        "BBA (Hons./ Hons. with Research) Business Analytics": 0.7,
        "BBA FinTech (Hons./ Hons. with Research)": 0.6,
        "B Tech Robotics and Artificial Intelligence": 0.8,
        "B Tech Electrical and computer Engineering": 0.6,
        "B Tech Robotics and Automation": 0.7,
        "MCA (Digital Product Technology)": 0.6,
        "MCA (Artificial Intelligence - Data Science)": 0.8,
        "BCA (Cloud Technology & Information Security)": 0.6,
      },
      "Writing research reports": {
        "B.A. (Hons.) English": 0.8,
        "B.A International Journalism & Electronic Media": 0.8,
        "B.A (Hons./Reg. with Research) Mass Communication and Media": 0.7,
        "B.A. (Hons.) Psychology": 0.9,
        "B.A. (Hons.) Economics": 0.8,
        "Bachelor in Social Work (BSW)": 0.7,
        "B.Sc (Hons.) Environmental Science": 0.7,
        "B.Sc (Hons.) Biotechnology": 0.6,
        "Bachelor of Law (LL.B.)": 0.8,
      },
      "Coding a simple app/website": {
        "B Tech Computer Science and Engineering": 1.0,
        "B Tech (AI & ML)": 0.9,
        "B Tech Data Science": 0.9,
        "B Sc. (Hons.) Computer Science": 0.9,
        "B Sc. (Hons.) Information technology": 0.8,
        "B Tech Computer Science & Engineering (IoT, Cyber Security)": 0.9,
        "B Tech Artificial Intelligence & Data Science": 0.9,
        "BCA (Cloud Technology & Information Security)": 0.8,
        "MCA (Digital Product Technology)": 0.8,
        "MCA (Artificial Intelligence - Data Science)": 0.9,
        "B Tech Robotics and Automation": 0.8,
        "B Tech (Computer Science and Design)": 0.9,
      },
      "Designing posters/digital art": {
        "BFA Applied Art": 0.9,
        "B. Des. Interior Design": 0.8,
        "B. Des. Fashion Design": 0.8,
        "B. Des. Textile Design": 0.7,
        "B. Des. Industrial Design": 0.7,
        "B. Des. Visual Communication": 0.9,
        "BFA Contemporary Art": 0.9,
        "BFA Traditional Art and Craft": 0.8,
        "B.A. (Hons.) Cinematography": 0.7,
        "B.A. (Hons.) Film Direction": 0.8,
        "B.A. (Hons.) Film Editing": 0.7,
        "B.A. (Hons.) Sound Designing & Music Production": 0.6,
        "B.A. (Hons.) VFX and Animation": 0.9,
        "B. Sc. (Hons.) Animation": 0.8,
      },
      "Conducting lab experiments": {
        "B.Sc (Hons.) Biotechnology": 0.9,
        "B.Sc (Hons.) Environmental Science": 0.7,
        "B.Sc (Hons.) Microbiology": 0.8,
        "B.Sc (Hons.) Food Technology & Processing": 0.7,
        "B.Sc (Hons.) Food Nutrition & Dietetics": 0.7,
        "B.Tech. (Biotechnology)": 0.8,
        "B.Tech. Food Processing Technology": 0.7,
        "B.Tech. Biomedical Engineering": 0.9,
        "B.Sc (Hons.) Zoology": 0.8,
        "B.Sc (Hons.) Forensic Science": 0.8,
        "B.Sc (Hons.) Physics": 0.6,
        "B.Sc (Hons.) Chemistry": 0.9,
        "B Tech Chemical Engineering": 0.6,
      }
    },
    "Which activities excite you? (multiple-select)":{
       "Building robots/automated systems":{
          "B Tech Robotics and AI": 8,
          "B Tech Computer Science & Engineering (IoT, Cyber Security)": 6,
          "B Tech (AI & ML)": 6,
          "B Tech Electrical and computer Engineering": 5,
          "B Tech Mechanical Engineering": 5,
          "B Tech (Integrated) Advanced Mechatronics and Industrial Automation": 7,
          "B Tech (Integrated) Robotics and AI": 7,
          "B Sc. (Hons.) Robotics": 7,
          "B Tech Robotics and Automation": 8,
          "B Tech Mechanical and Mechatronics Engineering (Additive Manufacturing)": 6
       },
        "Debating social/environmental issues": {
          "Bachelor of Law (LL.B.)": 8,
          "BSW Social Work": 8,
          "B.A. (Hons.) Psychology": 7,
          "B.A. (Hons.) Economics": 7,
          "B.Sc (Hons.) Environmental Science": 6,
          "B.A International Journalism & Electronic Media": 5,
          "B.A (Hons./Reg. with Research) Mass Communication and Media": 5
        },
        "Creating digital art or animations":{
            "B.A. (Hons.) VFX and Animation": 8,
            "B. Des. Visual Communication": 8,
            "BFA Contemporary Art": 7,
            "BFA Applied Art": 7,
            "B. Sc. (Hons.) Animation": 7,
            "B.A. (Hons.) Film Direction": 6,
            "B.A. (Hons.) Film Editing": 5,
            "B.A. (Hons.) Sound Designing & Music Production": 5
        },
         "Managing events/budgets": {
            "BBA (Hons./ Hons. with Research) Business Analytics": 8,
            "BBA FinTech (Hons./ Hons. with Research)": 7,
            "BBA (Hons./ Hons. with Research)": 6,
            "B.Com (Hons./ Hons. with Research)": 6,
            "BMS (Entrepreneurship, Family Business and Innovation)": 7
         },
         "Conducting biology experiments":{
             "B.Sc (Hons.) Biotechnology": 8,
             "B.Tech. Biomedical Engineering": 7,
             "B.Sc (Hons.) Microbiology": 7,
             "B.Tech. (Biotechnology)": 7,
             "B.Sc (Hons.) Zoology": 6,
             "B.Sc (Hons.) Forensic Science": 6,
             "B.Sc (Hons.) Food Technology & Processing": 5,
             "B.Sc (Hons.) Food Nutrition & Dietetics": 5
         },
        "Writing stories/scripts": {
          "B.A. (Hons.) Film Direction": 8,
          "B.A International Journalism & Electronic Media": 7,
          "B.A (Hons./Reg. with Research) Mass Communication and Media": 7,
          "B.A. (Hons.) English": 6,
          "BPA in Theatre": 5
        },
        "Designing interiors/fashion":{
             "B. Des. Interior Design": 8,
             "B. Des. Fashion Design": 8,
             "B. Des. Textile Design": 7,
             "BFA Applied Art": 6,
             "B. Des. Industrial Design": 6
         },
         "Working in healthcare labs":{
              "B.Tech. Biomedical Engineering": 8,
              "Bachelor of Pharmacy": 7,
              "B.Sc (Hons.) Biotechnology": 6,
              "B.Sc (Hons.) Microbiology": 6,
              "B.Sc (Hons.) Food Nutrition & Dietetics": 5
          }
    },
     "How interested are you in these fields? (1 = Not Interested, 5 = Very Interested)":{
        "Artificial Intelligence & Data Science": {
             "B Tech Computer Science and Engineering": 1.2,
             "B Tech (AI & ML)": 1.8,
             "B Tech Data Science": 1.8,
             "B Sc. (Hons.) Computer Science": 1.5,
             "B Sc. (Hons.) Information technology": 1.5,
             "B Tech Computer Science & Engineering (IoT, Cyber Security)": 1.5,
             "B Tech Artificial Intelligence & Data Science": 2,
             "BCA (Cloud Technology & Information Security)": 1.2,
             "MCA (Digital Product Technology)": 1.5,
             "MCA (Artificial Intelligence - Data Science)": 2,
             "B Tech Robotics and Automation": 1.5,
             "B Tech (Computer Science and Design)": 1.5,
             "B Tech (Integrated) Computer Science and Engineering (Data Science)": 1.5,
             "B Tech (Integrated) Computer Science and Engineering (IoT)": 1.5,
             "B Tech Robotics and Artificial Intelligence": 1.5,
             "B Tech Electrical and computer Engineering": 1.2,
             "B Tech Electronics and Computer Engineering": 1.2
         },
         "Environmental Sustainability":{
               "B.Sc (Hons.) Environmental Science": 1.8,
               "B Tech Agriculture Engineering": 1.5,
               "B Tech Civil Engineering": 1.2,
               "B.Sc (Hons.) Geology": 1.2,
               "B Tech Chemical Engineering": 1.0,
               "B Tech Mechanical Engineering": 1.0,
               "B Tech Electrical and Instrumentation Engineering": 1.0
           },
         "Biotechnology/Genetic Engineering":{
               "B.Sc (Hons.) Biotechnology": 1.8,
               "B.Tech. Biomedical Engineering": 1.5,
               "B.Sc (Hons.) Microbiology": 1.5,
               "B.Tech. (Biotechnology)": 1.5,
               "B.Sc (Hons.) Zoology": 1.2,
               "B.Sc (Hons.) Forensic Science": 1.2,
               "B.Sc (Hons.) Food Technology & Processing": 1.2,
               "B.Sc (Hons.) Food Nutrition & Dietetics": 1.2,
               "Bachelor of Pharmacy": 1.0
           },
          "Film Production/Animation":{
                "B.A. (Hons.) VFX and Animation": 1.8,
                "B.A. (Hons.) Film Direction": 1.5,
                "B. Des. Visual Communication": 1.5,
                "B.A. (Hons.) Cinematography": 1.2,
                "B.A. (Hons.) Film Editing": 1.2,
                "B.A. (Hons.) Sound Designing & Music Production": 1.2,
                "B. Sc. (Hons.) Animation": 1.5
            },
            "Business Analytics/FinTech":{
                 "BBA (Hons./ Hons. with Research) Business Analytics": 1.8,
                 "BBA FinTech (Hons./ Hons. with Research)": 1.5,
                 "B Tech Data Science": 1.2,
                 "BBA (Hons./ Hons. with Research)": 1.2,
                 "B.Com (Hons./ Hons. with Research)": 1.0,
                 "BMS (Entrepreneurship, Family Business and Innovation)": 1.0,
                 "MCA (Digital Product Technology)": 1.2
             },
             "Robotics & Industrial Automation":{
                  "B Tech Robotics and Automation": 1.8,
                  "B Tech (Integrated) Advanced Mechatronics and Industrial Automation": 1.5,
                  "B Tech Robotics and Artificial Intelligence": 1.5,
                  "B Tech Electrical and computer Engineering": 1.2,
                  "B Tech Mechanical Engineering": 1.2,
                  "B Sc. (Hons.) Robotics": 1.5,
                  "B Tech Mechanical and Mechatronics Engineering (Additive Manufacturing)": 1.2
              },
              "Law & Social Justice":{
                   "Bachelor of Law (LL.B.)": 1.8,
                   "BSW Social Work": 1.5,
                   "B.A. (Hons.) Psychology": 1.5,
                   "B.A. (Hons.) Economics": 1.2,
                   "B.A International Journalism & Electronic Media": 1.0,
                   "B.A (Hons./Reg. with Research) Mass Communication and Media": 1.0
               },
               "Pharmaceutical Sciences":{
                    "Bachelor of Pharmacy": 1.8,
                    "B.Tech. Biomedical Engineering": 1.5,
                    "B.Sc (Hons.) Biotechnology": 1.2,
                    "B.Sc (Hons.) Microbiology": 1.2,
                    "B.Sc (Hons.) Food Technology & Processing": 1.0,
                    "B.Sc (Hons.) Food Nutrition & Dietetics": 1.0,
                    "B Tech Chemical Engineering": 1.0
                }
     },
     "What work environment do you prefer? (single-select)":{
         "Tech labs/research facilities":{
              "B Tech Computer Science and Engineering": 7,
              "B Tech (AI & ML)": 6,
              "B Tech Data Science": 6,
              "B Sc. (Hons.) Computer Science": 5,
              "B Sc. (Hons.) Information technology": 5,
              "B Tech Computer Science & Engineering (IoT, Cyber Security)": 5,
              "B Tech Artificial Intelligence & Data Science": 6,
              "BCA (Cloud Technology & Information Security)": 5,
              "MCA (Digital Product Technology)": 5,
              "MCA (Artificial Intelligence - Data Science)": 6,
              "B Tech Robotics and Automation": 6,
              "B Tech (Computer Science and Design)": 5,
              "B Tech (Integrated) Computer Science and Engineering (Data Science)": 5,
              "B Tech (Integrated) Computer Science and Engineering (IoT)": 5,
              "B Tech Robotics and Artificial Intelligence": 6,
              "B Tech Electrical and computer Engineering": 5,
              "B Tech Electronics and Computer Engineering": 5,
              "B.Tech. Biomedical Engineering": 6,
              "B.Sc (Hons.) Biotechnology": 5,
              "Bachelor of Pharmacy": 5,
              "B Tech Chemical Engineering": 5,
              "B Tech Mechanical Engineering": 5,
              "B Tech Civil Engineering": 5
         },
         "Creative studios (art, design, film)":{
            "BFA Applied Art": 7,
            "B. Des. Interior Design": 6,
            "B. Des. Fashion Design": 6,
            "B. Des. Textile Design": 5,
            "B. Des. Industrial Design": 5,
            "B. Des. Visual Communication": 6,
            "BFA Contemporary Art": 6,
            "BFA Traditional Art and Craft": 5,
            "B.A. (Hons.) Cinematography": 6,
            "B.A. (Hons.) Film Direction": 6,
            "B.A. (Hons.) Film Editing": 5,
            "B.A. (Hons.) Sound Designing & Music Production": 5,
            "B.A. (Hons.) VFX and Animation": 6,
            "B. Sc. (Hons.) Animation": 5
         },
         "Corporate offices/banks":{
              "BBA (Hons./ Hons. with Research) Business Analytics": 7,
              "BBA FinTech (Hons./ Hons. with Research)": 6,
              "BBA (Hons./ Hons. with Research)": 5,
              "B.Com (Hons./ Hons. with Research)": 5,
              "BMS (Entrepreneurship, Family Business and Innovation)": 6,
              "B.A. (Hons.) Economics": 5
          },
         "Outdoor fieldwork (agriculture, environment)":{
              "B.Sc (Hons.) Environmental Science": 7,
              "B Tech Agriculture Engineering": 6,
              "B.Sc (Hons.) Geology": 6,
              "B Tech Civil Engineering": 5,
              "B Tech Chemical Engineering": 5
          },
          "Courtrooms/NGOs":{
              "Bachelor of Law (LL.B.)": 7,
              "BSW Social Work": 6,
              "B.A. (Hons.) Psychology": 5,
              "B.A. (Hons.) Economics": 5,
              "B.A International Journalism & Electronic Media": 4,
              "B.A (Hons./Reg. with Research) Mass Communication and Media": 4
          }
     },
    "Rank these career factors (1 = Most Important, 5 = Least Important)":{
      "High salary": {
        "BBA (Hons./ Hons. with Research) Business Analytics": 2.5,
        "BBA FinTech (Hons./ Hons. with Research)": 3.0,
        "B Tech Computer Science and Engineering": 2.0,
        "B Tech Artificial Intelligence & Data Science": 2.0,
        "B Tech Data Science": 2.0
      },
      "Creativity/innovation": {
        "BFA Applied Art": 3.0,
        "B. Des. Industrial Design": 3.0,
        "B. Des. Visual Communication": 3.0,
        "B.A. (Hons.) Film Direction": 3.0,
        "BPA in Theatre": 2.5,
        "BFA Contemporary Art": 2.5
      },
      "Social impact": {
        "BSW Social Work": 3.0,
        "B.Sc (Hons.) Environmental Science": 3.0,
        "Bachelor of Law (LL.B.)": 3.0,
        "B.A. (Hons.) Psychology": 2.5,
        "B.A International Journalism & Electronic Media": 2.5
      },
      "Job stability": {
        "B Tech Civil Engineering": 3.0,
        "Bachelor of Pharmacy": 3.0,
        "B.Sc (Hons.) Food Technology & Processing": 3.0,
        "B Tech Chemical Engineering": 2.5,
        "B Tech Mechanical Engineering": 2.5
      },
      "Leadership opportunities": {
        "BBA (Hons./ Hons. with Research) Business Analytics": 3.0,
        "BMS (Entrepreneurship, Family Business and Innovation)": 3.0,
        "B Tech Mechanical Engineering": 2.5,
        "B Tech Electrical and computer Engineering": 2.5,
        "B Tech Computer Science and Engineering": 2.0
      }
    },
    "You're tasked with improving a city's sustainability. Which project would you lead? (single-select)":{
      "Designing AI-powered waste management systems": {
        "B Tech Computer Science and Engineering": 7,
        "B Tech Artificial Intelligence & Data Science": 7,
        "B Tech Data Science": 7,
        "B.Sc (Hons.) Environmental Science": 6,
        "B Tech Chemical Engineering": 5,
        "B Tech Civil Engineering": 5,
        "B Tech Electrical and computer Engineering": 5
      },
      "Creating campaigns to reduce plastic usage": {
        "BSW Social Work": 7,
        "B.Sc (Hons.) Environmental Science": 7,
        "B.A International Journalism & Electronic Media": 6,
        "B.A (Hons./Reg. with Research) Mass Communication and Media": 5,
        "B.A. (Hons.) Psychology": 5
      },
      "Developing renewable energy solutions": {
        "B Tech Agriculture Engineering": 7,
        "B Tech Mechanical Engineering": 7,
        "B.Sc (Hons.) Physics": 6,
        "B Tech Electrical and computer Engineering": 6,
        "B Tech Chemical Engineering": 5,
        "B Tech Civil Engineering": 5
      },
      "Building eco-friendly architectural models": {
        "Bachelor of Architecture": 8,
        "B. Des. Interior Design": 7,
        "B Tech Civil Engineering": 6,
        "B Tech Mechanical Engineering": 5,
        "BFA Applied Art": 5
      }
    },
    "A company wants to launch a new product. What role would you choose? (single-select)":{
       "Market research & data analysis":{
          "BBA (Hons./ Hons. with Research) Business Analytics": 8,
          "BBA FinTech (Hons./ Hons. with Research)": 7,
          "B Tech Data Science": 7,
          "B.A. (Hons.) Economics": 6,
          "B.Com (Hons./ Hons. with Research)": 5,
          "BMS (Entrepreneurship, Family Business and Innovation)": 5
       },
       "Product design & prototyping":{
          "BFA Applied Art": 7,
          "B. Des. Industrial Design": 7,
          "B Tech Mechanical Engineering": 6,
          "B. Des. Visual Communication": 5,
          "B. Des. Interior Design": 5,
          "B. Des. Fashion Design": 5
       },
       "Legal compliance & patent filing":{
           "Bachelor of Law (LL.B.)": 8,
           "BBA FinTech (Hons./ Hons. with Research)": 7,
           "B Tech Computer Science and Engineering": 6,
           "B.Tech. Biomedical Engineering": 6,
           "B Tech Chemical Engineering": 5
       },
       "Digital marketing campaigns":{
           "B. Des. Visual Communication": 7,
           "BBA (Hons./ Hons. with Research) Business Analytics": 6,
           "B.A International Journalism & Electronic Media": 6,
           "B.A (Hons./Reg. with Research) Mass Communication and Media": 5
       }
    },
    "How do you approach problems? (single-select)":{
       "Analyze data and find logical solutions":{
           "B Tech Computer Science and Engineering": 7,
           "B Tech Artificial Intelligence & Data Science": 7,
           "B Tech Data Science": 7,
           "BBA (Hons./ Hons. with Research) Business Analytics": 6,
           "B Tech Electrical and computer Engineering": 5,
           "B Tech Mechanical Engineering": 5,
           "B.Sc (Hons.) Mathematics": 5
       },
       "Brainstorm creative ideas with a team":{
          "BFA Applied Art": 7,
          "B. Des. Industrial Design": 7,
          "B. Des. Visual Communication": 7,
          "B.A. (Hons.) Film Direction": 6,
          "BPA in Theatre": 6,
          "BFA Contemporary Art": 6,
          "B.A International Journalism & Electronic Media": 5
       },
        "Follow structured plans/guidelines":{
           "B Tech Civil Engineering": 7,
           "B Tech Chemical Engineering": 6,
           "B.Tech. Biomedical Engineering": 6,
           "Bachelor of Pharmacy": 6,
           "B.Sc (Hons.) Chemistry": 5,
           "B Tech Electrical and Instrumentation Engineering": 5
       },
       "Advocate for ethical/social considerations":{
            "Bachelor of Law (LL.B.)": 7,
            "BSW Social Work": 7,
            "B.A. (Hons.) Psychology": 6,
            "B.A International Journalism & Electronic Media": 5,
            "B.A (Hons./Reg. with Research) Mass Communication and Media": 5
       }
    },
   "Rate your comfort with these tasks (1 = Uncomfortable, 5 = Comfortable)":{
        "Public speaking/presentations": {
             "B.A International Journalism & Electronic Media": 2.0,
             "BBA (Hons./ Hons. with Research) Business Analytics": 1.8,
             "BPA in Theatre": 1.5,
             "Bachelor of Law (LL.B.)": 1.2,
             "BMS (Entrepreneurship, Family Business and Innovation)": 1.0
         },
         "Writing code for 6+ hours":{
              "B Tech Computer Science and Engineering": 2.0,
              "B Tech (AI & ML)": 1.8,
              "B Tech Data Science": 1.8,
              "B Sc. (Hons.) Computer Science": 1.5,
              "B Sc. (Hons.) Information technology": 1.5,
              "B Tech Computer Science & Engineering (IoT, Cyber Security)": 1.5,
              "B Tech Artificial Intelligence & Data Science": 1.8,
              "BCA (Cloud Technology & Information Security)": 1.5,
              "MCA (Digital Product Technology)": 1.5,
              "MCA (Artificial Intelligence - Data Science)": 1.8,
              "B Tech Robotics and Automation": 1.5,
              "B Tech (Computer Science and Design)": 1.5,
              "B Tech (Integrated) Computer Science and Engineering (Data Science)": 1.5,
              "B Tech (Integrated) Computer Science and Engineering (IoT)": 1.5,
              "B Tech Robotics and Artificial Intelligence": 1.8,
              "B Tech Electrical and computer Engineering": 1.5,
              "B Tech Electronics and Computer Engineering": 1.5
         },
         "Editing videos/animations":{
              "B.A. (Hons.) VFX and Animation": 2.0,
              "B. Des. Visual Communication": 1.8,
              "BFA Contemporary Art": 1.5,
              "B.A. (Hons.) Film Direction": 1.5,
              "B.A. (Hons.) Film Editing": 1.5,
              "B.A. (Hons.) Sound Designing & Music Production": 1.2,
              "B. Sc. (Hons.) Animation": 1.5
          },
          "Handling financial calculations":{
               "BBA (Hons./ Hons. with Research) Business Analytics": 2.0,
               "BBA FinTech (Hons./ Hons. with Research)": 1.8,
               "B Tech Data Science": 1.5,
               "B.Com (Hons./ Hons. with Research)": 1.5,
               "B.A. (Hons.) Economics": 1.2,
               "BMS (Entrepreneurship, Family Business and Innovation)": 1.2
           }
   },
   "Which of these appeal to you? (multiple-select)":{
         "Working with AI/robotics (e.g., building drones)":{
              "B Tech Robotics and Automation": 7,
              "B Sc. (Hons.) Robotics": 6,
              "B Tech Advanced Mechatronics": 6,
              "B Tech Computer Science and Engineering": 5,
              "B Tech Artificial Intelligence & Data Science": 6,
              "B Tech (AI & ML)": 5
         },
         "Developing mobile apps/software":{
              "B Tech Computer Science and Engineering": 7,
              "B Tech (AI & ML)": 6,
              "B Tech Data Science": 6,
              "B Sc. (Hons.) Computer Science": 6,
              "B Sc. (Hons.) Information technology": 5,
              "B Tech Computer Science & Engineering (IoT, Cyber Security)": 6,
              "B Tech Artificial Intelligence & Data Science": 6,
              "BCA (Cloud Technology & Information Security)": 5
         },
         "Studying human behavior/psychology":{
             "B.A. (Hons.) Psychology": 7,
             "BSW Social Work": 6,
             "B.A. (Hons.) Economics": 5,
             "B.A International Journalism & Electronic Media": 4,
             "B.A (Hons./Reg. with Research) Mass Communication and Media": 4
         },
         "Designing fashion/interiors":{
              "B. Des. Fashion Design": 7,
              "B. Des. Interior Design": 6,
              "B. Des. Textile Design": 5,
              "BFA Applied Art": 4,
              "B. Des. Industrial Design": 4
          },
         "Researching diseases/drugs":{
              "B.Tech. Biomedical Engineering": 7,
              "Bachelor of Pharmacy": 6,
              "B.Sc (Hons.) Biotechnology": 5,
              "B.Sc (Hons.) Microbiology": 5,
              "B.Sc (Hons.) Zoology": 4,
              "B.Sc (Hons.) Forensic Science": 4
         },
         "Making short films/animations":{
              "B.A. (Hons.) VFX and Animation": 7,
              "B.A. (Hons.) Film Direction": 6,
              "B. Des. Visual Communication": 5,
              "B.A. (Hons.) Cinematography": 4,
              "B.A. (Hons.) Film Editing": 4,
              "B. Sc. (Hons.) Animation": 5
         },
         "Managing business startups":{
              "BMS (Entrepreneurship, Family Business and Innovation)": 7,
              "BBA (Hons./ Hons. with Research) Business Analytics": 6,
              "BBA FinTech (Hons./ Hons. with Research)": 5,
              "BBA (Hons./ Hons. with Research)": 4,
              "B.Com (Hons./ Hons. with Research)": 4,
              "B.A. (Hons.) Economics": 3
         },
         "Practicing law/rights advocacy":{
             "Bachelor of Law (LL.B.)": 7,
             "BSW Social Work": 6,
             "B.A. (Hons.) Psychology": 5,
             "B.A International Journalism & Electronic Media": 4,
             "B.A (Hons./Reg. with Research) Mass Communication and Media": 4
          }
     }
  };
};


// Calculate scores and build details (port of ct.py's calculate_scores)
const calculateScores = (
  responses: { [key: string]: any[] },
  rules: any
): { courseScores: { [course: string]: number }; courseDetails: { [course: string]: string[] } } => {
  const courseScores: { [course: string]: number } = {};
  const courseDetails: { [course: string]: string[] } = {};

  Object.entries(responses).forEach(([section, answers]) => {
    if (!(section in rules)) return;
    const sectionRules = rules[section];

    answers.forEach((answer) => {
      if (typeof answer === 'object' && !Array.isArray(answer)) {
        // Rating/Ranking questions
        Object.entries(answer).forEach(([item, value]) => {
          if (!(item in sectionRules)) return;
          const multiplier = section === "Career Factor Rankings" ? 6 - Number(value) : Number(value);
          Object.entries(sectionRules[item]).forEach(([course, weight]) => {
            const points = Number(weight) * multiplier;
            courseScores[course] = (courseScores[course] || 0) + points;
            courseDetails[course] = courseDetails[course] || [];
            courseDetails[course].push(`${section}: ${item} → +${points} (${weight} × ${multiplier})`);
          });
        });
      } else {
        // Single/Multi select questions (assumed to be a string)
        if (!(answer in sectionRules)) return;
        Object.entries(sectionRules[answer]).forEach(([course, weight]) => {
          courseScores[course] = (courseScores[course] || 0) + Number(weight);
          courseDetails[course] = courseDetails[course] || [];
          courseDetails[course].push(`${section}: ${answer} → +${weight}`);
        });
      }
    });
  });

  return { courseScores, courseDetails };
};

// Return sorted list of [course, score] tuples (port of ct.py's rank_courses)
const rankCourses = (courseScores: { [course: string]: number }): [string, number][] => {
  return Object.entries(courseScores).sort(([, a], [, b]) => b - a);
};

// ---------------------------------------------------------

export const ResultsPage = () => {
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { responses } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndProcessRecommendations = async () => {
      try {
        setLoading(true);
        // Fetch university courses JSON
        const coursesData = await fetch('/university-courses.json').then((res) => res.json());
        console.log(coursesData); // Debug to check if the JSON loads correctly


        // Build course-institute mapping (similar to ct.py)
        const courseInstituteMapping: { [course: string]: string } = {};
        coursesData.undergraduate_programs.forEach((program: any) => {
          const institute = program.institute_name;
          program.courses.forEach((course: string) => {
            courseInstituteMapping[course] = institute;
          });
        });

        // Use our rules and compute scores using user responses
        const rules = defineRules();
        const { courseScores, courseDetails } = calculateScores(responses, rules);
        const ranked = rankCourses(courseScores);

        const topRecommendations: CourseRecommendation[] = ranked.slice(0, 5).map(([course, score], index) => ({
          rank: index + 1,
          course,
          score,
          institute: courseInstituteMapping[course] || "Unknown Institute",
          details: courseDetails[course] || []
        }));

        setRecommendations(topRecommendations);
      } catch (err) {
        console.error('Error processing recommendations:', err);
        setError('Failed to load recommendations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (Object.keys(responses).length === 0) {
      navigate('/test');
    } else {
      fetchAndProcessRecommendations();
    }
  }, [responses, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F2ED] to-[#EED4C3] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#DDA683]" />
          <span className="text-lg text-[#2E3653]">Analyzing your responses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F2ED] to-[#EED4C3] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-[#FC8939] mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#FC8939] text-white rounded-lg hover:bg-[#DDA683]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const chartColors = [
    'rgba(252, 137, 57, 0.9)',  // FC8939 with opacity
    'rgba(221, 166, 131, 0.9)', // DDA683 with opacity
    'rgba(238, 212, 195, 0.9)', // EED4C3 with opacity
    'rgba(46, 54, 83, 0.9)',    // 2E3653 with opacity
    'rgba(248, 242, 237, 0.9)', // F8F2ED with opacity
  ];

  const chartData = {
    labels: recommendations.slice(0, 5).map((r) => r.course),
    datasets: [
      {
        label: 'Course Score',
        data: recommendations.slice(0, 5).map((r) => r.score),
        backgroundColor: chartColors,
        borderColor: 'transparent',
        borderWidth: 0,
        barThickness: 20,
        borderRadius: 5,
      }
    ]
  };

  const chartOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Top Course Recommendations',
        align: 'start' as const,
        font: {
          size: 18,
          weight: 'bold' as const,
          family: "'Poppins', sans-serif",
        },
        padding: {
          bottom: 20
        },
        color: '#2E3653'
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(46, 54, 83, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        boxPadding: 8,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 50,
        ticks: {
          stepSize: 10,
          color: '#2E3653',
          font: {
            family: "'Roboto', sans-serif",
          }
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#2E3653',
          font: {
            size: 12,
            family: "'Roboto', sans-serif",
          },
          padding: 10,
        },
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        right: 20,
        bottom: 10,
        left: 0
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F2ED] to-[#EED4C3] py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-[#2E3653] mb-8 text-center font-serif">
            Your Course Recommendations
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="h-full relative">
                <Bar data={chartData} options={chartOptions} height={300}/>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold text-[#2E3653]">
                      {recommendation.rank}. {recommendation.course}
                    </h2>
                    <span className="text-lg font-medium text-[#FC8939]">
                      Score: {recommendation.score.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-[#2E3653] mb-2 text-sm">
                    Offered by: <span className="font-medium">{recommendation.institute}</span>
                  </p>
                  <div className="border-t border-[#EED4C3] pt-3 mt-2">
                    <h3 className="font-medium text-[#2E3653] mb-2 text-md">Why this course?</h3>
                    <ul className="space-y-1">
                      {recommendation.details.map((detail, i) => (
                        <li key={i} className="text-[#2E3653] text-sm list-disc ml-5">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};