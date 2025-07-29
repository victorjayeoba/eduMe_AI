'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuizQuestion } from '@/lib/quiz-data';
import { useQuiz } from '@/contexts/quiz-context';
import { useState } from 'react';

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (optionCode: 'A' | 'B' | 'C' | 'D', optionText: string) => void;
}

export function QuestionCard({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer 
}: QuestionCardProps) {
  const { getTotalProgress } = useQuiz();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const progress = getTotalProgress();

  const handleOptionSelect = (code: 'A' | 'B' | 'C' | 'D', text: string) => {
    setSelectedOption(code);
    // Small delay for better UX
    setTimeout(() => {
      onAnswer(code, text);
      setSelectedOption(null);
    }, 300);
  };

  const getBranchColor = (batch: string) => {
    switch (batch) {
      case 'core': return 'bg-blue-50 border-blue-200';
      case 'tech': return 'bg-green-50 border-green-200';
      case 'business': return 'bg-purple-50 border-purple-200';
      case 'arts': return 'bg-pink-50 border-pink-200';
      case 'health': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getBadgeColor = (batch: string) => {
    switch (batch) {
      case 'core': return 'bg-blue-100 text-blue-800';
      case 'tech': return 'bg-green-100 text-green-800';
      case 'business': return 'bg-purple-100 text-purple-800';
      case 'arts': return 'bg-pink-100 text-pink-800';
      case 'health': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {questionNumber} of ~{totalQuestions}
          </span>
          <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className={`${getBranchColor(question.batch)} shadow-lg`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(question.batch)}`}>
              {question.batch === 'core' ? 'General' : 
               question.batch.charAt(0).toUpperCase() + question.batch.slice(1)} Questions
            </span>
            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
              {question.category.replace('_', ' ')}
            </span>
          </div>
          <CardTitle className="text-xl font-semibold text-gray-800 leading-tight">
            {question.text}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {question.options.map((option) => (
            <Button
              key={option.code}
              variant={selectedOption === option.code ? "default" : "outline"}
              className={`w-full p-4 h-auto text-left justify-start transition-all duration-200 ${
                selectedOption === option.code 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.02]' 
                  : 'bg-white hover:bg-gray-50 hover:border-gray-300 border-gray-200'
              }`}
              onClick={() => handleOptionSelect(option.code, option.text)}
              disabled={selectedOption !== null}
            >
              <div className="flex items-start space-x-3 w-full">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                  selectedOption === option.code 
                    ? 'bg-white text-blue-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {option.code}
                </span>
                <span className="flex-1 text-sm leading-relaxed">
                  {option.text}
                </span>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Helpful Tips */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          💡 Choose the option that best describes you. There are no wrong answers!
        </p>
      </div>
    </div>
  );
} 