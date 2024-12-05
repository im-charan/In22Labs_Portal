// Import the pg module for PostgreSQL
const { Pool } = require('pg');
require('dotenv').config();  // Load environment variables from .env

// Create a pool of connections to the PostgreSQL database using environment variables
const pool = new Pool({
  user: process.env.DB_USER,        // Database username from .env file
  host: process.env.DB_HOST,        // Database host (e.g., localhost or IP address)
  database: process.env.DB_NAME,    // Database name from .env file
  password: process.env.DB_PASSWORD, // Database password from .env file
  port: process.env.DB_PORT,        // Database port (default for PostgreSQL is 5432)
});

// Test the connection to the database
pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database:', err));

// Export the pool so it can be used in other files (e.g., routes, models)
module.exports = pool;
