import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Award, Calendar, ExternalLink, Plus, Star, MessageCircle, Download, Share2, Trophy, Target, Zap, Heart } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';

const BeyondStagePage = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [newBadge, setNewBadge] = useState(null);

  // Mock data
  const portfolioItems = [
    { id: 1, title: 'AI Chatbot Project', description: 'Built a customer service chatbot using NLP', tech: ['Python', 'TensorFlow', 'React'], status: 'completed' },
    { id: 2, title: 'E-commerce Platform', description: 'Full-stack web application with payment integration', tech: ['React', 'Node.js', 'MongoDB'], status: 'completed' },
    { id: 3, title: 'Data Visualization Dashboard', description: 'Interactive dashboard for business analytics', tech: ['D3.js', 'Python', 'PostgreSQL'], status: 'in-progress' }
  ];

  const mentors = [
    { name: 'Dr. Sarah Chen', title: 'Senior AI Engineer', company: 'Google', rating: 4.9, sessions: 12, specialty: 'Machine Learning', avatar: '👩‍💻' },
    { name: 'Mike Rodriguez', title: 'Product Manager', company: 'Meta', rating: 4.8, sessions: 8, specialty: 'Product Strategy', avatar: '👨‍💼' },
    { name: 'Alex Kim', title: 'Startup Founder', company: 'TechCorp', rating: 4.9, sessions: 15, specialty: 'Entrepreneurship', avatar: '👨‍🚀' },
    { name: 'Lisa Wang', title: 'UX Designer', company: 'Apple', rating: 4.7, sessions: 6, specialty: 'User Experience', avatar: '👩‍🎨' }
  ];

  const peers = [
    { name: 'Emma Johnson', university: 'Stanford', interests: ['AI', 'Robotics'], projects: 5, avatar: '👩‍🎓' },
    { name: 'David Lee', university: 'MIT', interests: ['Blockchain', 'FinTech'], projects: 8, avatar: '👨‍🎓' },
    { name: 'Sophie Chen', university: 'Berkeley', interests: ['Sustainability', 'CleanTech'], projects: 3, avatar: '👩‍🔬' },
    { name: 'Ryan Park', university: 'CMU', interests: ['Cybersecurity', 'DevOps'], projects: 6, avatar: '👨‍💻' }
  ];

  const badges = [
    { id: 1, title: 'First Steps', description: 'Completed onboarding', icon: Target, earned: true, date: '2024-01-15' },
    { id: 2, title: 'Self Discovery', description: 'Finished psychometric test', icon: Heart, earned: true, date: '2024-01-20' },
    { id: 3, title: 'Team Player', description: 'Joined first study group', icon: Users, earned: true, date: '2024-02-01' },
    { id: 4, title: 'Knowledge Seeker', description: 'Started first course', icon: Award, earned: true, date: '2024-02-10' },
    { id: 5, title: 'Project Master', description: 'Completed 3 projects', icon: Trophy, earned: false, progress: 60 },
    { id: 6, title: 'Mentor Champion', description: 'Connected with 5 mentors', icon: Star, earned: false, progress: 80 },
    { id: 7, title: 'Innovation Leader', description: 'Launched first startup idea', icon: Zap, earned: false, progress: 30 },
    { id: 8, title: 'Community Builder', description: 'Helped 10 peers', icon: Users, earned: false, progress: 40 }
  ];

  const opportunities = [
    { 
      id: 1, 
      title: 'TechCrunch Disrupt Hackathon', 
      type: 'Hackathon', 
      deadline: '2024-03-15', 
      prize: '$50K', 
      participants: 500,
      description: 'Build the next big thing in fintech',
      tags: ['FinTech', 'AI', 'Blockchain']
    },
    { 
      id: 2, 
      title: 'Google Summer Internship', 
      type: 'Internship', 
      deadline: '2024-02-28', 
      prize: 'Paid', 
      participants: 1000,
      description: 'Software Engineering Intern - AI/ML Team',
      tags: ['AI/ML', 'Software Engineering', 'Google']
    },
    { 
      id: 3, 
      title: 'Y Combinator Startup School', 
      type: 'Program', 
      deadline: '2024-03-01', 
      prize: 'Free', 
      participants: 10000,
      description: 'Learn to build a startup from the best',
      tags: ['Startup', 'Entrepreneurship', 'YC']
    },
    { 
      id: 4, 
      title: 'ClimateTech Innovation Grant', 
      type: 'Grant', 
      deadline: '2024-04-01', 
      prize: '$25K', 
      participants: 200,
      description: 'Funding for climate technology solutions',
      tags: ['ClimateTech', 'Sustainability', 'Grant']
    }
  ];

  const tabs = [
    { id: 'portfolio', label: 'Portfolio Builder', icon: Briefcase },
    { id: 'community', label: 'Community Hub', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'opportunities', label: 'Opportunities', icon: Calendar }
  ];

  const handleBadgeUnlock = (badge) => {
    setNewBadge(badge);
    setTimeout(() => setNewBadge(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Beyond Stage
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build your portfolio, connect with the community, and unlock new opportunities.
          </p>
        </motion.div>

        {/* New Badge Notification */}
        <AnimatePresence>
          {newBadge && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed top-20 right-4 z-50"
            >
              <Card className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold">New Badge Unlocked!</h3>
                    <p className="text-sm">{newBadge.title}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Tabs */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-white/20">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Portfolio Builder</h2>
                    <p className="text-gray-600">Showcase your projects and achievements</p>
                  </div>
                  <Button variant="primary" icon={<Plus className="w-5 h-5" />}>
                    Add Project
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioItems.map((item) => (
                    <Card key={item.id} className="p-6 hover:scale-105 transition-transform">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tech.map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'community' && (
            <motion.div
              key="community"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Mentors */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Expert Mentors</h2>
                  <div className="space-y-4">
                    {mentors.map((mentor) => (
                      <div key={mentor.name} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                        <div className="text-2xl">{mentor.avatar}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                          <p className="text-sm text-gray-600">{mentor.title} at {mentor.company}</p>
                          <p className="text-xs text-gray-500">{mentor.specialty}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">{mentor.rating}</span>
                            <span className="text-sm text-gray-500">• {mentor.sessions} sessions</span>
                          </div>
                        </div>
                        <Button variant="primary" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Connect
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Peers */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Study Partners</h2>
                  <div className="space-y-4">
                    {peers.map((peer) => (
                      <div key={peer.name} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                        <div className="text-2xl">{peer.avatar}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{peer.name}</h3>
                          <p className="text-sm text-gray-600">{peer.university}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {peer.interests.map((interest, index) => (
                              <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs">
                                {interest}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{peer.projects} projects</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Chat
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievement Badges</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {badges.map((badge) => {
                    const Icon = badge.icon;
                    const isEarned = badge.earned;
                    
                    return (
                      <motion.div
                        key={badge.id}
                        className={`relative p-6 rounded-lg border-2 transition-all duration-300 ${
                          isEarned 
                            ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 hover:scale-105' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                        whileHover={{ scale: isEarned ? 1.05 : 1 }}
                        onClick={() => !isEarned && handleBadgeUnlock(badge)}
                      >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          isEarned ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gray-300'
                        }`}>
                          <Icon className={`w-8 h-8 ${isEarned ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <h3 className={`font-semibold text-center mb-2 ${
                          isEarned ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {badge.title}
                        </h3>
                        <p className={`text-sm text-center ${
                          isEarned ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                          {badge.description}
                        </p>
                        {isEarned && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                        {!isEarned && badge.progress && (
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${badge.progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 text-center mt-1">{badge.progress}%</p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'opportunities' && (
            <motion.div
              key="opportunities"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Opportunities Feed</h2>
                    <p className="text-gray-600">Discover hackathons, internships, and grants</p>
                  </div>
                  <Button variant="outline" icon={<Download className="w-5 h-5" />}>
                    Export Calendar
                  </Button>
                </div>

                <div className="space-y-6">
                  {opportunities.map((opportunity) => (
                    <Card key={opportunity.id} className="p-6 hover:scale-[1.02] transition-transform">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{opportunity.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              opportunity.type === 'Hackathon' ? 'bg-purple-100 text-purple-800' :
                              opportunity.type === 'Internship' ? 'bg-blue-100 text-blue-800' :
                              opportunity.type === 'Program' ? 'bg-green-100 text-green-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {opportunity.type}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{opportunity.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {opportunity.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary-600">{opportunity.prize}</div>
                          <div className="text-sm text-gray-500">{opportunity.participants} participants</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Deadline: {opportunity.deadline}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Learn More
                          </Button>
                          <Button variant="primary" size="sm">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
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
                  Career Path
                </Button>
              </Link>
              <Link to="/startup-path">
                <Button variant="outline">
                  Startup Path
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BeyondStagePage;
