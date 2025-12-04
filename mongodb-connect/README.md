# MongoDB Connect - MERN Stack Project

![MongoDB Connect Banner](https://img.shields.io/badge/MongoDB-Connect-green?style=for-the-badge&logo=mongodb)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

## 📋 Table of Contents
- [Overview](#overview)
- [Concepts Covered](#concepts-covered)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

**MongoDB Connect** is a simple MERN stack application that demonstrates how to:
- Set up a Node.js backend with Express
- Connect to MongoDB using Mongoose
- Configure environment variables securely
- Create a React frontend to display connection status
- Implement proper error handling for database connections

## 📚 Concepts Covered

1. **Node.js Project Setup**
   - Express server configuration
   - Middleware setup (CORS, JSON parsing)
   - Project structure organization

2. **Environment Variables**
   - Using `.env` files for sensitive data
   - dotenv package implementation
   - Security best practices

3. **MongoDB Connection**
   - Mongoose ODM setup
   - Connection string configuration
   - Connection status monitoring
   - Error handling and retries

## ✨ Features

- ✅ MongoDB connection status checker
- ✅ Real-time connection monitoring
- ✅ Beautiful React UI with status indicators
- ✅ RESTful API endpoints
- ✅ Environment variable management
- ✅ Error handling and logging
- ✅ Responsive design
- ✅ Connection health check endpoint

## 📁 Folder Structure

```
mongodb-connect/
│
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection logic
│   ├── routes/
│   │   └── status.js          # API routes for connection status
│   ├── .env                   # Environment variables (not in git)
│   ├── .env.example           # Example env file
│   ├── .gitignore            # Git ignore file
│   ├── server.js             # Main server file
│   └── package.json          # Backend dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConnectionStatus.jsx
│   │   │   └── Header.jsx
│   │   ├── App.jsx           # Main React component
│   │   ├── App.css           # Styling
│   │   └── index.js          # React entry point
│   ├── .env                  # Frontend env variables
│   ├── .env.example
│   └── package.json          # Frontend dependencies
│
├── screenshots/              # Project screenshots
│   ├── home-connected.png
│   ├── home-disconnected.png
│   └── folder-structure.png
│
└── README.md                # Project documentation
```

## 🔧 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MongoDB Atlas Account** (free tier) - [Sign Up](https://www.mongodb.com/cloud/atlas)
- **Git** (optional) - [Download](https://git-scm.com/)

## 💻 Installation & Setup

### Step 1: Clone or Download the Project

```bash
# Clone the repository
git clone <repository-url>
cd mongodb-connect

# OR download and extract the ZIP file
```

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env file with your MongoDB connection string
# Use nano, vim, or any text editor
nano .env
```

**Backend Dependencies:**
- express: Web framework
- mongoose: MongoDB ODM
- dotenv: Environment variable management
- cors: Cross-Origin Resource Sharing
- nodemon: Auto-restart development server (dev dependency)

### Step 3: Frontend Setup

```bash
# Open a new terminal and navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Frontend Dependencies:**
- react: UI library
- react-dom: React DOM rendering
- axios: HTTP client for API calls

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` folder:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority

# Replace with your actual MongoDB Atlas connection string
# Example:
# MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
```

**How to get MongoDB URI:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<dbname>`

### Frontend (.env)

Create a `.env` file in the `frontend` folder:

```env
REACT_APP_API_URL=http://localhost:5000
```

## 🚀 Running the Project

### Option 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server will start on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# React app will open on http://localhost:3000
```

### Option 2: Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/status` | Get MongoDB connection status |
| GET | `/api/health` | Health check endpoint |

### Example Response - Connection Status

**Success (200 OK):**
```json
{
  "status": "connected",
  "message": "MongoDB is connected successfully",
  "database": "myDatabase",
  "host": "cluster0.mongodb.net"
}
```

**Error (500 Internal Server Error):**
```json
{
  "status": "disconnected",
  "message": "MongoDB connection failed",
  "error": "Connection timeout"
}
```

## 📸 Screenshots

### 1. Home Page - Connected State
![alt text](screenshots/Connect.png)
*Dashboard showing successful MongoDB connection with green status indicator*
 
### 2. Home Page - Disconnected State
![alt text](screenshots/DisConnect.png)
*Dashboard showing failed connection with red status indicator and error message*
 
### 3. Backend Terminal Structure
![alt text](screenshots/Terminal.png)
*Complete project folder organization* 

## 🎨 Functionalities Explained

### Backend Functionalities

1. **MongoDB Connection (config/db.js)**
   - Establishes connection to MongoDB using Mongoose
   - Implements connection options for stability
   - Handles connection events (connected, error, disconnected)
   - Provides connection status monitoring

2. **Express Server (server.js)**
   - Sets up Express application
   - Configures middleware (CORS, JSON parser)
   - Defines API routes
   - Starts server on specified port
   - Graceful shutdown handling

3. **Status Routes (routes/status.js)**
   - `/api/status` - Returns current MongoDB connection status
   - `/api/health` - Health check endpoint for monitoring
   - Includes database name and host information

### Frontend Functionalities

1. **Connection Status Component**
   - Fetches connection status from backend API
   - Displays visual indicators (green/red)
   - Shows connection details (database name, host)
   - Auto-refreshes every 10 seconds
   - Error handling and loading states

2. **Responsive UI**
   - Modern card-based design
   - Color-coded status indicators
   - Smooth animations and transitions
   - Mobile-friendly layout

3. **Real-time Monitoring**
   - Automatic status updates
   - Manual refresh button
   - Connection timestamp display

## 🐛 Troubleshooting

### Common Issues

**1. "MongoDB connection failed"**
- ✅ Verify your MongoDB URI in `.env`
- ✅ Check username and password are correct
- ✅ Ensure your IP is whitelisted in MongoDB Atlas (0.0.0.0/0 for development)
- ✅ Verify database user has proper permissions

**2. "Cannot connect to backend"**
- ✅ Ensure backend server is running on port 5000
- ✅ Check REACT_APP_API_URL in frontend `.env`
- ✅ Verify CORS is properly configured

**3. "Port already in use"**
- ✅ Kill the process using the port: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)
- ✅ Or change the PORT in backend `.env`

**4. "Module not found" errors**
- ✅ Run `npm install` in both backend and frontend folders
- ✅ Delete `node_modules` and `package-lock.json`, then reinstall

**5. React app doesn't update**
- ✅ Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- ✅ Check browser console for errors
- ✅ Verify API URL is correct

## 📝 Additional Notes

### Security Best Practices
- Never commit `.env` files to Git
- Use strong passwords for MongoDB
- Restrict MongoDB Atlas IP whitelist in production
- Use environment variables for all sensitive data

### Development Tips
- Use `nodemon` for auto-restarting backend during development
- Enable React Developer Tools for debugging
- Check MongoDB Atlas logs for connection issues
- Use Postman to test API endpoints independently

## 🎓 Learning Outcomes

After completing this project, you will understand:
- How to structure a MERN stack application
- Environment variable management and security
- MongoDB connection setup and monitoring
- RESTful API design principles
- React component architecture
- Frontend-backend communication
- Error handling best practices

## 📞 Support

If you encounter any issues:
1. Check the Troubleshooting section above
2. Review the console logs (both frontend and backend)
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed

---

**Happy Coding! 🚀**

Made with ❤️ for learning MERN stack development