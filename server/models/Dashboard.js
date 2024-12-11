
const pool = require("../config/database");

// Create a new dashboard
const createDashboard = async (dashboard) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // Start a transaction

    // Insert the new dashboard
    const insertQuery = `
      INSERT INTO in22labs.dashboards 
      (dashboard_name, dashboard_url, org_id, dashboard_create, dashboard_update) 
      VALUES ($1, $2, $3, NOW(), NOW()) 
      RETURNING *`;
    const insertValues = [
      dashboard.dashboard_name,
      dashboard.dashboard_url,
      dashboard.org_id,
    ];
    const insertResult = await client.query(insertQuery, insertValues);

    // Update the dash_count in the organization table
    const updateQuery = `
      UPDATE in22labs.organizations
      SET dash_count = dash_count + 1
      WHERE org_id = $1
      RETURNING *`;
    const updateValues = [dashboard.org_id];
    await client.query(updateQuery, updateValues);

    await client.query("COMMIT"); // Commit the transaction
    return insertResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback in case of error
    console.error("Error creating dashboard and updating dash_count:", error);
    throw error;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Get all dashboards for a specific organization with org_name
const getDashboardsByOrganisation = async (orgId) => {
  try {
    // Updated query to join dashboards and organizations tables
    const query = `
      SELECT d.dashboard_id, d.dashboard_name, d.dashboard_url, o.org_name
      FROM in22labs.dashboards d
      JOIN in22labs.organizations o ON d.org_id = o.org_id
      WHERE d.org_id = $1`;
    const result = await pool.query(query, [orgId]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching dashboards by organization:", error);
    throw error;
  }
};

// Get all dashboards with org_name
const getAllDashboards = async () => {
  try {
    // Updated query to join dashboards and organizations tables
    const query = `
      SELECT d.dashboard_id, d.dashboard_name, d.dashboard_url, o.org_name
      FROM in22labs.dashboards d
      JOIN in22labs.organizations o ON d.org_id = o.org_id`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all dashboards:", error);
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
  deleteDashboard,
};
