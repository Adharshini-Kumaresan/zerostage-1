// YouTube Data API Service
import { GOOGLE_CONFIG, GOOGLE_ENDPOINTS } from '../config/googleApis';
import googleAuth from './googleAuth';

class YouTubeService {
  constructor() {
    this.baseUrl = GOOGLE_ENDPOINTS.youtube;
    this.apiKey = GOOGLE_CONFIG.youtubeApiKey;
  }

  // Search for videos
  async searchVideos(query, options = {}) {
    try {
      const {
        maxResults = 10,
        order = 'relevance',
        publishedAfter = null,
        publishedBefore = null,
        videoDuration = 'any',
        videoDefinition = 'any',
        videoType = 'any'
      } = options;

      const params = new URLSearchParams({
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: maxResults.toString(),
        order,
        key: this.apiKey,
        ...(publishedAfter && { publishedAfter }),
        ...(publishedBefore && { publishedBefore }),
        ...(videoDuration !== 'any' && { videoDuration }),
        ...(videoDefinition !== 'any' && { videoDefinition }),
        ...(videoType !== 'any' && { videoType })
      });

      const response = await fetch(`${this.baseUrl}/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return this.processVideoSearchResults(data);
    } catch (error) {
      console.error('Video search failed:', error);
      throw error;
    }
  }

  // Process video search results
  processVideoSearchResults(data) {
    return {
      videos: data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      })),
      totalResults: data.pageInfo.totalResults,
      nextPageToken: data.nextPageToken,
      prevPageToken: data.prevPageToken
    };
  }

  // Get video details
  async getVideoDetails(videoId) {
    try {
      const params = new URLSearchParams({
        part: 'snippet,statistics,contentDetails',
        id: videoId,
        key: this.apiKey
      });

      const response = await fetch(`${this.baseUrl}/videos?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return this.processVideoDetails(data.items[0]);
    } catch (error) {
      console.error('Failed to get video details:', error);
      throw error;
    }
  }

  // Process video details
  processVideoDetails(video) {
    if (!video) return null;

    return {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url,
      channelTitle: video.snippet.channelTitle,
      channelId: video.snippet.channelId,
      publishedAt: video.snippet.publishedAt,
      duration: video.contentDetails.duration,
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      commentCount: video.statistics.commentCount,
      tags: video.snippet.tags || [],
      categoryId: video.snippet.categoryId,
      url: `https://www.youtube.com/watch?v=${video.id}`
    };
  }

  // Search for career-related videos
  async searchCareerVideos(careerField, options = {}) {
    try {
      const careerQueries = {
        'technology': 'technology career programming software development',
        'healthcare': 'healthcare career medical nursing doctor',
        'business': 'business career management finance marketing',
        'education': 'education career teaching professor academic',
        'arts': 'arts career design creative media entertainment',
        'science': 'science career research laboratory scientist',
        'engineering': 'engineering career mechanical electrical civil'
      };

      const query = careerQueries[careerField] || `${careerField} career`;
      
      return await this.searchVideos(query, {
        ...options,
        videoDuration: 'medium', // 4-20 minutes
        order: 'relevance'
      });
    } catch (error) {
      console.error('Career video search failed:', error);
      throw error;
    }
  }

  // Search for skill development videos
  async searchSkillVideos(skill, options = {}) {
    try {
      const skillQueries = {
        'programming': 'programming tutorial coding course',
        'communication': 'communication skills public speaking presentation',
        'leadership': 'leadership skills management team building',
        'design': 'design tutorial creative skills graphic design',
        'data analysis': 'data analysis tutorial statistics excel',
        'project management': 'project management skills agile scrum',
        'marketing': 'marketing skills digital marketing social media'
      };

      const query = skillQueries[skill] || `${skill} tutorial course`;
      
      return await this.searchVideos(query, {
        ...options,
        videoDuration: 'long', // 20+ minutes
        order: 'relevance'
      });
    } catch (error) {
      console.error('Skill video search failed:', error);
      throw error;
    }
  }

  // Search for interview preparation videos
  async searchInterviewVideos(jobTitle, company = null, options = {}) {
    try {
      let query = `${jobTitle} interview preparation`;
      if (company) {
        query += ` ${company}`;
      }
      
      return await this.searchVideos(query, {
        ...options,
        videoDuration: 'medium',
        order: 'relevance'
      });
    } catch (error) {
      console.error('Interview video search failed:', error);
      throw error;
    }
  }

  // Get channel information
  async getChannelInfo(channelId) {
    try {
      const params = new URLSearchParams({
        part: 'snippet,statistics,contentDetails',
        id: channelId,
        key: this.apiKey
      });

      const response = await fetch(`${this.baseUrl}/channels?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return this.processChannelInfo(data.items[0]);
    } catch (error) {
      console.error('Failed to get channel info:', error);
      throw error;
    }
  }

  // Process channel information
  processChannelInfo(channel) {
    if (!channel) return null;

    return {
      id: channel.id,
      title: channel.snippet.title,
      description: channel.snippet.description,
      thumbnail: channel.snippet.thumbnails.medium?.url || channel.snippet.thumbnails.default?.url,
      subscriberCount: channel.statistics.subscriberCount,
      videoCount: channel.statistics.videoCount,
      viewCount: channel.statistics.viewCount,
      country: channel.snippet.country,
      publishedAt: channel.snippet.publishedAt,
      customUrl: channel.snippet.customUrl
    };
  }

  // Get playlists
  async getPlaylists(channelId, options = {}) {
    try {
      const {
        maxResults = 10,
        pageToken = null
      } = options;

      const params = new URLSearchParams({
        part: 'snippet,contentDetails',
        channelId,
        maxResults: maxResults.toString(),
        key: this.apiKey,
        ...(pageToken && { pageToken })
      });

      const response = await fetch(`${this.baseUrl}/playlists?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return this.processPlaylists(data);
    } catch (error) {
      console.error('Failed to get playlists:', error);
      throw error;
    }
  }

  // Process playlists
  processPlaylists(data) {
    return {
      playlists: data.items.map(item => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        itemCount: item.contentDetails.itemCount,
        url: `https://www.youtube.com/playlist?list=${item.id}`
      })),
      totalResults: data.pageInfo.totalResults,
      nextPageToken: data.nextPageToken,
      prevPageToken: data.prevPageToken
    };
  }

  // Get playlist items
  async getPlaylistItems(playlistId, options = {}) {
    try {
      const {
        maxResults = 10,
        pageToken = null
      } = options;

      const params = new URLSearchParams({
        part: 'snippet,contentDetails',
        playlistId,
        maxResults: maxResults.toString(),
        key: this.apiKey,
        ...(pageToken && { pageToken })
      });

      const response = await fetch(`${this.baseUrl}/playlistItems?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return this.processPlaylistItems(data);
    } catch (error) {
      console.error('Failed to get playlist items:', error);
      throw error;
    }
  }

  // Process playlist items
  processPlaylistItems(data) {
    return {
      videos: data.items.map(item => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        position: item.snippet.position,
        url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
      })),
      totalResults: data.pageInfo.totalResults,
      nextPageToken: data.nextPageToken,
      prevPageToken: data.prevPageToken
    };
  }

  // Get trending videos
  async getTrendingVideos(regionCode = 'US', categoryId = '0') {
    try {
      const params = new URLSearchParams({
        part: 'snippet,statistics,contentDetails',
        chart: 'mostPopular',
        regionCode,
        categoryId,
        maxResults: '25',
        key: this.apiKey
      });

      const response = await fetch(`${this.baseUrl}/videos?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return this.processVideoSearchResults({ items: data.items, pageInfo: data.pageInfo });
    } catch (error) {
      console.error('Failed to get trending videos:', error);
      throw error;
    }
  }

  // Search for educational content
  async searchEducationalContent(topic, options = {}) {
    try {
      const query = `${topic} tutorial course learn education`;
      
      return await this.searchVideos(query, {
        ...options,
        videoDuration: 'long',
        order: 'relevance'
      });
    } catch (error) {
      console.error('Educational content search failed:', error);
      throw error;
    }
  }

  // Get recommended videos for user
  async getRecommendedVideos(userInterests, userSkills, options = {}) {
    try {
      const recommendations = [];
      
      // Search for career-related content
      for (const interest of userInterests) {
        const careerVideos = await this.searchCareerVideos(interest, { maxResults: 5 });
        recommendations.push(...careerVideos.videos);
      }
      
      // Search for skill development content
      for (const skill of userSkills) {
        const skillVideos = await this.searchSkillVideos(skill, { maxResults: 3 });
        recommendations.push(...skillVideos.videos);
      }
      
      // Remove duplicates and sort by relevance
      const uniqueVideos = this.removeDuplicateVideos(recommendations);
      
      return {
        videos: uniqueVideos.slice(0, options.maxResults || 20),
        totalResults: uniqueVideos.length
      };
    } catch (error) {
      console.error('Failed to get recommended videos:', error);
      throw error;
    }
  }

  // Remove duplicate videos
  removeDuplicateVideos(videos) {
    const seen = new Set();
    return videos.filter(video => {
      if (seen.has(video.id)) {
        return false;
      }
      seen.add(video.id);
      return true;
    });
  }
}

export default new YouTubeService();
