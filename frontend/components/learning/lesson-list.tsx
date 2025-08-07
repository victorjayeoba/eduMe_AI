"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Lock, 
  Unlock,
  BookOpen,
  Video,
  FileText,
  Download
} from "lucide-react"

interface Lesson {
  id: string
  title: string
  description: string
  duration: number // in minutes
  type: 'video' | 'reading' | 'quiz' | 'assignment'
  isCompleted: boolean
  progress: number
  isLocked: boolean
  thumbnail?: string
  resources?: Resource[]
}

interface Resource {
  id: string
  name: string
  type: 'pdf' | 'video' | 'link'
  url: string
}

interface LessonListProps {
  lessons: Lesson[]
  onLessonSelect: (lessonId: string) => void
  selectedLessonId?: string
}

export function LessonList({ lessons, onLessonSelect, selectedLessonId }: LessonListProps) {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null)

  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hrs > 0) {
      return `${hrs}h ${mins}m`
    }
    return `${mins}m`
  }

  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />
      case 'reading':
        return <BookOpen className="w-4 h-4" />
      case 'quiz':
        return <FileText className="w-4 h-4" />
      case 'assignment':
        return <FileText className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getLessonTypeColor = (type: Lesson['type']) => {
    switch (type) {
      case 'video':
        return 'bg-blue-100 text-blue-700'
      case 'reading':
        return 'bg-green-100 text-green-700'
      case 'quiz':
        return 'bg-purple-100 text-purple-700'
      case 'assignment':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-3">
      {lessons.map((lesson, index) => (
        <Card 
          key={lesson.id} 
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            selectedLessonId === lesson.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
          } ${lesson.isLocked ? 'opacity-60' : ''}`}
          onClick={() => !lesson.isLocked && onLessonSelect(lesson.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              {/* Lesson Number */}
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  lesson.isCompleted 
                    ? 'bg-green-100 text-green-700' 
                    : lesson.isLocked 
                    ? 'bg-gray-100 text-gray-500'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {lesson.isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : lesson.isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
              </div>

              {/* Lesson Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900 truncate">
                        {lesson.title}
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getLessonTypeColor(lesson.type)}`}
                      >
                        {getLessonIcon(lesson.type)}
                        <span className="ml-1 capitalize">{lesson.type}</span>
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {lesson.description}
                    </p>

                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDuration(lesson.duration)}
                      </div>
                      
                      {lesson.progress > 0 && (
                        <div className="flex items-center">
                          <span>{lesson.progress}% complete</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-2">
                    {lesson.isCompleted ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    ) : lesson.isLocked ? (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-500">
                        <Lock className="w-3 h-3 mr-1" />
                        Locked
                      </Badge>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {lesson.progress > 0 && !lesson.isCompleted && (
                  <div className="mt-3">
                    <Progress value={lesson.progress} className="h-1" />
                  </div>
                )}

                {/* Resources */}
                {lesson.resources && lesson.resources.length > 0 && (
                  <div className="mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-600 hover:text-gray-800"
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)
                      }}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      {expandedLesson === lesson.id ? 'Hide' : 'Show'} Resources ({lesson.resources.length})
                    </Button>
                    
                    {expandedLesson === lesson.id && (
                      <div className="mt-2 space-y-1">
                        {lesson.resources.map((resource) => (
                          <div 
                            key={resource.id}
                            className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-xs"
                          >
                            <FileText className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-700">{resource.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(resource.url, '_blank')
                              }}
                            >
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
