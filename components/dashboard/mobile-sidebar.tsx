'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { X, Home, GraduationCap, Briefcase, BookOpen, FileText, Gift } from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  
  // Close sidebar when pathname changes (i.e., when navigating)
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname, isOpen, onClose]);
  
  // Close sidebar when pressing escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    // Prevent scrolling when sidebar is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  // Navigation items
  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <GraduationCap size={20} />, label: "AI Tutoring", path: "/dashboard/ai-tutoring" },
    { icon: <Briefcase size={20} />, label: "Career Guide", path: "/dashboard/career-guide" },
    { icon: <BookOpen size={20} />, label: "Exam Prep", path: "/dashboard/exam-prep" },
    { icon: <FileText size={20} />, label: "Resources", path: "/dashboard/resources" },
    { icon: <Gift size={20} />, label: "Rewards", path: "/dashboard/rewards" },
  ];
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/25 z-30 md:hidden" 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white z-40 md:hidden shadow-lg transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <span className="text-xl font-bold">EdumeAI</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
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
                    <span>{item.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
} 