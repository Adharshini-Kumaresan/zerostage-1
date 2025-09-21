// Google Drive Integration Component
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, Folder, Download, Trash2, Eye, Share, Plus, Search } from 'lucide-react';
import googleDrive from '../services/googleDrive';

const GoogleDriveIntegration = ({ userId, onDocumentSelect }) => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    if (userId) {
      loadUserDocuments();
    }
  }, [userId]);

  const loadUserDocuments = async () => {
    setIsLoading(true);
    try {
      const docs = await googleDrive.getUserDocuments(userId);
      setDocuments(docs.files || []);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    setUploading(true);

    try {
      for (const file of files) {
        const uploadResult = await googleDrive.saveUserDocument(userId, 'resume', file, {
          description: 'Career document',
          category: 'resume'
        });
        console.log('File uploaded:', uploadResult);
      }
      await loadUserDocuments();
      setShowUploadModal(false);
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDocumentDelete = async (fileId) => {
    try {
      await googleDrive.deleteFile(fileId);
      await loadUserDocuments();
    } catch (error) {
      console.error('Failed to delete document:', error);
    }
  };

  const handleDocumentShare = async (fileId) => {
    try {
      const permissions = {
        role: 'reader',
        type: 'anyone'
      };
      await googleDrive.shareFile(fileId, permissions);
    } catch (error) {
      console.error('Failed to share document:', error);
    }
  };

  const handleDocumentDownload = async (fileId, fileName) => {
    try {
      const fileContent = await googleDrive.downloadFile(fileId);
      const blob = new Blob([fileContent], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download document:', error);
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (mimeType) => {
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('word')) return '📝';
    if (mimeType.includes('image')) return '🖼️';
    if (mimeType.includes('video')) return '🎥';
    if (mimeType.includes('audio')) return '🎵';
    return '📁';
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Documents</h2>
          <p className="text-gray-600">Manage your career documents and portfolios</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Upload</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Upload Documents</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Drag and drop files here or click to select</p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              <label
                htmlFor="file-upload"
                className="bg-primary-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-600 transition-colors"
              >
                Select Files
              </label>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Documents Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-gray-600">Loading documents...</span>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="text-center py-12">
          <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-500 mb-4">Upload your resume, portfolio, or other career documents</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Upload Documents
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getFileIcon(doc.mimeType)}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(doc.size)} • {formatDate(doc.modifiedTime)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onDocumentSelect?.(doc)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDocumentDownload(doc.id, doc.name)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDocumentShare(doc.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Share"
                    >
                      <Share className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDocumentDelete(doc.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {doc.mimeType.split('/')[1]?.toUpperCase() || 'FILE'}
                    </span>
                  </div>
                  <a
                    href={doc.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-600 text-xs font-medium"
                  >
                    Open in Drive
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
            <span className="text-sm text-gray-600">Uploading files...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleDriveIntegration;
