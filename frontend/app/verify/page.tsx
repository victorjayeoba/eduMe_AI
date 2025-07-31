"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function VerifyEmailContent() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("Verifying your email...");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail, user } = useAuth();

  useEffect(() => {
    const mode = searchParams.get("mode");
    const actionCode = searchParams.get("oobCode");
    const email = searchParams.get("email");

    const verifyUserEmail = async () => {
      if (mode === "verifyEmail" && actionCode) {
        try {
          await verifyEmail(actionCode);
          setStatus("success");
          setMessage("Your email has been successfully verified! You can now use all features of your account.");
        } catch (error) {
          console.error("Error verifying email:", error);
          setStatus("error");
          setMessage("Failed to verify your email. The link may have expired or already been used.");
        }
      } else {
        setStatus("error");
        setMessage("Invalid verification link. Please request a new verification email.");
      }
    };

    verifyUserEmail();
  }, [searchParams, verifyEmail]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center group mb-8">
          <img src="/edumeai-logo.png" alt="EduMeAI Logo" className="h-12 mr-1" />
          <div className="flex items-center space-x-0.5">
            <span className="text-xl font-bold text-black">EduMe</span>
            <span className="text-xl font-bold text-black bg-black/10 px-1 py-0.5 rounded-md border border-black/20 ml-1">
              AI
            </span>
          </div>
        </Link>

        {/* Status icon */}
        <div className="flex justify-center mb-6">
          {status === "verifying" && (
            <div className="w-16 h-16 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
          )}
          {status === "success" && (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {status === "error" && (
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>

        {/* Status message */}
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className="text-gray-600 mb-8">{message}</p>

        {/* Action buttons */}
        <div className="space-y-4">
          {status === "success" && (
            <Button 
              onClick={() => router.push("/dashboard")} 
              className="w-full bg-black text-white hover:bg-black/80"
            >
              Go to Dashboard
            </Button>
          )}
          {status === "error" && (
            <>
              <Button 
                onClick={() => router.push("/login")} 
                className="w-full bg-black text-white hover:bg-black/80"
              >
                Return to Login
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Need a new verification email? Sign in to your account to request one.
              </p>
            </>
          )}
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

function LoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 border-4 border-black/20 border-t-black rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <p className="text-gray-600">Please wait while we verify your email.</p>
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
} 