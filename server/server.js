const express = require('express');  // Express framework
require('dotenv').config();          // To load environment variables from .env file
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport'); // Passport middleware for authentication
    // For file uploads
const cors = require('cors');         // CORS middleware for handling cross-origin requests

// Import routes
const dashboardRoutes = require('./routes/dashboard');
const organisationRoutes = require('./routes/organisation');
const userRoutes = require('./routes/user');
const clientRoutes = require('./routes/Client');
const axios = require('axios');

// Initialize Passport
const initializePassport = require('./config/passportConfig');
initializePassport(passport);

// Initialize the Express app
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173',
  credentials: true,
 }));  // Allow requests from frontend
app.use(express.urlencoded({ extended: true }));     // Handle URL-encoded form data
app.use(express.json());                             // Parse JSON request bodies




// Use session and flash middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Setup other routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/user', userRoutes);
app.use('/api/organisation', organisationRoutes);
app.use('/api/client', clientRoutes);

// Set up a basic route for testing the server
app.get('/', (req, res) => {
  res.send('Welcome to the Backend API!');
});
//auth
app.post('/api/auth', passport.authenticate('local', {
  successRedirect: '/api/user/12',
 failureRedirect: '/api/login'
}))
// Google reCAPTCHA verification endpoint
app.post('/verify', async (request, response) => {
  const { captchaValue } = request.body;
  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SITE_SECRET}&response=${captchaValue}`
  );
  response.send(data);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
