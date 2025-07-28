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
  Plus,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ArrowRight,
  Briefcase,
  GraduationCap as GradCap,
  Building2,
  BookOpen as Book,
  Menu,
  X,
  BarChart3,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function CareerGuide() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({
    interests: [],
    subjects: [],
    skills: [],
    values: []
  })
  
  const totalSteps = 5
  
  const handleOptionToggle = (category: string, option: string) => {
    setSelectedOptions(prev => {
      const current = [...(prev[category] || [])]
      if (current.includes(option)) {
        return { ...prev, [category]: current.filter(item => item !== option) }
      } else {
        return { ...prev, [category]: [...current, option] }
      }
    })
  }
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
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
              className="flex items-center px-4 py-3 text-white bg-black rounded-lg transition-colors"
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
              className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
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
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <h1 className="text-xl font-bold text-gray-900 ml-10 md:ml-0">Career Guide</h1>
            <div className="flex items-center space-x-4">
              {/* Streak Indicator */}
              <div className="hidden md:flex items-center bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
                <Award className="h-4 w-4 text-amber-500 mr-2" />
                <span className="text-sm font-medium text-amber-700">7 Day Streak</span>
                <div className="flex space-x-1 ml-2">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="font-medium text-sm">JD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-6 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">Career Pathfinder</h2>
                <span className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</span>
              </div>
              <div className="flex items-center space-x-2">
                {[...Array(totalSteps)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 h-1.5 rounded-full ${i + 1 <= currentStep ? 'bg-black' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>

            {/* Step Content */}
            <Card className="mb-6">
              <CardContent className="p-6">
                {currentStep === 1 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">What are your interests?</h3>
                    <p className="text-gray-600 mb-6">Select all that apply to you. This helps us understand what careers might align with your passions.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Technology', 'Science', 'Arts', 'Business', 'Healthcare', 'Education', 'Engineering', 'Environment', 'Media'].map((interest) => (
                        <button
                          key={interest}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            selectedOptions.interests.includes(interest) 
                              ? 'bg-black text-white border-black' 
                              : 'bg-white hover:bg-gray-50 border-gray-200'
                          }`}
                          onClick={() => handleOptionToggle('interests', interest)}
                        >
                          <div className="flex items-center">
                            {selectedOptions.interests.includes(interest) ? (
                              <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                            ) : (
                              <Circle className="h-5 w-5 mr-2 flex-shrink-0" />
                            )}
                            <span>{interest}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Which subjects do you enjoy?</h3>
                    <p className="text-gray-600 mb-6">Select the subjects you find most engaging or perform well in.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Literature', 'Languages', 'Computer Science', 'Economics', 'Psychology', 'Art', 'Music'].map((subject) => (
                        <button
                          key={subject}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            selectedOptions.subjects.includes(subject) 
                              ? 'bg-black text-white border-black' 
                              : 'bg-white hover:bg-gray-50 border-gray-200'
                          }`}
                          onClick={() => handleOptionToggle('subjects', subject)}
                        >
                          <div className="flex items-center">
                            {selectedOptions.subjects.includes(subject) ? (
                              <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                            ) : (
                              <Circle className="h-5 w-5 mr-2 flex-shrink-0" />
                            )}
                            <span>{subject}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">What skills are you good at?</h3>
                    <p className="text-gray-600 mb-6">Select the skills you believe are your strengths.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Problem Solving', 'Communication', 'Creativity', 'Leadership', 'Analytical Thinking', 'Organization', 'Teamwork', 'Technical Skills', 'Writing', 'Research', 'Public Speaking', 'Critical Thinking'].map((skill) => (
                        <button
                          key={skill}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            selectedOptions.skills.includes(skill) 
                              ? 'bg-black text-white border-black' 
                              : 'bg-white hover:bg-gray-50 border-gray-200'
                          }`}
                          onClick={() => handleOptionToggle('skills', skill)}
                        >
                          <div className="flex items-center">
                            {selectedOptions.skills.includes(skill) ? (
                              <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                            ) : (
                              <Circle className="h-5 w-5 mr-2 flex-shrink-0" />
                            )}
                            <span>{skill}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">What values are important to you?</h3>
                    <p className="text-gray-600 mb-6">Select the values that matter most in your future career.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Work-Life Balance', 'High Income', 'Making a Difference', 'Recognition', 'Independence', 'Security', 'Innovation', 'Helping Others', 'Adventure', 'Creativity', 'Leadership', 'Growth'].map((value) => (
                        <button
                          key={value}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            selectedOptions.values.includes(value) 
                              ? 'bg-black text-white border-black' 
                              : 'bg-white hover:bg-gray-50 border-gray-200'
                          }`}
                          onClick={() => handleOptionToggle('values', value)}
                        >
                          <div className="flex items-center">
                            {selectedOptions.values.includes(value) ? (
                              <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                            ) : (
                              <Circle className="h-5 w-5 mr-2 flex-shrink-0" />
                            )}
                            <span>{value}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Your Career Matches</h3>
                    <p className="text-gray-600 mb-6">Based on your responses, these careers might be a good fit for you.</p>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-start">
                          <div className="bg-blue-100 p-2 rounded-lg mr-4">
                            <Briefcase className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">Software Engineer</h4>
                            <p className="text-gray-600 text-sm mb-2">Design, develop, and maintain software systems and applications</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">Technology</span>
                              <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">Problem Solving</span>
                              <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">Mathematics</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-start">
                          <div className="bg-green-100 p-2 rounded-lg mr-4">
                            <GradCap className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">Research Scientist</h4>
                            <p className="text-gray-600 text-sm mb-2">Conduct research to advance knowledge in a specific field</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">Science</span>
                              <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">Analytical Thinking</span>
                              <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">Research</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-start">
                          <div className="bg-purple-100 p-2 rounded-lg mr-4">
                            <Building2 className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">Product Manager</h4>
                            <p className="text-gray-600 text-sm mb-2">Lead the development of products from conception to launch</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">Business</span>
                              <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">Leadership</span>
                              <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">Communication</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-black/5 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Book className="h-5 w-5 text-black mr-2" />
                        <h4 className="font-medium">Next Steps</h4>
                      </div>
                      <p className="text-sm mt-2">
                        Book a session with a career counselor to explore these options in depth and create a personalized education plan.
                      </p>
                      <Button className="mt-3 bg-black hover:bg-black/80">
                        Schedule Consultation
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="px-6 py-4 border-t flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <Button 
                  onClick={currentStep === totalSteps ? () => {} : nextStep}
                  className={currentStep === totalSteps ? "bg-green-600 hover:bg-green-700" : "bg-black hover:bg-black/80"}
                >
                  {currentStep === totalSteps ? (
                    <>
                      Save Results
                      <CheckCircle2 className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Additional Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Career Insights</CardTitle>
                  <CardDescription>Learn more about potential career paths</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Salary & Job Outlook</h4>
                      <p className="text-sm text-gray-500">Compare compensation and growth potential</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <GradCap className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Education Requirements</h4>
                      <p className="text-sm text-gray-500">Understand necessary qualifications</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                      <Briefcase className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Day in the Life</h4>
                      <p className="text-sm text-gray-500">See what professionals actually do</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Programs</CardTitle>
                  <CardDescription>Educational paths aligned with your interests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <Book className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Computer Science</h4>
                      <p className="text-sm text-gray-500">Bachelor's Degree • 4 years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Book className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Data Science</h4>
                      <p className="text-sm text-gray-500">Master's Degree • 2 years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <Book className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Product Management</h4>
                      <p className="text-sm text-gray-500">Certificate • 6 months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}