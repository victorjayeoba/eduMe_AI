'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface QuizAnswer {
  questionId: string;
  selectedOption: string;
  optionCode: 'A' | 'B' | 'C' | 'D';
}

interface QuizState {
  answers: QuizAnswer[];
  currentStep: number;
  currentBranch: 'core' | 'tech' | 'business' | 'arts' | 'health' | 'final';
  isComplete: boolean;
  dominantInterest: 'A' | 'B' | 'C' | 'D' | null;
}

interface QuizContextType {
  state: QuizState;
  addAnswer: (answer: QuizAnswer) => void;
  nextStep: () => void;
  calculateDominantInterest: () => void;
  resetQuiz: () => void;
  getTotalProgress: () => number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<QuizState>({
    answers: [],
    currentStep: 1,
    currentBranch: 'core',
    isComplete: false,
    dominantInterest: null,
  });

  const addAnswer = (answer: QuizAnswer) => {
    setState(prev => ({
      ...prev,
      answers: [...prev.answers.filter(a => a.questionId !== answer.questionId), answer]
    }));
  };

  const nextStep = () => {
    setState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }));
  };

  const calculateDominantInterest = () => {
    const coreAnswers = state.answers.filter(a => a.questionId.startsWith('core'));
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    
    coreAnswers.forEach(answer => {
      counts[answer.optionCode]++;
    });

    const dominant = Object.entries(counts).reduce((a, b) => 
      counts[a[0] as keyof typeof counts] > counts[b[0] as keyof typeof counts] ? a : b
    )[0] as 'A' | 'B' | 'C' | 'D';

    const newBranch = dominant === 'A' ? 'arts' : 
                     dominant === 'B' ? 'tech' : 
                     dominant === 'C' ? 'business' : 'health';

    setState(prev => ({
      ...prev,
      dominantInterest: dominant,
      currentBranch: newBranch
    }));
  };

  const resetQuiz = () => {
    setState({
      answers: [],
      currentStep: 1,
      currentBranch: 'core',
      isComplete: false,
      dominantInterest: null,
    });
  };

  const getTotalProgress = () => {
    const totalQuestions = 15; // Max questions through branching
    return Math.min((state.answers.length / totalQuestions) * 100, 100);
  };

  return (
    <QuizContext.Provider value={{
      state,
      addAnswer,
      nextStep,
      calculateDominantInterest,
      resetQuiz,
      getTotalProgress
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
} 