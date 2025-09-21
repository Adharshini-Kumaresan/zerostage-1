// Google Maps API Service
import { GOOGLE_CONFIG, GOOGLE_ENDPOINTS } from '../config/googleApis';

class GoogleMapsService {
  constructor() {
    this.apiKey = GOOGLE_CONFIG.mapsApiKey;
    this.baseUrl = GOOGLE_ENDPOINTS.maps;
    this.isInitialized = false;
  }

  // Initialize Google Maps
  async initialize() {
    if (this.isInitialized) return;

    try {
      await this.loadMapsScript();
      this.isInitialized = true;
      console.log('Google Maps initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Maps:', error);
      throw error;
    }
  }

  // Load Google Maps script
  loadMapsScript() {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places,geometry`;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Get current location
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    });
  }

  // Search for places
  async searchPlaces(query, location = null, radius = 50000) {
    try {
      await this.initialize();

      const service = new window.google.maps.places.PlacesService(
        document.createElement('div')
      );

      return new Promise((resolve, reject) => {
        const request = {
          query: query,
          fields: ['name', 'formatted_address', 'geometry', 'place_id', 'rating', 'types'],
          ...(location && {
            location: new window.google.maps.LatLng(location.lat, location.lng),
            radius: radius
          })
        };

        service.textSearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            resolve(results);
          } else {
            reject(new Error(`Places search failed: ${status}`));
          }
        });
      });
    } catch (error) {
      console.error('Places search failed:', error);
      throw error;
    }
  }

  // Find nearby career centers
  async findNearbyCareerCenters(location, radius = 10000) {
    try {
      const careerKeywords = [
        'career center',
        'job center',
        'employment center',
        'career counseling',
        'professional development',
        'university career services',
        'community college career center'
      ];

      const allResults = [];

      for (const keyword of careerKeywords) {
        try {
          const results = await this.searchPlaces(keyword, location, radius);
          allResults.push(...results);
        } catch (error) {
          console.warn(`Search failed for keyword: ${keyword}`, error);
        }
      }

      // Remove duplicates and sort by rating
      const uniqueResults = this.removeDuplicatePlaces(allResults);
      return uniqueResults.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } catch (error) {
      console.error('Failed to find nearby career centers:', error);
      throw error;
    }
  }

  // Find nearby companies
  async findNearbyCompanies(location, industry = null, radius = 20000) {
    try {
      let query = 'companies';
      if (industry) {
        query = `${industry} companies`;
      }

      const results = await this.searchPlaces(query, location, radius);
      return results.filter(place => 
        place.types.includes('establishment') && 
        !place.types.includes('lodging') &&
        !place.types.includes('restaurant')
      );
    } catch (error) {
      console.error('Failed to find nearby companies:', error);
      throw error;
    }
  }

  // Find nearby educational institutions
  async findNearbyEducationalInstitutions(location, radius = 50000) {
    try {
      const educationKeywords = [
        'university',
        'college',
        'community college',
        'technical school',
        'vocational school',
        'training center'
      ];

      const allResults = [];

      for (const keyword of educationKeywords) {
        try {
          const results = await this.searchPlaces(keyword, location, radius);
          allResults.push(...results);
        } catch (error) {
          console.warn(`Search failed for keyword: ${keyword}`, error);
        }
      }

      const uniqueResults = this.removeDuplicatePlaces(allResults);
      return uniqueResults.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } catch (error) {
      console.error('Failed to find nearby educational institutions:', error);
      throw error;
    }
  }

  // Get place details
  async getPlaceDetails(placeId) {
    try {
      await this.initialize();

      const service = new window.google.maps.places.PlacesService(
        document.createElement('div')
      );

      return new Promise((resolve, reject) => {
        const request = {
          placeId: placeId,
          fields: [
            'name',
            'formatted_address',
            'formatted_phone_number',
            'website',
            'rating',
            'reviews',
            'opening_hours',
            'photos',
            'types',
            'geometry'
          ]
        };

        service.getDetails(request, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            resolve(place);
          } else {
            reject(new Error(`Place details request failed: ${status}`));
          }
        });
      });
    } catch (error) {
      console.error('Failed to get place details:', error);
      throw error;
    }
  }

  // Calculate distance between two points
  calculateDistance(point1, point2) {
    try {
      if (!window.google || !window.google.maps) {
        throw new Error('Google Maps not loaded');
      }

      const latLng1 = new window.google.maps.LatLng(point1.lat, point1.lng);
      const latLng2 = new window.google.maps.LatLng(point2.lat, point2.lng);

      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
        latLng1,
        latLng2
      );

      return {
        meters: distance,
        kilometers: distance / 1000,
        miles: distance * 0.000621371
      };
    } catch (error) {
      console.error('Distance calculation failed:', error);
      throw error;
    }
  }

  // Get directions between two points
  async getDirections(origin, destination, travelMode = 'DRIVING') {
    try {
      await this.initialize();

      const directionsService = new window.google.maps.DirectionsService();

      return new Promise((resolve, reject) => {
        const request = {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode[travelMode]
        };

        directionsService.route(request, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            resolve(result);
          } else {
            reject(new Error(`Directions request failed: ${status}`));
          }
        });
      });
    } catch (error) {
      console.error('Failed to get directions:', error);
      throw error;
    }
  }

  // Find career opportunities by location
  async findCareerOpportunities(location, jobType = null, radius = 50000) {
    try {
      const opportunities = [];

      // Find career centers
      const careerCenters = await this.findNearbyCareerCenters(location, radius);
      opportunities.push(...careerCenters.map(center => ({
        ...center,
        type: 'career_center',
        category: 'Career Services'
      })));

      // Find companies
      const companies = await this.findNearbyCompanies(location, jobType, radius);
      opportunities.push(...companies.map(company => ({
        ...company,
        type: 'company',
        category: 'Employment'
      })));

      // Find educational institutions
      const institutions = await this.findNearbyEducationalInstitutions(location, radius);
      opportunities.push(...institutions.map(institution => ({
        ...institution,
        type: 'education',
        category: 'Education'
      })));

      // Sort by distance and rating
      return opportunities
        .map(opportunity => ({
          ...opportunity,
          distance: this.calculateDistance(location, {
            lat: opportunity.geometry.location.lat(),
            lng: opportunity.geometry.location.lng()
          })
        }))
        .sort((a, b) => a.distance.meters - b.distance.meters);
    } catch (error) {
      console.error('Failed to find career opportunities:', error);
      throw error;
    }
  }

  // Remove duplicate places
  removeDuplicatePlaces(places) {
    const seen = new Set();
    return places.filter(place => {
      const key = place.place_id || place.name;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // Geocode address
  async geocodeAddress(address) {
    try {
      await this.initialize();

      const geocoder = new window.google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            resolve(results[0]);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });
    } catch (error) {
      console.error('Geocoding failed:', error);
      throw error;
    }
  }
}

export default new GoogleMapsService();
