"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Gem } from "lucide-react";

interface LeaderboardUser {
  id: string;
  name: string;
  gems: number;
  totalTimeSpent: number;
}

interface LeaderboardCardProps {
  leaderboardData: LeaderboardUser[];
  currentUserName: string;
}

export function LeaderboardCard({ leaderboardData, currentUserName }: LeaderboardCardProps) {
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

  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-6 pb-0">
        <CardTitle className="text-lg font-semibold">Leaderboard</CardTitle>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {leaderboardData.map((leaderboardUser, index) => (
            <div
              key={leaderboardUser.id}
              className={`flex items-center p-3 rounded-lg ${leaderboardUser.name === currentUserName ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50"}`}
            >
              <div className="w-8 text-center font-bold text-gray-500">{index + 1}</div>
              <div className="h-10 w-10 rounded-full overflow-hidden mx-3 bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {leaderboardUser.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${leaderboardUser.name === currentUserName ? "text-blue-600" : ""}`}>
                  {leaderboardUser.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {formatTime(leaderboardUser.totalTimeSpent)}
                </p>
              </div>
              <div className="flex items-center">
                <div className="mr-3 flex items-center">
                  <Gem className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="font-bold">{leaderboardUser.gems}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link href="/dashboard/leaderboard">
          <Button variant="ghost" className="w-full text-sm mt-4">
            View Full Leaderboard
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
