const express = require('express');
const {
  createDashboard,
  getAllDashboards,
  deleteDashboard,
  fetchOrgIdByName, 
  getDashboardById,
  getDashboardsByOrganisation
  // proxyDashboardContent// Ensure fetchOrgIdByName is imported correctly
} = require('../models/Dashboard'); // Correct import path for the dashboard model

const router = express.Router();

// Route to create a new dashboard
router.post("/create", async (req, res) => {
  const { dashboard_name, dashboard_url, org_id } = req.body;

  if (!dashboard_name || !dashboard_url || !org_id) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }


  try {
    const newDashboard = await createDashboard({ dashboard_name, dashboard_url, org_id });
    res.status(201).json({
      success: true,
      message: "Dashboard created successfully",
      data: newDashboard,
    });
  } catch (error) {
    console.error("Error creating dashboard:", error);
    res.status(500).json({
      success: false,
      message: "Error creating dashboard",
      error: error.message, // Be explicit with error messages
    });
  }
});

// Route to get all dashboards for an organization
router.get('/organisation/:orgId', async (req, res) => {
  const { orgId } = req.params;

  if (!Number.isInteger(Number(orgId))) {
    return res.status(400).json({ success: false, message: "Invalid organization ID" });
  }

  try {
    const dashboards = await getDashboardsByOrganisation(orgId);
    res.status(200).json({
      success: true,
      message: dashboards.length > 0 
        ? "Dashboards retrieved successfully" 
        : "No dashboards found for this organization",
      data: dashboards, // Could be an empty array if no dashboards exist
    });
  } catch (error) {
    console.error(`Error fetching dashboards for orgId: ${orgId}`, error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});





// //proxy
// router.get("/proxy/:dashboardId", async (req, res) => {
//   const { dashboardId } = req.params; // This is correct: it extracts dashboardId from the URL parameter

//   try {
//     await proxyDashboardContent(req, res);  // Pass the full req and res to the proxy function
    
//   } catch (error) {
//     console.error(`Error fetching content for dashboard ID ${dashboardId}:`, error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching dashboard content",
//       error: error.message,
//     });
//   }
// });

// Route to get all dashboards
router.get("/all", async (req, res) => {
  try {
    const dashboards = await getAllDashboards();
    res.status(200).json({
      success: true,
      message: "All dashboards retrieved successfully",
      data: dashboards,
    });
  } catch (error) {
    console.error("Error fetching all dashboards:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboards",
      error: error.message, // Log the specific error
    });
  }
});
 


// Route to get a dashboard by its ID
router.get("/:dashboardId", async (req, res) => {
  const { dashboardId } = req.params;

  // Validate dashboardId
  if (isNaN(parseInt(dashboardId, 10))) {
    return res.status(400).json({ success: false, message: "Invalid dashboard ID" });
  }

  try {
    const dashboard = await getDashboardById(dashboardId);
    res.status(200).json({
      success: true,
      message: "Dashboard retrieved successfully",
      data: dashboard,  // Return the dashboard object inside 'data'
    });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard",
      error: error.message,
    });
  }
});




// Route to get organization ID by organization name
router.get("/getIdByName/:orgName", async (req, res) => {
  const { orgName } = req.params;

  if (!orgName || orgName.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Organization name is required and cannot be empty.",
    });
  }

  try {
    console.log(`Received request for orgName: ${orgName}`);
    const orgId = await fetchOrgIdByName(orgName);
    res.status(200).json({
      success: true,
      message: "Organization ID retrieved successfully",
      org_id: orgId,
    });
  } catch (error) {
    console.error("Error fetching organization ID:", error.message);
    res.status(500).json({
      success: false,
      message: `Error fetching organization details for "${orgName}"`,
      error: error.message, // Detailed error message
    });
  }
});





// Route to delete a specific dashboard by ID
router.delete("/delete/:dashboardId", async (req, res) => {
  const { dashboardId } = req.params;

  // Validate dashboard ID
  if (!parseInt(dashboardId, 10)) {
    return res.status(400).json({ success: false, message: "Invalid dashboard ID" });
  }

  try {
    const deletedDashboard = await deleteDashboard(dashboardId);
    if (!deletedDashboard) {
      return res.status(404).json({
        success: false,
        message: "Dashboard not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dashboard deleted successfully",
      data: deletedDashboard,
    });
  } catch (error) {
    console.error("Error deleting dashboard:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting dashboard",
      error: error.message, // Return specific error message
    });
  }
});

module.exports = router;
