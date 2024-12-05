const { Pool } = require('pg');  // Import PostgreSQL client
require('dotenv').config();      // Import dotenv for environment variables

// Database connection setup
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
  User: require('./user'),         // User model
  Dashboard: require('./dashboard'), // Dashboard model
  Organisation: require('./organisation') // Organisation model
};
