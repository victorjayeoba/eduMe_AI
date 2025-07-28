"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
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
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Calendar,
  Timer,
  BarChart3,
  Menu,
  X,
  FileText,
  PenTool,
  ListChecks,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ExamPrep() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("jamb")
  const [searchQuery, setSearchQuery] = useState("")
  
  const examTypes = [
    { id: "jamb", name: "JAMB", icon: <FileText className="h-5 w-5" /> },
    { id: "waec", name: "WAEC", icon: <BookOpen className="h-5 w-5" /> },
    { id: "ielts", name: "IELTS", icon: <PenTool className="h-5 w-5" /> },
    { id: "toefl", name: "TOEFL", icon: <ListChecks className="h-5 w-5" /> },
  ]
  
  const mockExams = [
    {
      id: 1,
      title: "JAMB Practice Test 1",
      subject: "Mathematics",
      questions: 40,
      timeLimit: "45 minutes",
      difficulty: "Medium",
      completed: true,
      score: 85,
    },
    {
      id: 2,
      title: "JAMB Practice Test 2",
      subject: "English Language",
      questions: 60,
      timeLimit: "60 minutes",
      difficulty: "Hard",
      completed: true,
      score: 72,
    },
    {
      id: 3,
      title: "JAMB Practice Test 3",
      subject: "Physics",
      questions: 40,
      timeLimit: "45 minutes",
      difficulty: "Medium",
      completed: false,
      score: null,
    },
    {
      id: 4,
      title: "JAMB Practice Test 4",
      subject: "Chemistry",
      questions: 40,
      timeLimit: "45 minutes",
      difficulty: "Easy",
      completed: false,
      score: null,
    },
  ]
  
  const studyMaterials = [
    {
      id: 1,
      title: "Mathematics: Algebra Review",
      type: "PDF",
      pages: 24,
      progress: 75,
    },
    {
      id: 2,
      title: "English: Comprehension Skills",
      type: "Video",
      duration: "32 minutes",
      progress: 50,
    },
    {
      id: 3,
      title: "Physics: Mechanics Fundamentals",
      type: "PDF",
      pages: 36,
      progress: 20,
    },
    {
      id: 4,
      title: "Chemistry: Periodic Table",
      type: "Interactive",
      modules: 5,
      progress: 0,
    },
  ]
  
  const filteredExams = mockExams.filter(exam => 
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    exam.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <GraduationCap className="h-5 w-5" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Career Guide</span>}
            </Link>
            <Link
              href="/dashboard/exam-prep"
              className="flex items-center px-4 py-3 text-white bg-black rounded-lg transition-colors"
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
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <h1 className="text-xl font-bold text-gray-900 ml-10 md:ml-0">Exam Preparation</h1>
            <div className="flex items-center space-x-4">
              {/* Streak Indicator */}
              <div className="hidden md:flex items-center bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
                <Award className="h-4 w-4 text-amber-500 mr-2" />
                <span className="text-sm font-medium text-amber-700">7 Day Streak</span>
                <div className="flex space-x-1 ml-2">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="font-medium text-sm">JD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-6 md:px-6">
          {/* Exam Type Tabs */}
          <div className="mb-6">
            <div className="flex overflow-x-auto pb-2 space-x-2">
              {examTypes.map((examType) => (
                <Button
                  key={examType.id}
                  variant={activeTab === examType.id ? "default" : "outline"}
                  className={`flex items-center ${activeTab === examType.id ? "bg-black text-white" : ""}`}
                  onClick={() => setActiveTab(examType.id)}
                >
                  <span className="mr-2">{examType.icon}</span>
                  {examType.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Search and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search practice tests..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-4 flex items-center">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800">Next Exam</p>
                  <p className="text-xl font-bold text-blue-900">14 Days</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-100">
              <CardContent className="p-4 flex items-center">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Avg. Score</p>
                  <p className="text-xl font-bold text-green-900">78.5%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Practice Tests and Study Materials */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Practice Tests</CardTitle>
                  <CardDescription>Complete these tests to assess your knowledge</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredExams.length > 0 ? (
                      filteredExams.map((exam) => (
                        <div key={exam.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{exam.title}</h3>
                              <p className="text-sm text-gray-500">{exam.subject} • {exam.questions} questions • {exam.timeLimit}</p>
                              
                              <div className="flex items-center mt-2">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  exam.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                  exam.difficulty === 'Medium' ? 'bg-blue-100 text-blue-800' :
                                  'bg-amber-100 text-amber-800'
                                }`}>
                                  {exam.difficulty}
                                </span>
                                
                                {exam.completed && (
                                  <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Completed
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-right">
                              {exam.completed ? (
                                <div className="bg-black text-white text-lg font-bold h-12 w-12 rounded-full flex items-center justify-center">
                                  {exam.score}%
                                </div>
                              ) : (
                                <Button className="bg-black hover:bg-black/80">
                                  Start
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          {exam.completed && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Performance</span>
                                <span className="font-medium">{exam.score >= 80 ? 'Excellent' : exam.score >= 60 ? 'Good' : 'Needs Improvement'}</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    exam.score >= 80 ? 'bg-green-500' : 
                                    exam.score >= 60 ? 'bg-blue-500' : 
                                    'bg-amber-500'
                                  }`} 
                                  style={{ width: `${exam.score}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No matching tests found</h3>
                        <p className="text-gray-500 mt-1">Try adjusting your search query</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    View All Practice Tests
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle>Study Schedule</CardTitle>
                  <CardDescription>Your upcoming study sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Mathematics Review</h4>
                        <p className="text-sm text-gray-500">Today, 4:00 PM • 60 min</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">English Practice</h4>
                        <p className="text-sm text-gray-500">Tomorrow, 5:30 PM • 45 min</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                        <Calendar className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Physics Formulas</h4>
                        <p className="text-sm text-gray-500">Friday, 3:00 PM • 30 min</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Study Materials</CardTitle>
                  <CardDescription>Continue where you left off</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studyMaterials.map((material) => (
                      <div key={material.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${
                          material.type === 'PDF' ? 'bg-red-100' : 
                          material.type === 'Video' ? 'bg-blue-100' : 
                          'bg-purple-100'
                        }`}>
                          {material.type === 'PDF' ? (
                            <FileText className={`h-5 w-5 ${
                              material.type === 'PDF' ? 'text-red-600' : 
                              material.type === 'Video' ? 'text-blue-600' : 
                              'text-purple-600'
                            }`} />
                          ) : material.type === 'Video' ? (
                            <Video className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Target className="h-5 w-5 text-purple-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{material.title}</h4>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">
                              {material.type === 'PDF' ? `${material.pages} pages` : 
                               material.type === 'Video' ? material.duration : 
                               `${material.modules} modules`}
                            </span>
                            <span className="text-xs font-medium">
                              {material.progress > 0 ? `${material.progress}% complete` : 'Not started'}
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                            <div 
                              className="h-full bg-black rounded-full" 
                              style={{ width: `${material.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Exam Tips */}
          <Card className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center mr-4">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Exam Day Tips</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>Get a good night's sleep before the exam</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>Arrive at the exam venue at least 30 minutes early</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>Read each question carefully before answering</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>Manage your time wisely - don't spend too long on any one question</span>
                    </li>
                  </ul>
                  <Button className="mt-4 bg-black hover:bg-black/80">
                    View All Tips
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
} 