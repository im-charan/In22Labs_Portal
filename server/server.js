// Import required packages
const express = require('express');  // Express framework
const cors = require('cors');        // CORS middleware for handling cross-origin requests
require('dotenv').config();          // To load environment variables from .env file
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport'); // Passport middleware for authentication
// Import routes
const dashboardRoutes = require('./routes/dashboard');
const organisationRoutes = require('./routes/organisation');
const userRoutes = require('./routes/user');


const initializePassport = require('./config/passportConfig');
initializePassport(passport);

// Initialize the Express app
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

app.use(flash());

// Use CORS to allow requests from different domains (e.g., your frontend)
app.use(cors());

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// Setup routes for different API endpoints
app.use('/api/dashboard', dashboardRoutes);       // Handles dashboard-related API requests
app.use('/api/organisation', organisationRoutes); // Handles organisation-related API requests
app.use('/api/user', userRoutes);                 // Handles user-related API requests
// app.use('/api/auth', authRoutes);               // Handles login-related API requests
// Set up a basic route for testing the server
app.get('/', (req, res) => {
  res.send('Welcome to the Backend API!');
});

app.post('/api/auth', passport.authenticate('local', {
  successRedirect: '/api/dashboard',
  failureRedirect: '/api/login'
}))


// Initialize the server on a specific port (configured in .env)
const PORT = process.env.PORT || 5000;  // Default to 5000 if no port is specified in .env
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/api/dasboard')
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   }
//   return res.redirect('/api/login')
// }