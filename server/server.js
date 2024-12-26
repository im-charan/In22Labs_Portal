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



const SITE_SECRET = process.env.SITE_SECRET
      // CORS middleware for handling cross-origin requests
const corsOptions = {
  origin: 'http://localhost:5173/',   // URL of the React app
};



// Initialize Passport
const initializePassport = require('./config/passportConfig');
initializePassport(passport);

// Initialize the Express app
const app = express();
app.set('trust proxy', true); 
app.use(express.urlencoded({ extended: true }));


// Middleware
app.use(cors({ origin: 'http://localhost:5173',
  credentials: true,
 }));  // Allow requests from frontend
app.use(express.urlencoded({ extended: true }));     // Handle URL-encoded form data
app.use(express.json());                             // Parse JSON request bodies
app.use('/uploads', express.static('uploads'));




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

app.post('/api/auth', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
      // Authentication failed, send the `info.message` to the client
      console.log('Authentication failed:', info.message);
      if(info.message === 'Missing credentials'){
        return res.status(400).json({ message: ''});
      }
      return res.status(401).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Login failed' });
      }

      // Authentication succeeded, send a success response
      console.log('Authentication succeeded:', info.message);
      return res.status(200).json({ message: info.message, user });
    });
  })(req, res, next);
});


//auth
app.post('/api/auth', passport.authenticate('local', {
  successRedirect: '/api/user/1',
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
