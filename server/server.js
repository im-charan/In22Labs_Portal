// Import required packages
const express = require('express');  // Express framework
const cors = require('cors');        // CORS middleware for handling cross-origin requests
require('dotenv').config();          // To load environment variables from .env file

// Import routes
const dashboardRoutes = require('./routes/dashboard');
const organisationRoutes = require('./routes/organisation');
const userRoutes = require('./routes/user');

// Initialize the Express app
const app = express();

// Use CORS to allow requests from different domains (e.g., your frontend)
app.use(cors());

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Setup routes for different API endpoints
app.use('/api/dashboard', dashboardRoutes);       // Handles dashboard-related API requests
app.use('/api/organisation', organisationRoutes); // Handles organisation-related API requests
app.use('/api/user', userRoutes);                 // Handles user-related API requests

// Set up a basic route for testing the server
app.get('/', (req, res) => {
  res.send('Welcome to the Backend API!');
});

// Initialize the server on a specific port (configured in .env)
const PORT = process.env.PORT || 5000;  // Default to 5000 if no port is specified in .env
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
