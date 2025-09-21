// Main Google API Integration Service
import googleAuth from './googleAuth';
import googleJobs from './googleJobs';
import googleDrive from './googleDrive';
import googleAnalytics from './googleAnalytics';
import googleNLP from './googleNLP';
import googleMaps from './googleMaps';
import gmailService from './gmailService';
import googleSheets from './googleSheets';
import googleAI from './googleAI';
import youtubeService from './youtubeService';
import googleMeet from './googleMeet';

class GoogleApiIntegration {
  constructor() {
    this.services = {
      auth: googleAuth,
      jobs: googleJobs,
      drive: googleDrive,
      analytics: googleAnalytics,
      nlp: googleNLP,
      maps: googleMaps,
      gmail: gmailService,
      sheets: googleSheets,
      ai: googleAI,
      youtube: youtubeService,
      meet: googleMeet
    };
    this.isInitialized = false;
  }

  // Initialize all Google services
  async initialize() {
    try {
      console.log('Initializing Google API Integration...');
      
      // Initialize authentication first
      await this.services.auth.initialize();
      
      // Initialize analytics
      await this.services.analytics.initialize();
      
      // Initialize maps
      await this.services.maps.initialize();
      
      this.isInitialized = true;
      console.log('Google API Integration initialized successfully');
      
      return true;
    } catch (error) {
      console.error('Failed to initialize Google API Integration:', error);
      throw error;
    }
  }

  // Comprehensive user onboarding with all Google services
  async completeUserOnboarding(userData) {
    try {
      const results = {
        auth: null,
        drive: null,
        analytics: null,
        jobs: null,
        recommendations: null
      };

      // 1. Authenticate user
      results.auth = await this.services.auth.signIn();
      
      // 2. Set up user folder in Drive
      results.drive = await this.services.drive.createUserFolder(userData.id);
      
      // 3. Set up analytics tracking
      this.services.analytics.setUserProperties(userData.id, {
        user_type: userData.type,
        signup_date: new Date().toISOString(),
        source: userData.source || 'direct'
      });
      
      // 4. Get initial job recommendations
      results.jobs = await this.services.jobs.getCareerInsights({
        skills: userData.skills || [],
        interests: userData.interests || [],
        experience: userData.experience || 'entry',
        location: userData.location || '',
        education: userData.education || ''
      });
      
      // 5. Generate AI-powered recommendations
      results.recommendations = await this.services.ai.generateCareerRecommendations(
        userData,
        { personalityType: 'unknown' }, // Will be updated after test
        { jobTrends: [], salaryData: [], skillDemand: [] }
      );

      return results;
    } catch (error) {
      console.error('User onboarding failed:', error);
      throw error;
    }
  }

  // Enhanced psychometric test with all Google services
  async processPsychometricTest(testData, userProfile) {
    try {
      const results = {
        nlpAnalysis: null,
        aiAnalysis: null,
        careerInsights: null,
        learningRecommendations: null,
        jobRecommendations: null,
        analytics: null
      };

      // 1. Natural Language Processing analysis
      results.nlpAnalysis = await this.services.nlp.analyzeTestResponses(testData.responses);
      
      // 2. AI-powered analysis
      results.aiAnalysis = await this.services.ai.analyzePsychometricResponses(
        testData.responses,
        userProfile
      );
      
      // 3. Get career insights from jobs API
      results.careerInsights = await this.services.jobs.getCareerInsights({
        ...userProfile,
        personalityType: results.aiAnalysis.personalityType
      });
      
      // 4. Generate learning recommendations
      results.learningRecommendations = await this.services.ai.generateLearningRecommendations(
        userProfile,
        results.aiAnalysis.careerRecommendations,
        userProfile.skills || []
      );
      
      // 5. Get job recommendations
      results.jobRecommendations = await this.services.jobs.searchJobs({
        query: this.buildJobSearchQuery(results.aiAnalysis),
        location: userProfile.location,
        pageSize: 10
      });
      
      // 6. Track test completion in analytics
      this.services.analytics.trackTestEvent('test_completed', {
        testType: 'psychometric_assessment',
        userId: userProfile.id,
        timeSpent: testData.totalTime,
        questionCount: testData.responses.length
      });

      return results;
    } catch (error) {
      console.error('Psychometric test processing failed:', error);
      throw error;
    }
  }

  // Build job search query from AI analysis
  buildJobSearchQuery(aiAnalysis) {
    const { personalityType, careerRecommendations, skillGaps } = aiAnalysis;
    
    let query = '';
    
    if (careerRecommendations && careerRecommendations.length > 0) {
      query += careerRecommendations.slice(0, 3).map(rec => rec.title).join(' ');
    }
    
    if (skillGaps && skillGaps.length > 0) {
      query += ' ' + skillGaps.slice(0, 2).join(' ');
    }
    
    return query.trim() || personalityType || 'career opportunities';
  }

  // Comprehensive career guidance with all services
  async provideCareerGuidance(userProfile, testResults) {
    try {
      const guidance = {
        personalityAnalysis: null,
        careerRecommendations: null,
        jobOpportunities: null,
        learningPath: null,
        locationInsights: null,
        documentRecommendations: null,
        meetingSuggestions: null,
        contentRecommendations: null
      };

      // 1. Personality analysis
      guidance.personalityAnalysis = testResults.nlpAnalysis || testResults.aiAnalysis;
      
      // 2. Career recommendations
      guidance.careerRecommendations = await this.services.ai.generateCareerRecommendations(
        userProfile,
        testResults.aiAnalysis,
        { jobTrends: [], salaryData: [], skillDemand: [] }
      );
      
      // 3. Job opportunities
      guidance.jobOpportunities = await this.services.jobs.searchJobs({
        query: this.buildJobSearchQuery(testResults.aiAnalysis),
        location: userProfile.location,
        pageSize: 20
      });
      
      // 4. Learning path
      guidance.learningPath = await this.services.ai.generateLearningRecommendations(
        userProfile,
        guidance.careerRecommendations.recommendedCareers,
        userProfile.skills || []
      );
      
      // 5. Location insights
      if (userProfile.location) {
        guidance.locationInsights = await this.services.maps.findCareerOpportunities(
          userProfile.location,
          guidance.careerRecommendations.recommendedCareers[0]?.title
        );
      }
      
      // 6. Document recommendations
      guidance.documentRecommendations = await this.services.drive.getUserDocuments(
        userProfile.id,
        'resume'
      );
      
      // 7. Meeting suggestions
      guidance.meetingSuggestions = await this.suggestCareerMeetings(userProfile);
      
      // 8. Content recommendations
      guidance.contentRecommendations = await this.services.youtube.getRecommendedVideos(
        userProfile.interests || [],
        userProfile.skills || []
      );

      return guidance;
    } catch (error) {
      console.error('Career guidance failed:', error);
      throw error;
    }
  }

  // Suggest career meetings
  async suggestCareerMeetings(userProfile) {
    try {
      const suggestions = [];
      
      // Career counseling session
      suggestions.push({
        type: 'career_counseling',
        title: 'Career Counseling Session',
        description: 'One-on-one career guidance with a professional counselor',
        duration: 60,
        priority: 'high'
      });
      
      // Skill development workshop
      if (userProfile.skills && userProfile.skills.length > 0) {
        suggestions.push({
          type: 'workshop',
          title: `${userProfile.skills[0]} Skill Development Workshop`,
          description: `Learn and improve your ${userProfile.skills[0]} skills`,
          duration: 120,
          priority: 'medium'
        });
      }
      
      // Interview preparation
      suggestions.push({
        type: 'interview_prep',
        title: 'Interview Preparation Session',
        description: 'Prepare for upcoming job interviews',
        duration: 90,
        priority: 'medium'
      });

      return suggestions;
    } catch (error) {
      console.error('Failed to suggest career meetings:', error);
      return [];
    }
  }

  // Send comprehensive career update email
  async sendCareerUpdateEmail(userEmail, userName, careerData) {
    try {
      const emailData = {
        recommendations: careerData.careerRecommendations?.recommendedCareers || [],
        jobOpportunities: careerData.jobOpportunities?.jobs || [],
        learningPath: careerData.learningPath?.recommendedCourses || [],
        nextSteps: this.generateNextSteps(careerData),
        resources: this.generateResourceList(careerData)
      };

      return await this.services.gmail.sendCareerGuidanceEmail(
        userEmail,
        userName,
        emailData
      );
    } catch (error) {
      console.error('Failed to send career update email:', error);
      throw error;
    }
  }

  // Generate next steps
  generateNextSteps(careerData) {
    const steps = [];
    
    if (careerData.careerRecommendations?.recommendedCareers?.length > 0) {
      steps.push('Explore recommended career paths in your dashboard');
    }
    
    if (careerData.jobOpportunities?.jobs?.length > 0) {
      steps.push('Apply to matching job opportunities');
    }
    
    if (careerData.learningPath?.recommendedCourses?.length > 0) {
      steps.push('Start recommended learning courses');
    }
    
    if (careerData.meetingSuggestions?.length > 0) {
      steps.push('Schedule a career counseling session');
    }
    
    return steps;
  }

  // Generate resource list
  generateResourceList(careerData) {
    const resources = [];
    
    if (careerData.contentRecommendations?.videos?.length > 0) {
      resources.push({
        title: 'Recommended Videos',
        description: 'Educational content tailored to your career goals',
        url: '/videos',
        type: 'video'
      });
    }
    
    if (careerData.documentRecommendations?.files?.length > 0) {
      resources.push({
        title: 'Your Documents',
        description: 'Access your saved resumes and portfolios',
        url: '/documents',
        type: 'document'
      });
    }
    
    resources.push({
      title: 'Career Tracker',
      description: 'Track your career progress and goals',
      url: '/tracker',
      type: 'tool'
    });

    return resources;
  }

  // Export user data to Google Sheets
  async exportUserData(userId, userData, testResults, careerData) {
    try {
      // Export test results
      const testResultsExport = await this.services.sheets.exportTestResults(userId, testResults);
      
      // Export user analytics
      const analyticsExport = await this.services.sheets.exportUserAnalytics(userId, userData.analytics);
      
      // Create career tracking spreadsheet
      const careerTracker = await this.services.sheets.createCareerTrackingSpreadsheet(userId);
      
      return {
        testResults: testResultsExport,
        analytics: analyticsExport,
        careerTracker: careerTracker
      };
    } catch (error) {
      console.error('Failed to export user data:', error);
      throw error;
    }
  }

  // Get service status
  getServiceStatus() {
    return {
      isInitialized: this.isInitialized,
      services: Object.keys(this.services).reduce((status, serviceName) => {
        status[serviceName] = {
          available: !!this.services[serviceName],
          initialized: serviceName === 'auth' ? this.services[serviceName].isInitialized : true
        };
        return status;
      }, {})
    };
  }

  // Handle errors gracefully
  handleError(error, serviceName) {
    console.error(`Error in ${serviceName}:`, error);
    
    // Track error in analytics
    this.services.analytics.trackError(
      'api_error',
      error.message,
      { service: serviceName, location: 'googleApiIntegration' }
    );
    
    return {
      success: false,
      error: error.message,
      service: serviceName
    };
  }
}

export default new GoogleApiIntegration();
