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

function QuizIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎯 Discover Your Ideal Career Path
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Take our comprehensive career assessment designed specifically for Nigerian students. 
          Get personalized course recommendations, admission likelihood, and salary expectations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <Brain className="w-8 h-8 mx-auto text-blue-600 mb-2" />
            <CardTitle className="text-lg">Smart Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              AI-powered branching quiz that adapts to your responses
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <Target className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <CardTitle className="text-lg">Personalized Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Tailored course and career recommendations based on your interests
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <School className="w-8 h-8 mx-auto text-purple-600 mb-2" />
            <CardTitle className="text-lg">Nigerian Context</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Aligned with JAMB, Nigerian universities, and local job market
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <TrendingUp className="w-8 h-8 mx-auto text-orange-600 mb-2" />
            <CardTitle className="text-lg">Admission Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Realistic admission chances and salary expectations
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-sm mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">What You'll Get:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-blue-600" />
                <span>Personalized course recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-600" />
                <span>Institution fit analysis (Federal/State/Private/Abroad)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-purple-600" />
                <span>Admission likelihood assessment</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-orange-600" />
                <span>Expected salary ranges</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-red-600" />
                <span>Career pathway guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-indigo-600" />
                <span>Skills development recommendations</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={onStart}
          size="lg"
          className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
        >
          Start Your Career Assessment
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="text-sm text-gray-500 mt-4">
          ⏱️ Takes about 5-7 minutes • 📊 ~12-15 questions via smart branching
        </p>
      </div>
    </div>
  );
}

function CareerGuideContent() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <QuizIntro onStart={() => setShowIntro(false)} />;
  }

  return <QuizContent />;
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
            <div className="relative h-10 w-10 mr-2">
              <Image
                src="/edumeai-logo.png"
                alt="EduMeAI Logo"
                fill
                className="object-contain"
              />
            </div>
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
        <nav className="mt-6 px-2">
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Dashboard</span>}
            </Link>
            <Link
              href="/dashboard/ai-tutoring"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Video className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">AI Tutoring</span>}
            </Link>
            <Link
              href="/dashboard/career-guide"
              className="flex items-center px-4 py-3 text-white bg-black rounded-lg transition-colors"
            >
              <GraduationCap className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Career Guide</span>}
            </Link>
            <Link
              href="/dashboard/exam-prep"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Exam Prep</span>}
            </Link>
            <Link
              href="/dashboard/skill-hub"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Target className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Skill Hub</span>}
            </Link>
            <Link
              href="/dashboard/rewards"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Award className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Rewards</span>}
            </Link>
            <Link
              href="/dashboard/resources"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Resources</span>}
            </Link>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link
              href="/dashboard/settings"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Settings</span>}
            </Link>
            <Link
              href="/logout"
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Logout</span>}
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"}`}>
        {/* Header is now in the layout */}

        {/* Main Content */}
        <main className="px-4 py-6 md:px-6">
          <QuizProvider>
            <CareerGuideContent />
          </QuizProvider>
        </main>
      </div>
    </div>
  )
}