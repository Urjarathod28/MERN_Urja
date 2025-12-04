// src/components/ConnectionStatus.jsx - Connection Status Component

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ConnectionStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_URL}/api/status`);
      setStatus(response.data);
      setLastChecked(new Date().toLocaleTimeString());
      
    } catch (err) {
      console.error('Error fetching status:', err);
      
      if (err.response) {
        // Server responded with error
        setStatus(err.response.data);
      } else if (err.request) {
        // Request made but no response
        setError('Cannot connect to backend server. Make sure it is running on ' + API_URL);
      } else {
        // Something else happened
        setError('An unexpected error occurred');
      }
      
      setLastChecked(new Date().toLocaleTimeString());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchStatus, 10000);
    
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const handleRefresh = () => {
    fetchStatus();
  };

  const isConnected = status?.status === 'connected';

  return (
    <div className="connection-status-container">
      <div className="status-card">
        <div className="card-header">
          <h2>Database Connection Status</h2>
          <button 
            onClick={handleRefresh} 
            className="refresh-btn"
            disabled={loading}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className={loading ? 'spinning' : ''}
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
            Refresh
          </button>
        </div>

        <div className="card-body">
          {loading && !status ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Checking connection...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <div className="status-icon error">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <h3>Backend Connection Error</h3>
              <p className="error-message">{error}</p>
              <div className="error-tips">
                <p><strong>Troubleshooting:</strong></p>
                <ul>
                  <li>Ensure backend server is running</li>
                  <li>Check if backend is on port 5000</li>
                  <li>Verify REACT_APP_API_URL in .env file</li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
                <div className="status-icon">
                  {isConnected ? (
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  ) : (
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                  )}
                </div>
                <h3 className="status-title">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </h3>
                <p className="status-message">{status?.message}</p>
              </div>

              {isConnected && status?.data && (
                <div className="connection-details">
                  <h4>Connection Details</h4>
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Database:</span>
                      <span className="detail-value">{status.data.database}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Host:</span>
                      <span className="detail-value">{status.data.host}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value status-badge">{status.data.readyState}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Connected At:</span>
                      <span className="detail-value">
                        {new Date(status.data.connectedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {!isConnected && status?.data?.error && (
                <div className="error-details">
                  <h4>Error Details</h4>
                  <p className="error-text">{status.data.error}</p>
                  <div className="error-tips">
                    <p><strong>Common Solutions:</strong></p>
                    <ul>
                      <li>Check your MongoDB URI in .env file</li>
                      <li>Verify database credentials</li>
                      <li>Ensure IP is whitelisted in MongoDB Atlas</li>
                      <li>Check network connectivity</li>
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {lastChecked && (
          <div className="card-footer">
            <p>Last checked: {lastChecked}</p>
            <p className="auto-refresh">Auto-refreshes every 10 seconds</p>
          </div>
        )}
      </div>

      <div className="info-cards">
        <div className="info-card">
          <h3>📚 What This App Does</h3>
          <p>
            This application demonstrates MongoDB connection in a MERN stack. 
            It checks the database connection status in real-time and displays 
            detailed information about the connection.
          </p>
        </div>
        
        <div className="info-card">
          <h3>🔧 Technologies Used</h3>
          <ul className="tech-list">
            <li><strong>MongoDB:</strong> NoSQL Database</li>
            <li><strong>Express:</strong> Backend Framework</li>
            <li><strong>React:</strong> Frontend Library</li>
            <li><strong>Node.js:</strong> Runtime Environment</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>✨ Features</h3>
          <ul className="tech-list">
            <li>Real-time connection monitoring</li>
            <li>Auto-refresh every 10 seconds</li>
            <li>Detailed connection information</li>
            <li>Error handling and diagnostics</li>
            <li>Responsive design</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;