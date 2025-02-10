import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User, Briefcase, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const setUserInfo = useStore((state) => state.setUserInfo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setUserInfo({
      name: formData.name,
      designation: formData.designation
    });
    
    setShowModal(true);
    
    setTimeout(() => {
      navigate('/test');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F2ED] flex flex-col items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-serif font-bold text-[#2E3653] mb-6 text-center">
              Enter your information
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-[#2E3653]">
                  Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#DDA683] w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-[#EED4C3] rounded-lg focus:border-[#FC8939] focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="designation" className="block text-sm font-medium text-[#2E3653]">
                  Designation *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#DDA683] w-5 h-5" />
                  <input
                    type="text"
                    id="designation"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-[#EED4C3] rounded-lg focus:border-[#FC8939] focus:outline-none transition-colors"
                    placeholder="Enter your designation"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-[#FC8939] text-white rounded-lg text-lg font-medium hover:bg-[#DDA683] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    Continue to Assessment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Notification Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full"
            >
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-[#FC8939]" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#2E3653] text-center mb-2">
                Thank you!
              </h3>
              <p className="text-center text-[#2E3653]">
                You will now be redirected to the assessment.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserForm;