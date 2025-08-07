"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Maximize,
  CheckCircle,
  Clock,
  BookOpen,
  AlertCircle
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface VideoPlayerProps {
  videoUrl: string
  title: string
  description: string
  duration: number // in seconds
  lessonId: string
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

export function VideoPlayer({
  videoUrl,
  title,
  description,
  duration,
  lessonId,
  onProgressUpdate,
  onComplete,
  initialProgress = 0,
  hasQuiz = false,
  quizData
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(initialProgress)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration)
    }

    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / videoDuration) * 100
      setCurrentTime(video.currentTime)
      setProgress(currentProgress)
      
      // Update progress every 5 seconds
      if (Math.floor(video.currentTime) % 5 === 0) {
        onProgressUpdate(currentProgress)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (hasQuiz && !quizSubmitted) {
        setShowQuiz(true)
      } else if (!hasQuiz) {
        handleComplete()
      }
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [hasQuiz, quizSubmitted, onProgressUpdate, videoDuration])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds))
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    const video = videoRef.current
    if (!video) return

    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const submitQuiz = () => {
    if (!quizData) return

    let correctAnswers = 0
    const totalQuestions = quizData.questions.length

    quizData.questions.forEach(question => {
      const userAnswer = quizAnswers[question.id]
      if (userAnswer === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = (correctAnswers / totalQuestions) * 100
    setQuizScore(score)
    setQuizSubmitted(true)

    if (score >= quizData.passingScore) {
      toast({
        title: "Quiz Passed! 🎉",
        description: `You scored ${score.toFixed(1)}% - Great job!`,
      })
      handleComplete()
    } else {
      toast({
        title: "Quiz Failed",
        description: `You scored ${score.toFixed(1)}%. You need ${quizData.passingScore}% to pass.`,
        variant: "destructive"
      })
    }
  }

  const handleComplete = () => {
    setIsCompleted(true)
    onComplete(lessonId)
    toast({
      title: "Lesson Completed! 🎉",
      description: "Great job! You've completed this lesson.",
    })
  }

  const retakeQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
    setShowQuiz(false)
  }

  return (
    <div className="space-y-6">
      {/* Video Player */}
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
            <video
              ref={videoRef}
              className="w-full h-64 md:h-96"
              poster="/placeholder.jpg"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => skip(-10)}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => skip(10)}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-sm">{formatTime(currentTime)}</span>
                    <Progress value={progress} className="flex-1 h-1" />
                    <span className="text-white text-sm">{formatTime(videoDuration)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Section */}
      {hasQuiz && quizData && (
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
                  {quizData.questions.length} questions • {quizData.passingScore}% passing score
                </div>
              </div>
            ) : showQuiz && !quizSubmitted ? (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Lesson Quiz</h3>
                  <p className="text-gray-600">
                    Answer all questions to complete this lesson. You need {quizData.passingScore}% to pass.
                  </p>
                </div>

                {quizData.questions.map((question, index) => (
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
                    disabled={Object.keys(quizAnswers).length < quizData.questions.length}
                  >
                    Submit Quiz
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  quizScore >= quizData.passingScore ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {quizScore >= quizData.passingScore ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {quizScore >= quizData.passingScore ? 'Quiz Passed!' : 'Quiz Failed'}
                </h3>
                <p className="text-gray-600 mb-4">
                  Your score: {quizScore.toFixed(1)}%
                </p>
                {quizScore < quizData.passingScore && (
                  <Button onClick={retakeQuiz} variant="outline">
                    Retake Quiz
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
