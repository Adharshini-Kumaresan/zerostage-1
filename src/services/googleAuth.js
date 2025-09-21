// Google Authentication Service
import { GOOGLE_CONFIG, GOOGLE_SCOPES, GOOGLE_ENDPOINTS } from '../config/googleApis';

class GoogleAuthService {
  constructor() {
    this.isInitialized = false;
    this.currentUser = null;
    this.accessToken = null;
  }

  // Initialize Google API
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Load Google API script
      await this.loadGoogleScript();
      
      // Initialize gapi
      await new Promise((resolve) => {
        window.gapi.load('auth2', resolve);
      });

      // Initialize auth2
      await window.gapi.auth2.init({
        client_id: GOOGLE_CONFIG.clientId,
        scope: GOOGLE_SCOPES.join(' ')
      });

      this.isInitialized = true;
      console.log('Google Auth initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Auth:', error);
      throw error;
    }
  }

  // Load Google API script
  loadGoogleScript() {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Sign in with Google
  async signIn() {
    try {
      await this.initialize();
      
      const authInstance = window.gapi.auth2.getAuthInstance();
      const user = await authInstance.signIn();
      
      this.currentUser = user;
      this.accessToken = user.getAuthResponse().access_token;
      
      const profile = user.getBasicProfile();
      
      return {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl(),
        accessToken: this.accessToken,
        idToken: user.getAuthResponse().id_token
      };
    } catch (error) {
      console.error('Google sign-in failed:', error);
      throw error;
    }
  }

  // Sign out
  async signOut() {
    try {
      if (window.gapi && window.gapi.auth2) {
        const authInstance = window.gapi.auth2.getAuthInstance();
        await authInstance.signOut();
      }
      
      this.currentUser = null;
      this.accessToken = null;
    } catch (error) {
      console.error('Google sign-out failed:', error);
      throw error;
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Get access token
  getAccessToken() {
    return this.accessToken;
  }

  // Check if user is signed in
  isSignedIn() {
    return this.currentUser !== null && this.currentUser.isSignedIn();
  }

  // Refresh access token
  async refreshToken() {
    try {
      if (this.currentUser) {
        const authResponse = await this.currentUser.reloadAuthResponse();
        this.accessToken = authResponse.access_token;
        return this.accessToken;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }
}

export default new GoogleAuthService();
