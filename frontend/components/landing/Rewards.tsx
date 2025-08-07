import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Gem, Trophy, Star } from "lucide-react"

export default function Rewards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Connect Wallet to Claim Tokens</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect your wallet to earn rewards, claim tokens, and unlock exclusive benefits.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Wallet Connection Card */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Connect Your Wallet</h3>
              <p className="text-gray-600 mb-6">
                Connect your MetaMask wallet to start earning rewards and claiming tokens for your learning achievements.
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
          
          {/* Gem Rewards Card */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-amber-400 to-orange-500"></div>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gem className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Earn Gems & Tokens</h3>
              <p className="text-gray-600 mb-6">
                Complete courses and earn gems that can be converted to tokens. Build your digital asset portfolio.
              </p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Gem className="w-6 h-6 text-amber-500" />
                <span className="text-2xl font-bold text-amber-600">1,250</span>
                <span className="text-gray-500">Gems</span>
              </div>
              <p className="text-sm text-gray-500">≈ 125 tokens available to claim</p>
            </CardContent>
          </Card>
          
          {/* Token Claiming Card */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-600"></div>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Claim Your Rewards</h3>
              <p className="text-gray-600 mb-6">
                Convert your earned gems to tokens and claim exclusive rewards. Unlock special features and benefits.
              </p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="w-6 h-6 text-green-500" />
                <span className="text-2xl font-bold text-green-600">85</span>
                <span className="text-gray-500">Tokens</span>
              </div>
              <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                Claim Tokens
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional Info Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8">
            <h3 className="text-xl font-bold text-black mb-4">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <span className="text-gray-700">Connect your MetaMask wallet</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 font-bold">2</span>
                </div>
                <span className="text-gray-700">Complete courses to earn gems</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <span className="text-gray-700">Convert gems to tokens and claim rewards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 