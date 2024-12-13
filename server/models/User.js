const pool = require('../config/database');  // Import the pool for DB connection
const bcrypt = require('bcrypt');
// Create a new user
const createUser = async (user) => {
  try {
    // SQL query to insert a new user into the "users" table
    const hashedPassword = await bcrypt.hash(user.user_password, 10);
    // const result = await pool.query(
    //   `INSERT INTO in22labs.users (user_name, user_password, user_password_ref, user_ip, user_os, user_status, user_create, user_update,org_id)
    //    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(),$8) RETURNING *`,
    //   [user.user_name, hashedPassword, user.password, user.ip, user.os, user.status,user.org_id]
    // );
    const result = await pool.query(
      `INSERT INTO in22labs.users (user_name, user_password,user_password_ref,org_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user.user_name, hashedPassword,user.user_password,user.org_id]
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
    const result = await pool.query('SELECT * FROM in22labs.users WHERE user_id = $1', [userId]);
    return result.rows[0];  // Return the user
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;  // Rethrow the error
  }
};

const getUserTypeByUserName = async (userName) => {
  try {
    // SQL query to get a user by ID
    const result = await pool.query('SELECT user_type FROM in22labs.users WHERE user_name = $1', [userName]);
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
  getUserTypeByUserName
};
