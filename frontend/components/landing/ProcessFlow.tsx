import { useEffect, useRef } from "react";
import Link from "next/link";
//update
const steps = [
  {
    title: "Engage with your AI tutor",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
        <circle cx="12" cy="12" r="4"></circle>
        <line x1="2" y1="12" x2="4" y2="12"></line>
        <line x1="20" y1="12" x2="22" y2="12"></line>
        <line x1="12" y1="2" x2="12" y2="4"></line>
        <line x1="12" y1="20" x2="12" y2="22"></line>
      </svg>
    ),
  },
  {
    title: "Input your problem",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
      </svg>
    ),
  },
  {
    title: "Work together to solve it",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    ),
  },
  {
    title: "Custom feedback and learning tips",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"></polygon>
      </svg>
    ),
  },
];

function AnimatedFlowLine() {
  return (
    <svg
      className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-32 pointer-events-none z-0"
      width="100%"
      height="128"
      viewBox="0 0 1200 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: "100%", minHeight: "128px" }}
    >
      <path
        id="main-flow"
        d="M 80 64 Q 300 0 420 64 Q 540 128 660 64 Q 780 0 1000 64"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="8 4"
        fill="none"
        strokeLinecap="round"
        className="text-gray-300"
      />
      <circle 
        id="flow-ball" 
        r="8" 
        fill="#000" 
        className="animate-flow-path"
      >
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          path="M 80 64 Q 300 0 420 64 Q 540 128 660 64 Q 780 0 1000 64"
        />
      </circle>
    </svg>
  );
}

export default function ProcessFlow() {
  return (
    <section id="process" className="relative py-24 bg-white overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Journey Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI tutor adapts to your learning style, providing personalized guidance every step of the way.
          </p>
        </div>

        {/* Animated Flow Line */}
        <div className="hidden lg:block w-full h-32 relative mb-0">
          <AnimatedFlowLine />
        </div>

        {/* Steps */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center relative"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <div className="text-gray-700">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
              {i < steps.length - 1 && (
                <div className="lg:hidden w-px h-8 bg-gray-200 my-2" />
              )}
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link href="/signup" className="inline-block px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
            Start Learning Now
          </Link>
        </div>
      </div>
    </section>
  );
}