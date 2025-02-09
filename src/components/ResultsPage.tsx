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