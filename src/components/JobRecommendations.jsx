// Job Recommendations Component with Google Jobs API
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, ExternalLink, Filter, Search, Star, Building } from 'lucide-react';
import googleJobs from '../services/googleJobs';
import googleMaps from '../services/googleMaps';

const JobRecommendations = ({ userProfile, onJobSelect }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    experience: '',
    salary: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    if (userProfile) {
      loadJobRecommendations();
      loadLocationData();
    }
  }, [userProfile]);

  const loadJobRecommendations = async () => {
    setIsLoading(true);
    try {
      const jobData = await googleJobs.getCareerInsights({
        skills: userProfile.skills || [],
        interests: userProfile.interests || [],
        experience: userProfile.experience || 'entry',
        location: userProfile.location || '',
        education: userProfile.education || ''
      });

      setJobs(jobData.matchingJobs || []);
    } catch (error) {
      console.error('Failed to load job recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadLocationData = async () => {
    if (userProfile.location) {
      try {
        const location = await googleMaps.geocodeAddress(userProfile.location);
        setLocationData(location);
      } catch (error) {
        console.error('Failed to load location data:', error);
      }
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const searchParams = {
        query: searchQuery || this.buildJobSearchQuery(),
        location: filters.location || userProfile.location,
        pageSize: 20
      };

      const jobData = await googleJobs.searchJobs(searchParams);
      setJobs(jobData.jobs || []);
    } catch (error) {
      console.error('Job search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buildJobSearchQuery = () => {
    const { skills, interests } = userProfile;
    let query = '';
    
    if (skills && skills.length > 0) {
      query += skills.slice(0, 3).join(' ');
    }
    
    if (interests && interests.length > 0) {
      query += ' ' + interests.slice(0, 2).join(' ');
    }
    
    return query.trim() || 'career opportunities';
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const formatSalary = (compensation) => {
    if (!compensation) return 'Salary not specified';
    
    const { min, max, currency, period } = compensation;
    if (min && max) {
      return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()} ${period}`;
    }
    return 'Salary not specified';
  };

  const getMatchColor = (matchScore) => {
    if (matchScore >= 80) return 'text-green-600 bg-green-100';
    if (matchScore >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (isLoading && jobs.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <span className="ml-3 text-gray-600">Loading job recommendations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              placeholder="City, State"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
            <select
              value={filters.jobType}
              onChange={(e) => handleFilterChange('jobType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <select
              value={filters.experience}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Levels</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
              <option value="executive">Executive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
            <select
              value={filters.salary}
              onChange={(e) => handleFilterChange('salary', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Any Salary</option>
              <option value="0-50000">$0 - $50k</option>
              <option value="50000-75000">$50k - $75k</option>
              <option value="75000-100000">$75k - $100k</option>
              <option value="100000+">$100k+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or location</p>
          </div>
        ) : (
          jobs.map((job, index) => (
            <motion.div
              key={job.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onJobSelect?.(job)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{job.companyName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job.skillMatch || 0)}`}>
                      {job.skillMatch || 0}% Match
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm text-gray-600">
                        {job.rating || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{formatSalary(job.compensationInfo)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.employmentType || 'Full-time'}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                      Save Job
                    </button>
                    <a
                      href={job.applyUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Apply</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {job.missingSkills && job.missingSkills.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Skills to develop:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.missingSkills.slice(0, 5).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {jobs.length > 0 && (
        <div className="text-center">
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Load More Jobs'}
          </button>
        </div>
      )}
    </div>
  );
};

export default JobRecommendations;
