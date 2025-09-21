import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PsychometricTestPage from './pages/PsychometricTestPage';
import ResultsPage from './pages/ResultsPage';
import CareerPathPage from './pages/CareerPathPage';
import EntrepreneurshipPathPage from './pages/EntrepreneurshipPathPage';
import BeyondStagePage from './pages/BeyondStagePage';
import NotFoundPage from './pages/NotFoundPage';

// Google API Integration
import googleApiIntegration from './services/googleApiIntegration';
import googleAnalytics from './services/googleAnalytics';

// Firebase Config
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config/firebase';

function App() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  // Initialize Firebase and Google APIs
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        // Initialize Google APIs
        await googleApiIntegration.initialize();
        
        // Initialize Analytics
        await googleAnalytics.initialize();
        googleAnalytics.trackPageView(window.location.pathname);

        console.log('App initialized successfully');
      } catch (error) {
        console.error('App initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleLogin = async (userData) => {
    try {
      setUser(userData);
      // Reset assessment status for new login
      setHasCompletedAssessment(false);
      setTestResults(null);
      
      // Track user login in analytics
      googleAnalytics.trackUserEngagement('login', 'authentication', 'google_signin');
      
      // Set user properties for analytics
      googleAnalytics.setUserProperties(userData.id, {
        user_type: userData.type || 'google_user',
        signup_date: new Date().toISOString()
      });

      console.log('User logged in:', userData);
    } catch (error) {
      console.error('Login handling failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Track logout in analytics
      googleAnalytics.trackUserEngagement('logout', 'authentication', 'user_initiated');
      
      setUser(null);
      setTestResults(null);
      setSelectedPath(null);
      setHasCompletedAssessment(false);
      
      console.log('User logged out');
    } catch (error) {
      console.error('Logout handling failed:', error);
    }
  };

  const handleTestComplete = async (results) => {
    try {
      setTestResults(results);
      setHasCompletedAssessment(true);
      
      // Track test completion in analytics
      googleAnalytics.trackTestEvent('test_completed', {
        testType: 'psychometric_assessment',
        userId: user?.id,
        timeSpent: results.totalTime,
        questionCount: results.responses?.length || 0
      });
      
      // Process test results with Google AI
      if (user) {
        const enhancedResults = await googleApiIntegration.processPsychometricTest(results, user);
        console.log('Enhanced test results:', enhancedResults);
      }
      
      console.log('Test completed:', results);
    } catch (error) {
      console.error('Test completion handling failed:', error);
    }
  };

  const handlePathSelect = (path) => {
    setSelectedPath(path);
    // TODO: Save path selection to Firestore
    console.log('Path selected:', path);
  };

  const handleRetakeAssessment = () => {
    setHasCompletedAssessment(false);
    setTestResults(null);
    setSelectedPath(null);
    // TODO: Clear previous assessment data from Firestore
    console.log('Assessment reset - user can retake');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Save theme preference to localStorage/Firestore
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ZeroStage</h2>
          <p className="text-gray-600">Loading your personalized experience...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-white'
    }`}>
      <Router>
        <div className="min-h-screen">
          {user && (
            <Navbar 
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              user={user}
              onLogout={handleLogout}
            />
          )}
          
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route 
                path="/login" 
                element={
                  user ? (
                    hasCompletedAssessment ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <Navigate to="/assessment" replace />
                    )
                  ) : (
                    <LoginPage onLogin={handleLogin} />
                  )
                } 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  user ? (
                    hasCompletedAssessment ? (
                      <DashboardPage />
                    ) : (
                      <Navigate to="/assessment" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />
              
              <Route 
                path="/assessment" 
                element={
                  user ? (
                    <PsychometricTestPage 
                      onComplete={handleTestComplete}
                      onRetake={handleRetakeAssessment}
                      hasCompletedAssessment={hasCompletedAssessment}
                      testResults={testResults}
                    />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />
              
              <Route 
                path="/results" 
                element={
                  user && hasCompletedAssessment && testResults ? (
                    <ResultsPage 
                      testResults={testResults} 
                      onPathSelect={handlePathSelect} 
                    />
                  ) : (
                    <Navigate to="/assessment" replace />
                  )
                } 
              />
              
              <Route 
                path="/career-path" 
                element={
                  user ? (
                    hasCompletedAssessment ? (
                      <CareerPathPage />
                    ) : (
                      <Navigate to="/assessment" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />
              
              <Route 
                path="/startup-path" 
                element={
                  user ? (
                    hasCompletedAssessment ? (
                      <EntrepreneurshipPathPage />
                    ) : (
                      <Navigate to="/assessment" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />
              
              <Route 
                path="/community" 
                element={
                  user ? (
                    hasCompletedAssessment ? (
                      <BeyondStagePage />
                    ) : (
                      <Navigate to="/assessment" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />
              
              {/* Default Route */}
              <Route 
                path="/" 
                element={
                  user ? (
                    hasCompletedAssessment ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <Navigate to="/assessment" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />
              
              {/* 404 Route */}
              <Route 
                path="*" 
                element={<NotFoundPage />} 
              />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </div>
  );
}

export default App;
