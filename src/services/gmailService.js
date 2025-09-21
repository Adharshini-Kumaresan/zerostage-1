// Gmail API Service
import { GOOGLE_CONFIG, GOOGLE_ENDPOINTS } from '../config/googleApis';
import googleAuth from './googleAuth';

class GmailService {
  constructor() {
    this.baseUrl = GOOGLE_ENDPOINTS.gmail;
  }

  // Send email
  async sendEmail(to, subject, body, isHtml = false) {
    try {
      const message = this.createMessage(to, subject, body, isHtml);
      
      const response = await this.makeRequest('/messages/send', {
        method: 'POST',
        body: JSON.stringify({
          raw: message
        })
      });

      return response;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  // Create message for Gmail API
  createMessage(to, subject, body, isHtml = false) {
    const boundary = 'boundary_' + Math.random().toString(36).substr(2, 9);
    const contentType = isHtml ? 'text/html' : 'text/plain';
    
    const message = [
      `To: ${to}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      `Content-Type: ${contentType}; charset=UTF-8`,
      '',
      body,
      `--${boundary}--`
    ].join('\n');

    return btoa(message).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  // Send career guidance email
  async sendCareerGuidanceEmail(userEmail, userName, guidanceData) {
    try {
      const subject = `Your Personalized Career Guidance - ZeroStage`;
      const body = this.generateCareerGuidanceEmailBody(userName, guidanceData);
      
      return await this.sendEmail(userEmail, subject, body, true);
    } catch (error) {
      console.error('Failed to send career guidance email:', error);
      throw error;
    }
  }

  // Send job recommendations email
  async sendJobRecommendationsEmail(userEmail, userName, jobData) {
    try {
      const subject = `New Job Opportunities for You - ZeroStage`;
      const body = this.generateJobRecommendationsEmailBody(userName, jobData);
      
      return await this.sendEmail(userEmail, subject, body, true);
    } catch (error) {
      console.error('Failed to send job recommendations email:', error);
      throw error;
    }
  }

  // Send test results email
  async sendTestResultsEmail(userEmail, userName, testResults) {
    try {
      const subject = `Your Psychometric Test Results - ZeroStage`;
      const body = this.generateTestResultsEmailBody(userName, testResults);
      
      return await this.sendEmail(userEmail, subject, body, true);
    } catch (error) {
      console.error('Failed to send test results email:', error);
      throw error;
    }
  }

  // Send weekly career insights
  async sendWeeklyInsightsEmail(userEmail, userName, insightsData) {
    try {
      const subject = `Your Weekly Career Insights - ZeroStage`;
      const body = this.generateWeeklyInsightsEmailBody(userName, insightsData);
      
      return await this.sendEmail(userEmail, subject, body, true);
    } catch (error) {
      console.error('Failed to send weekly insights email:', error);
      throw error;
    }
  }

  // Generate career guidance email body
  generateCareerGuidanceEmailBody(userName, guidanceData) {
    const { recommendations, nextSteps, resources } = guidanceData;
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Career Guidance - ZeroStage</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6, #f59e0b); color: white; padding: 20px; border-radius: 8px; }
          .content { padding: 20px 0; }
          .recommendation { background: #f8fafc; padding: 15px; margin: 10px 0; border-left: 4px solid #3b82f6; border-radius: 4px; }
          .next-steps { background: #fef3c7; padding: 15px; margin: 10px 0; border-radius: 4px; }
          .resource { background: #ecfdf5; padding: 10px; margin: 5px 0; border-radius: 4px; }
          .button { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Personalized Career Guidance</h1>
            <p>Hello ${userName}, here are your personalized career recommendations!</p>
          </div>
          
          <div class="content">
            <h2>🎯 Career Recommendations</h2>
            ${recommendations.map(rec => `
              <div class="recommendation">
                <h3>${rec.title}</h3>
                <p>${rec.description}</p>
                <p><strong>Match Score:</strong> ${rec.matchScore}%</p>
              </div>
            `).join('')}
            
            <h2>📋 Next Steps</h2>
            <div class="next-steps">
              <ul>
                ${nextSteps.map(step => `<li>${step}</li>`).join('')}
              </ul>
            </div>
            
            <h2>📚 Recommended Resources</h2>
            ${resources.map(resource => `
              <div class="resource">
                <h4>${resource.title}</h4>
                <p>${resource.description}</p>
                <a href="${resource.url}" class="button">Learn More</a>
              </div>
            `).join('')}
            
            <p style="margin-top: 30px;">
              <a href="${window.location.origin}/dashboard" class="button">View Full Dashboard</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Generate job recommendations email body
  generateJobRecommendationsEmailBody(userName, jobData) {
    const { jobs, totalCount } = jobData;
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Job Recommendations - ZeroStage</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6, #f59e0b); color: white; padding: 20px; border-radius: 8px; }
          .job { background: #f8fafc; padding: 15px; margin: 10px 0; border-radius: 8px; border: 1px solid #e2e8f0; }
          .job-title { color: #3b82f6; font-size: 18px; font-weight: bold; margin-bottom: 5px; }
          .company { color: #64748b; font-size: 14px; margin-bottom: 10px; }
          .location { color: #64748b; font-size: 12px; }
          .match-score { background: #10b981; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; }
          .button { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Job Opportunities for You</h1>
            <p>Hello ${userName}, we found ${totalCount} new opportunities that match your profile!</p>
          </div>
          
          <div class="content">
            ${jobs.slice(0, 5).map(job => `
              <div class="job">
                <div class="job-title">${job.title}</div>
                <div class="company">${job.companyName}</div>
                <div class="location">📍 ${job.location}</div>
                <p>${job.description.substring(0, 200)}...</p>
                <div style="margin-top: 10px;">
                  <span class="match-score">${job.matchScore}% Match</span>
                  <a href="${job.applyUrl || '#'}" class="button" style="float: right;">Apply Now</a>
                </div>
              </div>
            `).join('')}
            
            ${jobs.length > 5 ? `
              <p style="text-align: center; margin-top: 20px;">
                <a href="${window.location.origin}/jobs" class="button">View All ${totalCount} Jobs</a>
              </p>
            ` : ''}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Generate test results email body
  generateTestResultsEmailBody(userName, testResults) {
    const { personalityType, strengths, recommendations, careerPaths } = testResults;
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Test Results - ZeroStage</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6, #f59e0b); color: white; padding: 20px; border-radius: 8px; }
          .result-section { background: #f8fafc; padding: 20px; margin: 15px 0; border-radius: 8px; }
          .strength { background: #ecfdf5; padding: 10px; margin: 5px 0; border-radius: 4px; }
          .career-path { background: #fef3c7; padding: 15px; margin: 10px 0; border-radius: 4px; }
          .button { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Psychometric Test Results</h1>
            <p>Hello ${userName}, here are your personalized test results!</p>
          </div>
          
          <div class="content">
            <div class="result-section">
              <h2>🎭 Your Personality Type</h2>
              <h3>${personalityType.name}</h3>
              <p>${personalityType.description}</p>
            </div>
            
            <div class="result-section">
              <h2>💪 Your Key Strengths</h2>
              ${strengths.map(strength => `
                <div class="strength">
                  <strong>${strength.name}:</strong> ${strength.description}
                </div>
              `).join('')}
            </div>
            
            <div class="result-section">
              <h2>🚀 Recommended Career Paths</h2>
              ${careerPaths.map(path => `
                <div class="career-path">
                  <h4>${path.title}</h4>
                  <p>${path.description}</p>
                  <p><strong>Match Score:</strong> ${path.matchScore}%</p>
                </div>
              `).join('')}
            </div>
            
            <p style="text-align: center; margin-top: 30px;">
              <a href="${window.location.origin}/results" class="button">View Detailed Results</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Generate weekly insights email body
  generateWeeklyInsightsEmailBody(userName, insightsData) {
    const { marketTrends, skillDemand, newOpportunities, learningRecommendations } = insightsData;
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Weekly Career Insights - ZeroStage</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6, #f59e0b); color: white; padding: 20px; border-radius: 8px; }
          .insight-section { background: #f8fafc; padding: 20px; margin: 15px 0; border-radius: 8px; }
          .trend-item { background: #ecfdf5; padding: 10px; margin: 5px 0; border-radius: 4px; }
          .skill-item { background: #fef3c7; padding: 10px; margin: 5px 0; border-radius: 4px; }
          .opportunity { background: #ede9fe; padding: 15px; margin: 10px 0; border-radius: 4px; }
          .button { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Weekly Career Insights</h1>
            <p>Hello ${userName}, here's what's happening in your career field this week!</p>
          </div>
          
          <div class="content">
            <div class="insight-section">
              <h2>📈 Market Trends</h2>
              ${marketTrends.map(trend => `
                <div class="trend-item">
                  <strong>${trend.title}:</strong> ${trend.description}
                </div>
              `).join('')}
            </div>
            
            <div class="insight-section">
              <h2>🎯 In-Demand Skills</h2>
              ${skillDemand.map(skill => `
                <div class="skill-item">
                  <strong>${skill.name}:</strong> ${skill.demandLevel} demand
                  <br><small>${skill.description}</small>
                </div>
              `).join('')}
            </div>
            
            <div class="insight-section">
              <h2>🌟 New Opportunities</h2>
              ${newOpportunities.map(opportunity => `
                <div class="opportunity">
                  <h4>${opportunity.title}</h4>
                  <p>${opportunity.description}</p>
                  <a href="${opportunity.url}" class="button">Learn More</a>
                </div>
              `).join('')}
            </div>
            
            <div class="insight-section">
              <h2>📚 Learning Recommendations</h2>
              ${learningRecommendations.map(rec => `
                <div class="trend-item">
                  <strong>${rec.title}:</strong> ${rec.description}
                  <br><a href="${rec.url}">Start Learning</a>
                </div>
              `).join('')}
            </div>
            
            <p style="text-align: center; margin-top: 30px;">
              <a href="${window.location.origin}/dashboard" class="button">View Full Dashboard</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Make API request
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = googleAuth.getAccessToken();

    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
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
}

export default new GmailService();
