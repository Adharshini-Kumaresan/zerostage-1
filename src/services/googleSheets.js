// Google Sheets API Service
import { GOOGLE_CONFIG, GOOGLE_ENDPOINTS } from '../config/googleApis';
import googleAuth from './googleAuth';

class GoogleSheetsService {
  constructor() {
    this.baseUrl = GOOGLE_ENDPOINTS.sheets;
  }

  // Create a new spreadsheet
  async createSpreadsheet(title, sheets = []) {
    try {
      const spreadsheet = {
        properties: {
          title: title
        },
        sheets: sheets.map(sheet => ({
          properties: {
            title: sheet.title,
            gridProperties: {
              rowCount: sheet.rowCount || 1000,
              columnCount: sheet.columnCount || 26
            }
          }
        }))
      };

      const response = await this.makeRequest('', {
        method: 'POST',
        body: JSON.stringify(spreadsheet)
      });

      return response;
    } catch (error) {
      console.error('Failed to create spreadsheet:', error);
      throw error;
    }
  }

  // Read data from spreadsheet
  async readData(spreadsheetId, range, majorDimension = 'ROWS') {
    try {
      const response = await this.makeRequest(`/${spreadsheetId}/values/${range}`, {
        params: {
          majorDimension
        }
      });

      return response;
    } catch (error) {
      console.error('Failed to read data:', error);
      throw error;
    }
  }

  // Write data to spreadsheet
  async writeData(spreadsheetId, range, values, valueInputOption = 'RAW') {
    try {
      const response = await this.makeRequest(`/${spreadsheetId}/values/${range}`, {
        method: 'PUT',
        body: JSON.stringify({
          values: values
        }),
        params: {
          valueInputOption
        }
      });

      return response;
    } catch (error) {
      console.error('Failed to write data:', error);
      throw error;
    }
  }

  // Append data to spreadsheet
  async appendData(spreadsheetId, range, values, valueInputOption = 'RAW') {
    try {
      const response = await this.makeRequest(`/${spreadsheetId}/values/${range}:append`, {
        method: 'POST',
        body: JSON.stringify({
          values: values
        }),
        params: {
          valueInputOption
        }
      });

      return response;
    } catch (error) {
      console.error('Failed to append data:', error);
      throw error;
    }
  }

  // Export user test results to spreadsheet
  async exportTestResults(userId, testResults) {
    try {
      const spreadsheetTitle = `ZeroStage Test Results - ${userId} - ${new Date().toISOString().split('T')[0]}`;
      
      // Create spreadsheet
      const spreadsheet = await this.createSpreadsheet(spreadsheetTitle, [
        { title: 'Test Results', rowCount: 50, columnCount: 10 },
        { title: 'Personality Analysis', rowCount: 30, columnCount: 8 },
        { title: 'Career Recommendations', rowCount: 20, columnCount: 6 }
      ]);

      const spreadsheetId = spreadsheet.spreadsheetId;

      // Export test results
      await this.writeData(spreadsheetId, 'Test Results!A1:J1', [
        ['Question', 'Answer', 'Category', 'Score', 'Time Spent', 'Date', 'User ID', 'Session ID', 'Device', 'Browser']
      ]);

      const testData = testResults.answers.map(answer => [
        answer.question,
        answer.answer,
        answer.category,
        answer.score,
        answer.timeSpent,
        answer.timestamp,
        userId,
        testResults.sessionId,
        testResults.deviceInfo?.type || 'Unknown',
        testResults.deviceInfo?.browser || 'Unknown'
      ]);

      await this.appendData(spreadsheetId, 'Test Results!A2:J', testData);

      // Export personality analysis
      await this.writeData(spreadsheetId, 'Personality Analysis!A1:H1', [
        ['Trait', 'Score', 'Percentile', 'Description', 'Strengths', 'Areas for Growth', 'Recommendations', 'Date']
      ]);

      const personalityData = Object.entries(testResults.personalityScores).map(([trait, score]) => [
        trait,
        score.value,
        score.percentile,
        score.description,
        score.strengths?.join(', ') || '',
        score.areasForGrowth?.join(', ') || '',
        score.recommendations?.join(', ') || '',
        new Date().toISOString()
      ]);

      await this.appendData(spreadsheetId, 'Personality Analysis!A2:H', personalityData);

      // Export career recommendations
      await this.writeData(spreadsheetId, 'Career Recommendations!A1:F1', [
        ['Career Path', 'Match Score', 'Description', 'Required Skills', 'Salary Range', 'Growth Outlook']
      ]);

      const careerData = testResults.careerRecommendations.map(rec => [
        rec.title,
        rec.matchScore,
        rec.description,
        rec.requiredSkills?.join(', ') || '',
        rec.salaryRange || 'Not specified',
        rec.growthOutlook || 'Not specified'
      ]);

      await this.appendData(spreadsheetId, 'Career Recommendations!A2:F', careerData);

      return {
        spreadsheetId,
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
        title: spreadsheetTitle
      };
    } catch (error) {
      console.error('Failed to export test results:', error);
      throw error;
    }
  }

  // Export user analytics to spreadsheet
  async exportUserAnalytics(userId, analyticsData) {
    try {
      const spreadsheetTitle = `ZeroStage Analytics - ${userId} - ${new Date().toISOString().split('T')[0]}`;
      
      const spreadsheet = await this.createSpreadsheet(spreadsheetTitle, [
        { title: 'User Activity', rowCount: 100, columnCount: 8 },
        { title: 'Career Progress', rowCount: 50, columnCount: 6 },
        { title: 'Skill Development', rowCount: 30, columnCount: 5 }
      ]);

      const spreadsheetId = spreadsheet.spreadsheetId;

      // Export user activity
      await this.writeData(spreadsheetId, 'User Activity!A1:H1', [
        ['Date', 'Action', 'Page', 'Duration', 'Device', 'Location', 'Referrer', 'User Agent']
      ]);

      const activityData = analyticsData.activity.map(activity => [
        activity.date,
        activity.action,
        activity.page,
        activity.duration,
        activity.device,
        activity.location,
        activity.referrer,
        activity.userAgent
      ]);

      await this.appendData(spreadsheetId, 'User Activity!A2:H', activityData);

      // Export career progress
      await this.writeData(spreadsheetId, 'Career Progress!A1:F1', [
        ['Date', 'Goal', 'Progress', 'Status', 'Notes', 'Next Steps']
      ]);

      const progressData = analyticsData.careerProgress.map(progress => [
        progress.date,
        progress.goal,
        progress.progress,
        progress.status,
        progress.notes,
        progress.nextSteps
      ]);

      await this.appendData(spreadsheetId, 'Career Progress!A2:F', progressData);

      // Export skill development
      await this.writeData(spreadsheetId, 'Skill Development!A1:E1', [
        ['Skill', 'Current Level', 'Target Level', 'Progress', 'Last Updated']
      ]);

      const skillData = analyticsData.skillDevelopment.map(skill => [
        skill.name,
        skill.currentLevel,
        skill.targetLevel,
        skill.progress,
        skill.lastUpdated
      ]);

      await this.appendData(spreadsheetId, 'Skill Development!A2:E', skillData);

      return {
        spreadsheetId,
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
        title: spreadsheetTitle
      };
    } catch (error) {
      console.error('Failed to export user analytics:', error);
      throw error;
    }
  }

  // Create career tracking spreadsheet
  async createCareerTrackingSpreadsheet(userId) {
    try {
      const spreadsheetTitle = `ZeroStage Career Tracker - ${userId}`;
      
      const spreadsheet = await this.createSpreadsheet(spreadsheetTitle, [
        { title: 'Goals', rowCount: 50, columnCount: 8 },
        { title: 'Applications', rowCount: 100, columnCount: 10 },
        { title: 'Interviews', rowCount: 50, columnCount: 8 },
        { title: 'Skills', rowCount: 30, columnCount: 6 },
        { title: 'Networking', rowCount: 50, columnCount: 7 }
      ]);

      const spreadsheetId = spreadsheet.spreadsheetId;

      // Set up Goals sheet
      await this.writeData(spreadsheetId, 'Goals!A1:H1', [
        ['Goal', 'Category', 'Target Date', 'Status', 'Progress', 'Priority', 'Notes', 'Created Date']
      ]);

      // Set up Applications sheet
      await this.writeData(spreadsheetId, 'Applications!A1:J1', [
        ['Company', 'Position', 'Applied Date', 'Status', 'Source', 'Salary', 'Location', 'Notes', 'Follow-up Date', 'Result']
      ]);

      // Set up Interviews sheet
      await this.writeData(spreadsheetId, 'Interviews!A1:H1', [
        ['Company', 'Position', 'Interview Date', 'Type', 'Interviewer', 'Questions', 'Notes', 'Outcome']
      ]);

      // Set up Skills sheet
      await this.writeData(spreadsheetId, 'Skills!A1:F1', [
        ['Skill', 'Current Level', 'Target Level', 'Learning Method', 'Progress', 'Last Updated']
      ]);

      // Set up Networking sheet
      await this.writeData(spreadsheetId, 'Networking!A1:G1', [
        ['Name', 'Company', 'Position', 'Contact Method', 'Last Contact', 'Notes', 'Next Action']
      ]);

      return {
        spreadsheetId,
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
        title: spreadsheetTitle
      };
    } catch (error) {
      console.error('Failed to create career tracking spreadsheet:', error);
      throw error;
    }
  }

  // Update career goal in spreadsheet
  async updateCareerGoal(spreadsheetId, goalData) {
    try {
      const values = [
        [
          goalData.title,
          goalData.category,
          goalData.targetDate,
          goalData.status,
          goalData.progress,
          goalData.priority,
          goalData.notes,
          new Date().toISOString()
        ]
      ];

      await this.appendData(spreadsheetId, 'Goals!A:H', values);
      return true;
    } catch (error) {
      console.error('Failed to update career goal:', error);
      throw error;
    }
  }

  // Add job application to spreadsheet
  async addJobApplication(spreadsheetId, applicationData) {
    try {
      const values = [
        [
          applicationData.company,
          applicationData.position,
          applicationData.appliedDate,
          applicationData.status,
          applicationData.source,
          applicationData.salary,
          applicationData.location,
          applicationData.notes,
          applicationData.followUpDate,
          applicationData.result || 'Pending'
        ]
      ];

      await this.appendData(spreadsheetId, 'Applications!A:J', values);
      return true;
    } catch (error) {
      console.error('Failed to add job application:', error);
      throw error;
    }
  }

  // Get spreadsheet data as JSON
  async getSpreadsheetData(spreadsheetId, range) {
    try {
      const response = await this.readData(spreadsheetId, range);
      return response.values || [];
    } catch (error) {
      console.error('Failed to get spreadsheet data:', error);
      throw error;
    }
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

    // Handle query parameters
    if (options.params) {
      const queryParams = new URLSearchParams(options.params);
      const separator = url.includes('?') ? '&' : '?';
      const fullUrl = `${url}${separator}${queryParams}`;
      
      const response = await fetch(fullUrl, {
        ...defaultOptions,
        ...options
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    }

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

export default new GoogleSheetsService();
