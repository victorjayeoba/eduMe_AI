"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Trophy, 
  Clock, 
  BookOpen, 
  Award,
  Target,
  TrendingUp,
  Calendar,
  Star
} from "lucide-react"

interface CourseProgressProps {
  courseId: string
  courseTitle: string
  totalLessons: number
  completedLessons: number
  totalDuration: number // in minutes
  timeSpent: number // in minutes
  certificates: Certificate[]
  achievements: Achievement[]
  currentStreak: number
  averageScore: number
}

interface Certificate {
  id: string
  name: string
  issuedDate: string
  score: number
  imageUrl?: string
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  earnedDate: string
  type: 'completion' | 'streak' | 'score' | 'time'
}

export function CourseProgress({
  courseId,
  courseTitle,
  totalLessons,
  completedLessons,
  totalDuration,
  timeSpent,
  certificates,
  achievements,
  currentStreak,
  averageScore
}: CourseProgressProps) {
  const progressPercentage = (completedLessons / totalLessons) * 100
  const timeProgressPercentage = (timeSpent / totalDuration) * 100

  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hrs > 0) {
      return `${hrs}h ${mins}m`
    }
    return `${mins}m`
  }

  const getAchievementIcon = (type: Achievement['type']) => {
    switch (type) {
      case 'completion':
        return <Trophy className="w-4 h-4" />
      case 'streak':
        return <TrendingUp className="w-4 h-4" />
      case 'score':
        return <Star className="w-4 h-4" />
      case 'time':
        return <Clock className="w-4 h-4" />
      default:
        return <Award className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Course Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Course Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Lessons Completed</span>
                <span>{completedLessons} / {totalLessons}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {progressPercentage.toFixed(1)}% complete
              </p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Time Spent</span>
                <span>{formatTime(timeSpent)} / {formatTime(totalDuration)}</span>
              </div>
              <Progress value={timeProgressPercentage} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {timeProgressPercentage.toFixed(1)}% of total course time
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{completedLessons}</div>
              <div className="text-xs text-blue-600">Lessons Done</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{formatTime(timeSpent)}</div>
              <div className="text-xs text-green-600">Time Spent</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{currentStreak}</div>
              <div className="text-xs text-purple-600">Day Streak</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">{averageScore}%</div>
              <div className="text-xs text-amber-600">Avg Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates */}
      {certificates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Certificates Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {certificates.map((certificate) => (
                <div key={certificate.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{certificate.name}</h4>
                    <p className="text-sm text-gray-600">
                      Issued {new Date(certificate.issuedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {certificate.score}% Score
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                    {getAchievementIcon(achievement.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{achievement.name}</h4>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Learning Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium">Learning Streak</h4>
                  <p className="text-sm text-gray-600">Keep the momentum going!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{currentStreak}</div>
                <div className="text-xs text-blue-600">days</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-medium">Course Completion</h4>
                  <p className="text-sm text-gray-600">You're making great progress!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{progressPercentage.toFixed(0)}%</div>
                <div className="text-xs text-green-600">complete</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-purple-600" />
                <div>
                  <h4 className="font-medium">Average Score</h4>
                  <p className="text-sm text-gray-600">Excellent performance!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{averageScore}%</div>
                <div className="text-xs text-purple-600">average</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
