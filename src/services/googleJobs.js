// Google Jobs API Service
import { GOOGLE_CONFIG, GOOGLE_ENDPOINTS } from '../config/googleApis';
import googleAuth from './googleAuth';

class GoogleJobsService {
  constructor() {
    this.baseUrl = GOOGLE_ENDPOINTS.jobs;
  }

  // Search for jobs
  async searchJobs(params = {}) {
    try {
      const {
        query = '',
        location = '',
        pageSize = 10,
        pageToken = '',
        jobCategories = [],
        employmentTypes = [],
        datePosted = '',
        companyName = '',
        languageCode = 'en'
      } = params;

      const searchRequest = {
        requestMetadata: {
          domain: window.location.hostname,
          sessionId: this.generateSessionId(),
          userId: googleAuth.getCurrentUser()?.id || 'anonymous'
        },
        searchQuery: {
          query,
          locationFilters: location ? [{ address: location }] : [],
          jobCategories: jobCategories,
          employmentTypes: employmentTypes,
          datePosted: datePosted,
          companyNames: companyName ? [companyName] : []
        },
        pageSize,
        pageToken,
        languageCode
      };

      const response = await this.makeRequest('/jobs:search', {
        method: 'POST',
        body: JSON.stringify(searchRequest)
      });

      return response;
    } catch (error) {
      console.error('Job search failed:', error);
      throw error;
    }
  }

  // Get job details
  async getJobDetails(jobName) {
    try {
      const response = await this.makeRequest(`/jobs/${jobName}`);
      return response;
    } catch (error) {
      console.error('Failed to get job details:', error);
      throw error;
    }
  }

  // Get job categories
  async getJobCategories() {
    try {
      const response = await this.makeRequest('/jobCategories');
      return response;
    } catch (error) {
      console.error('Failed to get job categories:', error);
      throw error;
    }
  }

  // Get companies
  async getCompanies(params = {}) {
    try {
      const {
        query = '',
        pageSize = 10,
        pageToken = '',
        languageCode = 'en'
      } = params;

      const searchRequest = {
        requestMetadata: {
          domain: window.location.hostname,
          sessionId: this.generateSessionId(),
          userId: googleAuth.getCurrentUser()?.id || 'anonymous'
        },
        searchQuery: {
          query
        },
        pageSize,
        pageToken,
        languageCode
      };

      const response = await this.makeRequest('/companies:search', {
        method: 'POST',
        body: JSON.stringify(searchRequest)
      });

      return response;
    } catch (error) {
      console.error('Company search failed:', error);
      throw error;
    }
  }

  // Get career insights based on user profile
  async getCareerInsights(userProfile) {
    try {
      const {
        skills = [],
        interests = [],
        experience = 'entry',
        location = '',
        education = ''
      } = userProfile;

      // Build search query based on user profile
      const query = this.buildQueryFromProfile(userProfile);
      
      const jobs = await this.searchJobs({
        query,
        location,
        pageSize: 20
      });

      // Analyze and categorize results
      const insights = this.analyzeJobResults(jobs, userProfile);
      
      return insights;
    } catch (error) {
      console.error('Failed to get career insights:', error);
      throw error;
    }
  }

  // Build search query from user profile
  buildQueryFromProfile(profile) {
    const { skills, interests, experience, education } = profile;
    
    let query = '';
    
    if (skills && skills.length > 0) {
      query += skills.join(' ');
    }
    
    if (interests && interests.length > 0) {
      query += ' ' + interests.join(' ');
    }
    
    if (experience) {
      query += ` ${experience} level`;
    }
    
    if (education) {
      query += ` ${education}`;
    }
    
    return query.trim();
  }

  // Analyze job results for insights
  analyzeJobResults(jobs, userProfile) {
    const insights = {
      matchingJobs: [],
      skillGaps: [],
      salaryRanges: [],
      topCompanies: [],
      growthOpportunities: []
    };

    if (jobs.jobs) {
      jobs.jobs.forEach(job => {
        // Analyze job requirements vs user skills
        const skillMatch = this.analyzeSkillMatch(job, userProfile);
        
        insights.matchingJobs.push({
          ...job,
          skillMatch: skillMatch.percentage,
          missingSkills: skillMatch.missing
        });

        // Extract salary information
        if (job.compensationInfo) {
          insights.salaryRanges.push({
            jobTitle: job.title,
            salary: job.compensationInfo
          });
        }

        // Track companies
        if (job.companyName) {
          insights.topCompanies.push(job.companyName);
        }
      });
    }

    return insights;
  }

  // Analyze skill match between job and user
  analyzeSkillMatch(job, userProfile) {
    const userSkills = userProfile.skills || [];
    const jobRequirements = this.extractJobRequirements(job);
    
    const matchingSkills = jobRequirements.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );

    const percentage = (matchingSkills.length / jobRequirements.length) * 100;
    const missing = jobRequirements.filter(skill => 
      !matchingSkills.includes(skill)
    );

    return { percentage, missing };
  }

  // Extract job requirements from job description
  extractJobRequirements(job) {
    const description = job.description || '';
    const requirements = [];
    
    // Common technical skills
    const techSkills = [
      'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'AWS',
      'Machine Learning', 'Data Analysis', 'Project Management', 'Agile',
      'Communication', 'Leadership', 'Problem Solving', 'Teamwork'
    ];

    techSkills.forEach(skill => {
      if (description.toLowerCase().includes(skill.toLowerCase())) {
        requirements.push(skill);
      }
    });

    return requirements;
  }

  // Make API request
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = googleAuth.getAccessToken();

    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Goog-User-Project': GOOGLE_CONFIG.projectId
      }
    };

    const response = await fetch(url, {
      ...defaultOptions,
      ...options
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  // Generate session ID
  generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9);
  }
}

export default new GoogleJobsService();
