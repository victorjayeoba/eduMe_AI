'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home, GraduationCap, Briefcase, BookOpen, FileText, Gift } from 'lucide-react';

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
}

export function Sidebar({ expanded, onToggle }: SidebarProps) {
  const pathname = usePathname();
  
  // Navigation items
  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <GraduationCap size={20} />, label: "AI Tutoring", path: "/dashboard/ai-tutoring" },
    { icon: <Briefcase size={20} />, label: "Career Guide", path: "/dashboard/career-guide" },
    { icon: <BookOpen size={20} />, label: "Exam Prep", path: "/dashboard/exam-prep" },
    // { icon: <FileText size={20} />, label: "Resources", path: "/dashboard/resources" },
    { icon: <Gift size={20} />, label: "Rewards", path: "/dashboard/rewards" },
  ];

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
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className="block">
                <div 
                  className={`${
                    pathname === item.path 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50'
                  } flex items-center px-3 py-2 rounded-md transition-colors`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {expanded && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 