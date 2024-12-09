
const express = require("express");
const {
  createDashboard,
  getDashboardsByOrganisation,
  getAllDashboards,
  deleteDashboard, // Import the deleteDashboard function
} = require("../models/dashboard");

const router = express.Router();

// Route to create a new dashboard
router.post("/create", async (req, res) => {
  const { dashboard_name, dashboard_url, org_id } = req.body;

  if (!dashboard_name || !dashboard_url || !org_id) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newDashboard = await createDashboard({
      dashboard_name,
      dashboard_url,
      org_id,
    });
    res.status(201).json({
      success: true,
      message: "Dashboard created successfully",
      data: newDashboard,
    });
  } catch (error) {
    console.error("Error creating dashboard:", error);
    res
      .status(500)
      .json({ success: false, message: "Error creating dashboard", error });
  }
});

// Route to get all dashboards for an organization
router.get("/organisation/:orgId", async (req, res) => {
  const { orgId } = req.params;

  if (!parseInt(orgId, 10)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid organization ID" });
  }

  try {
    const dashboards = await getDashboardsByOrganisation(orgId);
    res.status(200).json({
      success: true,
      message: "Dashboards retrieved successfully",
      data: dashboards,
    });
  } catch (error) {
    console.error("Error fetching dashboards:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching dashboards", error });
  }
});

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
    res
      .status(500)
      .json({ success: false, message: "Error fetching dashboards", error });
  }
});

// Route to delete a specific dashboard by ID
router.delete("/delete/:dashboardId", async (req, res) => {
  const { dashboardId } = req.params;

  // Validate dashboard ID
  if (!parseInt(dashboardId, 10)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid dashboard ID" });
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
      error,
    });
  }
});

module.exports = router;
