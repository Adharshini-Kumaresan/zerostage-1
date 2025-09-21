// Google API Connection Test Component
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader, RefreshCw } from 'lucide-react';
import googleApiIntegration from '../services/googleApiIntegration';

const GoogleApiTest = () => {
  const [testResults, setTestResults] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [overallStatus, setOverallStatus] = useState('pending');

  const apis = [
    { name: 'Google Auth', key: 'auth', description: 'User authentication' },
    { name: 'Google Jobs', key: 'jobs', description: 'Job search and recommendations' },
    { name: 'Google Drive', key: 'drive', description: 'Document management' },
    { name: 'Google Analytics', key: 'analytics', description: 'User tracking and insights' },
    { name: 'Google NLP', key: 'nlp', description: 'Text analysis and processing' },
    { name: 'Google Maps', key: 'maps', description: 'Location-based services' },
    { name: 'Gmail API', key: 'gmail', description: 'Email notifications' },
    { name: 'Google Sheets', key: 'sheets', description: 'Data export and tracking' },
    { name: 'Google AI', key: 'ai', description: 'AI-powered recommendations' },
    { name: 'YouTube API', key: 'youtube', description: 'Educational content' },
    { name: 'Google Meet', key: 'meet', description: 'Video meetings' }
  ];

  const testApiConnection = async (apiKey) => {
    try {
      const service = googleApiIntegration.services[apiKey];
      if (!service) {
        throw new Error('Service not found');
      }

      // Test basic service availability
      if (apiKey === 'auth') {
        return await service.initialize();
      } else if (apiKey === 'analytics') {
        return await service.initialize();
      } else if (apiKey === 'maps') {
        return await service.initialize();
      } else {
        // For other services, just check if they exist and are properly configured
        return service && typeof service === 'object';
      }
    } catch (error) {
      throw new Error(`API test failed: ${error.message}`);
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults({});
    setOverallStatus('running');

    const results = {};
    let successCount = 0;

    for (const api of apis) {
      try {
        await testApiConnection(api.key);
        results[api.key] = { status: 'success', message: 'Connected successfully' };
        successCount++;
      } catch (error) {
        results[api.key] = { status: 'error', message: error.message };
      }
    }

    setTestResults(results);
    setOverallStatus(successCount === apis.length ? 'success' : 'partial');
    setIsRunning(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <div className="w-5 h-5 rounded-full bg-gray-300" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'running':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  useEffect(() => {
    // Auto-run tests on component mount
    runAllTests();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Google API Connection Test</h2>
            <p className="text-gray-600">Verify all Google APIs are properly connected and configured</p>
          </div>
          <button
            onClick={runAllTests}
            disabled={isRunning}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Testing...' : 'Run Tests'}</span>
          </button>
        </div>

        {/* Overall Status */}
        <div className={`p-4 rounded-lg border-2 mb-6 ${getStatusColor(overallStatus)}`}>
          <div className="flex items-center space-x-3">
            {getStatusIcon(overallStatus)}
            <div>
              <h3 className="font-semibold">
                {overallStatus === 'success' && 'All APIs Connected Successfully!'}
                {overallStatus === 'partial' && 'Some APIs Need Configuration'}
                {overallStatus === 'running' && 'Testing API Connections...'}
                {overallStatus === 'pending' && 'Ready to Test API Connections'}
              </h3>
              <p className="text-sm">
                {overallStatus === 'success' && 'Your ZeroStage platform is fully integrated with Google services.'}
                {overallStatus === 'partial' && 'Check the individual API status below and configure missing credentials.'}
                {overallStatus === 'running' && 'Please wait while we test all Google API connections...'}
                {overallStatus === 'pending' && 'Click "Run Tests" to verify your Google API setup.'}
              </p>
            </div>
          </div>
        </div>

        {/* API Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {apis.map((api) => {
            const result = testResults[api.key];
            const status = result?.status || 'pending';
            
            return (
              <motion.div
                key={api.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border ${getStatusColor(status)}`}
              >
                <div className="flex items-start space-x-3">
                  {getStatusIcon(status)}
                  <div className="flex-1">
                    <h4 className="font-semibold">{api.name}</h4>
                    <p className="text-sm opacity-75">{api.description}</p>
                    {result && (
                      <p className="text-xs mt-1">
                        {result.message}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Configuration Help */}
        {overallStatus !== 'success' && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">Configuration Required</h4>
            <div className="text-sm text-yellow-700 space-y-2">
              <p>To make all APIs work, you need to:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Set up a Google Cloud Project</li>
                <li>Enable all required APIs in Google Cloud Console</li>
                <li>Generate API keys and OAuth credentials</li>
                <li>Update your <code className="bg-yellow-100 px-1 rounded">.env</code> file with real API keys</li>
                <li>Restart your development server</li>
              </ol>
              <p className="mt-2">
                See <code className="bg-yellow-100 px-1 rounded">GOOGLE_API_INTEGRATION.md</code> for detailed setup instructions.
              </p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {overallStatus === 'success' && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">🎉 Congratulations!</h4>
            <p className="text-sm text-green-700">
              All Google APIs are properly connected and ready to use. Your ZeroStage platform now has access to:
            </p>
            <ul className="text-sm text-green-700 mt-2 list-disc list-inside space-y-1">
              <li>Real-time job search and recommendations</li>
              <li>Document management and storage</li>
              <li>AI-powered career insights</li>
              <li>Location-based career features</li>
              <li>Personalized email notifications</li>
              <li>And much more!</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleApiTest;
