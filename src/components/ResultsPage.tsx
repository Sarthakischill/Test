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

export const ResultsPage = () => {
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { responses } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        // Simulating API call with the course recommendation logic
        const result = await fetch('/university-courses.json')
          .then(res => res.json())
          .then(data => {
            // Simple mock recommendation logic
            const courses = data.undergraduate_programs.flatMap((program: any) => 
              program.courses.map((course: string) => ({
                course,
                institute: program.institute_name
              }))
            );
            
            // Randomly select 10 courses and assign mock scores
            const selectedCourses = courses
              .sort(() => Math.random() - 0.5)
              .slice(0, 10)
              .map((course: any, index: number) => ({
                rank: index + 1,
                course: course.course,
                score: Math.round((100 - index * 5) * 10) / 10,
                institute: course.institute,
                details: [
                  "Based on your academic strengths",
                  "Matches your career goals",
                  "Aligns with your interests"
                ]
              }));
            
            return selectedCourses;
          });
        
        setRecommendations(result);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError('Failed to load recommendations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (Object.keys(responses).length === 0) {
      navigate('/test');
    } else {
      fetchRecommendations();
    }
  }, [responses, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
          <span className="text-lg text-gray-700">Analyzing your responses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: recommendations.slice(0, 5).map(r => r.course),
    datasets: [
      {
        label: 'Course Score',
        data: recommendations.slice(0, 5).map(r => r.score),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Top Course Recommendations'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Your Course Recommendations
          </h1>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <Bar data={chartData} options={chartOptions} />
          </div>

          <div className="space-y-6">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {index + 1}. {recommendation.course}
                  </h2>
                  <span className="text-lg font-medium text-indigo-600">
                    Score: {recommendation.score}%
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Offered by: {recommendation.institute}
                </p>
                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Why this course?</h3>
                  <ul className="space-y-2">
                    {recommendation.details.map((detail, i) => (
                      <li key={i} className="text-gray-600 text-sm">
                        • {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};