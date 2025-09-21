// Google APIs Configuration
export const GOOGLE_CONFIG = {
  // Authentication
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  
  // Maps
  mapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  
  // Analytics
  analyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  
  // Cloud Services
  projectId: import.meta.env.VITE_GOOGLE_CLOUD_PROJECT_ID,
  region: import.meta.env.VITE_GOOGLE_CLOUD_REGION || 'us-central1',
  credentialsPath: import.meta.env.VITE_GOOGLE_CLOUD_CREDENTIALS_PATH,
  
  // Service APIs
  jobsApiKey: import.meta.env.VITE_GOOGLE_JOBS_API_KEY,
  youtubeApiKey: import.meta.env.VITE_GOOGLE_YOUTUBE_API_KEY,
  meetApiKey: import.meta.env.VITE_GOOGLE_MEET_API_KEY,
  driveApiKey: import.meta.env.VITE_GOOGLE_DRIVE_API_KEY,
  sheetsApiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
  gmailApiKey: import.meta.env.VITE_GOOGLE_GMAIL_API_KEY,
  translateApiKey: import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY,
  nlpApiKey: import.meta.env.VITE_GOOGLE_NATURAL_LANGUAGE_API_KEY,
};

// Google API Scopes
export const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/cloud-platform',
  'https://www.googleapis.com/auth/bigquery',
  'https://www.googleapis.com/auth/cloud-language',
  'https://www.googleapis.com/auth/cloud-translation',
];

// API Endpoints
export const GOOGLE_ENDPOINTS = {
  auth: 'https://accounts.google.com/o/oauth2/v2/auth',
  token: 'https://oauth2.googleapis.com/token',
  userInfo: 'https://www.googleapis.com/oauth2/v2/userinfo',
  jobs: 'https://jobs.googleapis.com/v4',
  maps: 'https://maps.googleapis.com/maps/api',
  drive: 'https://www.googleapis.com/drive/v3',
  sheets: 'https://sheets.googleapis.com/v4/spreadsheets',
  gmail: 'https://gmail.googleapis.com/gmail/v1',
  youtube: 'https://www.googleapis.com/youtube/v3',
  translate: 'https://translation.googleapis.com/language/translate/v2',
  nlp: 'https://language.googleapis.com/v1',
  analytics: 'https://analytics.googleapis.com/v4',
  bigquery: 'https://bigquery.googleapis.com/bigquery/v2',
  aiplatform: 'https://us-central1-aiplatform.googleapis.com/v1',
};

export default GOOGLE_CONFIG;
