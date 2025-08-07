"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Home,
  Video,
  BookOpen,
  GraduationCap,
  Target,
  Award,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Brain,
  TrendingUp,
  School,
  BarChart3,
  Search,
  ArrowRight,
  Check,
  ChevronDown,
  Trophy,
  Crown,
  Medal,
  User,
  MessageSquare,
  Send,
} from "lucide-react"
import { QuizProvider, useQuiz } from '@/contexts/quiz-context'
import { QuestionCard } from '@/components/career-quiz/QuestionCard'
import { ResultsPage } from '@/components/career-quiz/ResultsPage'
import { quizQuestions } from '@/lib/quiz-data'
import { Input } from "@/components/ui/input"

function QuizContent() {
  const { state, addAnswer, nextStep, calculateDominantInterest } = useQuiz();
  const [currentQuestions, setCurrentQuestions] = useState(
    quizQuestions.filter(q => q.batch === 'core')
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Update questions based on current branch
    if (state.currentBranch === 'core') {
      setCurrentQuestions(quizQuestions.filter(q => q.batch === 'core'));
    } else {
      const branchQuestions = quizQuestions.filter(q => q.batch === state.currentBranch);
      setCurrentQuestions(branchQuestions);
      setCurrentQuestionIndex(0);
    }
  }, [state.currentBranch]);

  const handleAnswer = (optionCode: 'A' | 'B' | 'C' | 'D', optionText: string) => {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    
    addAnswer({
      questionId: currentQuestion.id,
      selectedOption: optionText,
      optionCode
    });

    // Check if we finished core questions
    if (state.currentBranch === 'core' && currentQuestionIndex >= currentQuestions.length - 1) {
      calculateDominantInterest();
      return;
    }

    // Move to next question or complete branch
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Branch completed - should show results
      nextStep();
    }
  };

  // Show results if we have enough answers
  if (state.answers.length >= 12) {
    return <ResultsPage />;
  }

  const currentQuestion = currentQuestions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading next questions...</p>
        </div>
      </div>
    );
  }

  return (
    <QuestionCard
      question={currentQuestion}
      questionNumber={state.answers.length + 1}
      totalQuestions={15}
      onAnswer={handleAnswer}
    />
  );
}

function CareerGuideContent() {
  const [showIntro, setShowIntro] = useState(true);
  const { state } = useQuiz();

  if (showIntro) {
    return (
      <div className="flex h-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        {/* Caller Avatar Section */}
        <div className="w-2/5 flex flex-col items-center justify-center p-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm"></div>
          <div className="relative flex flex-col items-center justify-center text-center">
            <div className="w-40 h-40 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mb-8 shadow-2xl ring-4 ring-white/10">
              <User className="w-20 h-20 text-gray-300 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Career Advisor</h3>
            <p className="text-gray-300 text-base leading-relaxed max-w-xs">Ready to help you discover your ideal career path</p>
            <div className="mt-6 flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Online</span>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="w-3/5 bg-white/95 backdrop-blur-sm flex flex-col rounded-l-3xl shadow-2xl">
          {/* Chat Header */}
          <div className="border-b border-gray-200/50 p-8 bg-white/50 backdrop-blur-sm rounded-tl-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Career Assessment</h2>
            <p className="text-gray-600 text-lg">Let's find your perfect career match</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-gray-50/30 to-white/50">
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-md p-5 max-w-lg shadow-lg border border-gray-200/50">
                  <p className="text-gray-800 leading-relaxed">Hi! I'm here to help you discover your ideal career path. This assessment will take about <span className="font-semibold text-blue-600">5-7 minutes</span> and includes <span className="font-semibold text-blue-600">12-15 questions</span>.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-md p-5 max-w-lg shadow-lg border border-gray-200/50">
                  <p className="text-gray-800 leading-relaxed">I'll ask you questions about your <span className="font-semibold text-purple-600">interests</span>, <span className="font-semibold text-green-600">skills</span>, and <span className="font-semibold text-orange-600">preferences</span> to provide personalized recommendations.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="p-8 bg-white/50 backdrop-blur-sm border-t border-gray-200/50">
            <Button 
              onClick={() => setShowIntro(false)}
              size="lg"
              className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] font-semibold text-lg"
            >
              Start Assessment
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <p className="text-center text-gray-500 text-sm mt-4">
              ✨ Powered by AI • 🔒 Your data is secure
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Caller Avatar Section */}
      <div className="w-1/3 bg-gray-900 flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mb-6">
            <User className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Career Advisor</h3>
          <p className="text-gray-400 text-sm">Question {state?.answers?.length + 1 || 1} of 15</p>
        </div>
      </div>

      {/* Questionnaire Interface */}
      <div className="w-2/3 bg-white flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto">
          <QuizContent />
        </div>
      </div>
    </div>
  );
}

export default function CareerGuide() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="bg-white"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isSidebarCollapsed ? "md:w-20" : "md:w-64"}`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link href="/" className={`flex items-center ${isSidebarCollapsed ? "justify-center" : ""}`}>
            
            {!isSidebarCollapsed && (
              <div className="flex items-center">
                <span className="text-lg font-bold text-black">EduMe</span>
                <span className="text-lg font-bold text-black bg-black/10 px-1 py-0.5 rounded-md border border-black/20 ml-1">
                  AI
                </span>
              </div>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isSidebarCollapsed ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto px-2 py-4">
          {/* MAIN Section */}
          <div className="mb-4">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">MAIN</h3>
            )}
            <div className="space-y-0.5">
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Dashboard</span>}
              </Link>
              <Link
                href="/dashboard/ai-tutoring"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Video className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">AI Tutoring</span>}
              </Link>
              <Link
                href="/dashboard/career-guide"
                className="flex items-center px-4 py-2.5 text-white bg-black rounded-lg transition-colors"
              >
                <GraduationCap className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Career Guide</span>}
              </Link>
              
            </div>
          </div>

          {/* LEARNING Section */}
          <div className="mb-4">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">LEARNING</h3>
            )}
            <div className="space-y-0.5">
              <Link
                href="/dashboard/skill-hub"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Target className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Skill Hub</span>}
              </Link>
              <Link
                href="/dashboard/contests"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Trophy className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Contests</span>}
              </Link>
              {/* <Link
                href="/dashboard/resources"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Resources</span>}
              </Link> */}
            </div>
          </div>

          {/* ENGAGEMENT Section */}
          <div className="mb-4">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">ENGAGEMENT</h3>
            )}
            <div className="space-y-0.5">
              <Link
                href="/dashboard/leaderboard"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Trophy className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Leaderboard</span>}
              </Link>
              <Link
                href="/dashboard/rewards"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Award className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Rewards</span>}
              </Link>
            </div>
          </div>

          {/* SETTINGS Section */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">SETTINGS</h3>
            )}
            <div className="space-y-0.5">
              <Link
                href="/dashboard/settings"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Settings</span>}
              </Link>
              <Link
                href="/logout"
                className="flex items-center px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Logout</span>}
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"}`}>
        {/* Header with Feature Cards */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex space-x-4">
            <div className="flex items-center px-3 py-2 rounded-lg border border-gray-200 bg-blue-50 hover:bg-blue-100 transition-all duration-300 hover:shadow-md cursor-pointer">
              <Brain className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium">Smart</span>
            </div>
            <div className="flex items-center px-3 py-2 rounded-lg border border-gray-200 bg-green-50 hover:bg-green-100 transition-all duration-300 hover:shadow-md cursor-pointer">
              <Target className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm font-medium">Personalized</span>
            </div>
            <div className="flex items-center px-3 py-2 rounded-lg border border-gray-200 bg-purple-50 hover:bg-purple-100 transition-all duration-300 hover:shadow-md cursor-pointer">
              <School className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium">Local</span>
            </div>
            <div className="flex items-center px-3 py-2 rounded-lg border border-gray-200 bg-orange-50 hover:bg-orange-100 transition-all duration-300 hover:shadow-md cursor-pointer">
              <TrendingUp className="w-4 h-4 text-orange-600 mr-2" />
              <span className="text-sm font-medium">Insights</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="h-[calc(100vh-8rem)]">
          <QuizProvider>
            <CareerGuideContent />
          </QuizProvider>
        </main>
      </div>
    </div>
  )
}