"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { YouTubePlayer } from "@/components/learning/youtube-player"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Course data with YouTube video IDs
const courseData = {
  "web-development": {
    id: "web-development",
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript to build responsive websites",
    videoId: "FazgJVnrVuI",
    duration: 1800, // 30 minutes in seconds
    hasQuiz: true
  },
  "data-analysis": {
    id: "data-analysis", 
    title: "Data Analysis Essentials",
    description: "Master data visualization and statistical analysis techniques",
    videoId: "VV8iRJ-DS0A",
    duration: 2400, // 40 minutes in seconds
    hasQuiz: true
  },
  "ux-ui-design": {
    id: "ux-ui-design",
    title: "UX/UI Design Principles",
    description: "Create user-centered designs with industry-standard tools",
    videoId: "896-7GLZr6E",
    duration: 2100, // 35 minutes in seconds
    hasQuiz: true
  },
  "artificial-intelligence": {
    id: "artificial-intelligence",
    title: "Introduction to AI & Machine Learning",
    description: "Introduction to machine learning and AI applications",
    videoId: "i_LwzRVP7bg",
    duration: 3600, // 60 minutes in seconds
    hasQuiz: true
  },
  "communication": {
    id: "communication",
    title: "Effective Communication Skills",
    description: "Develop effective written and verbal communication skills",
    videoId: "Bicb80ooEZc",
    duration: 1800, // 30 minutes in seconds
    hasQuiz: true
  },
  "leadership": {
    id: "leadership",
    title: "Leadership & Team Management",
    description: "Learn to inspire and guide teams to achieve goals",
    videoId: "6-shbSFc48E",
    duration: 2400, // 40 minutes in seconds
    hasQuiz: true
  },
  "critical-thinking": {
    id: "critical-thinking",
    title: "Critical Thinking & Problem Solving",
    description: "Enhance problem-solving and analytical reasoning skills",
    videoId: "HeaVRKFeD8k",
    duration: 2100, // 35 minutes in seconds
    hasQuiz: true
  },
  "time-management": {
    id: "time-management",
    title: "Time Management & Productivity",
    description: "Master techniques to optimize productivity and efficiency",
    videoId: "xItNGPRBQKg",
    duration: 1500, // 25 minutes in seconds
    hasQuiz: true
  }
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const [course, setCourse] = useState(courseData[courseId as keyof typeof courseData] || null)

  useEffect(() => {
    if (courseId && courseData[courseId as keyof typeof courseData]) {
      setCourse(courseData[courseId as keyof typeof courseData])
    }
  }, [courseId])

  const handleProgressUpdate = (progress: number) => {
    console.log(`Progress updated for ${courseId}: ${progress}%`)
  }

  const handleLessonComplete = (lessonId: string) => {
    console.log(`Lesson completed: ${lessonId}`)
    // You can add additional logic here like unlocking next lessons
  }

  if (!course) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/dashboard/skill-hub')}>
            Back to Skill Hub
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push('/dashboard/skill-hub')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-gray-600">{course.description}</p>
          </div>
        </div>
      </div>

      {/* YouTube Video Player */}
      <YouTubePlayer
        videoId={course.videoId}
        title={course.title}
        description={course.description}
        duration={course.duration}
        lessonId={`lesson-${course.id}`}
        courseId={course.id}
        onProgressUpdate={handleProgressUpdate}
        onComplete={handleLessonComplete}
        hasQuiz={course.hasQuiz}
      />
    </div>
  )
}
