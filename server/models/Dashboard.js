
const pool = require("../config/database");

// Fetch the organization ID by its name
const fetchOrgIdByName = async (orgName) => {
  try {
    const query = `
      SELECT org_id 
      FROM in22labs.organizations 
      WHERE org_name = $1
    `;
    const result = await pool.query(query, [orgName]);
    if (result.rows.length === 0) {
      throw new Error(`Organization with name "${orgName}" not found.`);
    }
    return result.rows[0].org_id;
  } catch (error) {
    console.error("Error fetching organization ID by name:", error);
    throw error;
  }
};

// Create a new dashboard
const createDashboard = async (dashboard) => {
  const client = await pool.connect();
  // const urlRegex = /^(https:\/\/app\.powerbi\.com\/.+)$/;
  const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;
  if (dashboard.dashboard_name.length > 100) {
    throw new Error("Dashboard name must be less than 100 characters.");
  }

  // General URL format validation
  if (!urlRegex.test(dashboard.dashboard_url)) {
    throw new Error("Invalid URL format.");
  }
  try {
    await client.query("BEGIN"); // Start a transaction

    // No need to fetch org_id if it's directly provided in the request body
    const org_id = dashboard.org_id;

    // Insert the new dashboard
    const insertQuery = `
      INSERT INTO in22labs.dashboards 
      (dashboard_name, dashboard_url, org_id, dashboard_create, dashboard_update) 
      VALUES ($1, $2, $3, NOW(), NOW()) 
      RETURNING *
    `;
    const insertValues = [
      dashboard.dashboard_name,
      dashboard.dashboard_url,
      org_id,
    ];
    const insertResult = await client.query(insertQuery, insertValues);

    // Update the dash_count in the organizations table
    const updateQuery = `
      UPDATE in22labs.organizations
      SET dash_count = dash_count + 1
      WHERE org_id = $1
      RETURNING *
    `;
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

// Get dashboards by organization with org_name
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
      RETURNING *
    `;
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
    const query = `
      DELETE FROM in22labs.dashboards 
      WHERE dashboard_id = $1 
      RETURNING *
    `;
    const result = await pool.query(query, [dashboardId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting dashboard:", error);
    throw error;
  }
};

module.exports = {
  createDashboard,
  fetchOrgIdByName, // Exported for reuse in other parts of the application
  getDashboardsByOrganisation,
  getAllDashboards,
  deleteDashboard,
};
