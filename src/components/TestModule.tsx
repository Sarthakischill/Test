import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TestModule = () => {
  const { 
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    updateResponse
  } = useStore();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState<Record<number, any>>({});

  // Early return for loading state
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
          <span className="text-lg text-gray-700">Loading questions...</span>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Early return if no current question
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-lg text-gray-700">No questions available.</p>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (selectedOptions[currentQuestionIndex]) {
      updateResponse(currentQuestion.question, selectedOptions[currentQuestionIndex]);
      if (currentQuestionIndex === questions.length - 1) {
        navigate('/results');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                />
              </div>
              <p className="text-right text-sm text-gray-600 mt-2">
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
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
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
                              ? 'border-indigo-600 bg-indigo-50'
                              : 'border-gray-200 hover:border-indigo-300'
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
                        <div key={index} className="p-4 rounded-lg border-2 border-gray-200">
                          <p className="mb-2">{option.text}</p>
                          <div className="flex gap-2">
                            {Array.from({ length: option.max }, (_, i) => i + 1).map((value) => (
                              <button
                                key={value}
                                onClick={() => handleRating(option.text, value)}
                                className={`w-10 h-10 rounded-full ${
                                  rating === value
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
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
                className="flex items-center px-6 py-3 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedOptions[currentQuestionIndex]}
                className="flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
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