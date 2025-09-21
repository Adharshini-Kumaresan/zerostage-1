// Google Cloud Natural Language API Service
import { GOOGLE_CONFIG, GOOGLE_ENDPOINTS } from '../config/googleApis';
import googleAuth from './googleAuth';

class GoogleNLPService {
  constructor() {
    this.baseUrl = GOOGLE_ENDPOINTS.nlp;
  }

  // Analyze text sentiment
  async analyzeSentiment(text) {
    try {
      const response = await this.makeRequest('/documents:analyzeSentiment', {
        method: 'POST',
        body: JSON.stringify({
          document: {
            type: 'PLAIN_TEXT',
            content: text
          },
          encodingType: 'UTF8'
        })
      });

      return response;
    } catch (error) {
      console.error('Sentiment analysis failed:', error);
      throw error;
    }
  }

  // Analyze text entities
  async analyzeEntities(text) {
    try {
      const response = await this.makeRequest('/documents:analyzeEntities', {
        method: 'POST',
        body: JSON.stringify({
          document: {
            type: 'PLAIN_TEXT',
            content: text
          },
          encodingType: 'UTF8'
        })
      });

      return response;
    } catch (error) {
      console.error('Entity analysis failed:', error);
      throw error;
    }
  }

  // Analyze text syntax
  async analyzeSyntax(text) {
    try {
      const response = await this.makeRequest('/documents:analyzeSyntax', {
        method: 'POST',
        body: JSON.stringify({
          document: {
            type: 'PLAIN_TEXT',
            content: text
          },
          encodingType: 'UTF8'
        })
      });

      return response;
    } catch (error) {
      console.error('Syntax analysis failed:', error);
      throw error;
    }
  }

  // Classify text content
  async classifyText(text) {
    try {
      const response = await this.makeRequest('/documents:classifyText', {
        method: 'POST',
        body: JSON.stringify({
          document: {
            type: 'PLAIN_TEXT',
            content: text
          }
        })
      });

      return response;
    } catch (error) {
      console.error('Text classification failed:', error);
      throw error;
    }
  }

  // Analyze psychometric test responses
  async analyzeTestResponses(responses) {
    try {
      const analysisResults = {
        overallSentiment: null,
        keyThemes: [],
        personalityIndicators: [],
        skillKeywords: [],
        confidenceLevel: 0
      };

      // Combine all responses for analysis
      const combinedText = responses.map(r => r.answer).join(' ');

      // Analyze sentiment
      const sentimentResult = await this.analyzeSentiment(combinedText);
      analysisResults.overallSentiment = sentimentResult.documentSentiment;

      // Analyze entities for key themes
      const entitiesResult = await this.analyzeEntities(combinedText);
      analysisResults.keyThemes = entitiesResult.entities
        .filter(entity => entity.salience > 0.1)
        .map(entity => ({
          name: entity.name,
          type: entity.type,
          salience: entity.salience
        }));

      // Extract personality indicators
      analysisResults.personalityIndicators = this.extractPersonalityIndicators(entitiesResult.entities);

      // Extract skill keywords
      analysisResults.skillKeywords = this.extractSkillKeywords(entitiesResult.entities);

      // Calculate confidence level
      analysisResults.confidenceLevel = this.calculateConfidenceLevel(sentimentResult, entitiesResult);

      return analysisResults;
    } catch (error) {
      console.error('Test response analysis failed:', error);
      throw error;
    }
  }

  // Extract personality indicators from entities
  extractPersonalityIndicators(entities) {
    const personalityKeywords = {
      'EXTROVERSION': ['team', 'group', 'social', 'people', 'collaboration', 'leadership'],
      'INTROVERSION': ['individual', 'alone', 'quiet', 'focused', 'independent'],
      'OPENNESS': ['creative', 'innovative', 'artistic', 'imaginative', 'curious'],
      'CONSCIENTIOUSNESS': ['organized', 'detailed', 'systematic', 'reliable', 'responsible'],
      'AGREEABLENESS': ['helpful', 'cooperative', 'trusting', 'compassionate', 'supportive'],
      'NEUROTICISM': ['anxious', 'stressed', 'worried', 'nervous', 'tense']
    };

    const indicators = {};

    Object.keys(personalityKeywords).forEach(trait => {
      const score = personalityKeywords[trait].reduce((acc, keyword) => {
        const entity = entities.find(e => 
          e.name.toLowerCase().includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(e.name.toLowerCase())
        );
        return acc + (entity ? entity.salience : 0);
      }, 0);

      indicators[trait] = score;
    });

    return indicators;
  }

  // Extract skill keywords from entities
  extractSkillKeywords(entities) {
    const skillCategories = {
      'TECHNICAL': ['programming', 'coding', 'software', 'technology', 'computer', 'data', 'analysis'],
      'COMMUNICATION': ['writing', 'speaking', 'presentation', 'communication', 'language'],
      'LEADERSHIP': ['leadership', 'management', 'team', 'supervision', 'direction'],
      'CREATIVE': ['design', 'creative', 'artistic', 'innovation', 'imagination'],
      'ANALYTICAL': ['analysis', 'research', 'problem-solving', 'logical', 'mathematical'],
      'INTERPERSONAL': ['collaboration', 'teamwork', 'relationship', 'social', 'networking']
    };

    const skills = {};

    Object.keys(skillCategories).forEach(category => {
      const matchingEntities = entities.filter(entity =>
        skillCategories[category].some(keyword =>
          entity.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );

      skills[category] = matchingEntities.map(entity => ({
        name: entity.name,
        salience: entity.salience
      }));
    });

    return skills;
  }

  // Calculate confidence level
  calculateConfidenceLevel(sentimentResult, entitiesResult) {
    const sentimentScore = Math.abs(sentimentResult.documentSentiment.score);
    const entityCount = entitiesResult.entities.length;
    const avgSalience = entitiesResult.entities.reduce((acc, entity) => acc + entity.salience, 0) / entityCount;

    // Combine factors for confidence score (0-1)
    const confidence = (sentimentScore * 0.4) + (Math.min(entityCount / 10, 1) * 0.3) + (avgSalience * 0.3);
    
    return Math.min(confidence, 1);
  }

  // Analyze career interests from text
  async analyzeCareerInterests(text) {
    try {
      const entities = await this.analyzeEntities(text);
      const classification = await this.classifyText(text);

      const careerKeywords = {
        'TECHNOLOGY': ['software', 'programming', 'technology', 'computer', 'digital', 'AI', 'machine learning'],
        'HEALTHCARE': ['health', 'medical', 'doctor', 'nurse', 'patient', 'care', 'treatment'],
        'BUSINESS': ['business', 'management', 'finance', 'marketing', 'sales', 'strategy'],
        'EDUCATION': ['teaching', 'education', 'learning', 'student', 'academic', 'research'],
        'ARTS': ['art', 'design', 'creative', 'music', 'writing', 'media', 'entertainment'],
        'SCIENCE': ['science', 'research', 'laboratory', 'experiment', 'analysis', 'discovery'],
        'ENGINEERING': ['engineering', 'construction', 'mechanical', 'electrical', 'civil', 'design']
      };

      const interests = {};

      Object.keys(careerKeywords).forEach(field => {
        const score = careerKeywords[field].reduce((acc, keyword) => {
          const entity = entities.entities.find(e => 
            e.name.toLowerCase().includes(keyword.toLowerCase())
          );
          return acc + (entity ? entity.salience : 0);
        }, 0);

        interests[field] = score;
      });

      return {
        interests,
        classification: classification.categories,
        confidence: this.calculateConfidenceLevel(
          { documentSentiment: { score: 0 } }, 
          entities
        )
      };
    } catch (error) {
      console.error('Career interest analysis failed:', error);
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

export default new GoogleNLPService();
