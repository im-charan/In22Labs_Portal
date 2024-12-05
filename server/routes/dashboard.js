const express = require('express');
const dashboardModel = require('../models/dashboard'); // Import the dashboard model

const router = express.Router();

// Route to create a new dashboard
router.post('/create', async (req, res) => {
  const { dashboard_name, dashboard_url, org_id } = req.body;

  // Validate the input
  if (!dashboard_name || !dashboard_url || !org_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  console.log('Request data:', { dashboard_name, dashboard_url, org_id });
  try {
    const newDashboard = await dashboardModel.createDashboard({
      dashboard_name,
      dashboard_url,
      org_id,
    });
    res.status(201).json(newDashboard); // Return the newly created dashboard
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating dashboard' });
  }
});

// Route to get all dashboards for an organization
router.get('/organisation/:orgId', async (req, res) => {
  const { orgId } = req.params;

  try {
    const dashboards = await dashboardModel.getDashboardsByOrganisation(orgId);
    res.status(200).json(dashboards); // Return all dashboards for the organization
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching dashboards' });
  }
});

//get all dashboard...
module.exports = router;
