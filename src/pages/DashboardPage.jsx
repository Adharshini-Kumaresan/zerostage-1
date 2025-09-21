import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, TrendingUp, Users, Award, Clock, Calendar, CheckCircle, ArrowRight, Brain, BookOpen, Zap, Heart, Settings } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import GoogleApiTest from '../components/GoogleApiTest';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const activePaths = [
    {
      id: 'career',
      title: 'Career Development',
      description: 'Currently: Specialized Knowledge phase - Learning Machine Learning fundamentals',
      progress: 45,
      timeRemaining: '5 months remaining',
      status: 'Active',
      statusColor: 'bg-blue-500',
      icon: Target
    },
    {
      id: 'startup',
      title: 'Entrepreneurship',
      description: 'Working on: Campus Food Waste solution with team of 3',
      progress: 25,
      timeRemaining: 'Validation phase - 2 weeks in',
      status: 'Exploring',
      statusColor: 'bg-orange-500',
      icon: Zap
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Complete React Course Module 3',
      dueDate: 'Tomorrow',
      category: 'career',
      priority: 'high',
      icon: BookOpen
    },
    {
      id: 2,
      title: 'Attend Startup Pitch Workshop',
      dueDate: 'This Friday',
      category: 'entrepreneurship',
      priority: 'medium',
      icon: Users
    },
    {
      id: 3,
      title: 'Team Meeting - Project Planning',
      dueDate: 'Next Monday',
      category: 'entrepreneurship',
      priority: 'medium',
      icon: Calendar
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Completed Personality Assessment',
      time: '2 hours ago',
      icon: Brain,
      color: 'text-pink-500'
    },
    {
      id: 2,
      action: 'Started Python Fundamentals',
      time: '1 day ago',
      icon: Target,
      color: 'text-red-500'
    },
    {
      id: 3,
      action: 'Joined AI Study Group',
      time: '3 days ago',
      icon: Users,
      color: 'text-blue-500'
    }
  ];

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Completed onboarding', icon: Target, earned: true },
    { id: 2, title: 'Self Discovery', description: 'Finished psychometric test', icon: Brain, earned: true },
    { id: 3, title: 'Team Player', description: 'Joined first study group', icon: Users, earned: true },
    { id: 4, title: 'Knowledge Seeker', description: 'Started first course', icon: BookOpen, earned: true }
  ];

  const quickActions = [
    { title: 'Continue Learning', icon: BookOpen, primary: true },
    { title: 'Find Study Partners', icon: Users, primary: false },
    { title: 'Explore Problems', icon: Target, primary: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Ready to continue your journey to success?
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">85%</div>
            <div className="text-sm text-gray-600">Career Progress</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">2</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Connections</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </Card>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Link to="/assessment">
                <motion.div 
                  className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg text-center hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Brain className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">Assessment</h3>
                  <p className="text-xs text-gray-600">Take Test</p>
                </motion.div>
              </Link>
              
              <Link to="/career-path">
                <motion.div 
                  className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-center hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">Career Path</h3>
                  <p className="text-xs text-gray-600">Explore</p>
                </motion.div>
              </Link>
              
              <Link to="/startup-path">
                <motion.div 
                  className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg text-center hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">Startup Path</h3>
                  <p className="text-xs text-gray-600">Launch</p>
                </motion.div>
              </Link>
              
              <Link to="/community">
                <motion.div 
                  className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg text-center hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">Community</h3>
                  <p className="text-xs text-gray-600">Connect</p>
                </motion.div>
              </Link>
              
              <Link to="/results">
                <motion.div 
                  className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg text-center hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">Results</h3>
                  <p className="text-xs text-gray-600">View</p>
                </motion.div>
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Active Paths */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Active Paths</h2>
              
              <div className="space-y-6">
                {activePaths.map((path) => {
                  const Icon = path.icon;
                  return (
                    <div key={path.id} className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${path.statusColor} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{path.title}</h3>
                            <p className="text-sm text-gray-600">{path.description}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${path.statusColor}`}>
                          {path.status}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{path.progress}% complete</span>
                          <span className="text-gray-500">{path.timeRemaining}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              path.id === 'career' ? 'bg-blue-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${path.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Upcoming Tasks */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Tasks</h2>
              
              <div className="space-y-4">
                {upcomingTasks.map((task) => {
                  const Icon = task.icon;
                  return (
                    <div key={task.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                      <Icon className="w-5 h-5 text-gray-600" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600">{task.dueDate}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.category === 'career' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {task.category}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Tasks
              </Button>
            </Card>
          </motion.div>

          {/* Right Column - Activity & Achievements */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {/* Current Streak */}
            <Card className="p-6 mb-6">
              <div className="text-center">
                <div className="text-2xl mb-2">🔥</div>
                <h3 className="text-lg font-semibold text-gray-900">Current Streak</h3>
                <div className="text-3xl font-bold text-orange-600">7 days</div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Achievements</h2>
              
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-xs font-medium text-gray-900">{achievement.title}</h3>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  );
                })}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Achievements
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant={action.primary ? 'primary' : 'outline'}
                      className="w-full justify-start"
                      icon={<Icon className="w-5 h-5" />}
                    >
                      {action.title}
                    </Button>
                  );
                })}
              </div>
            </Card>

            {/* Google API Status Test */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Google API Status</span>
              </h2>
              <p className="text-gray-600 mb-4">
                Check if all Google APIs are properly connected and configured.
              </p>
              <GoogleApiTest />
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
