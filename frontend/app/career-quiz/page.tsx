// 'use client';

// import { useState, useEffect } from 'react';
// import { QuizProvider, useQuiz } from '@/contexts/quiz-context';
// import { QuestionCard } from '@/components/career-quiz/QuestionCard';
// import { ResultsPage } from '@/components/career-quiz/ResultsPage';
// import { quizQuestions } from '@/lib/quiz-data';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Brain, Target, School, TrendingUp } from 'lucide-react';

// function QuizContent() {
//   const { state, addAnswer, nextStep, calculateDominantInterest } = useQuiz();
//   const [currentQuestions, setCurrentQuestions] = useState(
//     quizQuestions.filter(q => q.batch === 'core')
//   );
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   useEffect(() => {
//     // Update questions based on current branch
//     if (state.currentBranch === 'core') {
//       setCurrentQuestions(quizQuestions.filter(q => q.batch === 'core'));
//     } else {
//       const branchQuestions = quizQuestions.filter(q => q.batch === state.currentBranch);
//       setCurrentQuestions(branchQuestions);
//       setCurrentQuestionIndex(0);
//     }
//   }, [state.currentBranch]);

//   const handleAnswer = (optionCode: 'A' | 'B' | 'C' | 'D', optionText: string) => {
//     const currentQuestion = currentQuestions[currentQuestionIndex];
    
//     addAnswer({
//       questionId: currentQuestion.id,
//       selectedOption: optionText,
//       optionCode
//     });

//     // Check if we finished core questions
//     if (state.currentBranch === 'core' && currentQuestionIndex >= currentQuestions.length - 1) {
//       calculateDominantInterest();
//       return;
//     }

//     // Move to next question or complete branch
//     if (currentQuestionIndex < currentQuestions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     } else {
//       // Branch completed - should show results
//       // For now, we'll show results after each branch
//       nextStep();
//     }
//   };

//   // Show results if we have enough answers
//   if (state.answers.length >= 12) {
//     return <ResultsPage />;
//   }

//   const currentQuestion = currentQuestions[currentQuestionIndex];
  
//   if (!currentQuestion) {
//     return <div>Loading next questions...</div>;
//   }

//   return (
//     <QuestionCard
//       question={currentQuestion}
//       questionNumber={state.answers.length + 1}
//       totalQuestions={15}
//       onAnswer={handleAnswer}
//     />
//   );
// }

// function QuizIntro({ onStart }: { onStart: () => void }) {
//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">
//           🎯 Nigerian Career Guidance Quiz
//         </h1>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           Discover your ideal career path with our comprehensive assessment designed 
//           specifically for Nigerian students. Get personalized course recommendations, 
//           admission likelihood, and salary expectations.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <Card className="text-center">
//           <CardHeader className="pb-3">
//             <Brain className="w-8 h-8 mx-auto text-blue-600 mb-2" />
//             <CardTitle className="text-lg">Smart Assessment</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-gray-600">
//               AI-powered branching quiz that adapts to your responses
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="text-center">
//           <CardHeader className="pb-3">
//             <Target className="w-8 h-8 mx-auto text-green-600 mb-2" />
//             <CardTitle className="text-lg">Personalized Results</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-gray-600">
//               Tailored course and career recommendations based on your interests
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="text-center">
//           <CardHeader className="pb-3">
//             <School className="w-8 h-8 mx-auto text-purple-600 mb-2" />
//             <CardTitle className="text-lg">Nigerian Context</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-gray-600">
//               Aligned with JAMB, Nigerian universities, and local job market
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="text-center">
//           <CardHeader className="pb-3">
//             <TrendingUp className="w-8 h-8 mx-auto text-orange-600 mb-2" />
//             <CardTitle className="text-lg">Admission Insights</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-gray-600">
//               Realistic admission chances and salary expectations
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
//         <CardContent className="p-6">
//           <h3 className="text-lg font-semibold mb-4">What You'll Get:</h3>
//           <div className="grid md:grid-cols-2 gap-4 text-sm">
//             <div className="space-y-2">
//               <div className="flex items-center space-x-2">
//                 <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
//                 <span>Personalized course recommendations</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className="w-2 h-2 bg-green-600 rounded-full"></span>
//                 <span>Institution fit analysis (Federal/State/Private/Abroad)</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
//                 <span>Admission likelihood assessment</span>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="flex items-center space-x-2">
//                 <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
//                 <span>Expected salary ranges</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className="w-2 h-2 bg-red-600 rounded-full"></span>
//                 <span>Career pathway guidance</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
//                 <span>Skills development recommendations</span>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="text-center mt-8">
//         <Button 
//           onClick={onStart}
//           size="lg"
//           className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//         >
//           Start Your Career Assessment
//         </Button>
//         <p className="text-sm text-gray-500 mt-4">
//           ⏱️ Takes about 5-7 minutes • 📊 ~12-15 questions via smart branching
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function CareerQuizPage() {
//   const [showIntro, setShowIntro] = useState(true);

//   if (showIntro) {
//     return <QuizIntro onStart={() => setShowIntro(false)} />;
//   }

//   return (
//     <QuizProvider>
//       <div className="min-h-screen bg-gray-50 py-8">
//         <QuizContent />
//       </div>
//     </QuizProvider>
//   );
// } 