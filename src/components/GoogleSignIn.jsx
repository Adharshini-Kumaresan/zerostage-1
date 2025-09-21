// Google Sign-In Component
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, User, Mail, Calendar, Briefcase, BookOpen } from 'lucide-react';
import googleAuth from '../services/googleAuth';
import googleApiIntegration from '../services/googleApiIntegration';

const GoogleSignIn = ({ onLogin, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeGoogleAuth();
  }, []);

  const initializeGoogleAuth = async () => {
    try {
      await googleApiIntegration.initialize();
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize Google Auth:', error);
      onError?.(error);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isInitialized) {
      onError?.(new Error('Google services not initialized'));
      return;
    }

    setIsLoading(true);
    try {
      const userData = await googleAuth.signIn();
      
      // Complete user onboarding with all Google services
      const onboardingResults = await googleApiIntegration.completeUserOnboarding({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        imageUrl: userData.imageUrl,
        type: 'google_user',
        source: 'google_signin'
      });

      onLogin?.({
        ...userData,
        onboardingResults
      });
    } catch (error) {
      console.error('Google sign-in failed:', error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await googleAuth.signOut();
      onLogin?.(null);
    } catch (error) {
      console.error('Google sign-out failed:', error);
      onError?.(error);
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        <span className="ml-2 text-gray-600">Initializing Google services...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in with Google
          </h2>
          <p className="text-gray-600">
            Access all ZeroStage features with your Google account
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <User className="w-4 h-4 text-primary-500" />
            <span>Access your Google profile and preferences</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Mail className="w-4 h-4 text-primary-500" />
            <span>Receive personalized career updates via email</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-primary-500" />
            <span>Schedule career counseling sessions</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Briefcase className="w-4 h-4 text-primary-500" />
            <span>Get real-time job recommendations</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <BookOpen className="w-4 h-4 text-primary-500" />
            <span>Access learning resources and courses</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <div className="mt-4 text-xs text-gray-500 text-center">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </motion.div>
  );
};

export default GoogleSignIn;
