const express = require('express');
const organisationModel = require('../models/organisation'); 

const router = express.Router();

// Route to create a new organisation
router.post('/create', async (req, res) => {
  const organisationData = req.body;
  try {
    const newOrganisation = await organisationModel.createOrganisation(organisationData);
    res.status(201).json(newOrganisation);  // Return the newly created organisation
  } catch (error) {
    res.status(500).json({ error: 'Error creating organisation' });
  }
});

// Route to get an organisation by ID
router.get('/:id', async (req, res) => {
  const organisationId = req.params.id;
  try {
    const organisation = await organisationModel.getOrganisationById(organisationId);
    if (!organisation) {
      return res.status(404).json({ error: 'Organisation not found' });
    }
    res.status(200).json(organisation);  // Return the found organisation
  } catch (error) {
    res.status(500).json({ error: 'Error fetching organisation' });
  }
});

// Route to get organisationId by userName
router.get('/organisationId/:userName', async (req, res) => {
  const userName = req.params.userName;
  try {
    const organisationId = await organisationModel.getOrganisationIdbyUserName(userName);
    if (!organisationId) {
      return res.status(404).json({ error: 'Organisation not found' });
    }
    res.status(200).json(organisationId);  // Return the found organisationId
  } catch (error) {
    res.status(500).json({ error: 'Error fetching organisationId' });
  }
})

// Route to get all organisations in LIFO order (newest first)
router.get('/', async (req, res) => {
  try {
    const organisations = await organisationModel.getAllOrganisations();
    res.status(200).json(organisations);  // Return all organisations in LIFO order
  } catch (error) {
    res.status(500).json({ error: 'Error fetching organisations' });
  }
});

// Route to delete an organisation by ID
router.delete('/:id', async (req, res) => {
  const organisationId = req.params.id; // Extract the ID from request params
  try {
    const deletedOrganisation = await organisationModel.deleteOrganisationById(organisationId);
    if (!deletedOrganisation) {
      return res.status(404).json({ message: 'Organisation not found' }); // If no rows were deleted
    }
    res.status(200).json({ message: 'Organisation deleted successfully', organisation: deletedOrganisation });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting organisation' });
  }
});

module.exports = router;
