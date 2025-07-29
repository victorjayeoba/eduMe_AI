import { Button } from "@/components/ui/button"
import { useState } from "react"

const questions = [
  {
    question: "What subjects do you enjoy the most?",
    options: ["Mathematics", "Sciences", "Languages", "Arts"],
  },
  {
    question: "Which activity do you prefer?",
    options: ["Solving puzzles", "Conducting experiments", "Writing stories", "Designing graphics"],
  },
  {
    question: "What is your strongest skill?",
    options: ["Logical thinking", "Observation", "Communication", "Creativity"],
  },
  {
    question: "Which environment do you thrive in?",
    options: ["Structured", "Hands-on", "Collaborative", "Flexible"],
  },
  {
    question: "What motivates you the most?",
    options: ["Solving problems", "Discovering new things", "Helping others communicate", "Expressing ideas visually"],
  },
]

const resultsMock = [
  {
    title: "Computer Science",
    desc: "Based on your interest in problem-solving and mathematics",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>
    ),
  },
  {
    title: "Data Science",
    desc: "Matches your analytical thinking and interest in technology",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
  },
  {
    title: "Digital Marketing",
    desc: "Aligns with your creativity and communication skills",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
  },
]

export default function CareerGuide() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null))
  const [showResults, setShowResults] = useState(false)

  const handleOptionClick = (option: string) => {
    const newAnswers = [...answers]
    newAnswers[current] = option
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setAnswers(Array(questions.length).fill(null))
    setShowResults(false)
  }

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
                <div className="text-center p-6 w-full">
                  <h3 className="text-xl font-bold mb-4">Career Assessment</h3>
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    {questions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full ${idx === current ? "bg-white" : "bg-white/50"}`}
                      ></div>
                    ))}
                  </div>
                  {!showResults ? (
                    <>
                      <p className="text-lg mb-4">{questions[current].question}</p>
                      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                        {questions[current].options.map((option) => (
                          <button
                            key={option}
                            className={`py-2 px-4 rounded-md text-sm transition-colors ${
                              answers[current] === option
                                ? "bg-black text-white"
                                : "bg-gray-700 hover:bg-gray-600"
                            }`}
                            onClick={() => handleOptionClick(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <h4 className="text-lg font-semibold mb-2">Assessment Complete!</h4>
                      <Button className="mt-2 bg-white text-black hover:bg-gray-200 rounded-full text-sm" onClick={handleRestart}>
                        Restart Assessment
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Indicator */}
              {!showResults && (
                <div className="flex justify-between items-center mt-4">
                  <button
                    className={`p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors ${current === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handlePrev}
                    disabled={current === 0}
                    aria-label="Previous"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  <div className="text-sm">
                    Question {current + 1} of {questions.length}
                  </div>
                  <button
                    className={`p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors ${
                      !answers[current] ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleNext}
                    disabled={!answers[current]}
                    aria-label="Next"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Results Preview */}
            <div className="p-8">
              <h3 className="text-xl font-bold text-black mb-6">Your Career Path Results</h3>
              <div className="space-y-4">
                {showResults ? (
                  // Show results based on answers (for now, just show all mock results)
                  resultsMock.map((result, idx) => (
                    <div key={result.title} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center mr-3">
                          {result.icon}
                        </div>
                        <h4 className="font-bold">{result.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 pl-12">{result.desc}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-16">
                    <div className="mb-2">Complete the assessment to see your results!</div>
                  </div>
                )}
              </div>
              <div className="mt-6 text-center">
                {showResults ? (
                  <Button className="bg-black text-white hover:bg-black/80 px-6 py-2 rounded-full text-sm" onClick={handleRestart}>
                    Restart Assessment
                  </Button>
                ) : (
                  <Button
                    className="bg-black text-white hover:bg-black/80 px-6 py-2 rounded-full text-sm"
                    onClick={handleNext}
                    disabled={!answers[current]}
                  >
                    {current === questions.length - 1 ? "Complete Assessment" : "Next"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}