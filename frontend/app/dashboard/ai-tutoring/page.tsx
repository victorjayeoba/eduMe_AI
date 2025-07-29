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
  Menu,
  X,
  ArrowRight,
  RefreshCw,
  Maximize2,
  Volume2,
  VolumeX,
  UserCircle,
  CheckCircle2,
  Mic,
  Camera,
  Search,
  History,
  ChevronDown,
  Play,
  MoreVertical
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AITutoring() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [messageInput, setMessageInput] = useState("")
  const [selectedTutor, setSelectedTutor] = useState("sophia")
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showTutorSelector, setShowTutorSelector] = useState(false)

  // Sample chat messages
  const chatMessages = [
    { id: 1, text: "Hi! I'm struggling with this calculus problem.", sender: "user" },
    { id: 2, text: "I'd be happy to help! Let me see what you're working on.", sender: "ai" },
    { id: 3, text: "Can you walk me through derivatives step by step?", sender: "user" },
    { id: 4, text: "Absolutely! Derivatives measure the rate of change of a function. Let's start with the basics:\n\n1. The derivative of a constant is 0\n2. The derivative of x^n is n·x^(n-1)\n3. For a function f(x) = x^2, the derivative f'(x) = 2x\n\nWould you like me to explain a specific type of derivative problem?", sender: "ai" },
  ]

  const tutors = [
    { id: "sophia", name: "Sophia", role: "Math Specialist", image: "/placeholder-user.jpg" },
    { id: "alex", name: "Alex", role: "Physics Expert", image: "/placeholder-user.jpg" },
    { id: "maya", name: "Maya", role: "Chemistry Tutor", image: "/placeholder-user.jpg" },
    { id: "james", name: "James", role: "Biology Professor", image: "/placeholder-user.jpg" },
  ]

  // Sample topics
  const topics = [
    { id: "calculus", name: "Calculus", active: true },
    { id: "algebra", name: "Algebra", active: false },
    { id: "geometry", name: "Geometry", active: false },
    { id: "statistics", name: "Statistics", active: false },
  ]

  // Sample recent sessions
  const recentSessions = [
    { id: 1, title: "Derivatives Introduction", date: "Yesterday", duration: "45 min" },
    { id: 2, title: "Integration Methods", date: "2 days ago", duration: "60 min" },
    { id: 3, title: "Limits & Continuity", date: "Last week", duration: "30 min" },
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send the message to an API
    console.log("Sending message:", messageInput)
    setMessageInput("")
  }

  const handleTutorChange = (tutorId: string) => {
    setSelectedTutor(tutorId)
    setShowTutorSelector(false)
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
              className="flex items-center px-4 py-3 text-white bg-black rounded-lg transition-colors"
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
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Video & Topics */}
              <div className="lg:col-span-2 space-y-6">
                {/* Video Card */}
                <Card className="overflow-hidden border-0 shadow-sm">
                  <CardHeader className="border-b p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative">
                          <Button 
                            variant="ghost" 
                            className="flex items-center p-1 h-auto font-medium"
                            onClick={() => setShowTutorSelector(!showTutorSelector)}
                          >
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-2 border border-gray-200 shadow-sm">
                              <Image 
                                src={tutors.find(t => t.id === selectedTutor)?.image || "/placeholder-user.jpg"} 
                                alt="AI Tutor" 
                                width={40} 
                                height={40}
                              />
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-sm leading-tight">{tutors.find(t => t.id === selectedTutor)?.name}</p>
                              <p className="text-xs text-gray-500 leading-tight">{tutors.find(t => t.id === selectedTutor)?.role}</p>
                            </div>
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                          
                          {/* Tutor Selector Dropdown */}
                          {showTutorSelector && (
                            <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border z-50">
                              <div className="p-2">
                                <p className="text-xs font-medium text-gray-500 px-2 py-1">Select AI Tutor</p>
                                {tutors.map(tutor => (
                                  <button
                                    key={tutor.id}
                                    className={`flex items-center w-full p-2 rounded-md ${selectedTutor === tutor.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                                    onClick={() => handleTutorChange(tutor.id)}
                                  >
                                    <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                                      <Image src={tutor.image} alt={tutor.name} width={32} height={32} />
                                    </div>
                                    <div className="text-left flex-1">
                                      <p className="font-medium text-sm">{tutor.name}</p>
                                      <p className="text-xs text-gray-500">{tutor.role}</p>
                                    </div>
                                    {selectedTutor === tutor.id && <CheckCircle2 className="h-4 w-4 text-black" />}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => setIsVideoMuted(!isVideoMuted)}>
                          {isVideoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setIsFullscreen(!isFullscreen)}>
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <div className={`relative ${isFullscreen ? 'h-[65vh]' : 'aspect-video'} bg-gray-900`}>
                    {/* Video Player (placeholder) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image 
                          src="/placeholder.jpg" 
                          alt="AI Tutor Video" 
                          fill 
                          className="object-cover opacity-70"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                          <UserCircle className="h-16 w-16 mb-4 opacity-80" />
                          <p className="font-medium text-lg">AI Tutor Video Stream</p>
                          <p className="text-sm opacity-80">Explaining derivatives in calculus</p>
                          <Button className="mt-6 bg-white text-black hover:bg-gray-100">
                            <Play className="h-5 w-5 mr-2" fill="currentColor" />
                            Start Session
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardFooter className="p-3 border-t bg-white flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-sm text-gray-600">Live Session Available</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      New Session
                    </Button>
                  </CardFooter>
                </Card>

                {/* Topics */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Current Topics</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {topics.map(topic => (
                        <Button 
                          key={topic.id}
                          variant="outline" 
                          size="sm" 
                          className={topic.active ? 
                            "bg-black text-white hover:bg-black/80" : 
                            "bg-white hover:bg-gray-50"
                          }
                        >
                          {topic.name}
                        </Button>
                      ))}
                      <Button variant="outline" size="sm" className="border-dashed">
                        + Add Topic
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Sessions */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="p-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Recent Sessions</CardTitle>
                    <Button variant="ghost" size="sm">View All</Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    {recentSessions.map((session, index) => (
                      <div 
                        key={session.id} 
                        className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                          index < recentSessions.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                            <Video className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{session.title}</p>
                            <p className="text-xs text-gray-500">{session.date} • {session.duration}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Replay
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Chat */}
              <Card className="h-[calc(100vh-8rem)] border-0 shadow-sm overflow-hidden">
                <CardHeader className="border-b p-4 bg-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">Chat with Tutor</CardTitle>
                      <CardDescription>Ask questions about your current topic</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      Clear Chat
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.sender === 'ai' && (
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2">
                            <UserCircle className="h-5 w-5 text-blue-600" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === 'user'
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="whitespace-pre-line text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="border-t p-4 bg-white">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                      <Button type="button" variant="ghost" size="icon" className="shrink-0">
                        <Camera className="h-5 w-5 text-gray-500" />
                      </Button>
                      <Button type="button" variant="ghost" size="icon" className="shrink-0">
                        <Mic className="h-5 w-5 text-gray-500" />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="icon" className="shrink-0 bg-black hover:bg-black/80">
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 