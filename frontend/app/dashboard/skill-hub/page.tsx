"use client"

import { useState, useEffect } from "react"
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
  Code,
  Lightbulb,
  Users,
  LineChart,
  Layers,
  Cpu,
  MessageSquare,
  BarChart3,
  Clock,
  Menu,
  X,
  Sparkles,
  Zap,
  ArrowRight,
  Trophy,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function SkillHub() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("digital")
  const { user } = useAuth()
  const [userProgress, setUserProgress] = useState<{ [courseId: string]: number }>({})
  const [loading, setLoading] = useState(true)

  // Fetch user progress from Firebase
  useEffect(() => {
    if (!user) return
    
    const fetchProgress = async () => {
      try {
        const userRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userRef)
        
        if (userDoc.exists()) {
          const courseProgress = userDoc.data().courseProgress || {}
          const progressMap: { [courseId: string]: number } = {}
          
          Object.keys(courseProgress).forEach(courseId => {
            const lessons = courseProgress[courseId]
            const lessonIds = Object.keys(lessons)
            if (lessonIds.length > 0) {
              // Get the progress from the first lesson (since each course has one lesson)
              progressMap[courseId] = lessons[lessonIds[0]].progress || 0
            }
          })
          
          setUserProgress(progressMap)
        }
      } catch (error) {
        console.error("Error fetching user progress:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [user])

  const skillCategories = [
    { id: "digital", name: "Digital Skills", icon: <Code className="h-5 w-5" /> },
    { id: "soft", name: "Soft Skills", icon: <Lightbulb className="h-5 w-5" /> },
  ]
  
  const achievements = [
    {
      id: 1,
      title: "Fast Learner",
      description: "Completed 5 modules in one day",
      icon: <Sparkles className="h-5 w-5" />,
      color: "amber",
    },
    {
      id: 2,
      title: "Coding Ninja",
      description: "Completed Web Development basics",
      icon: <Zap className="h-5 w-5" />,
      color: "blue",
    },
    {
      id: 3,
      title: "Team Player",
      description: "Completed Leadership module",
      icon: <Users className="h-5 w-5" />,
      color: "green",
    },
    {
      id: 4,
      title: "Time Master",
      description: "Completed Time Management course",
      icon: <Clock className="h-5 w-5" />,
      color: "purple",
    },
  ]
  
  const digitalSkills = [
    {
      id: 1,
      title: "Web Development",
      description: "Learn HTML, CSS, and JavaScript to build responsive websites",
      level: "Beginner",
      duration: "8 weeks",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      modules: 12,
      completed: 8,
      icon: <Code className="h-6 w-6" />,
      color: "blue",
      courseId: "web-development",
      videoId: "FazgJVnrVuI", // YouTube video ID
    },
    {
      id: 2,
      title: "Data Analysis",
      description: "Master data visualization and statistical analysis techniques",
      level: "Intermediate",
      duration: "6 weeks",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      modules: 10,
      completed: 4,
      icon: <LineChart className="h-6 w-6" />,
      color: "green",
      courseId: "data-analysis",
      videoId: "VV8iRJ-DS0A", // YouTube video ID
    },
    {
      id: 3,
      title: "UX/UI Design",
      description: "Create user-centered designs with industry-standard tools",
      level: "Beginner",
      duration: "5 weeks",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      modules: 8,
      completed: 1,
      icon: <Layers className="h-6 w-6" />,
      color: "purple",
      courseId: "ux-ui-design",
      videoId: "896-7GLZr6E", // YouTube video ID
    },
    {
      id: 4,
      title: "Artificial Intelligence",
      description: "Introduction to machine learning and AI applications",
      level: "Advanced",
      duration: "10 weeks",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      modules: 15,
      completed: 1,
      icon: <Cpu className="h-6 w-6" />,
      color: "amber",
      courseId: "artificial-intelligence",
      videoId: "i_LwzRVP7bg", // YouTube video ID
    },
  ]
  
  const softSkills = [
    {
      id: 5,
      title: "Communication",
      description: "Develop effective written and verbal communication skills",
      level: "All Levels",
      duration: "4 weeks",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      modules: 6,
      completed: 4,
      icon: <MessageSquare className="h-6 w-6" />,
      color: "blue",
      courseId: "communication",
      videoId: "Bicb80ooEZc", // YouTube video ID
    },
    {
      id: 6,
      title: "Leadership",
      description: "Learn to inspire and guide teams to achieve goals",
      level: "Intermediate",
      duration: "6 weeks",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      modules: 8,
      completed: 4,
      icon: <Users className="h-6 w-6" />,
      color: "green",
      courseId: "leadership",
      videoId: "6-shbSFc48E", // YouTube video ID
    },
    {
      id: 7,
      title: "Critical Thinking",
      description: "Enhance problem-solving and analytical reasoning skills",
      level: "All Levels",
      duration: "5 weeks",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      modules: 7,
      completed: 2,
      icon: <Lightbulb className="h-6 w-6" />,
      color: "purple",
      courseId: "critical-thinking",
      videoId: "HeaVRKFeD8k", // YouTube video ID
    },
    {
      id: 8,
      title: "Time Management",
      description: "Master techniques to optimize productivity and efficiency",
      level: "Beginner",
      duration: "3 weeks",
      image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400&h=300&fit=crop",
      modules: 5,
      completed: 4,
      icon: <Clock className="h-6 w-6" />,
      color: "amber",
      courseId: "time-management",
      videoId: "xItNGPRBQKg", // YouTube video ID
    },
  ]
  
  const activeSkills = activeCategory === "digital" ? digitalSkills : softSkills
  
  const featuredSkill = activeSkills.find(skill => userProgress[skill.courseId] > 0) || activeSkills[0]

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
                className="flex items-center px-4 py-2.5 text-white bg-black rounded-lg transition-colors"
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
        {/* Main Content */}
        <main className="px-4 py-6 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            {/* Skill Category Tabs */}
            <div className="flex space-x-2">
              {skillCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`flex items-center ${activeCategory === category.id ? "bg-black text-white" : ""}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
            
            {/* Achievement Cards - Small Version */}
            <div className="flex space-x-2 md:ml-auto order-first md:order-last">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`flex items-center px-3 py-2 rounded-lg border border-gray-200 bg-${achievement.color}-50 hover:bg-${achievement.color}-100 transition-all duration-300 hover:shadow-md cursor-pointer h-9`}
                >
                  <span className="mr-2">{achievement.icon}</span>
                  <h4 className="text-xs font-medium">{achievement.title}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* All Skills */}
          <div className="mb-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="overflow-hidden animate-pulse">
                    <div className="h-40 bg-gray-200"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="h-2 bg-gray-200 rounded mb-2"></div>
                      <div className="flex justify-between">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeSkills.map((skill) => {
                  const progress = userProgress[skill.courseId] || 0
                  return (
                    <Card key={skill.id} className="overflow-hidden">
                      <div className="relative h-40">
                        <Image
                          src={skill.image}
                          alt={skill.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-lg font-bold text-white">{skill.title}</h3>
                          <p className="text-sm text-white/80">{skill.level}</p>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-black rounded-full transition-all duration-300" 
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{skill.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">1 module • 1hr 30 mins</span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8"
                            asChild
                          >
                            <Link href={`/dashboard/skill-hub/${skill.courseId || 'web-development'}`}>
                              {progress === 100 ? "Retake" : progress > 0 ? "Continue" : "Start"}
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>

          {/* Skill Stats and Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Skill Stats */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Your Skill Stats</CardTitle>
                <CardDescription>Track your learning progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Skills in Progress</h4>
                      <span className="font-bold">
                        {Object.values(userProgress).filter(p => p > 0 && p < 100).length}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Across both categories</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Completed Courses</h4>
                      <span className="font-bold">
                        {Object.values(userProgress).filter(p => p >= 100).length}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Average Progress</h4>
                      <span className="font-bold">
                        {Object.values(userProgress).length > 0 
                          ? Math.round(Object.values(userProgress).reduce((a, b) => a + b, 0) / Object.values(userProgress).length)
                          : 0}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Across all courses</p>
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