'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home, GraduationCap, Briefcase, BookOpen, FileText, Gift, Target, Trophy, Award, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
}

interface NavItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  path: string;
  section?: string;
}

const navItems: NavItem[] = [
  // MAIN Section
  { icon: Home, label: "Dashboard", path: "/dashboard", section: "MAIN" },
  { icon: GraduationCap, label: "AI Tutoring", path: "/dashboard/ai-tutoring", section: "MAIN" },
  { icon: Briefcase, label: "Career Guide", path: "/dashboard/career-guide", section: "MAIN" },
  { icon: Target, label: "Skill Hub", path: "/dashboard/skill-hub", section: "MAIN" },
  
  // LEARNING Section

  { icon: Trophy, label: "Contests", path: "/dashboard/contests", section: "LEARNING" },
  
  // ENGAGEMENT Section
  { icon: Trophy, label: "Leaderboard", path: "/dashboard/leaderboard", section: "ENGAGEMENT" },
  { icon: Award, label: "Rewards", path: "/dashboard/rewards", section: "ENGAGEMENT" },
  
  // SETTINGS Section
  { icon: Settings, label: "Settings", path: "/dashboard/settings", section: "SETTINGS" },
  { icon: LogOut, label: "Logout", path: "/", section: "SETTINGS" },
];

export function Sidebar({ expanded, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const groupedNavItems = navItems.reduce((acc, item) => {
    const section = item.section || 'OTHER';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  return (
    <aside 
      className={`${
        expanded ? 'w-64' : 'w-20'
      } bg-white border-r border-gray-200 transition-all duration-300 h-screen z-10 hidden md:block fixed left-0 top-0`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className={`${expanded ? 'flex' : 'hidden'} items-center`}>
          <span className="text-xl font-bold">EdumeAI</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="ml-auto"
        >
          {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </Button>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {Object.entries(groupedNavItems).map(([section, items]) => (
            <div key={section} className="mb-4">
              {expanded && (
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
                  {section}
                </h3>
              )}
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                const isLogout = item.path === "/logout";
                
                return (
                  <li key={item.path}>
                    <Link href={item.path} className="block">
                      <div 
                        className={`${
                          isActive 
                            ? 'bg-gray-100 text-gray-900' 
                            : isLogout
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-gray-600 hover:bg-gray-50'
                        } flex items-center px-3 py-2 rounded-md transition-colors`}
                      >
                        <span className="mr-3">
                          <Icon size={20} />
                        </span>
                        {expanded && (
                          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.label}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </div>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 