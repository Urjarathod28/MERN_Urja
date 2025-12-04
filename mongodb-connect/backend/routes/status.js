// routes/status.js - API Routes for Connection Status

const express = require('express');
const router = express.Router();
const { getConnectionStatus } = require('../config/db');

// GET /api/status - Get MongoDB connection status
router.get('/status', (req, res) => {
  try {
    const status = getConnectionStatus();
    
    if (status.isConnected && status.readyState === 1) {
      res.status(200).json({
        status: 'connected',
        message: 'MongoDB is connected successfully',
        data: {
          database: status.database,
          host: status.host,
          connectedAt: status.connectedAt,
          readyState: status.readyStateText
        },
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(503).json({
        status: 'disconnected',
        message: 'MongoDB is not connected',
        data: {
          readyState: status.readyStateText,
          error: status.error
        },
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get connection status',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/health - Health check endpoint
router.get('/health', (req, res) => {
  const status = getConnectionStatus();
  
  const healthStatus = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date().toISOString(),
    database: {
      connected: status.isConnected,
      readyState: status.readyStateText
    },
    server: {
      nodeVersion: process.version,
      platform: process.platform,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
      }
    }
  };

  const httpStatus = status.isConnected ? 200 : 503;
  res.status(httpStatus).json(healthStatus);
});

module.exports = router;