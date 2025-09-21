// Google Analytics 4 Service
import { GOOGLE_CONFIG } from '../config/googleApis';

class GoogleAnalyticsService {
  constructor() {
    this.measurementId = GOOGLE_CONFIG.analyticsId;
    this.isInitialized = false;
  }

  // Initialize Google Analytics
  async initialize() {
    if (this.isInitialized || !this.measurementId) return;

    try {
      // Load gtag script
      await this.loadGtagScript();
      
      // Initialize GA4
      window.gtag('config', this.measurementId, {
        page_title: document.title,
        page_location: window.location.href
      });

      this.isInitialized = true;
      console.log('Google Analytics initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
    }
  }

  // Load gtag script
  loadGtagScript() {
    return new Promise((resolve, reject) => {
      if (window.gtag) {
        resolve();
        return;
      }

      // Load gtag script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
          window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Track page view
  trackPageView(pagePath, pageTitle = null) {
    if (!this.isInitialized) return;

    window.gtag('config', this.measurementId, {
      page_path: pagePath,
      page_title: pageTitle || document.title
    });
  }

  // Track custom event
  trackEvent(eventName, parameters = {}) {
    if (!this.isInitialized) return;

    window.gtag('event', eventName, parameters);
  }

  // Track user engagement
  trackUserEngagement(action, category, label = null, value = null) {
    this.trackEvent('user_engagement', {
      event_category: category,
      event_label: label,
      value: value,
      action: action
    });
  }

  // Track psychometric test events
  trackTestEvent(eventType, testData = {}) {
    const eventMap = {
      'test_started': 'psychometric_test_started',
      'question_answered': 'psychometric_question_answered',
      'test_completed': 'psychometric_test_completed',
      'test_abandoned': 'psychometric_test_abandoned'
    };

    const eventName = eventMap[eventType] || 'psychometric_test_event';
    
    this.trackEvent(eventName, {
      event_category: 'psychometric_test',
      test_type: testData.testType || 'career_assessment',
      question_number: testData.questionNumber,
      time_spent: testData.timeSpent,
      user_id: testData.userId
    });
  }

  // Track career path events
  trackCareerPathEvent(action, pathData = {}) {
    this.trackEvent('career_path_interaction', {
      event_category: 'career_guidance',
      action: action,
      path_type: pathData.pathType,
      user_id: pathData.userId,
      recommendation_score: pathData.score
    });
  }

  // Track job search events
  trackJobSearchEvent(action, searchData = {}) {
    this.trackEvent('job_search', {
      event_category: 'job_search',
      action: action,
      search_query: searchData.query,
      location: searchData.location,
      results_count: searchData.resultsCount,
      user_id: searchData.userId
    });
  }

  // Track document events
  trackDocumentEvent(action, documentData = {}) {
    this.trackEvent('document_interaction', {
      event_category: 'document_management',
      action: action,
      document_type: documentData.type,
      file_size: documentData.size,
      user_id: documentData.userId
    });
  }

  // Track user journey
  trackUserJourney(step, journeyData = {}) {
    this.trackEvent('user_journey', {
      event_category: 'user_flow',
      journey_step: step,
      time_on_step: journeyData.timeSpent,
      user_id: journeyData.userId,
      completion_rate: journeyData.completionRate
    });
  }

  // Track conversion events
  trackConversion(conversionType, value = null, currency = 'USD') {
    this.trackEvent('conversion', {
      event_category: 'conversion',
      conversion_type: conversionType,
      value: value,
      currency: currency
    });
  }

  // Track errors
  trackError(errorType, errorMessage, errorData = {}) {
    this.trackEvent('error_occurred', {
      event_category: 'error',
      error_type: errorType,
      error_message: errorMessage,
      error_location: errorData.location,
      user_id: errorData.userId
    });
  }

  // Set user properties
  setUserProperties(userId, properties = {}) {
    if (!this.isInitialized) return;

    window.gtag('config', this.measurementId, {
      user_id: userId,
      custom_map: properties
    });
  }

  // Track e-commerce events (for premium features)
  trackPurchase(transactionId, value, currency = 'USD', items = []) {
    this.trackEvent('purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items
    });
  }

  // Track subscription events
  trackSubscription(action, subscriptionData = {}) {
    this.trackEvent('subscription', {
      event_category: 'subscription',
      action: action,
      subscription_type: subscriptionData.type,
      value: subscriptionData.value,
      currency: subscriptionData.currency || 'USD'
    });
  }

  // Get analytics data (requires Google Analytics Reporting API)
  async getAnalyticsData(startDate, endDate, metrics = [], dimensions = []) {
    try {
      // This would require server-side implementation with Google Analytics Reporting API
      // For now, we'll return a placeholder
      console.log('Analytics data retrieval requires server-side implementation');
      return null;
    } catch (error) {
      console.error('Failed to get analytics data:', error);
      throw error;
    }
  }
}

export default new GoogleAnalyticsService();
