const pool = require('../config/database');

// Get dashboards by organization with org_name
const getDashboardsByOrganisation = async (orgId) => {
  try {
    const query = `
      SELECT d.dashboard_id, d.dashboard_name, d.dashboard_url, o.org_name
      FROM in22labs.dashboards d
      JOIN in22labs.organizations o ON d.org_id = o.org_id
      WHERE d.org_id = $1`;
    const result = await pool.query(query, [orgId]);

    return result.rows.length > 0 ? result.rows : null;
  } catch (error) {
    console.error(`Error fetching dashboards for orgId: ${orgId}`, error);
    throw error;
  }
};

// Get a dashboard by its ID
const getDashboardById = async (dashboardId) => {
  try {
    const query = `
      SELECT dashboard_id, dashboard_name, dashboard_url
      FROM in22labs.dashboards
      WHERE dashboard_id = $1`;
    const result = await pool.query(query, [dashboardId]);

    return result.rows[0] || null;
  } catch (error) {
    console.error(`Error fetching dashboard by ID: ${dashboardId}`, error);
    throw error;
  }
};

// Get user by ID
const getUserById = async (userId) => {
  try {
    const query = `
      SELECT 
        u.*, 
        o.org_name AS organization_name, 
        o.org_logo AS organization_logo, 
        o.dash_count AS dashboard_count
      FROM in22labs.users u
      LEFT JOIN in22labs.organizations o 
        ON u.org_id = o.org_id
      WHERE u.user_id = $1`;
    
    const result = await pool.query(query, [userId]);

    return result.rows[0] || null;
  } catch (error) {
    console.error(`Error fetching user with ID: ${userId}`, error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const query = `
      SELECT user_id, user_email 
      FROM in22labs.users  -- Specify the schema here
      WHERE user_email = $1`;  // Query to fetch user by email
    const result = await pool.query(query, [email]); // Execute the query with email as parameter

    return result.rows[0] || null; // If no rows found, return null
  } catch (error) {
    console.error(`Error fetching user with email: ${email}`, error); // Log error details
    throw error; // Rethrow the error for higher-level handling
  }
};




module.exports = { 
  getDashboardsByOrganisation, 
  getDashboardById, 
  getUserById, 
  getUserByEmail // Add the new function
};






