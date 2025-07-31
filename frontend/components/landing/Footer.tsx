import Link from "next/link"

export default function Footer() {
  return (
    <footer id="about" className="py-12 border-t border-gray-300 relative">
      <div className="absolute inset-0 z-0 opacity-10">
        <img src="/world-map.png" alt="World Map" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              {/* <img src="/edumeai-logo.png" alt="EduMeAI Logo" className="h-8 mr-2" /> */}
              <div className="flex items-center space-x-0.5">
                <span className="text-xl font-bold text-black">EduMe</span>
                <span className="text-xl font-bold text-black bg-black/10 px-1 py-0.5 rounded-md border border-black/20">
                  AI
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Your AI-powered live tutoring platform for personalized learning, career guidance, and skill development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-black mb-4">Features</h4>
            <ul className="space-y-2">
              <li><a href="#tutoring" className="text-gray-600 hover:text-black">AI Tutoring</a></li>
              <li><a href="#pathfinder" className="text-gray-600 hover:text-black">Career Guide</a></li>
              <li><a href="#exams" className="text-gray-600 hover:text-black">Exam Preparation</a></li>
              <li><a href="#skills" className="text-gray-600 hover:text-black">Skill Development</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-black mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">For Parents</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-black mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Careers</a></li>
              <li><a href="#privacy" className="text-gray-600 hover:text-black">Privacy Policy</a></li>
              <li><a href="#terms" className="text-gray-600 hover:text-black">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">© 2025 EduMeAi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 