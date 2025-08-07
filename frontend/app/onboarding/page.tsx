"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, User, BookOpen, ArrowRight, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface UserProfile {
  name: string
  educationLevel: string
  email: string
  totalTimeSpent: number
  gems: number
  lastActive: Date
  createdAt: Date
  updatedAt: Date
}

export default function OnboardingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    educationLevel: ""
  })

  // Education level options
  const educationLevels = [
    { value: "high-school", label: "High School" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "graduate", label: "Graduate" },
    { value: "phd", label: "PhD" },
    { value: "professional", label: "Professional Development" },
    { value: "other", label: "Other" }
  ]

  // Check if user is already onboarded
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!loading && user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists() && userDoc.data().name) {
            // User is already onboarded, redirect to dashboard
            router.push("/dashboard")
          }
        } catch (error) {
          console.error("Error checking onboarding status:", error)
        }
      }
    }

    checkOnboardingStatus()
  }, [user, loading, router])

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error("Please sign in to continue")
      return
    }

    if (!formData.name.trim() || !formData.educationLevel) {
      toast.error("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      const userProfile: UserProfile = {
        name: formData.name.trim(),
        educationLevel: formData.educationLevel,
        email: user.email || "",
        totalTimeSpent: 0,
        gems: 0,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), userProfile)

      toast.success("Profile created successfully!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving user profile:", error)
      toast.error("Failed to save profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
          
            <div className="text-left flex items-center justify-center">
              <h1 className="text-2xl font-bold text-gray-900">EduMe</h1>
              <span className="text-sm font-medium text-gray-700 bg-gray-200 px-2 py-1 rounded-full">
                AI
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to EduMe AI!</h2>
          <p className="text-gray-600">Let's personalize your learning experience</p>
        </div>

        {/* Onboarding Form */}
        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Complete Your Profile
            </CardTitle>
            <p className="text-sm text-gray-600">
              This helps us provide you with the best learning experience
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    required
                  />
                </div>
              </div>

              {/* Education Level Select */}
              <div className="space-y-2">
                <Label htmlFor="educationLevel" className="text-sm font-medium text-gray-700">
                  Education Level
                </Label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
                  <Select
                    value={formData.educationLevel}
                    onValueChange={(value) => handleInputChange("educationLevel", value)}
                  >
                    <SelectTrigger className="pl-10 h-12 border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gray-800 hover:bg-gray-900 text-white font-medium"
                disabled={isSubmitting || !formData.name.trim() || !formData.educationLevel}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Profile...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Complete Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Progress Indicator */}
            <div className="mt-6">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Step 2 of 3: Profile Setup
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-4 w-4 text-gray-700" />
            </div>
            <p className="text-xs text-gray-600">AI Tutoring</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
              <GraduationCap className="h-4 w-4 text-gray-700" />
            </div>
            <p className="text-xs text-gray-600">Career Guide</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="h-4 w-4 text-gray-700" />
            </div>
            <p className="text-xs text-gray-600">Exam Prep</p>
          </div>
        </div>
      </div>
    </div>
  )
} 