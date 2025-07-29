// app/dashboard/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/header";

// This wrapper component gets the page title from the current route
function PageWithHeader({ 
  children
}: { 
  children: React.ReactNode
}) {
  const pathname = usePathname();
  
  // Get page title from pathname
  const getPageTitle = () => {
    const path = pathname?.split('/').filter(Boolean).pop();
    
    if (!path || path === 'dashboard') {
      return 'Dashboard';
    }
    
    // Convert path-case to Title Case
    return path.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col">
        <DashboardHeader title={getPageTitle()} />
        {children}
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isEmailVerified } = useAuth();
  const router = useRouter();
  const [verificationSent, setVerificationSent] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleResendVerification = async () => {
    if (!auth.currentUser) return;
    
    setIsResendingEmail(true);
    
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/verify?email=${encodeURIComponent(auth.currentUser.email || '')}`,
        handleCodeInApp: false,
      };
      
      await sendEmailVerification(auth.currentUser, actionCodeSettings);
      setVerificationSent(true);
      toast.success("Verification email sent! Please check your inbox.");
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send verification email. Please try again later.");
    } finally {
      setIsResendingEmail(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  // If no user, render nothing (useEffect will redirect)
  if (!user) {
    return null;
  }

  // If user email is not verified, show verification required page
  if (!isEmailVerified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start mb-6">
            <AlertCircle className="text-amber-500 w-6 h-6 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h1 className="text-2xl font-bold mb-2">Verify your email</h1>
              <p className="text-gray-600 mb-6">
                To access the dashboard, please verify your email address first. We've sent a verification link to <strong>{user.email}</strong>.
              </p>
            </div>
          </div>
          
          {verificationSent ? (
            <div className="bg-blue-50 p-4 rounded-lg mb-6 text-blue-800 text-sm">
              Verification email sent! Please check your inbox and click on the link to verify your email address.
            </div>
          ) : (
            <p className="mb-6 text-sm text-gray-600">
              Can't find the email? Check your spam folder or click the button below to resend the verification link.
            </p>
          )}
          
          <div className="space-y-4">
            <Button
              onClick={handleResendVerification}
              className="w-full bg-black text-white hover:bg-black/80"
              disabled={isResendingEmail}
            >
              {isResendingEmail ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Resend Verification Email"
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full"
            >
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render dashboard content with the header and content
  return <PageWithHeader>{children}</PageWithHeader>;
}