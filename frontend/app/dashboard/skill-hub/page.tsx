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
  Star,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SkillHub() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("digital")
  
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
      progress: 65,
      image: "/placeholder.jpg",
      modules: 12,
      completed: 8,
      icon: <Code className="h-6 w-6" />,
      color: "blue",
    },
    {
      id: 2,
      title: "Data Analysis",
      description: "Master data visualization and statistical analysis techniques",
      level: "Intermediate",
      duration: "6 weeks",
      progress: 40,
      image: "/placeholder.jpg",
      modules: 10,
      completed: 4,
      icon: <LineChart className="h-6 w-6" />,
      color: "green",
    },
    {
      id: 3,
      title: "UX/UI Design",
      description: "Create user-centered designs with industry-standard tools",
      level: "Beginner",
      duration: "5 weeks",
      progress: 20,
      image: "/placeholder.jpg",
      modules: 8,
      completed: 1,
      icon: <Layers className="h-6 w-6" />,
      color: "purple",
    },
    {
      id: 4,
      title: "Artificial Intelligence",
      description: "Introduction to machine learning and AI applications",
      level: "Advanced",
      duration: "10 weeks",
      progress: 10,
      image: "/placeholder.jpg",
      modules: 15,
      completed: 1,
      icon: <Cpu className="h-6 w-6" />,
      color: "amber",
    },
  ]
  
  const softSkills = [
    {
      id: 5,
      title: "Communication",
      description: "Develop effective written and verbal communication skills",
      level: "All Levels",
      duration: "4 weeks",
      progress: 75,
      image: "/placeholder.jpg",
      modules: 6,
      completed: 4,
      icon: <MessageSquare className="h-6 w-6" />,
      color: "blue",
    },
    {
      id: 6,
      title: "Leadership",
      description: "Learn to inspire and guide teams to achieve goals",
      level: "Intermediate",
      duration: "6 weeks",
      progress: 50,
      image: "/placeholder.jpg",
      modules: 8,
      completed: 4,
      icon: <Users className="h-6 w-6" />,
      color: "green",
    },
    {
      id: 7,
      title: "Critical Thinking",
      description: "Enhance problem-solving and analytical reasoning skills",
      level: "All Levels",
      duration: "5 weeks",
      progress: 30,
      image: "/placeholder.jpg",
      modules: 7,
      completed: 2,
      icon: <Lightbulb className="h-6 w-6" />,
      color: "purple",
    },
    {
      id: 8,
      title: "Time Management",
      description: "Master techniques to optimize productivity and efficiency",
      level: "Beginner",
      duration: "3 weeks",
      progress: 90,
      image: "/placeholder.jpg",
      modules: 5,
      completed: 4,
      icon: <Clock className="h-6 w-6" />,
      color: "amber",
    },
  ]
  
  const activeSkills = activeCategory === "digital" ? digitalSkills : softSkills
  
  const featuredSkill = activeSkills.find(skill => skill.progress > 0) || activeSkills[0]
  
  const recommendedSkills = [
    {
      title: "Mobile App Development",
      category: "Digital Skills",
      level: "Intermediate",
      match: "95% match",
      icon: <Cpu className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "Public Speaking",
      category: "Soft Skills",
      level: "Beginner",
      match: "87% match",
      icon: <MessageSquare className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Project Management",
      category: "Soft Skills",
      level: "Intermediate",
      match: "82% match",
      icon: <Layers className="h-5 w-5 text-purple-600" />,
    },
  ]

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
              className="flex items-center px-4 py-3 text-white bg-black rounded-lg transition-colors"
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

          {/* Featured Skill */}
          {/* <Card className="mb-6 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 bg-${featuredSkill.color}-100`}>
                    {featuredSkill.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{featuredSkill.title}</h2>
                    <p className="text-sm text-gray-500">{featuredSkill.level} • {featuredSkill.duration}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{featuredSkill.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{featuredSkill.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-black rounded-full" 
                      style={{ width: `${featuredSkill.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm mb-6">
                  <span className="text-gray-500">{featuredSkill.completed} of {featuredSkill.modules} modules completed</span>
                </div>
                
                <Button className="bg-black hover:bg-black/80">
                  Continue Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative h-48 md:h-auto">
                <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
                <Image
                  src={featuredSkill.image}
                  alt={featuredSkill.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button variant="outline" className="bg-white/80 hover:bg-white">
                    <Video className="h-5 w-5 mr-2" />
                    Watch Intro
                  </Button>
                </div>
              </div>
            </div>
          </Card> */}

          {/* All Skills */}
          <div className="mb-8">
            {/* <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">All {activeCategory === "digital" ? "Digital" : "Soft"} Skills</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div> */}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSkills.map((skill) => (
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
                        <span>{skill.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-black rounded-full" 
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{skill.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{skill.modules} modules • {skill.duration}</span>
                      <Button variant="outline" size="sm" className="h-8">
                        {skill.progress > 0 ? "Continue" : "Start"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Skill Stats and Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Skill Stats */}
            <Card className="lg:col-span-1">
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
                      <span className="font-bold">6</span>
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
                      <h4 className="font-medium">Learning Hours</h4>
                      <span className="font-bold">42.5</span>
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
                      <h4 className="font-medium">Certificates Earned</h4>
                      <span className="font-bold">3</span>
                    </div>
                    <p className="text-xs text-gray-500">View in profile</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recommendations */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Based on your learning history and goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedSkills.map((skill, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="h-12 w-12 rounded-lg flex items-center justify-center mr-4">
                        {skill.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{skill.title}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{skill.category}</span>
                          <span className="mx-2">•</span>
                          <span>{skill.level}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          <Star className="h-4 w-4 text-amber-400 mr-1" />
                          <span className="text-sm font-medium">{skill.match}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Explore
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 