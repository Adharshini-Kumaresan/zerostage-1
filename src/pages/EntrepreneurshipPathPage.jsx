import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Lightbulb, Target, Users, Zap, CheckCircle, Clock, ArrowRight, Plus, Star, TrendingUp, Award } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const EntrepreneurshipPathPage = () => {
  const [hasIdea, setHasIdea] = useState(true); // Toggle this to see different flows
  const [currentStage, setCurrentStage] = useState('validation');

  // Mock data for different flows
  const startupJourney = [
    { id: 'idea', title: 'Idea', description: 'Define your solution', icon: Lightbulb, status: 'completed' },
    { id: 'validation', title: 'Validation', description: 'Test market demand', icon: Target, status: 'active' },
    { id: 'prototype', title: 'Prototype', description: 'Build MVP', icon: Rocket, status: 'pending' },
    { id: 'pitch', title: 'Pitch', description: 'Present to investors', icon: Users, status: 'pending' }
  ];

  const ideaDiscovery = [
    { id: 1, title: 'Campus Food Waste Solution', description: 'AI-powered platform connecting students with discounted surplus meals', category: 'Sustainability', difficulty: 'Medium' },
    { id: 2, title: 'Study Buddy AI', description: 'Personalized study companion using AI to optimize learning', category: 'EdTech', difficulty: 'Hard' },
    { id: 3, title: 'Local Service Marketplace', description: 'Connect students with local services and gig opportunities', category: 'Marketplace', difficulty: 'Easy' },
    { id: 4, title: 'Mental Health Companion', description: 'AI chatbot for student mental health support', category: 'HealthTech', difficulty: 'Hard' }
  ];

  const teamMembers = [
    { name: 'Sarah Chen', role: 'Designer', skills: ['UI/UX', 'Figma'], match: '95%', status: 'available', avatar: '👩‍🎨' },
    { name: 'Marcus Rodriguez', role: 'Developer', skills: ['React', 'Node.js'], match: '92%', status: 'available', avatar: '👨‍💻' },
    { name: 'Emily Watson', role: 'Business', skills: ['Strategy', 'Marketing'], match: '88%', status: 'busy', avatar: '👩‍💼' },
    { name: 'David Kim', role: 'Technical Lead', skills: ['AI/ML', 'Cloud'], match: '90%', status: 'available', avatar: '👨‍🔬' }
  ];

  const achievements = [
    { id: 1, title: 'First Idea', description: 'Completed onboarding', icon: Target, status: 'completed' },
    { id: 2, title: 'Market Research', description: 'Finished psychometric test', icon: TrendingUp, status: 'completed' },
    { id: 3, title: 'Team Formed', description: 'Joined first study group', icon: Users, status: 'pending' },
    { id: 4, title: 'MVP Ready', description: 'Started first course', icon: Rocket, status: 'pending' },
    { id: 5, title: 'First Customer', description: 'Started first course', icon: Star, status: 'pending' },
    { id: 6, title: 'Pitch Master', description: 'Started first course', icon: Award, status: 'pending' }
  ];

  const resources = [
    { title: 'Business Model Canvas Template', type: 'template', icon: '📄' },
    { title: 'Pitch Deck Template', type: 'template', icon: '📊' },
    { title: 'Market Research Guide', type: 'guide', icon: '📚' },
    { title: 'Legal Checklist', type: 'checklist', icon: '✅' }
  ];

  const expertSessions = [
    { title: 'Idea Validation Workshop', instructor: 'Sarah Johnson', duration: '2 hours', rating: 4.9 },
    { title: 'MVP Development Guide', instructor: 'Mike Chen', duration: '1.5 hours', rating: 4.8 },
    { title: 'Pitch Perfect Training', instructor: 'Alex Rivera', duration: '3 hours', rating: 4.9 },
    { title: 'Funding Strategies', instructor: 'Lisa Wang', duration: '2.5 hours', rating: 4.7 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Entrepreneurial Launchpad
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build, validate, and launch your startup with expert guidance.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Lightbulb className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">1 Active</div>
            <div className="text-sm text-gray-600">Ideas</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">2</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">3 Team</div>
            <div className="text-sm text-gray-600">Members</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">25%</div>
            <div className="text-sm text-gray-600">Progress</div>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Current Project / Idea Discovery */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="p-6 h-full">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {hasIdea ? 'Idea to Prototype' : 'Idea Discovery'}
              </h2>
              <p className="text-gray-600 mb-6">
                {hasIdea ? 'Your current startup project.' : 'Explore trending startup ideas and find your passion.'}
              </p>

              {hasIdea ? (
                <div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Campus Food Waste Solution</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      AI-powered platform connecting students with discounted surplus meals.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Stage: Validation</span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>
                  
                  <Button variant="primary" className="w-full">
                    Continue Working
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {ideaDiscovery.map((idea) => (
                    <div key={idea.id} className="border border-gray-200 rounded-lg p-4 hover:border-secondary-300 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{idea.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          idea.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          idea.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {idea.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{idea.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{idea.category}</span>
                        <Button variant="outline" size="sm">
                          Explore
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Startup Sprint Roadmap */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="p-6 h-full">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Startup Sprint Roadmap</h2>
              <p className="text-gray-600 mb-6">Your path from idea to launch.</p>
              
              <div className="space-y-4">
                {startupJourney.map((stage, index) => {
                  const Icon = stage.icon;
                  const isActive = stage.status === 'active';
                  const isCompleted = stage.status === 'completed';
                  
                  return (
                    <div key={stage.id} className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isCompleted ? 'bg-green-500' :
                        isActive ? 'bg-orange-500' : 'bg-gray-300'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          isActive ? 'text-orange-700' : 'text-gray-900'
                        }`}>
                          {stage.title}
                        </h3>
                        <p className="text-sm text-gray-600">{stage.description}</p>
                      </div>
                      {isActive && (
                        <Button variant="primary" size="sm">
                          Start
                        </Button>
                      )}
                      {index < startupJourney.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-300" />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Card className="p-6 h-full">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
              
              <div className="space-y-3">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  const isCompleted = achievement.status === 'completed';
                  
                  return (
                    <div key={achievement.id} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <Icon className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium text-sm ${
                          isCompleted ? 'text-green-700' : 'text-gray-700'
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Find Teammates */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Find Teammates</h2>
              <p className="text-gray-600 mb-6">Connect with students who complement your skills.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.name} className="border border-gray-200 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl">{member.avatar}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">{member.name}</h3>
                      <p className="text-xs text-gray-600">{member.role}</p>
                    </div>
                    
                    <div className="text-center mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.match >= '95' ? 'bg-green-100 text-green-800' :
                        member.match >= '90' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {member.match} match
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {member.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {member.status === 'available' ? (
                      <Button variant="primary" size="sm" className="w-full">
                        Connect
                      </Button>
                    ) : (
                      <div className="w-full py-2 text-center text-xs text-gray-500 bg-gray-100 rounded">
                        Busy
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Resources & Mentors */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Resources & Mentors</h2>
              <p className="text-gray-600 mb-6">Startup toolkits, guides, and expert mentorship.</p>
              
              <div className="space-y-6">
                {/* Startup Tools */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Startup Tools</h3>
                  <div className="space-y-2">
                    {resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{resource.icon}</span>
                          <span className="text-sm font-medium text-gray-900">{resource.title}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Expert Sessions */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Expert Sessions</h3>
                  <div className="space-y-2">
                    {expertSessions.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-lg">▶️</span>
                            <span className="text-sm font-medium text-gray-900">{session.title}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <span>{session.instructor}</span>
                            <span>•</span>
                            <span>{session.duration}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span>{session.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-center mt-8"
        >
          <Card className="p-6">
            <div className="flex justify-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline">
                  Back to Dashboard
                </Button>
              </Link>
              <Link to="/career-path">
                <Button variant="outline">
                  Explore Career Path
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="primary">
                  Connect with Community
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EntrepreneurshipPathPage;
