import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Brain, Target, Users, Lightbulb, Zap, Heart, Radar, BarChart3, ArrowRight, TrendingUp } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../components/Button';
import Card from '../components/Card';

const PsychometricTestPage = ({ onComplete, onRetake, hasCompletedAssessment, testResults }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What energizes you the most?",
      subtitle: "Think about what activities make you feel most alive and engaged.",
      type: "multiple-choice",
      options: [
        { id: 'a', text: "Solving complex problems and puzzles", icon: Target },
        { id: 'b', text: "Leading and inspiring others", icon: Users },
        { id: 'c', text: "Creating something new from scratch", icon: Lightbulb },
        { id: 'd', text: "Helping people succeed and grow", icon: Heart }
      ]
    },
    {
      id: 2,
      question: "How comfortable are you with taking risks?",
      subtitle: "Consider both personal and professional situations.",
      type: "slider",
      min: 1,
      max: 10,
      labels: ["Very Conservative", "Very Risk-Taking"]
    },
    {
      id: 3,
      question: "How do you feel about working in teams?",
      subtitle: "Your honest preference for collaboration vs. independent work.",
      type: "emoji-choice",
      options: [
        { id: 'a', text: "Love it!", emoji: "😍" },
        { id: 'b', text: "Enjoy it", emoji: "😊" },
        { id: 'c', text: "It's okay", emoji: "😐" },
        { id: 'd', text: "Prefer solo", emoji: "😅" }
      ]
    },
    {
      id: 4,
      question: "What's your ideal work environment?",
      subtitle: "Where do you see yourself thriving professionally?",
      type: "multiple-choice",
      options: [
        { id: 'a', text: "Fast-paced startup with lots of change", icon: Zap },
        { id: 'b', text: "Established corporation with clear structure", icon: Target },
        { id: 'c', text: "Remote/flexible with autonomy", icon: Brain },
        { id: 'd', text: "Research institution focused on innovation", icon: Lightbulb }
      ]
    },
    {
      id: 5,
      question: "What motivates you most in your career?",
      subtitle: "Choose the factor that drives you to excel.",
      type: "multiple-choice",
      options: [
        { id: 'a', text: "Financial success and stability", icon: Target },
        { id: 'b', text: "Making a positive impact on society", icon: Heart },
        { id: 'c', text: "Personal growth and learning", icon: Brain },
        { id: 'd', text: "Recognition and leadership opportunities", icon: Users }
      ]
    }
  ];

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsSubmitting(false);
    setShowCompletion(false);
    onRetake();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Add Firebase integration for test results
      console.log('Test answers:', answers);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call placeholder function
      const results = analyzeTest(answers);
      onComplete(results);
      
      // Navigate to results page using React Router
      navigate('/results');
    } catch (error) {
      console.error('Test submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Placeholder function for test analysis
  const analyzeTest = (answers) => {
    // Simple scoring algorithm
    const scores = {
      technical: 0,
      leadership: 0,
      creativity: 0,
      communication: 0,
      riskTaking: 0,
      problemSolving: 0
    };

    // Analyze answers and calculate scores
    Object.values(answers).forEach((answer, index) => {
      if (index === 0) { // First question
        if (answer === 'a') scores.problemSolving += 25;
        if (answer === 'b') scores.leadership += 25;
        if (answer === 'c') scores.creativity += 25;
        if (answer === 'd') scores.communication += 25;
      } else if (index === 1) { // Risk taking slider
        scores.riskTaking = answer * 10;
      } else if (index === 2) { // Team work
        if (answer === 'a') scores.communication += 25;
        if (answer === 'b') scores.communication += 15;
        if (answer === 'c') scores.communication += 10;
        if (answer === 'd') scores.riskTaking += 15;
      } else if (index === 3) { // Work environment
        if (answer === 'a') { scores.riskTaking += 20; scores.creativity += 15; }
        if (answer === 'b') { scores.leadership += 20; scores.problemSolving += 15; }
        if (answer === 'c') { scores.creativity += 20; scores.riskTaking += 10; }
        if (answer === 'd') { scores.technical += 20; scores.creativity += 15; }
      } else if (index === 4) { // Motivation
        if (answer === 'a') scores.leadership += 20;
        if (answer === 'b') scores.communication += 20;
        if (answer === 'c') scores.technical += 20;
        if (answer === 'd') scores.leadership += 20;
      }
    });

    return {
      scores,
      strengths: Object.entries(scores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([key]) => key),
      weaknesses: Object.entries(scores)
        .sort(([,a], [,b]) => a - b)
        .slice(0, 2)
        .map(([key]) => key)
    };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  // Show results page if assessment was already completed
  if (hasCompletedAssessment && testResults && !showCompletion) {
    // Mock data based on test results
    const radarData = [
      { subject: 'Problem Solving', A: testResults?.scores?.problemSolving || 92, fullMark: 100 },
      { subject: 'Leadership', A: testResults?.scores?.leadership || 78, fullMark: 100 },
      { subject: 'Creativity', A: testResults?.scores?.creativity || 85, fullMark: 100 },
      { subject: 'Communication', A: testResults?.scores?.communication || 73, fullMark: 100 },
      { subject: 'Risk Taking', A: testResults?.scores?.riskTaking || 67, fullMark: 100 },
      { subject: 'Technical Skills', A: testResults?.scores?.technical || 89, fullMark: 100 }
    ];

    const barData = [
      { name: 'Problem Solving', value: testResults?.scores?.problemSolving || 92, color: '#3b82f6' },
      { name: 'Leadership', value: testResults?.scores?.leadership || 78, color: '#f59e0b' },
      { name: 'Creativity', value: testResults?.scores?.creativity || 85, color: '#10b981' },
      { name: 'Communication', value: testResults?.scores?.communication || 73, color: '#06b6d4' },
      { name: 'Risk Taking', value: testResults?.scores?.riskTaking || 67, color: '#8b5cf6' },
      { name: 'Technical Skills', value: testResults?.scores?.technical || 89, color: '#1e40af' }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Strengths & Recommendations
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Based on your psychometric assessment, here's your unique profile and path forward.
            </p>
          </motion.div>

          {/* Results Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <BarChart3 className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Your Psychometric Profile</h2>
              </div>
              <p className="text-gray-600 mb-8">Comprehensive analysis of your strengths and capabilities.</p>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Radar Chart */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Radar className="w-5 h-5 text-primary-600 mr-2" />
                    Strengths Radar
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <RechartsRadar
                          name="Your Score"
                          dataKey="A"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 text-primary-600 mr-2" />
                    Detailed Breakdown
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 120]} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Key Insights */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Insights</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-600 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Your Top Strengths
                  </h3>
                  <ul className="space-y-2">
                    {testResults?.strengths?.map((strength, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {strength.charAt(0).toUpperCase() + strength.slice(1).replace(/([A-Z])/g, ' $1')}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Growth Areas
                  </h3>
                  <ul className="space-y-2">
                    {testResults?.weaknesses?.map((weakness, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {weakness.charAt(0).toUpperCase() + weakness.slice(1).replace(/([A-Z])/g, ' $1')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Path Selection */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Path</h2>
              <p className="text-gray-600 text-center mb-8">Based on your assessment, here are the recommended paths for your career journey.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border-2 border-primary-200 rounded-xl hover:border-primary-400 transition-colors">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Career Path</h3>
                    <p className="text-gray-600 mb-6">Traditional employment with structured growth opportunities.</p>
                    <Link to="/career-path">
                      <Button variant="primary" className="w-full" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
                        Let's Go →
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="p-6 border-2 border-secondary-200 rounded-xl hover:border-secondary-400 transition-colors">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Entrepreneurship Path</h3>
                    <p className="text-gray-600 mb-6">Build your own business and create your own opportunities.</p>
                    <Link to="/startup-path">
                      <Button variant="secondary" className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
                        Let's Go →
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/dashboard">
              <Button variant="outline">
                Back to Dashboard
              </Button>
            </Link>
            <Button variant="outline" onClick={handleRetake}>
              Retake Assessment
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showCompletion) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-12 text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Assessment Complete!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Thank you for completing the assessment. We're analyzing your responses to create your personalized career path.
          </p>
          
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Understanding Your Strengths
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This will help us understand your unique talents and create a personalized path for you.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="mb-8"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentQ.question}
              </h2>
              <p className="text-gray-600 mb-8">
                {currentQ.subtitle}
              </p>

              {/* Multiple Choice Options */}
              {currentQ.type === 'multiple-choice' && (
                <div className="space-y-4">
                  {currentQ.options.map((option) => {
                    const Icon = option.icon;
                    const isSelected = answers[currentQuestion] === option.id;
                    
                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => handleAnswer(option.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left flex items-center space-x-4 ${
                          isSelected 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-primary-500' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <span className={`font-medium ${isSelected ? 'text-primary-700' : 'text-gray-700'}`}>
                          {option.text}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Emoji Choice Options */}
              {currentQ.type === 'emoji-choice' && (
                <div className="grid grid-cols-2 gap-4">
                  {currentQ.options.map((option) => {
                    const isSelected = answers[currentQuestion] === option.id;
                    
                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => handleAnswer(option.id)}
                        className={`p-6 rounded-lg border-2 transition-all duration-200 text-center ${
                          isSelected 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-4xl mb-2">{option.emoji}</div>
                        <div className={`font-medium ${isSelected ? 'text-primary-700' : 'text-gray-700'}`}>
                          {option.text}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Slider */}
              {currentQ.type === 'slider' && (
                <div className="space-y-6">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{currentQ.labels[0]}</span>
                    <span>{currentQ.labels[1]}</span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="range"
                      min={currentQ.min}
                      max={currentQ.max}
                      value={answers[currentQuestion] || 5}
                      onChange={(e) => handleAnswer(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                      {Array.from({ length: currentQ.max - currentQ.min + 1 }, (_, i) => (
                        <span key={i}>{i + currentQ.min}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                      {answers[currentQuestion] || 5}/{currentQ.max}
                    </span>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button
                variant="outline"
                size="sm"
              >
                Back to Dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              icon={<ChevronLeft className="w-5 h-5" />}
            >
              Previous
            </Button>
          </div>

          {/* Progress Dots */}
          <div className="flex space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index <= currentQuestion 
                    ? 'bg-primary-500' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            icon={<ChevronRight className="w-5 h-5" />}
            iconPosition="right"
            loading={isSubmitting}
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next Question'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PsychometricTestPage;
