const express = require('express');
const organisationModel = require('../models/organisation');
const multer = require("multer");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed."), false);
    }
  },
});

// Handle Multer errors for file uploads
router.post('/create', upload.single("logoFile"), async (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }

  try {
    const { org_name, org_type, org_address } = req.body;
    const logoFile = req.file;

    const base64Logo = logoFile
      ? `data:image/${logoFile.mimetype.split("/")[1]};base64,${logoFile.buffer.toString("base64")}`
      : null;

    const newOrganisation = {
      org_name: org_name.trim(),
      org_type,
      org_address: org_address.trim(),
      org_logo: base64Logo,
    };

    const result = await organisationModel.createOrganisation(newOrganisation);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating organisation:", error.message);
    res.status(500).json({ error: "Error creating organisation", message: error.message });
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
    res.status(200).json(organisation);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching organisation' });
  }
});

// Route to get organisation ID by username
router.get('/organisationId/:userName', async (req, res) => {
  const userName = req.params.userName;
  try {
    const organisationId = await organisationModel.getOrganisationIdbyUserName(userName);
    if (!organisationId) {
      return res.status(404).json({ error: 'Organisation not found' });
    }
    res.status(200).json(organisationId);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching organisationId' });
  }
});

// Route to get all organisations
router.get('/', async (req, res) => {
  try {
    const organisations = await organisationModel.getAllOrganisations();
    res.status(200).json(organisations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching organisations' });
  }
});

// Route to delete an organisation by ID
router.delete('/:id', async (req, res) => {
  const organisationId = req.params.id;
  try {
    const deletedOrganisation = await organisationModel.deleteOrganisationById(organisationId);
    if (!deletedOrganisation) {
      return res.status(404).json({ message: 'Organisation not found' });
    }
    res.status(200).json({ message: 'Organisation deleted successfully', organisation: deletedOrganisation });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting organisation' });
  }
});

module.exports = router;
