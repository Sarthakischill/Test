import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { saveResponse } from '../services/storageService';

export const TestModule = () => {
  const { 
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    responses,
    userInfo,
    updateResponse
  } = useStore();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState<Record<number, any>>({});

  const questionCategoryMapping: { [index: number]: string } = {
    0: "Academic Strengths",
    1: "Confidence Tasks",
    2: "Interests & Passions",
    3: "Interest Ratings",
    4: "Career Goals",
    5: "Career Factor Rankings",
    6: "Scenario-Based Q7",
    7: "Scenario-Based Q8",
    8: "Skills & Personality",
    9: "Skills & Personality",
    10: "Program-Specific Preferences"
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F2ED] to-[#EED4C3] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#DDA683]" />
          <span className="text-lg text-[#2E3653]">Loading questions...</span>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F2ED] to-[#EED4C3] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-lg text-[#2E3653]">No questions available.</p>
        </div>
      </div>
    );
  }

  // Modified section of TestModule.tsx - replace the handleNext function
const handleNext = async () => {
  if (selectedOptions[currentQuestionIndex]) {
    const category = questionCategoryMapping[currentQuestionIndex] || currentQuestion.question;
    updateResponse(category, selectedOptions[currentQuestionIndex]);
    
    if (currentQuestionIndex === questions.length - 1) {
      try {
        console.log('Saving final responses:', {
          ...userInfo,
          responses
        });
        
        await saveResponse({
          ...userInfo,
          responses
        });
        
        console.log('Responses saved successfully');
        navigate('/results');
      } catch (error) {
        console.error('Failed to save responses:', error);
        // You might want to show an error message to the user here
        alert('Failed to save your responses. Please try again.');
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }
};

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSelect = (option: string | number) => {
    if (currentQuestion.type === 'multiple-select') {
      const current = selectedOptions[currentQuestionIndex] || [];
      const updated = current.includes(option)
        ? current.filter((o: string) => o !== option)
        : [...current, option];
      setSelectedOptions({ ...selectedOptions, [currentQuestionIndex]: updated });
    } else {
      setSelectedOptions({ ...selectedOptions, [currentQuestionIndex]: [option] });
    }
  };

  const handleRating = (option: string, rating: number) => {
    const current = selectedOptions[currentQuestionIndex] || [];
    const updated = current.filter((o: any) => 
      typeof o === 'object' && Object.keys(o)[0] !== option
    );
    updated.push({ [option]: rating });
    setSelectedOptions({ ...selectedOptions, [currentQuestionIndex]: updated });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F2ED] to-[#EED4C3] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <div className="w-full bg-[#EED4C3] rounded-full h-2">
                <div
                  className="bg-[#FC8939] h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                />
              </div>
              <p className="text-right text-sm text-[#2E3653] mt-2">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold text-[#2E3653] mb-6">
                  {currentQuestion.question}
                </h2>

                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => {
                    if (typeof option === 'string') {
                      const isSelected = selectedOptions[currentQuestionIndex]?.includes(option);
                      return (
                        <button
                          key={index}
                          onClick={() => handleSelect(option)}
                          className={`w-full p-4 rounded-lg border-2 transition-all ${
                            isSelected
                              ? 'border-[#FC8939] bg-[#F8F2ED]'
                              : 'border-[#EED4C3] hover:border-[#DDA683]'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    } else {
                      const rating = selectedOptions[currentQuestionIndex]?.find(
                        (o: any) => o[option.text]
                      )?.[option.text];
                      return (
                        <div key={index} className="p-4 rounded-lg border-2 border-[#EED4C3]">
                          <p className="mb-2">{option.text}</p>
                          <div className="flex gap-2">
                            {Array.from({ length: option.max }, (_, i) => i + 1).map((value) => (
                              <button
                                key={value}
                                onClick={() => handleRating(option.text, value)}
                                className={`w-10 h-10 rounded-full ${
                                  rating === value
                                    ? 'bg-[#FC8939] text-white'
                                    : 'bg-[#F8F2ED] hover:bg-[#EED4C3]'
                                }`}
                              >
                                {value}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="flex items-center px-6 py-3 rounded-lg bg-[#F8F2ED] text-[#2E3653] disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedOptions[currentQuestionIndex]}
                className="flex items-center px-6 py-3 rounded-lg bg-[#FC8939] text-white disabled:opacity-50"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};