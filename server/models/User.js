const bcrypt = require("bcrypt");
const dayjs = require("dayjs");
const pool = require("../config/database");

/**
 * Create a new user in the database.
 * @param {Object} user - User data.
 * @returns {Object} Newly created user.
 */
const createUser = async (user) => {
  try {
    // Validate full name (alphabets and spaces only)
    if (!/^[a-zA-Z\s]+$/.test(user.user_fullname)) {
      throw new Error("Full name should contain only alphabets and spaces.");
    }


    // Validate valid dates
    const currentDate = dayjs();


    const validFromDate = dayjs(user.valid_from).startOf("day");
    const validTillDate = dayjs(user.valid_till).endOf("day");


    if (
      !validFromDate.isSame(currentDate, "day") &&
      !validFromDate.isAfter(currentDate)
    ) {
      throw new Error("Valid From date must be the current date or later.");
    }


    if (validTillDate.isBefore(validFromDate)) {
      throw new Error(
        "Valid Till date must be the same as or after Valid From date."
      );
    }


    if (
      !validTillDate.isSame(currentDate, "day") &&
      validTillDate.isBefore(currentDate)
    ) {
      throw new Error("Valid Till date must be the current date or later.");
    }


    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.user_email)) {
      throw new Error("Invalid email format.");
    }
    // Check if email already exists in the database
    const emailCheck = await pool.query(
      "SELECT user_email FROM in22labs.users WHERE user_email = $1",
      [user.user_email]
    );
    // if (emailCheck.rows.length > 0) {
    //   throw new Error("Email ID already exists. Please use a different email.");
    // }
    if (emailCheck.rows.length > 0) {
      throw { status: 409, message: "Email ID already exists" };
    }
    // Password Validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(user.user_password_ref)) {
      throw new Error(
        "Password must be at least 6 characters long, with one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }


    // Hash the provided password reference
    const hashedPassword = await bcrypt.hash(user.user_password_ref, 10);


    // SQL query to insert a new user into the "users" table
    const result = await pool.query(
      `INSERT INTO in22labs.users (
         user_name, valid_from, valid_till, user_email,
         user_password_ref, user_password, user_fullname,
         user_ip, user_os, user_type, user_status,
         user_login_attempts, org_id, user_create, user_update, last_login
       ) VALUES (
         $1, $2, $3, $4,
         $5, $6, $7,
         $8, $9, $10, $11,
         $12, $13, NOW(), NOW(),NOW()
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


    const newUser = result.rows[0];


    // Check if this is the first user for the organization
    const userCountResult = await pool.query(
      "SELECT COUNT(*) AS user_count FROM in22labs.users WHERE org_id = $1",
      [user.org_id]
    );
    const userCount = parseInt(userCountResult.rows[0].user_count, 10);


    if (userCount === 1) {
      // Update the organization's poc_id with this user's user_id
      await pool.query(
        "UPDATE in22labs.organizations SET poc_id = $1 WHERE org_id = $2",
        [newUser.user_id, user.org_id]
      );
    }


    return newUser; // Return the newly created user
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.message === "Email ID already exists") {
      throw { status: 409, message: "Email ID already exists" };
    }
    throw error;
  }
 
};


/**
 * Fetch all users in LIFO order.
 * @returns {Array} List of users.
 */
const getAllUsers = async () => {
  try {
    const result = await pool.query(
      `SELECT
        u.*,
        o.org_name AS organization_name
       
      FROM in22labs.users u
      LEFT JOIN in22labs.organizations o
      ON u.org_id = o.org_id
      ORDER BY u.user_id DESC` // LIFO order
    );
    return result.rows; // Return all users with organization names
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};


/**
 * Fetch a single user by ID.
 * @param {number} userId - User ID.
 * @returns {Object} User data.
 */
const getUserById = async (userId) => {
  try {
    const result = await pool.query(
      `SELECT
        u.*,
        o.org_name AS organization_name,
        o.dash_count AS dashboard_count
      FROM in22labs.users u
      LEFT JOIN in22labs.organizations o
      ON u.org_id = o.org_id
      WHERE u.user_id = $1`,
      [userId]
    );
    return result.rows[0]; // Return the user data
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
const getUserTypeByUserName = async (userName) => {
  try {
    // SQL query to get a user by ID
    const result = await pool.query('SELECT * FROM in22labs.users WHERE user_email = $1', [userName]);
    return result.rows[0];  // Return the user
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;  // Rethrow the error
  }
};


/**
 * Delete a user by ID from the database.
 * @param {number} userId - User ID.
 * @returns {Object} Deleted user data.
 */
const deleteUser = async (userId) => {
  try {
    const result = await pool.query(
      `DELETE FROM in22labs.users WHERE user_id = $1 RETURNING *`,
      [userId]
    );
    return result.rows[0]; // Return the deleted user
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

const disableUser = async (userIds) => {
  try {
    const result = await pool.query(
      'UPDATE in22labs.users SET user_status = $1 WHERE user_id = ANY($2::int[]) RETURNING *',
      [0,userIds]
    );
    return result.rows[0]; // Return the deleted user
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

const disableUserByOrg = async (OrgIds) => {
  try {
    await pool.query(
      'BEGIN;'
    );

    await pool.query(
      'UPDATE in22labs.users SET user_status = $1 WHERE org_id = ANY($2::int[])',
      [0,OrgIds]
    )
    const result = await pool.query(
      'UPDATE in22labs.organizations SET org_status = $1 WHERE org_id = ANY($2::int[]) RETURNING *',
      [0,OrgIds]
    );
    await pool.query(
      'COMMIT;'
    )
    return result.rows[0]; // Return the deleted user
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

const activateUser = async (userIds) => {
  try {
    const result = await pool.query(
      'UPDATE in22labs.users SET user_status = $1 WHERE user_id = ANY($2::int[]) RETURNING *',
      [1,userIds]
    );
    return result.rows[0]; // Return the deleted user
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

const activateUserByOrg = async (OrgIds) => {
  try {
    await pool.query(
      'BEGIN;'
    );

    await pool.query(
      'UPDATE in22labs.users SET user_status = $1 WHERE org_id = ANY($2::int[])',
      [1,OrgIds]
    )
    const result = await pool.query(
      'UPDATE in22labs.organizations SET org_status = $1 WHERE org_id = ANY($2::int[]) RETURNING *',
      [1,OrgIds]
    );
    await pool.query(
      'COMMIT;'
    )
    return result.rows[0]; // Return the deleted user
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};


const updateUser = async (userId, userDetails) => {
  try {
    // Extract the fields from the userDetails object
    const { user_fullname, user_name, user_email, valid_till, user_password_ref } = userDetails;

    // Validate that user full name is present and valid (if necessary)
    if (user_fullname && !/^[a-zA-Z\s]+$/.test(user_fullname)) {
      throw new Error("Full name should contain only alphabets and spaces.");
    }

    // Validate email format (if necessary)
    if (user_email && !/^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/.test(user_email)) {
      throw new Error("Invalid email format.");
    }

    // Hash the password if a new password is provided
    let hashedPassword = null;
    let passwordRef = null;
    if (user_password_ref) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(user_password_ref, saltRounds);
      passwordRef = user_password_ref; // Only update password_ref if new password is provided
    }

    // Prepare the query to update only the provided fields
    let query = `UPDATE in22labs.users SET user_update = NOW()`;

    // Add fields to the query conditionally
    if (user_fullname) {
      query += `, user_fullname = '${user_fullname}'`;
    }
    if (user_name) {
      query += `, user_name = '${user_name}'`;
    }
    if (user_email) {
      query += `, user_email = '${user_email}'`;
    }
    if (valid_till) {
      query += `, valid_till = '${valid_till}'`;
    }
    if (passwordRef) {
      query += `, user_password_ref = '${passwordRef}'`;
    }
    if (hashedPassword) {
      query += `, user_password = '${hashedPassword}'`;
    }

    // Add the condition for the user_id
    query += ` WHERE user_id = ${userId} RETURNING *`;

    // Execute the query
    const result = await pool.query(query);

    // If no rows were affected, the user was not found
    if (result.rows.length === 0) {
      throw new Error("User not found.");
    }

    return result.rows[0]; // Return the updated user data

  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};


module.exports = {
  
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  getUserTypeByUserName,
  disableUser,
  disableUserByOrg,
  activateUser,
  activateUserByOrg,
  updateUser,
};
