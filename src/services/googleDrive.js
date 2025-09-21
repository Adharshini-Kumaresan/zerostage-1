// Google Drive API Service
import { GOOGLE_CONFIG, GOOGLE_ENDPOINTS } from '../config/googleApis';
import googleAuth from './googleAuth';

class GoogleDriveService {
  constructor() {
    this.baseUrl = GOOGLE_ENDPOINTS.drive;
  }

  // Upload file to Google Drive
  async uploadFile(file, folderId = null, fileName = null) {
    try {
      const formData = new FormData();
      formData.append('metadata', JSON.stringify({
        name: fileName || file.name,
        parents: folderId ? [folderId] : []
      }));
      formData.append('file', file);

      const response = await this.makeRequest('/files', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${googleAuth.getAccessToken()}`
        }
      });

      return response;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }

  // Create folder
  async createFolder(name, parentFolderId = null) {
    try {
      const folderMetadata = {
        name: name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: parentFolderId ? [parentFolderId] : []
      };

      const response = await this.makeRequest('/files', {
        method: 'POST',
        body: JSON.stringify(folderMetadata)
      });

      return response;
    } catch (error) {
      console.error('Folder creation failed:', error);
      throw error;
    }
  }

  // Get files list
  async getFiles(params = {}) {
    try {
      const {
        pageSize = 10,
        pageToken = '',
        q = '',
        orderBy = 'modifiedTime desc',
        fields = 'files(id,name,mimeType,modifiedTime,size,webViewLink)'
      } = params;

      const queryParams = new URLSearchParams({
        pageSize: pageSize.toString(),
        orderBy,
        fields,
        ...(q && { q }),
        ...(pageToken && { pageToken })
      });

      const response = await this.makeRequest(`/files?${queryParams}`);
      return response;
    } catch (error) {
      console.error('Failed to get files:', error);
      throw error;
    }
  }

  // Get file content
  async getFileContent(fileId) {
    try {
      const response = await this.makeRequest(`/files/${fileId}`, {
        headers: {
          'Accept': 'text/plain'
        }
      });
      return response;
    } catch (error) {
      console.error('Failed to get file content:', error);
      throw error;
    }
  }

  // Download file
  async downloadFile(fileId) {
    try {
      const response = await this.makeRequest(`/files/${fileId}?alt=media`, {
        headers: {
          'Accept': '*/*'
        }
      });
      return response;
    } catch (error) {
      console.error('File download failed:', error);
      throw error;
    }
  }

  // Delete file
  async deleteFile(fileId) {
    try {
      await this.makeRequest(`/files/${fileId}`, {
        method: 'DELETE'
      });
      return true;
    } catch (error) {
      console.error('File deletion failed:', error);
      throw error;
    }
  }

  // Share file
  async shareFile(fileId, permissions) {
    try {
      const response = await this.makeRequest(`/files/${fileId}/permissions`, {
        method: 'POST',
        body: JSON.stringify(permissions)
      });
      return response;
    } catch (error) {
      console.error('File sharing failed:', error);
      throw error;
    }
  }

  // Create document from template
  async createDocumentFromTemplate(templateId, newName, folderId = null) {
    try {
      // Copy the template file
      const copyResponse = await this.makeRequest(`/files/${templateId}/copy`, {
        method: 'POST',
        body: JSON.stringify({
          name: newName,
          parents: folderId ? [folderId] : []
        })
      });

      return copyResponse;
    } catch (error) {
      console.error('Document creation from template failed:', error);
      throw error;
    }
  }

  // Save user documents (resume, portfolio, etc.)
  async saveUserDocument(userId, documentType, file, metadata = {}) {
    try {
      // Create user folder if it doesn't exist
      const userFolder = await this.createUserFolder(userId);
      
      // Upload the document
      const uploadResponse = await this.uploadFile(
        file, 
        userFolder.id, 
        `${documentType}_${Date.now()}.${file.name.split('.').pop()}`
      );

      // Save metadata
      const documentMetadata = {
        userId,
        documentType,
        fileId: uploadResponse.id,
        fileName: uploadResponse.name,
        uploadDate: new Date().toISOString(),
        ...metadata
      };

      // Store metadata in Firestore (you'll need to implement this)
      // await this.saveDocumentMetadata(documentMetadata);

      return {
        ...uploadResponse,
        metadata: documentMetadata
      };
    } catch (error) {
      console.error('Failed to save user document:', error);
      throw error;
    }
  }

  // Create user folder
  async createUserFolder(userId) {
    try {
      const folderName = `ZeroStage_User_${userId}`;
      
      // Check if folder already exists
      const existingFolders = await this.getFiles({
        q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`
      });

      if (existingFolders.files && existingFolders.files.length > 0) {
        return existingFolders.files[0];
      }

      // Create new folder
      return await this.createFolder(folderName);
    } catch (error) {
      console.error('Failed to create user folder:', error);
      throw error;
    }
  }

  // Get user documents
  async getUserDocuments(userId, documentType = null) {
    try {
      const userFolder = await this.createUserFolder(userId);
      
      let query = `'${userFolder.id}' in parents`;
      if (documentType) {
        query += ` and name contains '${documentType}'`;
      }

      const files = await this.getFiles({ q: query });
      return files;
    } catch (error) {
      console.error('Failed to get user documents:', error);
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

export default new GoogleDriveService();
