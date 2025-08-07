"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
  Trophy,
  Clock,
  Crown,
  Flame,
  BarChart3,
  Coins,
  Medal,
  Check
} from "lucide-react"

export default function Contests() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("daily")

  // Enhanced user data with academic progress
  const user = {
    name: "Adedeji",
    xp: 1250,
    coins: 450,
    avatar: "/placeholder-user.jpg",
    contestsWon: 8,
    contestsCompleted: 23, // Total contests attempted
    totalEarnings: 2340,
    winStreak: 3,
    longestStreak: 7,
    rank: "Gold",
    level: 12,
    academicPoints: 2840,
    dailyStreak: 15,
    badges: [
      { id: 'first_contest', name: 'First Steps', description: 'Completed your first contest', unlocked: true, icon: '🎯' },
      { id: 'contest_5', name: 'Getting Started', description: 'Completed 5 contests', unlocked: true, icon: '⭐' },
      { id: 'contest_10', name: 'Dedicated Student', description: 'Completed 10 contests', unlocked: true, icon: '🏆' },
      { id: 'contest_25', name: 'Academic Warrior', description: 'Completed 25 contests', unlocked: false, icon: '🛡️' },
      { id: 'math_master', name: 'Math Master', description: 'Won 3 math contests', unlocked: true, icon: '🧮' },
      { id: 'science_star', name: 'Science Star', description: 'Top 3 in science contests', unlocked: true, icon: '🔬' },
      { id: 'streak_7', name: 'On Fire', description: '7-day win streak', unlocked: true, icon: '🔥' },
      { id: 'early_bird', name: 'Early Bird', description: 'Join contests within first hour', unlocked: false, icon: '🌅' }
    ]
  }





  // Sample past contests results
  const pastContests = [
    {
      id: 6,
      title: "English Grammar Contest",
      result: "Winner",
      xpEarned: 250,
      rank: 1,
      participants: 67,
      date: "Last Week"
    },
    {
      id: 7,
      title: "Geography Quiz",
      result: "Top 10",
      xpEarned: 100,
      rank: 8,
      participants: 89,
      date: "2 Weeks Ago"
    }
  ]

  // Daily challenges to make it addictive
  const dailyChallenges = [
    { id: 'daily_math', subject: 'Quick Math', reward: 25, completed: true, streak: 15 },
    { id: 'daily_vocab', subject: 'Vocabulary', reward: 20, completed: false, streak: 0 },
    { id: 'daily_science', subject: 'Science Fact', reward: 30, completed: true, streak: 8 }
  ]

  const tabs = [
    { id: "daily", name: "Daily" },
    { id: "results", name: "Results" },
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
              <Link
                href="/dashboard/exam-prep"
                className="flex items-center px-4 py-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                {!isSidebarCollapsed && <span className="ml-3 font-medium">Exam Prep</span>}
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
                className="flex items-center px-4 py-2.5 text-white bg-black rounded-lg transition-colors"
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
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} pt-0`}>
        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex items-center justify-center space-x-0 mb-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? "text-black border-black"
                      : "text-gray-400 border-transparent hover:text-gray-600"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Daily Challenges */}
            {activeTab === "daily" && (
              <div className="space-y-6">
                {/* Daily Challenge Header */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Daily Challenges</h3>
                      <p className="text-sm text-gray-600">Complete daily challenges to maintain your streak</p>
                    </div>
                    <div className="text-right">
                      <div className="border border-gray-200 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Current Streak</p>
                        <p className="text-lg font-semibold text-gray-900">{user.dailyStreak} days</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {dailyChallenges.map((challenge) => (
                      <div key={challenge.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{challenge.subject}</h4>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            challenge.completed ? 'bg-gray-900' : 'border border-gray-300'
                          }`}>
                            {challenge.completed ? <Check className="h-3 w-3 text-white" /> : <Clock className="h-3 w-3 text-gray-400" />}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span>+{challenge.reward} coins</span>
                          <span>{challenge.streak} day streak</span>
                        </div>
                        {!challenge.completed && (
                          <Button 
                            size="sm" 
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                          >
                            Start
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Streak Milestones */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Streak Milestones</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { days: 7, reward: 100, name: 'Week Warrior', unlocked: user.dailyStreak >= 7 },
                      { days: 15, reward: 250, name: 'Diamond Dedication', unlocked: user.dailyStreak >= 15 },
                      { days: 30, reward: 500, name: 'Monthly Master', unlocked: user.dailyStreak >= 30 },
                      { days: 100, reward: 1000, name: 'Century Scholar', unlocked: user.dailyStreak >= 100 }
                    ].map((milestone) => (
                      <div key={milestone.days} className={`border rounded-lg p-4 transition-colors ${
                        milestone.unlocked 
                          ? 'border-gray-300 bg-gray-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="text-center">
                          <h5 className="font-medium text-sm text-gray-900">{milestone.name}</h5>
                          <p className="text-xs text-gray-500 mb-2">{milestone.days} day streak</p>
                          <p className="font-semibold text-gray-900">+{milestone.reward} coins</p>
                          {milestone.unlocked && (
                            <div className="mt-2 text-xs text-gray-900 font-medium">✓ Unlocked</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Leaderboard */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">This Week's Top Performers</h4>
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: 'Sarah K.', points: 2840 },
                      { rank: 2, name: 'Mohammed A.', points: 2650 },
                      { rank: 3, name: 'Adedeji (You)', points: 2340 },
                      { rank: 4, name: 'Fatima B.', points: 2180 },
                      { rank: 5, name: 'David O.', points: 1950 }
                    ].map((player) => (
                      <div key={player.rank} className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                        player.name.includes('(You)') ? 'border-gray-300 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                            {player.rank}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{player.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{player.points}</p>
                          <p className="text-xs text-gray-500">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results & Achievements */}
            {activeTab === "results" && (
              <div className="space-y-6">
                {/* Achievement Badges */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Your Achievements</h3>
                    <div className="text-sm text-gray-500">Level: {user.rank}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {user.badges.map((badge) => (
                      <div key={badge.id} className={`border rounded-lg p-4 text-center transition-colors ${
                        badge.unlocked 
                          ? 'border-gray-300 bg-gray-50' 
                          : 'border-gray-200 opacity-50 hover:border-gray-300'
                      }`}>
                        <div className="text-lg mb-2">{badge.icon}</div>
                        <p className="text-xs text-gray-600 mb-1">{badge.name}</p>
                        <p className="font-medium text-xs text-gray-900">{badge.description}</p>
                        {badge.unlocked && (
                          <div className="mt-2 text-xs text-gray-900 font-medium">✓ Unlocked</div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Next Badge Progress */}
                  <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Next Milestone: Academic Warrior</span>
                      <span className="text-xs text-gray-500">{user.contestsCompleted}/25 contests</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gray-900 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(user.contestsCompleted / 25) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{25 - user.contestsCompleted} contests remaining</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
                    <Trophy className="h-6 w-6 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Contests Won</h3>
                    <p className="text-2xl font-semibold text-gray-900">{user.contestsWon}</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
                    <Coins className="h-6 w-6 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Earnings</h3>
                    <p className="text-2xl font-semibold text-gray-900">{user.totalEarnings}</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
                    <Flame className="h-6 w-6 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Win Streak</h3>
                    <p className="text-2xl font-semibold text-gray-900">{user.winStreak}</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
                    <BarChart3 className="h-6 w-6 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Avg. Rank</h3>
                    <p className="text-2xl font-semibold text-gray-900">4.2</p>
                  </div>
                </div>

                {/* Recent Results */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Contest Results</h4>
                  <div className="space-y-3">
                    {pastContests.map((contest) => (
                      <div key={contest.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              contest.result === 'Winner' 
                                ? 'bg-gray-900' 
                                : 'bg-gray-200'
                            }`}>
                              {contest.result === 'Winner' ? (
                                <Crown className="h-4 w-4 text-white" />
                              ) : (
                                <Medal className="h-4 w-4 text-gray-600" />
                              )}
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">{contest.title}</h5>
                              <div className="flex items-center space-x-3 text-sm text-gray-500">
                                <span className="font-medium">{contest.result}</span>
                                <span>•</span>
                                <span>{contest.participants} participants</span>
                                <span>•</span>
                                <span>{contest.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">+{contest.xpEarned}</p>
                            <p className="text-sm text-gray-500">Rank #{contest.rank}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 