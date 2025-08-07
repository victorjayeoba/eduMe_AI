// components/dashboard/header.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BellIcon, Gem } from 'lucide-react';
import { AnimatedStats } from './animated-stats';
import { useWallet } from '@/contexts/wallet-context';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

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

  const { user } = useAuth();
  const { address, isConnecting, connectWallet, disconnectWallet } = useWallet();

  // Fetch user name and gems from Firestore
  const [gems, setGems] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [gemsLoading, setGemsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setGems(0);
        setUserName("");
        return;
      }
      setGemsLoading(true);
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setGems(data.gems || 0);
          setUserName(data.name || user.displayName || user.email?.split('@')[0] || "User");
        } else {
          setGems(0);
          setUserName(user.displayName || user.email?.split('@')[0] || "User");
        }
      } catch (e) {
        setGems(0);
        setUserName(user.displayName || user.email?.split('@')[0] || "User");
      } finally {
        setGemsLoading(false);
      }
    };
    fetchUserProfile();
  }, [user]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30 ml-auto w-full">
      <div className={`flex items-center justify-between h-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        <h1 className="text-xl font-bold text-gray-900 pl-6">
          {title}
        </h1>
        <div className="flex items-center space-x-4 px-4 md:px-6">
          {/* Gems Section */}
          <div className="flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200 shadow-sm min-w-[90px]">
            <Gem className="h-5 w-5 text-amber-500 mr-2" />
            {gemsLoading ? (
              <span className="w-5 h-5 animate-spin rounded-full border-2 border-amber-300 border-t-transparent"></span>
            ) : (
              <span className="text-base font-bold text-amber-700">{gems}</span>
            )}
            <span className="ml-1 text-xs font-medium text-amber-600">Gems</span>
          </div>
          {/* Wallet Button */}
          {address ? (
            <Button
              size="sm"
              variant="outline"
              className="border-emerald-500 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-[24px] font-mono"
              onClick={disconnectWallet}
              title={address}
            >
              {address.slice(0, 6)}...{address.slice(-4)}
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="border-emerald-500 text-emerald-600 bg-white hover:bg-emerald-50 px-4 py-2 rounded-[24px]"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
          {/* User Avatar and Name */}
        
            <div className="h-7 w-7 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm">
              {userName ? userName[0].toUpperCase() : 'U'}
            </div>
    
        </div>
      </div>
    </header>
  );
}