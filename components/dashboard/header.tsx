// components/dashboard/header.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BellIcon } from 'lucide-react';
import { AnimatedStats } from './animated-stats';

interface DashboardHeaderProps {
  title: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export function DashboardHeader({ 
  title,
  showSearch = true,
  searchPlaceholder = "Search..."
}: DashboardHeaderProps) {
  // State to track sidebar collapse from the dashboard page
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Dummy data - in a real app, these would come from your user state/API
  const userStats = {
    xp: 1250,
    position: 3,
    totalUsers: 256,
    streak: 7
  };

  // Effect to sync with the sidebar state in dashboard/page.tsx
  useEffect(() => {
    // Function to check if sidebar is collapsed
    const checkSidebarState = () => {
      const dashboardContent = document.querySelector('[class*="md:ml-20"]');
      const isCollapsed = !!dashboardContent;
      if (isCollapsed !== isSidebarCollapsed) {
        setIsSidebarCollapsed(isCollapsed);
      }
    };
    
    // Initial check
    checkSidebarState();
    
    // Add mutation observer to detect sidebar changes
    const observer = new MutationObserver(checkSidebarState);
    observer.observe(document.body, { 
      attributes: true, 
      childList: true, 
      subtree: true 
    });
    
    return () => observer.disconnect();
  }, [isSidebarCollapsed]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30 ml-auto w-full">
      <div className={`flex items-center justify-between h-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        <h1 className="text-xl font-bold text-gray-900 pl-6">
          {title}
        </h1>
        
        <div className="flex items-center space-x-4 px-4 md:px-6">
          {/* Animated Stats */}
          <div className="hidden lg:block">
            <AnimatedStats 
              xp={userStats.xp}
              position={userStats.position}
              totalUsers={userStats.totalUsers}
              streak={userStats.streak}
            />
          </div>
          
          {/* Search */}
          {showSearch && (
            <div className="hidden md:flex relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder={searchPlaceholder} className="pl-10 w-64" />
            </div>
          )}

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            <BellIcon className="h-5 w-5" />
          </Button>

          {/* User Avatar */}
          <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="font-medium text-sm">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}