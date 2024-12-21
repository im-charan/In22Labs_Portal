const axios = require('axios');  // Import Axios for HTTP requests
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



//proxy const 
proxyDashboardContent = async (req, res) => {
  const { dashboardId } = req.params;
  const dashboardUrl = `https://www.youtube.com/embed/${dashboardId}`;

  try {
    // Fetch the HTML content of the dashboard
    const response = await axios.get(dashboardUrl);

    // Modify the HTML content to include a base tag that rewrites links to be relative to the proxy URL
    const htmlContent = response.data.replace(
      /<head>/,
      `<head><base href="http://localhost:5000/api/dashboard/proxy/${dashboardId}/" />`
    );

    // Set Content-Type header to text/html
    res.setHeader('Content-Type', 'text/html');

    // Return the modified HTML content
    res.send(htmlContent);
  } catch (error) {
    console.error(`Error fetching content for dashboard ID ${dashboardId}:`, error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard content",
      error: error.message,
    });
  }
};

// Create a new dashboard
const createDashboard = async (dashboard) => {
  const client = await pool.connect();
   const urlRegex = /^(https:\/\/app\.powerbi\.com\/.+)$/;

   if (dashboard.dashboard_name.length > 100) {
     throw new Error("Dashboard name must be less than 100 characters.");
   }

   if (!urlRegex.test(dashboard.dashboard_url)) {
     throw new Error("Invalid Power BI URL format.");
   }
  try {
    await client.query("BEGIN");

    const org_id = dashboard.org_id;

    // Insert the new dashboard
    const insertQuery = `
      INSERT INTO in22labs.dashboards 
      (dashboard_name, dashboard_url, org_id, dashboard_create, dashboard_update) 
      VALUES ($1, $2, $3, NOW(), NOW()) 
      RETURNING *
    `;
    const insertValues = [dashboard.dashboard_name, dashboard.dashboard_url, org_id];
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

    await client.query("COMMIT");
    return insertResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating dashboard and updating dash_count:", error);
    throw error;
  } finally {
    client.release();
  }
};


const getDashboardById = async (dashboardId) => {
  try {
    const query = `
      SELECT dashboard_id, dashboard_name, dashboard_url
      FROM in22labs.dashboards
      WHERE dashboard_id = $1
    `;
    const result = await pool.query(query, [dashboardId]);

    // If no dashboard is found, throw an error
    if (result.rows.length === 0) {
      throw new Error(`No dashboard found for dashboard ID ${dashboardId}`);
    }

    // Return the dashboard data
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching dashboard by ID:", error);
    throw error;
  }
};

// Get all dashboards 
const getAllDashboards = async () => {
  try {
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
const getDashboardsByOrganisation = async (orgId) => {
  try {
    const query = `
      SELECT d.dashboard_id, d.dashboard_name, d.dashboard_url, o.org_name
      FROM in22labs.dashboards d
      JOIN in22labs.organizations o ON d.org_id = o.org_id
      WHERE d.org_id = $1`;
    const result = await pool.query(query, [orgId]);

    return result.rows; // Always return an array, even if empty
  } catch (error) {
    console.error(`Error fetching dashboards for orgId: ${orgId}`, error);
    throw error;
  }
};


// Export the methods to use them in your router
module.exports = {
  createDashboard,
  fetchOrgIdByName,
  getDashboardsByOrganisation,
  getAllDashboards,
  deleteDashboard,
  getDashboardById
 
  // Export the proxy function
};
