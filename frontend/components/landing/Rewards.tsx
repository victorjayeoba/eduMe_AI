import { Card, CardContent } from "@/components/ui/card"

export default function Rewards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Level Up Your Learning</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay motivated and track your progress with our interactive rewards system.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="h-3 bg-black/10"></div>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">XP & Levels</h3>
              <p className="text-gray-600 mb-6">
                Earn experience points for completing lessons, solving problems, and helping others. Level up to unlock new features and rewards.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div className="bg-black/70 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <p className="text-sm text-gray-500">Level 7 • 70% to Level 8</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="h-3 bg-black/10"></div>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Streaks & Achievements</h3>
              <p className="text-gray-600 mb-6">
                Maintain your daily learning streak and earn badges for consistent study habits and milestone achievements.
              </p>
              <div className="flex justify-center space-x-1 mb-1">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center ${i < 5 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                    {i + 1}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">5-day streak • 2 days to next reward</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="h-3 bg-black/10"></div>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-black">
                  <path d="M8 6h13"></path>
                  <path d="M8 12h13"></path>
                  <path d="M8 18h13"></path>
                  <path d="M3 6h.01"></path>
                  <path d="M3 12h.01"></path>
                  <path d="M3 18h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Leaderboards</h3>
              <p className="text-gray-600 mb-6">
                Compete with friends and other students on subject-specific leaderboards. Rise to the top and earn special recognition.
              </p>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg mb-1">
                <div className="flex items-center">
                  <div className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center mr-2">3</div>
                  <span>Your Ranking</span>
                </div>
                <span className="font-bold">2,450 pts</span>
              </div>
              <p className="text-sm text-gray-500">Top 5% in Mathematics this week</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 