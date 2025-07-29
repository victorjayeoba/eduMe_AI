import { Button } from "@/components/ui/button"

export default function CareerGuide() {
  return (
    <section id="pathfinder" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Find Your Perfect Academic Path</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our Career Guide helps you discover university courses and career paths aligned with your interests, strengths, and goals through a personalized assessment.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Career Assessment Interface */}
            <div className="p-8 bg-gray-900 text-white relative">
              <div className="aspect-video bg-gray-800 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center">
                <div className="text-center p-6">
                  <h3 className="text-xl font-bold mb-4">Career Assessment</h3>
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                </div>
                  <p className="text-lg mb-4">What subjects do you enjoy the most?</p>
                  <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                    <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md text-sm transition-colors">
                      Mathematics
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md text-sm transition-colors">
                      Sciences
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md text-sm transition-colors">
                      Languages
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-md text-sm transition-colors">
                      Arts
                    </button>
                </div>
              </div>
            </div>

              {/* Progress Indicator */}
              <div className="flex justify-between items-center">
                <button className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <div className="text-sm">Question 1 of 5</div>
                <button className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Results Preview */}
            <div className="p-8">
              <h3 className="text-xl font-bold text-black mb-6">Your Career Path Results</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                      </svg>
                    </div>
                    <h4 className="font-bold">Computer Science</h4>
                  </div>
                  <p className="text-sm text-gray-600 pl-12">Based on your interest in problem-solving and mathematics</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </div>
                    <h4 className="font-bold">Data Science</h4>
                  </div>
                  <p className="text-sm text-gray-600 pl-12">Matches your analytical thinking and interest in technology</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                    </div>
                    <h4 className="font-bold">Digital Marketing</h4>
                  </div>
                  <p className="text-sm text-gray-600 pl-12">Aligns with your creativity and communication skills</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button className="bg-black text-white hover:bg-black/80 px-6 py-2 rounded-full text-sm">
                  Complete Assessment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 