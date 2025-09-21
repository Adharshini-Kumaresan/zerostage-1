import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, TrendingUp, Award, Users, BookOpen, CheckCircle, Clock, Star, ExternalLink, Plus, Brain } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar } from 'recharts';
import Button from '../components/Button';
import Card from '../components/Card';

const CareerPathPage = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Mock data
  const jobTrendsData = [
    { month: 'Jan', demand: 85, salary: 95 },
    { month: 'Feb', demand: 88, salary: 98 },
    { month: 'Mar', demand: 92, salary: 102 },
    { month: 'Apr', demand: 89, salary: 105 },
    { month: 'May', demand: 94, salary: 108 },
    { month: 'Jun', demand: 97, salary: 112 }
  ];

  const careerRoles = [
    {
      id: 1,
      title: 'AI Engineer',
      description: 'Perfect fit for your problem-solving skills and tech interest',
      salary: '$120K',
      match: '95%',
      matchColor: 'bg-green-500',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'Data Analysis']
    },
    {
      id: 2,
      title: 'Product Manager',
      description: 'Great for your leadership and strategic thinking abilities',
      salary: '$110K',
      match: '87%',
      matchColor: 'bg-green-400',
      skills: ['Strategy', 'Leadership', 'Analytics', 'Communication']
    },
    {
      id: 3,
      title: 'ClimateTech Analyst',
      description: 'Combine tech skills with environmental impact',
      salary: '$90K',
      match: '82%',
      matchColor: 'bg-blue-500',
      skills: ['Data Analysis', 'Sustainability', 'Research', 'Reporting']
    }
  ];

  const skills = [
    { name: 'Data Visualization', difficulty: 'Medium', time: '2-3 months', priority: 'High', color: 'bg-red-500' },
    { name: 'System Design', difficulty: 'Hard', time: '4-6 months', priority: 'High', color: 'bg-red-500' },
    { name: 'Public Speaking', difficulty: 'Medium', time: '1-2 months', priority: 'Medium', color: 'bg-yellow-500' },
    { name: 'Financial Modeling', difficulty: 'Easy', time: '1 month', priority: 'Medium', color: 'bg-yellow-500' }
  ];

  const roadmap = [
    { phase: 'Foundation Skills', duration: 'Months 1-3', progress: 100, status: 'completed' },
    { phase: 'Specialized Knowledge', duration: 'Months 4-8', progress: 45, status: 'in-progress' },
    { phase: 'Professional Projects', duration: 'Months 9-12', progress: 0, status: 'pending' },
    { phase: 'Industry Certification', duration: 'Months 13-15', progress: 0, status: 'pending' }
  ];

  const mentors = [
    { name: 'Dr. Sarah Johnson', title: 'Senior AI Engineer at Google', rating: 4.9, sessions: 200 },
    { name: 'Michael Chang', title: 'VP Product at Meta', rating: 4.8, sessions: 150 },
    { name: 'Alex Rivera', title: 'Data Science Director', rating: 4.9, sessions: 180 }
  ];

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
          <div className="flex items-center justify-center mb-6">
            <Target className="w-8 h-8 text-primary-600 mr-3" />
            <Brain className="w-6 h-6 text-pink-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Personalized Career Roadmap
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build expertise, connect with mentors, and achieve your career goals.
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
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">15 Months</div>
            <div className="text-sm text-gray-600">to Goal</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">7 Skills</div>
            <div className="text-sm text-gray-600">Mastered</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">68%</div>
            <div className="text-sm text-gray-600">Progress Made</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-teal-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">3 Active</div>
            <div className="text-sm text-gray-600">Mentors</div>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Skill Profile */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="p-6 h-full">
              <div className="flex items-center mb-6">
                <TrendingUp className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Skill Profile</h2>
              </div>
              <p className="text-gray-600 mb-6">Your current skills vs target levels.</p>
              
              {/* Skill Radar Chart */}
              <div className="w-full h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={[
                    { subject: 'Technical', A: 89, fullMark: 100 },
                    { subject: 'Leadership', A: 78, fullMark: 100 },
                    { subject: 'Communication', A: 73, fullMark: 100 },
                    { subject: 'Problem Solving', A: 92, fullMark: 100 },
                    { subject: 'Creativity', A: 85, fullMark: 100 },
                    { subject: 'Business', A: 45, fullMark: 100 }
                  ]}>
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

              {/* Skill Bars */}
              <div className="space-y-4">
                {[
                  { name: 'Technical', current: 89, target: 95 },
                  { name: 'Leadership', current: 78, target: 85 },
                  { name: 'Communication', current: 73, target: 80 },
                  { name: 'Problem Solving', current: 92, target: 95 },
                  { name: 'Creativity', current: 85, target: 90 },
                  { name: 'Business', current: 45, target: 75 }
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-600">{skill.current}% / {skill.target}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.current}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Career Suggestions */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="p-6 h-full">
              <div className="flex items-center mb-6">
                <Star className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Career Suggestions</h2>
              </div>
              
              <div className="space-y-4">
                {careerRoles.map((role) => (
                  <div key={role.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{role.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${role.matchColor}`}>
                        {role.match}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary-600">{role.salary}</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Careers
              </Button>
            </Card>
          </motion.div>

          {/* Action Plan */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Card className="p-6 h-full">
              <div className="flex items-center mb-6">
                <BookOpen className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Action Plan</h2>
              </div>
              
              <div className="space-y-4">
                {roadmap.map((phase, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {phase.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : phase.status === 'in-progress' ? (
                        <Clock className="w-6 h-6 text-orange-500" />
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900">{phase.phase}</span>
                        <span className="text-sm text-gray-600">{phase.duration}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            phase.status === 'completed' ? 'bg-green-500' : 
                            phase.status === 'in-progress' ? 'bg-orange-500' : 'bg-gray-300'
                          }`}
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Skill Gap Analysis */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <BookOpen className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Skill Gap Analysis</h2>
              </div>
              <p className="text-gray-600 mb-6">Skills to develop for your target roles.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${skill.color}`}>
                        {skill.priority}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <div>Difficulty: {skill.difficulty}</div>
                      <div>Time: {skill.time}</div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Skill
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Connect with Mentors */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Connect with Mentors</h2>
              </div>
              <p className="text-gray-600 mb-6">Expert guidance from industry professionals.</p>
              
              <div className="space-y-4">
                {mentors.map((mentor, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">{mentor.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{mentor.rating}</span>
                        <span className="text-sm text-gray-500">• {mentor.sessions} sessions</span>
                      </div>
                    </div>
                    <Button variant="primary" size="sm">
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Job Trends Chart */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Job Market Trends</h2>
                <p className="text-gray-600">AI/ML job demand and salary trends</p>
              </div>
              <Button variant="outline" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                View Full Report
              </Button>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jobTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="salary" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

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
              <Link to="/startup-path">
                <Button variant="outline">
                  Explore Startup Path
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

export default CareerPathPage;
