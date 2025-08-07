"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Gem, TrendingUp, RefreshCw, Plus } from "lucide-react";

interface WelcomeCardProps {
  userName: string;
  totalTimeSpent: number;
  gems: number;
  lastUpdated: string;
  onRefresh: () => void;
}

export function WelcomeCard({ 
  userName, 
  totalTimeSpent, 
  gems, 
  lastUpdated, 
  onRefresh 
}: WelcomeCardProps) {
  // Format time display
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    } else {
      return `${remainingMinutes}m`;
    }
  };

  const metrics = [
    { 
      title: "Time Spent", 
      value: formatTime(totalTimeSpent), 
      change: "+1m", 
      changeType: "increase", 
      icon: Clock,
      iconBg: "bg-gray-100", 
      iconColor: "text-gray-600" 
    },
    { 
      title: "Gems Earned", 
      value: `${gems}`, 
      change: "+1", 
      changeType: "increase", 
      icon: Gem,
      iconBg: "bg-amber-100", 
      iconColor: "text-amber-600" 
    },
  ];

  return (
    <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-r from-gray-800 to-gray-700 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side - Welcome message */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
              <p className="text-gray-300 mb-3">Ready to ace your studies today?</p>
              <p className="text-sm text-gray-400 mb-2">Keep pushing towards your academic goals!</p>
              <p className="text-xs text-gray-500">Last updated: {lastUpdated}</p>
            </div>
          </div>
          
          {/* Right side - Metrics and Buttons */}
          <div className="lg:w-2/3">
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-gray-600/50 rounded-lg p-4 backdrop-blur-sm border border-gray-500/30 hover:border-gray-400/40 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`${metric.iconBg} w-8 h-8 rounded-lg flex items-center justify-center shadow-md`}>
                        <Icon className={`h-4 w-4 ${metric.iconColor}`} />
                      </div>
                      <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        metric.changeType === 'increase' ? 'bg-green-500/30 text-green-200' : 'bg-red-500/30 text-red-200'
                      }`}>
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>{metric.change}</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-2 tracking-tight">{metric.value}</h3>
                    <p className="text-sm text-gray-300 font-medium">{metric.title}</p>
                  </div>
                );
              })}
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-3">
              <Button 
                className="bg-gray-600 hover:bg-gray-500 text-white border-0 flex items-center flex-1"
                size="sm"
                onClick={onRefresh}
              >
                <RefreshCw className="h-3 w-3 mr-1.5" />
                Refresh
              </Button>
              <Button 
                className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 flex items-center flex-1"
                size="sm"
                onClick={() => window.location.href = "/dashboard/ai-tutoring"}
              >
                <Plus className="h-3 w-3 mr-1.5" />
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
