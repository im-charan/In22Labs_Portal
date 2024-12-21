const express = require('express');
const { getDashboardsByOrganisation, getDashboardById, getUserById } = require('../models/Client');

const router = express.Router();

// Route to get all dashboards for an organization
router.get('/organisation/:orgId', async (req, res) => {
  const { orgId } = req.params;

  if (!Number.isInteger(Number(orgId))) {
    return res.status(400).json({ success: false, message: "Invalid organization ID" });
  }

  try {
    const dashboards = await getDashboardsByOrganisation(orgId);
    if (!dashboards) {
      return res.status(404).json({ success: false, message: "No dashboards found" });
    }
    res.status(200).json({
      success: true,
      message: "Dashboards retrieved successfully",
      data: dashboards,
    });
  } catch (error) {
    console.error(`Error fetching dashboards for orgId: ${orgId}`, error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Route to get a single dashboard by its ID
router.get('/:dashboardId', async (req, res) => {
  const { dashboardId } = req.params;

  if (!Number.isInteger(Number(dashboardId))) {
    return res.status(400).json({ success: false, message: "Invalid dashboard ID" });
  }

  try {
    const dashboard = await getDashboardById(dashboardId);
    if (!dashboard) {
      return res.status(404).json({ success: false, message: "Dashboard not found" });
    }
    res.status(200).json({
      success: true,
      message: "Dashboard retrieved successfully",
      data: dashboard,
    });
  } catch (error) {
    console.error(`Error fetching dashboard with ID: ${dashboardId}`, error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Route to get a user by ID
router.get('/user/:id', async (req, res) => {
  const { id: userId } = req.params;

  if (!Number.isInteger(Number(userId))) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error(`Error fetching user with ID: ${userId}`, error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
