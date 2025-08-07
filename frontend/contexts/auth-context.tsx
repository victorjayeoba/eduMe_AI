
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  applyActionCode
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  verifyEmail: (actionCode: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  clearError: () => void;
  isEmailVerified: boolean;
  reloadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          // Reload user to get the latest emailVerified status
          await currentUser.reload();
          setUser(currentUser);
          setIsEmailVerified(currentUser.emailVerified);
        } else {
          setUser(null);
          setIsEmailVerified(false);
        }
        setLoading(false);
      }, (authError) => {
        setError(authError.message);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Auth state change error:", err);
      setError(err instanceof Error ? err.message : "Authentication error");
      setLoading(false);
    }
  }, []);

  const clearError = () => setError(null);

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Send verification email
      const actionCodeSettings = {
        url: `${window.location.origin}/verify?email=${encodeURIComponent(email)}`,
        handleCodeInApp: false,
      };
      
      await sendEmailVerification(user, actionCodeSettings);
      
      // Redirect to onboarding after successful signup
      window.location.href = "/onboarding";
      return;
    } catch (err) {
      console.error("Error signing up:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to sign up";
      setError(errorMessage);
      throw err;
    }
  };

  const verifyEmail = async (actionCode: string) => {
    try {
      setError(null);
      await applyActionCode(auth, actionCode);
      
      // Reload user to update emailVerified status
      if (auth.currentUser) {
        await auth.currentUser.reload();
        setIsEmailVerified(auth.currentUser.emailVerified);
      }
      
      return;
    } catch (err) {
      console.error("Error verifying email:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to verify email";
      setError(errorMessage);
      throw err;
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Reload user to get the latest emailVerified status
      await user.reload();
      
      // Check if email is verified
      if (!user.emailVerified) {
        setError("Please verify your email address before signing in. Check your inbox and spam folder.");
        // Optionally sign them out if you want to enforce strict verification
        // await signOut(auth);
        throw new Error("Email not verified");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      if (err instanceof Error && err.message === "Email not verified") {
        // Don't override the specific email verification error
        throw err;
      }
      const errorMessage = err instanceof Error ? err.message : "Failed to log in";
      setError(errorMessage);
      throw err;
    }
  };

  const logOut = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      console.error("Error logging out:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to log out";
      setError(errorMessage);
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Error signing in with Google:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to sign in with Google";
      setError(errorMessage);
      throw err;
    }
  };

  const resendVerificationEmail = async () => {
    try {
      setError(null);
      if (!auth.currentUser) {
        throw new Error("No user logged in");
      }
      
      const actionCodeSettings = {
        url: `${window.location.origin}/verify?email=${encodeURIComponent(auth.currentUser.email || '')}`,
        handleCodeInApp: false,
      };
      
      await sendEmailVerification(auth.currentUser, actionCodeSettings);
      return;
    } catch (err) {
      console.error("Error resending verification email:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to resend verification email";
      setError(errorMessage);
      throw err;
    }
  };

  const reloadUser = async () => {
    try {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        setIsEmailVerified(auth.currentUser.emailVerified);
      }
    } catch (err) {
      console.error("Error reloading user:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      signUp, 
      logIn, 
      logOut, 
      signInWithGoogle, 
      verifyEmail,
      resendVerificationEmail,
      clearError,
      isEmailVerified,
      reloadUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 