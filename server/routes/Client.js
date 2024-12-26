const express = require('express');
const { getDashboardsByOrganisation, getDashboardById, getUserById, getUserByEmail } = require('../models/Client');

const router = express.Router();

const transporter = require('nodemailer').createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Pulls the email from environment variable
    pass: process.env.EMAIL_PASS, // Pulls the app password from environment variable
  },
});
//afcz qclo csnx cvti

// Route to get all dashboards for an organization
router.get('/organisation/:orgId', async (req, res) => {
  const { orgId } = req.params;

  if (!Number.isInteger(Number(orgId))) {
    return res.status(400).json({ success: false, message: "Invalid organization ID" });
  }

  try {
    const dashboards = await getDashboardsByOrganisation(orgId);
    const count = dashboards ? dashboards.length : 0;

    res.status(200).json({
      success: true,
      message: count > 0 ? "Dashboards retrieved successfully" : "No dashboards found",
      count,
      data: dashboards || [], // Return an empty array if no dashboards
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

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Validate the email format
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  try {
    // Check if user exists in the database
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Send the email to your address (sherinpshaju@gmail.com) notifying about the forgot password request
    await transporter.sendMail({
      from: 'your-email@gmail.com', // Sender email
      to: 'sherinpshaju@gmail.com', // Hardcoded recipient email
      subject: 'Forgot Password Request',
      text: `A password reset request has been made for the following email address: ${email}` // Include the email of the user who requested it
    });

    // Send a success response to the client
    res.status(200).json({ success: true, message: 'Password request successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});


module.exports = router;
