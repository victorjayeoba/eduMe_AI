"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  AlertCircle,
  Youtube
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useRouter } from "next/navigation"

interface YouTubePlayerProps {
  videoId: string
  title: string
  description: string
  duration: number // in seconds
  lessonId: string
  courseId: string
  onProgressUpdate: (progress: number) => void
  onComplete: (lessonId: string) => void
  initialProgress?: number
  hasQuiz?: boolean
  quizData?: QuizData
}

interface QuizData {
  questions: QuizQuestion[]
  passingScore: number
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export function YouTubePlayer({
  videoId,
  title,
  description,
  duration,
  lessonId,
  courseId,
  onProgressUpdate,
  onComplete,
  initialProgress = 0,
  hasQuiz = false,
  quizData
}: YouTubePlayerProps) {
  const [progress, setProgress] = useState(initialProgress)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isVideoWatched, setIsVideoWatched] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  // Track video progress in Firebase
  const updateProgressInFirebase = async (newProgress: number) => {
    if (!user) return

    try {
      const userRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userRef)
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        const courseProgress = userData.courseProgress || {}
        const lessonProgress = courseProgress[courseId] || {}
        
        lessonProgress[lessonId] = {
          progress: newProgress,
          completed: newProgress >= 100,
          lastUpdated: new Date().toISOString()
        }

        await updateDoc(userRef, {
          courseProgress: {
            ...courseProgress,
            [courseId]: lessonProgress
          }
        })
      }
    } catch (error) {
      console.error("Error updating progress in Firebase:", error)
    }
  }

  // Set initial progress to 50% when component mounts
  useEffect(() => {
    if (progress === 0) {
      setProgress(50)
      updateProgressInFirebase(50)
      onProgressUpdate(50)
    }
  }, [])

  // Handle quiz answer selection
  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  // Submit quiz
  const submitQuiz = () => {
    if (!currentQuizData) return

    let correctAnswers = 0
    const totalQuestions = currentQuizData.questions.length

    currentQuizData.questions.forEach(question => {
      const userAnswer = quizAnswers[question.id]
      if (userAnswer === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = (correctAnswers / totalQuestions) * 100
    setQuizScore(score)
    setQuizSubmitted(true)

    if (score >= currentQuizData.passingScore) {
      toast({
        title: "Quiz Passed! 🎉",
        description: `You scored ${score.toFixed(1)}% - Great job! Course marked as completed.`,
      })
      handleComplete()
    } else {
      toast({
        title: "Quiz Failed",
        description: `You scored ${score.toFixed(1)}%. You need ${currentQuizData.passingScore}% to pass. You can retake the quiz.`,
        variant: "destructive"
      })
    }
  }

  // Handle lesson completion
  const handleComplete = async () => {
    setIsCompleted(true)
    setProgress(100)
    await updateProgressInFirebase(100)
    onComplete(lessonId)
    toast({
      title: "Course Completed! 🎉",
      description: "Congratulations! You've successfully completed this course.",
    })
  }

  // Retake quiz
  const retakeQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
    setShowQuiz(false)
    toast({
      title: "Quiz Reset",
      description: "You can now retake the quiz. Good luck!",
    })
  }

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Mock quiz data for each course
  const getQuizData = (courseId: string): QuizData => {
    const quizQuestions = {
      "web-development": [
        {
          id: "1",
          question: "What does HTML stand for?",
          options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
          correctAnswer: 0
        },
        {
          id: "2", 
          question: "Which tag is used to create a hyperlink?",
          options: ["<link>", "<a>", "<href>", "<url>"],
          correctAnswer: 1
        }
      ],
      "data-analysis": [
        {
          id: "1",
          question: "What is the primary purpose of data visualization?",
          options: ["To make data look pretty", "To communicate insights clearly", "To store data efficiently", "To process data faster"],
          correctAnswer: 1
        },
        {
          id: "2",
          question: "Which chart type is best for showing trends over time?",
          options: ["Pie chart", "Bar chart", "Line chart", "Scatter plot"],
          correctAnswer: 2
        }
      ],
      "ux-ui-design": [
        {
          id: "1",
          question: "What does UX stand for?",
          options: ["User Experience", "User Interface", "User Execution", "User Extension"],
          correctAnswer: 0
        },
        {
          id: "2",
          question: "What is the primary goal of user-centered design?",
          options: ["To make designs look modern", "To meet user needs and preferences", "To reduce development costs", "To follow design trends"],
          correctAnswer: 1
        }
      ],
      "artificial-intelligence": [
        {
          id: "1",
          question: "What is machine learning?",
          options: ["A type of computer hardware", "A subset of artificial intelligence", "A programming language", "A database system"],
          correctAnswer: 1
        },
        {
          id: "2",
          question: "Which algorithm is commonly used for classification?",
          options: ["Linear Regression", "K-Means", "Random Forest", "All of the above"],
          correctAnswer: 3
        }
      ],
      "communication": [
        {
          id: "1",
          question: "What is active listening?",
          options: ["Hearing what someone says", "Fully concentrating on what is being said", "Agreeing with everything said", "Interrupting to ask questions"],
          correctAnswer: 1
        },
        {
          id: "2",
          question: "What is the 7-38-55 rule in communication?",
          options: ["Words-Tone-Body Language", "Time-Energy-Focus", "Speed-Volume-Pitch", "None of the above"],
          correctAnswer: 0
        }
      ],
      "leadership": [
        {
          id: "1",
          question: "What is transformational leadership?",
          options: ["Leading by fear", "Inspiring and motivating others", "Following strict rules", "Avoiding change"],
          correctAnswer: 1
        },
        {
          id: "2",
          question: "What is emotional intelligence in leadership?",
          options: ["Being emotional", "Understanding and managing emotions", "Ignoring emotions", "Expressing anger"],
          correctAnswer: 1
        }
      ],
      "critical-thinking": [
        {
          id: "1",
          question: "What is the first step in critical thinking?",
          options: ["Drawing conclusions", "Identifying the problem", "Evaluating evidence", "Making assumptions"],
          correctAnswer: 1
        },
        {
          id: "2",
          question: "What is cognitive bias?",
          options: ["A type of memory", "Systematic error in thinking", "Learning disability", "Mental illness"],
          correctAnswer: 1
        }
      ],
      "time-management": [
        {
          id: "1",
          question: "What is the Pomodoro Technique?",
          options: ["A time management method", "A cooking technique", "A study method", "A meditation practice"],
          correctAnswer: 0
        },
        {
          id: "2",
          question: "What does the Eisenhower Matrix help prioritize?",
          options: ["Tasks by importance and urgency", "Goals by difficulty", "Projects by cost", "People by skills"],
          correctAnswer: 0
        }
      ]
    }

    return {
      questions: quizQuestions[courseId as keyof typeof quizQuestions] || [],
      passingScore: 70
    }
  }

  const currentQuizData = quizData || getQuizData(courseId)

  return (
    <div className="space-y-6">
      {/* YouTube Video Player */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
            {isCompleted && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative bg-black">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Youtube className="h-4 w-4" />
                    <span className="text-sm">YouTube Video</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{formatTime(duration)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Progress</span>
                  <Progress value={progress} className="w-20 h-1" />
                  <span className="text-sm">{Math.round(progress)}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Completion Button */}
      {!isVideoWatched && !isCompleted && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Have you finished watching the video? Click the button below to proceed to the quiz.
              </p>
              <Button 
                onClick={() => {
                  setIsVideoWatched(true)
                  if (hasQuiz) {
                    setShowQuiz(true)
                  } else {
                    handleComplete()
                  }
                }}
                className="w-full"
              >
                <Play className="w-4 h-4 mr-2" />
                I've Finished Watching
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quiz Section */}
      {hasQuiz && currentQuizData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Lesson Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showQuiz && !quizSubmitted ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Quiz Available</h3>
                <p className="text-gray-600 mb-4">
                  Complete the video to take the quiz and mark this lesson as complete.
                </p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {currentQuizData.questions.length} questions • {currentQuizData.passingScore}% passing score
                </div>
              </div>
            ) : showQuiz && !quizSubmitted ? (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Lesson Quiz</h3>
                  <p className="text-gray-600">
                    Answer all questions to complete this lesson. You need {currentQuizData.passingScore}% to pass.
                  </p>
                </div>

                {currentQuizData.questions.map((question, index) => (
                  <div key={question.id} className="space-y-3">
                    <h4 className="font-medium">
                      Question {index + 1}: {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={optionIndex}
                            checked={quizAnswers[question.id] === optionIndex}
                            onChange={() => handleQuizAnswer(question.id, optionIndex)}
                            className="text-blue-600"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowQuiz(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length < currentQuizData.questions.length}
                  >
                    Submit Quiz
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  quizScore >= currentQuizData.passingScore ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {quizScore >= currentQuizData.passingScore ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {quizScore >= currentQuizData.passingScore ? 'Quiz Passed!' : 'Quiz Failed'}
                </h3>
                <p className="text-gray-600 mb-4">
                  Your score: <span className="font-bold text-lg">{quizScore.toFixed(1)}%</span>
                </p>
                
                {/* Score breakdown */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Correct Answers:</span>
                    <span className="font-semibold">
                      {Math.round((quizScore / 100) * currentQuizData.questions.length)} / {currentQuizData.questions.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Passing Score:</span>
                    <span className="font-semibold">{currentQuizData.passingScore}%</span>
                  </div>
                </div>

                {quizScore >= currentQuizData.passingScore ? (
                  <div className="space-y-3">
                    <p className="text-green-600 font-medium">
                      ✅ Congratulations! You've successfully completed this course.
                    </p>
                    <Button 
                      onClick={() => router.push('/dashboard/skill-hub')}
                      className="w-full"
                    >
                      Back to Skill Hub
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-red-600 font-medium">
                      ❌ You need to score at least {currentQuizData.passingScore}% to pass.
                    </p>
                    <Button onClick={retakeQuiz} variant="outline" className="w-full">
                      Retake Quiz
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
