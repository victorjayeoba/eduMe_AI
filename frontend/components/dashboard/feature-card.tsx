"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Video, GraduationCap, MessageSquare, BookOpen } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  videoSrc: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  gradientFrom: string;
  gradientTo: string;
  status: string;
  gradientDirection: "from-white via-gray-300 to-black" | "from-black via-gray-300 to-white";
}

export function FeatureCard({
  title,
  description,
  href,
  videoSrc,
  icon: Icon,
  iconBg,
  gradientFrom,
  gradientTo,
  status,
  gradientDirection
}: FeatureCardProps) {
  return (
    <Link href={href}>
      <Card className="overflow-hidden border-0 shadow-sm bg-white hover:shadow-md transition-all duration-300 group cursor-pointer">
        <div className={`relative h-32 bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
          <video 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            autoPlay 
            muted 
            loop
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span>{status}</span>
          </div>
        </CardContent>
        <div className={`h-1 bg-gradient-to-r ${gradientDirection}`}></div>
      </Card>
    </Link>
  );
}
