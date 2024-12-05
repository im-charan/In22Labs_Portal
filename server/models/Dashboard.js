const pool = require('../config/database');

// Create a new dashboard
const createDashboard = async (dashboard) => {
  try {
    console.log('Executing query with:', dashboard);
    const result = await pool.query(
      `INSERT INTO in22labs.dashboards (dashboard_name, dashboard_url, org_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [dashboard.dashboard_name, dashboard.dashboard_url, dashboard.org_id]
    );
    return result.rows[0]; // Return the newly created dashboard
  } catch (error) {
    console.error('Error creating dashboard:', error);
    throw error;
  }
};

// Get all dashboards for a specific organization
const getDashboardsByOrganisation = async (orgId) => {
  try {
    const result = await pool.query(
      'SELECT * FROM in22labs.dashboards WHERE org_id = $1',
      [orgId]
    );
    return result.rows; // Return an array of dashboards for the organization
  } catch (error) {
    console.error('Error fetching dashboards:', error);
    throw error;
  }
};

module.exports = {
  createDashboard,
  getDashboardsByOrganisation,
};
