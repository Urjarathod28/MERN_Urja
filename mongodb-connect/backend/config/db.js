// config/db.js - MongoDB Connection Configuration

const mongoose = require('mongoose');

let connectionStatus = {
  isConnected: false,
  error: null,
  database: null,
  host: null,
  connectedAt: null
};

const connectDB = async () => {
  try {
    // MongoDB connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    connectionStatus.isConnected = true;
    connectionStatus.error = null;
    connectionStatus.database = conn.connection.name;
    connectionStatus.host = conn.connection.host;
    connectionStatus.connectedAt = new Date().toISOString();

    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📦 Database: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}`);
    console.log(`⚡ Ready state: ${conn.connection.readyState}`);

  } catch (error) {
    connectionStatus.isConnected = false;
    connectionStatus.error = error.message;
    connectionStatus.database = null;
    connectionStatus.host = null;

    console.error('❌ MongoDB Connection Error:', error.message);
    
    // Retry connection after 5 seconds
    console.log('🔄 Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Connection event listeners
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected to MongoDB');
  connectionStatus.isConnected = true;
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 Mongoose connection error:', err);
  connectionStatus.isConnected = false;
  connectionStatus.error = err.message;
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose disconnected from MongoDB');
  connectionStatus.isConnected = false;
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 Mongoose connection closed through app termination');
  process.exit(0);
});

// Export connection status getter
const getConnectionStatus = () => {
  return {
    ...connectionStatus,
    readyState: mongoose.connection.readyState,
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    readyStateText: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
  };
};

module.exports = connectDB;
module.exports.getConnectionStatus = getConnectionStatus;