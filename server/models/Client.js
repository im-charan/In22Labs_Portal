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







module.exports = { getDashboardsByOrganisation, getDashboardById, getUserById };
