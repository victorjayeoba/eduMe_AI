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
  Menu,
  X,
  Search,
  Filter,
  Download,
  Play,
  Clock,
  Users,
  Star,
  TrendingUp,
  Bookmark,
  ExternalLink,
  Plus,
  MessageSquare,
  Trophy,
} from "lucide-react"

export default function Resources() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedResourceType, setSelectedResourceType] = useState("all")

  const subjects = [
    { id: "all", name: "All Subjects", count: 120 },
    { id: "mathematics", name: "Mathematics", count: 35 },
    { id: "physics", name: "Physics", count: 28 },
    { id: "chemistry", name: "Chemistry", count: 22 },
    { id: "biology", name: "Biology", count: 18 },
    { id: "english", name: "English", count: 17 },
  ]

  const resourceTypes = [
    { id: "all", name: "All Types", icon: BookOpen },
    { id: "videos", name: "Video Tutorials", icon: Video },
    { id: "practice", name: "Practice Problems", icon: Target },
    { id: "study-groups", name: "Study Groups", icon: Users },
    { id: "guides", name: "Study Guides", icon: BookOpen },
    { id: "past-papers", name: "Past Papers", icon: Award },
  ]

  const videoResources = [
    {
      id: 1,
      title: "Calculus Fundamentals: Derivatives",
      subject: "Mathematics",
      duration: "45 min",
      views: "12.5k",
      rating: 4.8,
      thumbnail: "/placeholder.jpg",
      description: "Master the basics of derivatives with step-by-step explanations",
      difficulty: "Intermediate"
    },
    {
      id: 2,
      title: "Newton's Laws of Motion",
      subject: "Physics",
      duration: "32 min",
      views: "8.2k",
      rating: 4.9,
      thumbnail: "/placeholder.jpg",
      description: "Complete guide to understanding force, mass, and acceleration",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Organic Chemistry: Basic Reactions",
      subject: "Chemistry",
      duration: "55 min",
      views: "6.8k",
      rating: 4.7,
      thumbnail: "/placeholder.jpg",
      description: "Learn fundamental organic chemistry reactions and mechanisms",
      difficulty: "Advanced"
    },
    {
      id: 4,
      title: "Cell Biology: Mitosis and Meiosis",
      subject: "Biology",
      duration: "38 min",
      views: "9.1k",
      rating: 4.6,
      thumbnail: "/placeholder.jpg",
      description: "Understand cell division processes with animated explanations",
      difficulty: "Intermediate"
    },
  ]

  const practiceResources = [
    {
      id: 1,
      title: "Calculus Problem Set",
      subject: "Mathematics",
      problems: 50,
      completed: 35,
      difficulty: "Intermediate",
      timeEstimate: "3-4 hours"
    },
    {
      id: 2,
      title: "Physics Mechanics Problems",
      subject: "Physics",
      problems: 40,
      completed: 22,
      difficulty: "Beginner",
      timeEstimate: "2-3 hours"
    },
    {
      id: 3,
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      problems: 60,
      completed: 18,
      difficulty: "Advanced",
      timeEstimate: "4-5 hours"
    },
  ]

  const studyGroups = [
    {
      id: 1,
      name: "Calculus Study Circle",
      subject: "Mathematics",
      members: 24,
      nextSession: "Today 4:00 PM",
      description: "Weekly group focusing on calculus concepts and problem-solving",
      isActive: true
    },
    {
      id: 2,
      name: "Physics Problem Solvers",
      subject: "Physics",
      members: 18,
      nextSession: "Tomorrow 2:30 PM",
      description: "Collaborative physics problem-solving sessions",
      isActive: true
    },
    {
      id: 3,
      name: "Chemistry Lab Group",
      subject: "Chemistry",
      members: 15,
      nextSession: "Friday 3:00 PM",
      description: "Chemistry lab prep and concept discussions",
      isActive: false
    },
  ]

  const studyGuides = [
    {
      id: 1,
      title: "JAMB Mathematics Complete Guide",
      subject: "Mathematics",
      pages: 120,
      downloads: "5.2k",
      rating: 4.9,
      lastUpdated: "1 week ago"
    },
    {
      id: 2,
      title: "WAEC Physics Revision Notes",
      subject: "Physics",
      pages: 85,
      downloads: "3.8k",
      rating: 4.7,
      lastUpdated: "2 days ago"
    },
    {
      id: 3,
      title: "University Chemistry Handbook",
      subject: "Chemistry",
      pages: 200,
      downloads: "2.9k",
      rating: 4.8,
      lastUpdated: "5 days ago"
    },
  ]

  const progressData = [
    { subject: "Calculus Basics", progress: 75 },
    { subject: "Derivatives", progress: 60 },
    { subject: "Integrals", progress: 25 },
    { subject: "Physics Mechanics", progress: 80 },
    { subject: "Organic Chemistry", progress: 45 },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
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
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
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
              <Link
                href="/dashboard/resources"
                className="flex items-center px-4 py-2.5 text-white bg-black rounded-lg transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Resources</span>}
              </Link>
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
        {/* Header is now in the layout */}
        
        {/* Main Content */}
        <main className="px-4 py-6 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Filters and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              {/* Subject Filter */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Subjects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.id)}
                      className={`w-full text-left p-2 rounded-lg transition-colors ${
                        selectedSubject === subject.id 
                          ? 'bg-black text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{subject.name}</span>
                        <span className="text-xs opacity-70">{subject.count}</span>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Resource Types */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Resource Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {resourceTypes.map((type) => {
                    const IconComponent = type.icon
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedResourceType(type.id)}
                        className={`w-full text-left p-2 rounded-lg transition-colors ${
                          selectedResourceType === type.id 
                            ? 'bg-black text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center">
                          <IconComponent className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">{type.name}</span>
                        </div>
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Progress Overview */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Your Progress</CardTitle>
                  <CardDescription>Current learning journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {progressData.slice(0, 3).map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{item.subject}</span>
                        <span className="text-xs text-gray-500">{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-black rounded-full transition-all duration-300" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-3" size="sm">
                    View All Progress
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Video className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm">Videos Watched</span>
                    </div>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Problems Solved</span>
                    </div>
                    <span className="font-medium">157</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-orange-600 mr-2" />
                      <span className="text-sm">Study Hours</span>
                    </div>
                    <span className="font-medium">42h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-purple-600 mr-2" />
                      <span className="text-sm">Streak</span>
                    </div>
                    <span className="font-medium">7 days</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Video Tutorials */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Video Tutorials</h2>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Browse All Videos
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {videoResources.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                          <Play className="h-4 w-4 mr-2" />
                          Play
                        </Button>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(video.difficulty)}`}>
                          {video.difficulty}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{video.duration}</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span>{video.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Practice Problems */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Practice Problems</h2>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Browse All Problems
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {practiceResources.map((practice) => (
                  <Card key={practice.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{practice.title}</CardTitle>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(practice.difficulty)}`}>
                          {practice.difficulty}
                        </span>
                      </div>
                      <CardDescription>{practice.subject}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{practice.completed}/{practice.problems} problems</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-black rounded-full transition-all duration-300" 
                            style={{ width: `${(practice.completed / practice.problems) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{practice.timeEstimate}</span>
                          </div>
                          <span>{practice.problems} problems</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-black hover:bg-black/80">
                        Continue Practice
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Study Groups */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Study Groups</h2>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Join More Groups
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studyGroups.map((group) => (
                  <Card key={group.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <div className={`h-2 w-2 rounded-full ${group.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      </div>
                      <CardDescription>{group.subject}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{group.members} members</span>
                          </div>
                          <span className="text-xs text-gray-500">{group.nextSession}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant={group.isActive ? "default" : "outline"}
                      >
                        {group.isActive ? "Join Session" : "Request to Join"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Study Guides */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Study Guides</h2>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Browse All Guides
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studyGuides.map((guide) => (
                  <Card key={guide.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                      <CardDescription>{guide.subject}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{guide.pages} pages</span>
                          </div>
                          <div className="flex items-center">
                            <Download className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{guide.downloads}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            <span>{guide.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">Updated {guide.lastUpdated}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="space-x-2">
                      <Button className="flex-1 bg-black hover:bg-black/80">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="icon">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 