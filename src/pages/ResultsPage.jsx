import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Radar, BarChart3, Target, Rocket, ArrowRight, Brain, TrendingUp, Users, Lightbulb, Zap } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../components/Button';
import Card from '../components/Card';

const ResultsPage = ({ testResults, onPathSelect }) => {
  const [selectedPath, setSelectedPath] = useState(null);

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

  const handlePathSelection = (path) => {
    setSelectedPath(path);
    setTimeout(() => {
      onPathSelect(path);
    }, 1000);
  };

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
            Based on your psychometric assessment, here's your unique profile and path forward
          </p>
        </motion.div>

        {/* Results Dashboard */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="p-8 mb-8">
            <div className="flex items-center mb-6">
              <BarChart3 className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Your Psychometric Profile</h2>
            </div>
            <p className="text-gray-600 mb-8">Comprehensive analysis of your strengths and capabilities</p>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Radar Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Strengths Radar</h3>
                <ResponsiveContainer width="100%" height={300}>
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

              {/* Bar Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Insight */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 p-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl text-white"
            >
              <h3 className="text-lg font-semibold mb-2">Key Insight</h3>
              <p className="text-white/90">
                Your exceptional problem-solving abilities (92%) and technical skills (89%) position you perfectly for high-impact roles in technology and innovation. Your balanced approach to leadership (78%) and creativity (85%) makes you an ideal candidate for both technical and strategic roles.
              </p>
            </motion.div>
          </Card>
        </motion.div>

        {/* Path Selection */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Based on your strengths, here are two exciting paths you can explore
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Both paths leverage your unique combination of technical expertise and creative problem-solving abilities.
          </p>
        </motion.div>

        {/* Path Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Career Path */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card 
              className={`p-8 h-full cursor-pointer transition-all duration-300 ${
                selectedPath === 'career' ? 'ring-4 ring-primary-500 scale-105' : 'hover:scale-105'
              }`}
              onClick={() => handlePathSelection('career')}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mr-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    Career Path
                    <Brain className="w-6 h-6 text-pink-500 ml-2" />
                  </h3>
                  <p className="text-gray-600">Discover careers aligned to your strengths.</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 mb-4">
                  Build expertise in structured environments, advance through proven pathways, and create impact through specialized knowledge.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-primary-500" />
                    <span>Structured Growth</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary-500" />
                    <span>Industry Networks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-primary-500" />
                    <span>Expert Mentorship</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-primary-500" />
                    <span>Stable Progression</span>
                  </div>
                </div>
              </div>

              <Link to="/career-path">
                <Button
                  variant="primary"
                  className="w-full"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Let's Go →
                </Button>
              </Link>
            </Card>
          </motion.div>

          {/* Entrepreneurship Path */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Card 
              className={`p-8 h-full cursor-pointer transition-all duration-300 ${
                selectedPath === 'entrepreneurship' ? 'ring-4 ring-secondary-500 scale-105' : 'hover:scale-105'
              }`}
              onClick={() => handlePathSelection('entrepreneurship')}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mr-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    Entrepreneurship Path
                    <Rocket className="w-6 h-6 text-orange-500 ml-2" />
                  </h3>
                  <p className="text-gray-600">Turn your ambition into a startup journey.</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 mb-4">
                  Create innovative solutions, build high-impact teams, and shape the future through entrepreneurial ventures.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4 text-secondary-500" />
                    <span>Innovation Focus</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-secondary-500" />
                    <span>Market Impact</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-secondary-500" />
                    <span>Team Building</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-secondary-500" />
                    <span>Unlimited Growth</span>
                  </div>
                </div>
              </div>

              <Link to="/startup-path">
                <Button
                  variant="secondary"
                  className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Let's Go →
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center"
        >
          <Card className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
            <p className="text-gray-700 mb-4">
              <strong>Remember:</strong> You can explore both paths as you grow! The skills you build in either direction will serve you throughout your career.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline">
                  Back to Dashboard
                </Button>
              </Link>
              <Link to="/assessment">
                <Button variant="outline">
                  Retake Assessment
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;
