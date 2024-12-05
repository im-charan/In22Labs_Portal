const express = require('express');
const organisationModel = require('../models/organisation');  // Import the organisation model

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

// Route to get all organisations
router.get('/', async (req, res) => {
  try {
    const organisations = await organisationModel.getAllOrganisations();
    res.status(200).json(organisations);  // Return all organisations
  } catch (error) {
    res.status(500).json({ error: 'Error fetching organisations' });
  }
});

module.exports = router;