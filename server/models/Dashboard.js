const pool = require("../config/database");

// Create a new dashboard
const createDashboard = async (dashboard) => {
  try {
    const query = `
      INSERT INTO in22labs.dashboards 
      (dashboard_name, dashboard_url, org_id, dashboard_create, dashboard_update) 
      VALUES ($1, $2, $3, NOW(), NOW()) 
      RETURNING *`;
    const values = [
      dashboard.dashboard_name,
      dashboard.dashboard_url,
      dashboard.org_id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating dashboard:", error);
    throw error;
  }
};

// Get all dashboards for a specific organization
const getDashboardsByOrganisation = async (orgId) => {
  try {
    const query = "SELECT * FROM in22labs.dashboards WHERE org_id = $1";
    const result = await pool.query(query, [orgId]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching dashboards by organization:", error);
    throw error;
  }
};

// Get all dashboards
const getAllDashboards = async () => {
  try {
    const query = "SELECT * FROM in22labs.dashboards";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all dashboards:", error);
    throw error;
  }
};

// Update a dashboard
const updateDashboard = async (dashboardId, dashboard) => {
  try {
    const query = `
      UPDATE in22labs.dashboards 
      SET dashboard_name = $1, 
          dashboard_url = $2, 
          dashboard_update = NOW(), 
          dashboard_status = $3, 
          org_id = $4 
      WHERE dashboard_id = $5 
      RETURNING *`;
    const values = [
      dashboard.dashboard_name,
      dashboard.dashboard_url,
      dashboard.dashboard_status,
      dashboard.org_id,
      dashboardId,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating dashboard:", error);
    throw error;
  }
};

// Delete a dashboard
const deleteDashboard = async (dashboardId) => {
  try {
    const query =
      "DELETE FROM in22labs.dashboards WHERE dashboard_id = $1 RETURNING *";
    const result = await pool.query(query, [dashboardId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting dashboard:", error);
    throw error;
  }
};

module.exports = {
  createDashboard,
  getDashboardsByOrganisation,
  getAllDashboards,
  updateDashboard,
  deleteDashboard,
};
