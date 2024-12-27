// Import the pg module for PostgreSQL
const { Pool } = require('pg');
require('dotenv').config();  // Load environment variables from .env

// Create a pool of connections to the PostgreSQL database using the connection string from .env file
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING, // Use the full connection string from .env
  ssl: {
    rejectUnauthorized: false,  // Required to work with Render's PostgreSQL SSL
  },
});

// Test the connection to the database
pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database:', err));

// Export the pool so it can be used in other files (e.g., routes, models)
module.exports = pool;
