// Modified store/useStore.ts
import { create } from 'zustand';
import { Question, UserResponse } from '../types';

interface Store {
  currentQuestionIndex: number;
  questions: Question[];
  responses: UserResponse;
  userInfo: {
    name: string;
    designation: string;
  };
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  updateResponse: (section: string, response: any) => void;
  setUserInfo: (info: { name: string; designation: string }) => void;
}

export const useStore = create<Store>((set) => ({
  currentQuestionIndex: 0,
  questions: [],
  responses: {},
  userInfo: {
    name: '',
    designation: ''
  },
  setQuestions: (questions) => set({ questions }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  updateResponse: (section, response) =>
    set((state) => ({
      responses: {
        ...state.responses,
        [section]: [
          ...(state.responses[section] || []),
          ...(Array.isArray(response) ? response : [response])
        ]
      }
    })),
  setUserInfo: (info) => set({ userInfo: info })
}));