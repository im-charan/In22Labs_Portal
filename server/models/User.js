const pool = require('../config/database');  // Import the pool for DB connection

// Create a new user
const createUser = async (user) => {
  try {
    // SQL query to insert a new user into the "users" table
    const result = await pool.query(
      `INSERT INTO users (user_name, password_enc, pass_reference, ip, os, device, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`,
      [user.user_name, user.password_enc, user.pass_reference, user.ip, user.os, user.device, user.status]
    );
    return result.rows[0];  // Return the newly created user
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;  // Rethrow the error to be handled by the calling function
  }
};

// Get a user by ID
const getUserById = async (userId) => {
  try {
    // SQL query to get a user by ID
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0];  // Return the user
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;  // Rethrow the error
  }
};

// Update user details by ID
const updateUser = async (userId, userDetails) => {
  try {
    // SQL query to update user data
    const result = await pool.query(
      `UPDATE users SET user_name = $1, password_enc = $2, pass_reference = $3, ip = $4, os = $5, device = $6, status = $7, updated_at = NOW()
       WHERE id = $8 RETURNING *`,
      [userDetails.user_name, userDetails.password_enc, userDetails.pass_reference, userDetails.ip, userDetails.os, userDetails.device, userDetails.status, userId]
    );
    return result.rows[0];  // Return the updated user
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;  // Rethrow the error
  }
};

// Delete a user by ID
const deleteUser = async (userId) => {
  try {
    // SQL query to delete a user by ID
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    return result.rows[0];  // Return the deleted user (optional)
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;  // Rethrow the error
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
