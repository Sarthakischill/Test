import { create } from 'zustand';
import { Question, UserResponse } from '../types';

interface Store {
  currentQuestionIndex: number;
  questions: Question[];
  responses: UserResponse;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  updateResponse: (section: string, response: any) => void;
}

export const useStore = create<Store>((set) => ({
  currentQuestionIndex: 0,
  questions: [],
  responses: {},
  setQuestions: (questions) => set({ questions }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  updateResponse: (section, response) => 
    set((state) => ({
      responses: {
        ...state.responses,
        [section]: Array.isArray(response) ? response : [response]
      }
    }))
}));