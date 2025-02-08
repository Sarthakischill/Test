import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <GraduationCap className="w-16 h-16 mx-auto text-indigo-600 mb-8" />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect Course
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Answer a few questions about your interests, skills, and aspirations to get personalized course recommendations that match your profile.
          </p>
          <Link
            to="/test"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Start Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Personalized Results",
              description: "Get course recommendations tailored to your unique profile and preferences"
            },
            {
              title: "Comprehensive Analysis",
              description: "Consider multiple factors including academic strengths, interests, and career goals"
            },
            {
              title: "Detailed Insights",
              description: "Understand why each course is recommended with detailed scoring breakdowns"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};