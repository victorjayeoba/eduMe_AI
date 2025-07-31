"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  BellIcon,
  Search,
  MessageSquare,
  TrendingUp,
  Clock,
  Calendar,
  MoreVertical,
  Filter,
  Menu,
  X,
  RefreshCw,
  Plus,
  Trophy,
  Zap,
  Star,
  Users,
  Timer,
  Crown,
  Flame,
  CheckCircle2,
  AlertCircle,
  Play,
  Gift,
  BarChart3,
  Medal,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

export default function Leaderboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overall")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample user data
  const user = {
    name: "Adedeji",
    xp: 1250,
    avatar: "/placeholder-user.jpg",
    rank: 3
  }

  const tabs = [
    { id: "overall", name: "Overall", icon: <Trophy className="h-4 w-4" /> },
    { id: "weekly", name: "Weekly", icon: <Flame className="h-4 w-4" /> },
    { id: "monthly", name: "Monthly", icon: <Calendar className="h-4 w-4" /> },
    { id: "subjects", name: "By Subject", icon: <BookOpen className="h-4 w-4" /> },
  ]

  // Sample leaderboard data
  const overallLeaderboard = [
    { id: 1, name: "Sarah Johnson", avatar: "/placeholder-user.jpg", xp: 3450, change: "up", streak: 15, level: 25, subjects: ["Math", "Physics"] },
    { id: 2, name: "Michael Chen", avatar: "/placeholder-user.jpg", xp: 3120, change: "up", streak: 12, level: 23, subjects: ["Chemistry", "Biology"] },
    { id: 3, name: user.name, avatar: user.avatar, xp: user.xp, change: "down", streak: 8, level: 18, subjects: ["Math", "English"] },
    { id: 4, name: "David Kim", avatar: "/placeholder-user.jpg", xp: 1180, change: "up", streak: 6, level: 16, subjects: ["Physics", "Chemistry"] },
    { id: 5, name: "Lisa Wang", avatar: "/placeholder-user.jpg", xp: 1050, change: "down", streak: 4, level: 15, subjects: ["Biology", "Math"] },
    { id: 6, name: "Alex Rodriguez", avatar: "/placeholder-user.jpg", xp: 980, change: "up", streak: 3, level: 14, subjects: ["English", "History"] },
    { id: 7, name: "Emma Thompson", avatar: "/placeholder-user.jpg", xp: 920, change: "up", streak: 2, level: 13, subjects: ["Math", "Physics"] },
    { id: 8, name: "James Wilson", avatar: "/placeholder-user.jpg", xp: 890, change: "down", streak: 1, level: 12, subjects: ["Chemistry", "Biology"] },
    { id: 9, name: "Maria Garcia", avatar: "/placeholder-user.jpg", xp: 850, change: "up", streak: 5, level: 11, subjects: ["English", "Math"] },
    { id: 10, name: "Robert Brown", avatar: "/placeholder-user.jpg", xp: 820, change: "down", streak: 2, level: 10, subjects: ["Physics", "Chemistry"] },
  ]

  const weeklyLeaderboard = [
    { id: 1, name: "Emma Thompson", avatar: "/placeholder-user.jpg", xp: 450, change: "up", streak: 7, level: 13, subjects: ["Math", "Physics"] },
    { id: 2, name: "Michael Chen", avatar: "/placeholder-user.jpg", xp: 420, change: "up", streak: 7, level: 23, subjects: ["Chemistry", "Biology"] },
    { id: 3, name: user.name, avatar: user.avatar, xp: 380, change: "up", streak: 7, level: 18, subjects: ["Math", "English"] },
    { id: 4, name: "Sarah Johnson", avatar: "/placeholder-user.jpg", xp: 350, change: "down", streak: 6, level: 25, subjects: ["Math", "Physics"] },
    { id: 5, name: "David Kim", avatar: "/placeholder-user.jpg", xp: 320, change: "up", streak: 5, level: 16, subjects: ["Physics", "Chemistry"] },
  ]

  const subjectLeaderboard = [
    { id: "mathematics", name: "Mathematics", icon: "📐", topUsers: [
      { name: "Sarah Johnson", xp: 1200, rank: 1 },
      { name: user.name, xp: 980, rank: 2 },
      { name: "Michael Chen", xp: 850, rank: 3 },
    ]},
    { id: "physics", name: "Physics", icon: "⚡", topUsers: [
      { name: "David Kim", xp: 1100, rank: 1 },
      { name: "Emma Thompson", xp: 920, rank: 2 },
      { name: "Sarah Johnson", xp: 890, rank: 3 },
    ]},
    { id: "chemistry", name: "Chemistry", icon: "🧪", topUsers: [
      { name: "Michael Chen", xp: 1350, rank: 1 },
      { name: "David Kim", xp: 1100, rank: 2 },
      { name: "James Wilson", xp: 950, rank: 3 },
    ]},
    { id: "biology", name: "Biology", icon: "🧬", topUsers: [
      { name: "Lisa Wang", xp: 980, rank: 1 },
      { name: "Michael Chen", xp: 920, rank: 2 },
      { name: "James Wilson", xp: 850, rank: 3 },
    ]},
  ]

  const getCurrentLeaderboard = () => {
    switch (activeTab) {
      case "weekly":
        return weeklyLeaderboard
      case "monthly":
        return overallLeaderboard.slice(0, 5) // For demo, using overall data
      default:
        return overallLeaderboard
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return null
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
            <div className="relative h-0 w-0 mr-0">
              {/* <Image
                src="/edumeai-logo.png"
                alt="EduMeAI Logo"
                fill
                className="object-contain"
              /> */}
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
          {/* MAIN Section */}
          <div className="mb-6">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">MAIN</h3>
            )}
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
            </div>
          </div>

          {/* LEARNING Section */}
          <div className="mb-6">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">LEARNING</h3>
            )}
            <div className="space-y-1">
              <Link
                href="/dashboard/skill-hub"
                className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Target className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Skill Hub</span>}
              </Link>
              <Link
                href="/dashboard/contests"
                className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Trophy className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Contests</span>}
              </Link>
              <Link
                href="/dashboard/resources"
                className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Resources</span>}
              </Link>
            </div>
          </div>

          {/* ENGAGEMENT Section */}
          <div className="mb-6">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">ENGAGEMENT</h3>
            )}
            <div className="space-y-1">
              <Link
                href="/dashboard/leaderboard"
                className="flex items-center px-4 py-3 text-white bg-black rounded-lg transition-colors"
              >
                <Trophy className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Leaderboard</span>}
              </Link>
              <Link
                href="/dashboard/rewards"
                className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Award className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Rewards</span>}
              </Link>
            </div>
          </div>

          {/* SETTINGS Section */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">SETTINGS</h3>
            )}
            <div className="space-y-1">
              <Link
                href="/dashboard/settings"
                className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Settings</span>}
              </Link>
              <Link
                href="/logout"
                className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Logout</span>}
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} pt-0`}>
        <div className="px-4 py-6 md:px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
                <p className="text-gray-600 mt-2">Compete with students and track your progress</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white px-4 py-2 rounded-lg border shadow-sm">
                  <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="font-semibold text-gray-900">Rank #{user.rank}</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-lg border shadow-sm">
                  <Zap className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="font-semibold text-gray-900">{user.xp} XP</span>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search students..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto pb-2 space-x-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  className={`flex items-center ${activeTab === tab.id ? "bg-black text-white" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </Button>
              ))}
            </div>

            {/* Leaderboard Content */}
            {activeTab === "subjects" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjectLeaderboard.map((subject) => (
                  <Card key={subject.id} className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-lg">
                        <span className="text-2xl mr-2">{subject.icon}</span>
                        {subject.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {subject.topUsers.map((user, index) => (
                          <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                            <div className="w-6 text-center font-bold text-gray-500 mr-3">
                              {user.rank}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{user.name}</h4>
                            </div>
                            <div className="flex items-center">
                              <Zap className="h-4 w-4 text-amber-500 mr-1" />
                              <span className="font-bold text-sm">{user.xp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    {getCurrentLeaderboard().map((user, index) => (
                      <div
                        key={user.id}
                        className={`flex items-center p-4 rounded-lg ${
                          user.name === user.name ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="w-12 text-center">
                          <div className="flex items-center justify-center">
                            {getRankIcon(index + 1)}
                            <span className={`font-bold text-lg ${index < 3 ? "ml-2" : ""}`}>
                              {index + 1}
                            </span>
                          </div>
                        </div>
                        <div className="h-12 w-12 rounded-full overflow-hidden mx-4">
                          <Image src={user.avatar} alt={user.name} width={48} height={48} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-bold text-lg ${user.name === user.name ? "text-blue-600" : ""}`}>
                              {user.name}
                            </h4>
                            {user.name === user.name && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">You</span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>Level {user.level}</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <Flame className="h-3 w-3 mr-1" />
                              {user.streak} day streak
                            </span>
                            <span>•</span>
                            <span>{user.subjects.join(", ")}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center">
                              <Zap className="h-5 w-5 text-amber-500 mr-2" />
                              <span className="font-bold text-xl">{user.xp.toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-gray-500">XP</p>
                          </div>
                          <div className="flex items-center">
                            {user.change === "up" ? (
                              <ArrowUp className="h-5 w-5 text-green-500" />
                            ) : (
                              <ArrowDown className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 