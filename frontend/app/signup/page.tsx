"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon, Menu, X, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isStudentEmail, setIsStudentEmail] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [verificationEmailSent, setVerificationEmailSent] = useState(false)
  
  const { signUp, signInWithGoogle } = useAuth()
  const router = useRouter()

  const checkStudentEmail = (email: string) => {
    const studentDomains = [".edu", "ac.", ".sch.", ".school.", "university.", "college."]
    return studentDomains.some(domain => email.includes(domain))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    setIsStudentEmail(checkStudentEmail(newEmail))
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error("Please enter both email and password")
      return
    }
    
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters")
      return
    }
    
    setIsLoading(true)
    
    try {
      await signUp(email, password)
      setVerificationEmailSent(true)
      toast.success("Verification email sent! Please check your inbox.")
    } catch (error: any) {
      console.error("Signup error:", error)
      toast.error(error.message || "Failed to create account. Please try again.")
      setVerificationEmailSent(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    
    try {
      await signInWithGoogle()
      toast.success("Account created successfully!")
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Google sign-in error:", error)
      toast.error(error.message || "Failed to sign in with Google. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // If verification email was sent, show success message
  if (verificationEmailSent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
          <p className="text-gray-600 mb-8">
            We've sent a verification link to <strong>{email}</strong>. Please check your inbox and click the link to verify your account.
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => router.push("/verify")}
              className="w-full"
            >
              Go to Verification Page
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/login")}
              className="w-full"
            >
              Go to Login
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full"
            >
              Return to Homepage
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Didn't receive the email? Check your spam folder or visit the verification page to resend.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className={`w-full z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'fixed top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pt-4' : 'relative border-b border-gray-100'}`}>
        <header className={`max-w-7xl mx-auto ${isScrolled ? 'bg-white rounded-xl shadow-md border border-gray-100 transition-transform duration-300 ease-in-out' : 'bg-white'}`}>
          <div className="flex justify-between items-center h-16 px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              {/* <img src="/edumeai-logo.png" alt="EduMeAI Logo" className="h-12 mr-1 transition-transform duration-200 ease-in-out group-hover:scale-105" /> */}
              <div className="flex items-center space-x-0.5">
                <span className="text-xl font-bold text-black">EduMe</span>
                <span className="text-xl font-bold text-black bg-black/10 px-1 py-0.5 rounded-md border border-black/20 ml-1">
                  AI
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/#tutoring" className="text-gray-800 hover:text-black font-medium transition-colors relative group">
                AI Tutoring
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link href="/#pathfinder" className="text-gray-800 hover:text-black font-medium transition-colors relative group">
                Career Guide
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link href="/#exams" className="text-gray-800 hover:text-black font-medium transition-colors relative group">
                Exam Prep
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link href="/#skills" className="text-gray-800 hover:text-black font-medium transition-colors relative group">
                Skill Hub
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-gray-800 hover:text-black font-medium transition-colors relative group">
                Log in
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6 text-black" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`md:hidden ${isScrolled ? 'fixed top-24 left-4 right-4' : 'relative mt-0 mx-4'} z-50 bg-white rounded-xl shadow-md border border-gray-100`}>
          <div className="px-4 py-2 space-y-2">
            <Link href="/#tutoring" className="block py-2 text-black hover:text-gray-600">
              AI Tutoring
            </Link>
            <Link href="/#pathfinder" className="block py-2 text-black hover:text-gray-600">
              Career Guide
            </Link>
            <Link href="/#exams" className="block py-2 text-black hover:text-gray-600">
              Exam Prep
            </Link>
            <Link href="/#skills" className="block py-2 text-black hover:text-gray-600">
              Skill Hub
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100 mt-2">
              <Link href="/login" className="block py-2 text-black hover:text-gray-600">
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Header spacer */}
      {isScrolled && <div className="h-24"></div>}
      <div className="flex flex-col items-center justify-center px-4 py-2">
        <div className="w-full max-w-md">
          {/* Avatar images */}
          <div className="flex justify-center mb-2">
            <div className="flex -space-x-2">
              <Image src="/placeholder-user.jpg" alt="User avatar" width={32} height={32} className="rounded-full border-2 border-white"/>
              <Image src="/placeholder-user.jpg" alt="User avatar" width={32} height={32} className="rounded-full border-2 border-white"/>
              <Image src="/placeholder-user.jpg" alt="User avatar" width={32} height={32} className="rounded-full border-2 border-white"/>
              <Image src="/placeholder-user.jpg" alt="User avatar" width={32} height={32} className="rounded-full border-2 border-white"/>
              <Image src="/placeholder-user.jpg" alt="User avatar" width={32} height={32} className="rounded-full border-2 border-white"/>
            </div>
          </div>
          {/* Join text */}
          <p className="text-center text-gray-500 text-sm mb-1">Join 135,025+ peers.</p>
          {/* Heading */}
          <h1 className="text-3xl font-bold text-center mb-3">Create your profile</h1>
          {/* Form container */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Google sign up button */}
            <button 
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 px-4 mb-4 transition-colors hover:bg-gray-50"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} height={20} />
              <span className="text-gray-700">Continue with Google</span>
            </button>
            {/* Divider */}
            <div className="flex items-center mb-4">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">or continue with email</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>
            {/* Form */}
            <form onSubmit={handleSignUp}>
              {/* Email input */}
              <div className="mb-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">Email</label>
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="you@youremail.com" 
                  className="w-full" 
                  value={email} 
                  onChange={handleEmailChange}
                  disabled={isLoading}
                  required
                />
              </div>
              {/* Password input */}
              <div className="mb-3">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">Password</label>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    placeholder="At least 6 characters" 
                    className="w-full pr-10" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    minLength={6}
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>
              {/* Student email notice */}
              {isStudentEmail && (
                <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-blue-700 text-xs">
                    <span className="font-semibold">Student account detected!</span> You'll get access to premium learning resources and special discounts.
                  </p>
                </div>
              )}
              {/* Student email bait - only show if not already using student email */}
              {!isStudentEmail && (
                <div className="mb-3 p-2 bg-gray-50 rounded-lg border border-amber-100">
                  <p className="text-amber-700 text-xs">
                    <span className="font-semibold">Have a student email?</span> Sign up with your .edu email for exclusive access to premium learning resources and special discounts!
                  </p>
                </div>
              )}
              {/* Email verification notice */}
              <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-blue-700 text-xs">
                  <span className="font-semibold">Note:</span> You will need to verify your email address before accessing all features.
                </p>
              </div>
              {/* Create profile button */}
              <Button 
                type="submit"
                className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white py-2 rounded-full flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? "Creating Profile..." : "Create Profile"}
                {!isLoading && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </Button>
            </form>
            {/* Terms text */}
            <p className="text-center text-xs text-gray-500 mt-3">
              By clicking "Create Profile" you agree to our{" "}
              <Link href="/code-of-conduct" className="text-gray-700 hover:underline">Code of Conduct</Link>,{" "}
              <Link href="/terms" className="text-gray-700 hover:underline">Terms of Service</Link> and{" "}
              <Link href="/privacy" className="text-gray-700 hover:underline">Privacy Policy</Link>.
            </p>
          </div>
          {/* Login link */}
          <p className="text-center mt-3 text-gray-600 text-sm">
            Already have a profile? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
} 