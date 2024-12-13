const pool = require('../config/database'); // Import the pool for DB connection
const bcrypt = require('bcrypt');
const createUser = async (user) => {
  try {
    // Hash the provided password reference
    const hashedPassword = await bcrypt.hash(user.user_password_ref, 10);

    // SQL query to insert a new user into the "users" table
    const result = await pool.query(
      `INSERT INTO in22labs.users (
         user_name, valid_from, valid_till, user_email, 
         user_password_ref, user_password, user_fullname, 
         user_ip, user_os, user_type, user_status, 
         user_login_attempts, org_id, user_create, user_update
       ) VALUES (
         $1, $2, $3, $4, 
         $5, $6, $7, 
         $8, $9, $10, $11, 
         $12, $13, NOW(), NOW()
       ) RETURNING *`,
      [
        user.user_name, // User name
        user.valid_from, // Valid from (date)
        user.valid_till, // Valid till (date)
        user.user_email, // User email
        user.user_password_ref, // Password reference (plain text)
        hashedPassword, // Hashed password stored in user_password
        user.user_fullname, // User full name
        user.user_ip, // User IP address
        user.user_os, // User operating system
        user.user_type, // User type (integer)
        user.user_status || 1, // Default user status (1 = active)
        user.user_login_attempts || 0, // Login attempts (default 0)
        user.org_id, // Organization ID
      ]
    );

    return result.rows[0]; // Return the newly created user
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Rethrow the error for handling
  }
};

//get all users
const getAllUsers = async () => {
  try {
    // Query to select all users
    const result = await pool.query('SELECT * FROM in22labs.users');
    return result.rows;  // Return the list of users
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;  // Rethrow the error to be handled by the calling function
  }
};
// Get a user by ID
const getUserById = async (userId) => {
  try {
    const result = await pool.query(
      `SELECT * FROM in22labs.users WHERE user_id = $1`, 
      [userId]
    );
    return result.rows[0]; // Return the user
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Rethrow the error
  }
};

// Update user details by ID
const updateUser = async (userId, userDetails) => {
  try {
    const result = await pool.query(
      `UPDATE in22labs.users 
       SET user_name = $1, valid_from = $2, valid_till = $3, user_email = $4, is_admin = $5, 
           user_password_ref = $6, user_password = $7, user_fullname = $8, user_ip = $9, 
           user_os = $10, user_type = $11, user_status = $12, org_id = $13, user_update = NOW() 
       WHERE user_id = $14 
       RETURNING *`,
      [
        userDetails.user_name,          // POC Name (user_name)
        userDetails.valid_from,         // Valid From
        userDetails.valid_till,         // Valid Till
        userDetails.user_email,         // Email
        userDetails.is_admin,           // Is Admin
        userDetails.user_password_ref,  // Password Reference
        userDetails.user_password,      // Password
        userDetails.user_fullname,      // Full Name
        userDetails.user_ip,            // IP Address
        userDetails.user_os,            // OS
        userDetails.user_type,          // User Type
        userDetails.user_status,        // User Status
        userDetails.org_id,             // Organization ID
        userId                          // User ID
      ]
    );
    return result.rows[0]; // Return the updated user
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; // Rethrow the error
  }
};

// Delete a user by ID
const deleteUser = async (userId) => {
  try {
    const result = await pool.query(
      `DELETE FROM in22labs.users WHERE user_id = $1 RETURNING *`, 
      [userId]
    );
    return result.rows[0]; // Return the deleted user (optional)
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error; // Rethrow the error
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
