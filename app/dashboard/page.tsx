"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
  Plus,
  BarChart3,
  Clock,
  Calendar,
  MessageSquare,
  Play,
  Users,
  Menu,
  X,
  Book,
  Send,
  ArrowUp,
  Trophy,
} from "lucide-react"

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")

  // Sample chat messages for the chat preview
  const [chatMessages] = useState([
    { id: 1, message: "Hi there! What would you like to learn today?", sender: "ai" },
    { id: 2, message: "I need help with calculus derivatives", sender: "user" },
    { id: 3, message: "I'd be happy to help with calculus derivatives! Let's start with the basics. What specific concept are you struggling with?", sender: "ai" },
  ])

  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Alex M.", points: 3240, avatar: "/placeholder-user.jpg" },
    { rank: 2, name: "Sarah K.", points: 2980, avatar: "/placeholder-user.jpg" },
    { rank: 3, name: "John D.", points: 2750, avatar: "/placeholder-user.jpg" },
    { rank: 4, name: "Maria L.", points: 2640, avatar: "/placeholder-user.jpg" },
    { rank: 5, name: "You", points: 2450, avatar: "/placeholder-user.jpg", isCurrentUser: true },
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the message to the backend
    // and add it to the chat messages
    if (chatMessage.trim()) {
      setChatMessage("")
    }
  }

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
              <Book className="h-5 w-5" />
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
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <h1 className="text-xl font-bold text-gray-900 ml-10 md:ml-0">Dashboard</h1>
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
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Plus className="h-4 w-4 mr-2" />
                New Session
              </Button>
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
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, John!</h2>
            <p className="text-gray-600">Continue your learning journey with EduMeAI.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Learning Hours</p>
                    <p className="text-2xl font-bold mt-1">24.5</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-500 font-medium">+2.5 hrs</span>
                  <span className="text-gray-500 ml-2">from last week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Completed Sessions</p>
                    <p className="text-2xl font-bold mt-1">18</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-500 font-medium">+3</span>
                  <span className="text-gray-500 ml-2">from last week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Current Streak</p>
                    <p className="text-2xl font-bold mt-1">7 days</p>
                  </div>
                  <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-500 font-medium">+2 days</span>
                  <span className="text-gray-500 ml-2">keep it up!</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">XP Points</p>
                    <p className="text-2xl font-bold mt-1">1,250</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-500 font-medium">+150</span>
                  <span className="text-gray-500 ml-2">from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities, Continue Learning, and New Chat View */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span>Continue Learning</span>
                </CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="group relative overflow-hidden rounded-lg border">
                    <div className="aspect-video w-full bg-gray-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-12 w-12 text-black/50 group-hover:text-black/70 transition-colors" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h4 className="text-white font-medium">Physics: Forces and Motion</h4>
                        <div className="flex items-center mt-1">
                          <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-white rounded-full"></div>
                          </div>
                          <span className="text-xs text-white ml-2">75%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-black hover:bg-black/80">Resume Session</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                  <span>Leaderboard</span>
                </CardTitle>
                <CardDescription>Weekly top performers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboardData.map((user) => (
                    <div 
                      key={user.rank} 
                      className={`flex items-center p-2 rounded-lg ${user.isCurrentUser ? 'bg-amber-50 border border-amber-100' : 'hover:bg-gray-50'}`}
                    >
                      <div className="w-8 text-center font-bold text-gray-500">#{user.rank}</div>
                      <div className="relative h-8 w-8 rounded-full overflow-hidden mx-2">
                        <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${user.isCurrentUser ? 'text-amber-700' : 'text-gray-900'}`}>
                          {user.name}
                          {user.isCurrentUser && <span className="text-xs ml-2">(You)</span>}
                        </p>
                      </div>
                      <div className="font-bold text-gray-900">{user.points} XP</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">View Full Leaderboard</Button>
              </CardFooter>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                  <span>Quick Chat</span>
                </CardTitle>
                <CardDescription>Ask a quick question</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col h-[280px]">
                  <div className="flex-1 overflow-y-auto p-4">
                    {chatMessages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg px-3 py-2 ${
                            message.sender === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t p-3">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <Input
                        placeholder="Ask a question..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Video className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">Calculus: Derivatives Tutorial</h4>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Completed a 45-minute AI tutoring session</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <GraduationCap className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">Career Assessment</h4>
                        <span className="text-sm text-gray-500">Yesterday</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Completed career aptitude test with 3 new matches</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                      <BookOpen className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">JAMB Practice Test</h4>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Scored 85% on Mathematics practice exam</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">View All Activities</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Recommended & Upcoming */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Based on your learning history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Target className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Web Development Fundamentals</h4>
                      <p className="text-sm text-gray-600">HTML, CSS & JavaScript basics</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Advanced Calculus</h4>
                      <p className="text-sm text-gray-600">Integration techniques & applications</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">English Language: Essay Writing</h4>
                      <p className="text-sm text-gray-600">Structure, style and argumentation</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled learning sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Chemistry Group Study</h4>
                      <p className="text-sm text-gray-600">Tomorrow, 4:00 PM • 60 min</p>
                    </div>
                    <Button variant="outline" size="sm">Join</Button>
                  </div>
                  
                  <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">IELTS Speaking Practice</h4>
                      <p className="text-sm text-gray-600">Friday, 2:30 PM • 45 min</p>
                    </div>
                    <Button variant="outline" size="sm">Join</Button>
                  </div>
                  
                  <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                      <Video className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Physics Tutoring Session</h4>
                      <p className="text-sm text-gray-600">Next Monday, 5:00 PM • 60 min</p>
                    </div>
                    <Button variant="outline" size="sm">Join</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 