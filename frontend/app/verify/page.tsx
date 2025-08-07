"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, RefreshCw, Mail } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

function VerifyEmailContent() {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const { verifyEmail, resendVerificationEmail, reloadUser, user, isEmailVerified, error } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const oobCode = searchParams.get('oobCode');
    const mode = searchParams.get('mode');
    
    if (mode === 'verifyEmail' && oobCode) {
      handleEmailVerification(oobCode);
    }
  }, [searchParams]);

  useEffect(() => {
    // If user is already verified, redirect to dashboard
    if (user && isEmailVerified) {
      router.push('/dashboard');
    }
  }, [user, isEmailVerified, router]);

  useEffect(() => {
    // Cooldown timer for resend button
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleEmailVerification = async (actionCode: string) => {
    try {
      await verifyEmail(actionCode);
      setVerificationStatus('success');
      // Reload user to update verification status
      await reloadUser();
      // Redirect to dashboard after 3 seconds
      setTimeout(() => router.push('/dashboard'), 3000);
    } catch (error) {
      console.error('Email verification failed:', error);
      setVerificationStatus('error');
    }
  };

  const handleResendVerification = async () => {
    if (resendCooldown > 0 || !user) return;
    
    setIsResending(true);
    try {
      await resendVerificationEmail();
      setResendCooldown(60); // 60 second cooldown
    } catch (error) {
      console.error('Failed to resend verification email:', error);
    } finally {
      setIsResending(false);
    }
  };

  const handleReloadUser = async () => {
    await reloadUser();
    if (user && isEmailVerified) {
      router.push('/dashboard');
    }
  };

  // Show verification success
  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-green-600">
              Email Verified Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Your email has been verified. You'll be redirected to your dashboard in a few seconds.
            </p>
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show verification error
  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-red-600">
              Verification Failed
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              The verification link may be expired or invalid. Please try requesting a new verification email.
            </p>
            {error && (
              <p className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </p>
            )}
            {user && !isEmailVerified && (
              <Button 
                onClick={handleResendVerification}
                disabled={isResending || resendCooldown > 0}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : resendCooldown > 0 ? (
                  `Wait ${resendCooldown}s`
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            )}
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">Back to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show waiting for verification (default state)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <Mail className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold">
            Check Your Email
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            We've sent a verification link to your email address. Please check your inbox and spam folder, then click the verification link.
          </p>
          
          {user?.email && (
            <p className="text-sm text-gray-500 bg-gray-100 p-3 rounded-md">
              Sent to: <strong>{user.email}</strong>
            </p>
          )}

          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </p>
          )}

          <div className="space-y-2">
            {user && !isEmailVerified && (
              <Button 
                onClick={handleResendVerification}
                disabled={isResending || resendCooldown > 0}
                variant="outline"
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : resendCooldown > 0 ? (
                  `Resend in ${resendCooldown}s`
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            )}
            
            <Button 
              onClick={handleReloadUser}
              variant="secondary"
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              I've Verified - Refresh Status
            </Button>
          </div>

          <div className="pt-4 border-t">
            <Button asChild variant="ghost" className="w-full">
              <Link href="/login">Back to Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading verification page...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}