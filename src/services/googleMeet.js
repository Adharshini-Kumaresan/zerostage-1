// Google Meet API Service
import { GOOGLE_CONFIG, GOOGLE_ENDPOINTS } from '../config/googleApis';
import googleAuth from './googleAuth';

class GoogleMeetService {
  constructor() {
    this.baseUrl = 'https://meet.googleapis.com/v2';
    this.apiKey = GOOGLE_CONFIG.meetApiKey;
  }

  // Create a new meeting
  async createMeeting(meetingData) {
    try {
      const {
        title,
        description = '',
        startTime,
        endTime,
        attendees = [],
        location = null,
        isRecurring = false,
        recurrencePattern = null
      } = meetingData;

      const meeting = {
        summary: title,
        description,
        start: {
          dateTime: startTime,
          timeZone: 'UTC'
        },
        end: {
          dateTime: endTime,
          timeZone: 'UTC'
        },
        attendees: attendees.map(email => ({ email })),
        conferenceData: {
          createRequest: {
            requestId: this.generateRequestId(),
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            }
          }
        },
        ...(location && { location: { name: location } }),
        ...(isRecurring && recurrencePattern && {
          recurrence: [recurrencePattern]
        })
      };

      const response = await this.makeRequest('/conferences', {
        method: 'POST',
        body: JSON.stringify(meeting)
      });

      return this.processMeetingResponse(response);
    } catch (error) {
      console.error('Failed to create meeting:', error);
      throw error;
    }
  }

  // Process meeting response
  processMeetingResponse(response) {
    return {
      id: response.id,
      title: response.summary,
      description: response.description,
      startTime: response.start.dateTime,
      endTime: response.end.dateTime,
      attendees: response.attendees || [],
      meetingUrl: response.conferenceData?.entryPoints?.[0]?.uri,
      joinUrl: response.conferenceData?.entryPoints?.[0]?.uri,
      meetingId: response.conferenceData?.conferenceId,
      status: response.status,
      created: response.created,
      updated: response.updated
    };
  }

  // Schedule career counseling session
  async scheduleCareerCounseling(userId, counselorId, sessionData) {
    try {
      const {
        title = 'Career Counseling Session',
        description = 'One-on-one career guidance session',
        duration = 60, // minutes
        startTime,
        notes = ''
      } = sessionData;

      const endTime = new Date(new Date(startTime).getTime() + duration * 60000).toISOString();

      const meeting = await this.createMeeting({
        title: `${title} - ${userId}`,
        description: `${description}\n\nUser: ${userId}\nCounselor: ${counselorId}\nNotes: ${notes}`,
        startTime,
        endTime,
        attendees: [userId, counselorId],
        location: 'Google Meet'
      });

      // Store meeting details in database
      await this.storeMeetingDetails(meeting, {
        type: 'career_counseling',
        userId,
        counselorId,
        notes
      });

      return meeting;
    } catch (error) {
      console.error('Failed to schedule career counseling:', error);
      throw error;
    }
  }

  // Schedule group workshop
  async scheduleGroupWorkshop(workshopData) {
    try {
      const {
        title,
        description,
        startTime,
        duration,
        attendees,
        instructorId,
        topic,
        level = 'beginner'
      } = workshopData;

      const endTime = new Date(new Date(startTime).getTime() + duration * 60000).toISOString();

      const meeting = await this.createMeeting({
        title: `Workshop: ${title}`,
        description: `${description}\n\nTopic: ${topic}\nLevel: ${level}\nInstructor: ${instructorId}`,
        startTime,
        endTime,
        attendees: [...attendees, instructorId],
        location: 'Google Meet'
      });

      // Store workshop details
      await this.storeMeetingDetails(meeting, {
        type: 'workshop',
        instructorId,
        topic,
        level,
        attendees
      });

      return meeting;
    } catch (error) {
      console.error('Failed to schedule group workshop:', error);
      throw error;
    }
  }

  // Schedule interview preparation session
  async scheduleInterviewPrep(userId, coachId, interviewData) {
    try {
      const {
        company,
        position,
        interviewType = 'technical',
        startTime,
        duration = 90,
        preparationNotes = ''
      } = interviewData;

      const endTime = new Date(new Date(startTime).getTime() + duration * 60000).toISOString();

      const meeting = await this.createMeeting({
        title: `Interview Prep: ${position} at ${company}`,
        description: `Interview preparation session\n\nCompany: ${company}\nPosition: ${position}\nType: ${interviewType}\nNotes: ${preparationNotes}`,
        startTime,
        endTime,
        attendees: [userId, coachId],
        location: 'Google Meet'
      });

      // Store interview prep details
      await this.storeMeetingDetails(meeting, {
        type: 'interview_prep',
        userId,
        coachId,
        company,
        position,
        interviewType,
        preparationNotes
      });

      return meeting;
    } catch (error) {
      console.error('Failed to schedule interview prep:', error);
      throw error;
    }
  }

  // Get meeting details
  async getMeetingDetails(meetingId) {
    try {
      const response = await this.makeRequest(`/conferences/${meetingId}`);
      return this.processMeetingResponse(response);
    } catch (error) {
      console.error('Failed to get meeting details:', error);
      throw error;
    }
  }

  // Update meeting
  async updateMeeting(meetingId, updates) {
    try {
      const response = await this.makeRequest(`/conferences/${meetingId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });

      return this.processMeetingResponse(response);
    } catch (error) {
      console.error('Failed to update meeting:', error);
      throw error;
    }
  }

  // Cancel meeting
  async cancelMeeting(meetingId) {
    try {
      await this.makeRequest(`/conferences/${meetingId}`, {
        method: 'DELETE'
      });

      return true;
    } catch (error) {
      console.error('Failed to cancel meeting:', error);
      throw error;
    }
  }

  // List user's meetings
  async listUserMeetings(userId, options = {}) {
    try {
      const {
        startTime = new Date().toISOString(),
        endTime = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        maxResults = 50
      } = options;

      const params = new URLSearchParams({
        timeMin: startTime,
        timeMax: endTime,
        maxResults: maxResults.toString(),
        singleEvents: 'true',
        orderBy: 'startTime'
      });

      const response = await this.makeRequest(`/conferences?${params}`);
      
      // Filter meetings where user is an attendee
      const userMeetings = response.items.filter(meeting => 
        meeting.attendees?.some(attendee => attendee.email === userId)
      );

      return userMeetings.map(meeting => this.processMeetingResponse(meeting));
    } catch (error) {
      console.error('Failed to list user meetings:', error);
      throw error;
    }
  }

  // Get meeting recording (if available)
  async getMeetingRecording(meetingId) {
    try {
      const response = await this.makeRequest(`/conferences/${meetingId}/recordings`);
      return response;
    } catch (error) {
      console.error('Failed to get meeting recording:', error);
      throw error;
    }
  }

  // Generate meeting link
  generateMeetingLink(meetingId) {
    return `https://meet.google.com/${meetingId}`;
  }

  // Generate request ID
  generateRequestId() {
    return 'meet_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  // Store meeting details in database
  async storeMeetingDetails(meeting, metadata) {
    try {
      // This would typically store in your database
      // For now, we'll just log it
      console.log('Storing meeting details:', {
        meetingId: meeting.id,
        metadata
      });

      // TODO: Implement database storage
      // await database.collection('meetings').add({
      //   meetingId: meeting.id,
      //   ...meeting,
      //   metadata,
      //   createdAt: new Date().toISOString()
      // });

      return true;
    } catch (error) {
      console.error('Failed to store meeting details:', error);
      throw error;
    }
  }

  // Create recurring meeting series
  async createRecurringMeeting(meetingData) {
    try {
      const {
        title,
        description,
        startTime,
        endTime,
        attendees,
        recurrencePattern,
        endDate
      } = meetingData;

      const meeting = await this.createMeeting({
        title,
        description,
        startTime,
        endTime,
        attendees,
        isRecurring: true,
        recurrencePattern: this.buildRecurrencePattern(recurrencePattern, endDate)
      });

      return meeting;
    } catch (error) {
      console.error('Failed to create recurring meeting:', error);
      throw error;
    }
  }

  // Build recurrence pattern
  buildRecurrencePattern(pattern, endDate) {
    const { frequency, interval = 1, daysOfWeek = [] } = pattern;
    
    let recurrence = `RRULE:FREQ=${frequency.toUpperCase()};INTERVAL=${interval}`;
    
    if (daysOfWeek.length > 0) {
      const dayMap = {
        'monday': 'MO',
        'tuesday': 'TU',
        'wednesday': 'WE',
        'thursday': 'TH',
        'friday': 'FR',
        'saturday': 'SA',
        'sunday': 'SU'
      };
      
      const days = daysOfWeek.map(day => dayMap[day.toLowerCase()]).join(',');
      recurrence += `;BYDAY=${days}`;
    }
    
    if (endDate) {
      recurrence += `;UNTIL=${endDate}`;
    }
    
    return recurrence;
  }

  // Send meeting invitation
  async sendMeetingInvitation(meetingId, attendees) {
    try {
      // This would typically use Gmail API to send invitations
      // For now, we'll return the meeting details
      const meeting = await this.getMeetingDetails(meetingId);
      
      return {
        meeting,
        invitationSent: true,
        attendees
      };
    } catch (error) {
      console.error('Failed to send meeting invitation:', error);
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

export default new GoogleMeetService();
