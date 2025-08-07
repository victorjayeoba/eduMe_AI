"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface WeeklyProgressData {
  day: string;
  hours: number;
}

interface WeeklyProgressProps {
  data: WeeklyProgressData[];
}

export function WeeklyProgress({ data }: WeeklyProgressProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-sm lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between p-6 pb-0">
        <CardTitle className="text-lg font-semibold">Weekly Progress</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Filter className="h-3 w-3 mr-1" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 relative">
        <div className="h-64">
          <div className="w-full h-full flex items-end space-x-2">
            {data.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t-md transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${(day.hours / 10) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-gray-600 text-white font-bold rounded-full text-lg">
              Coming Soon
            </span>
            <p className="text-white mt-2 max-w-xs">
              Weekly progress tracking will be available in the next update
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
