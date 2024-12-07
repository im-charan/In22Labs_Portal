const { Pool } = require('pg').Pool;  // Import PostgreSQL client
require('dotenv').config();      // Import dotenv for environment variables

// Database connection setup
const pool = new Pool({
  user: process.env.DB_USER,        // Database username from .env file
  host: process.env.DB_HOST,        // Database host (e.g., localhost or IP address)
  database: process.env.DB_NAME,    // Database name from .env file
  password: process.env.DB_PASSWORD, // Database password from .env file
  port: process.env.DB_PORT,        // Database port (default for PostgreSQL is 5432)
});

// Example of how to handle pooling and checking database connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database!");
    client.release();
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
};

// Call testConnection function
testConnection();

// Exporting pool to be used in the models
module.exports = {
  pool,
  User: require('./User'),         // User model
  Dashboard: require('./dashboard'), // Dashboard model
  Organisation: require('./organisation') // Organisation model
};
