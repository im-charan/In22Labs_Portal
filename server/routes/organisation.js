const express = require("express");
const multer = require("multer");
const path = require("path");
const organisationModel = require("../models/organisation");

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Store files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Initialize Multer with storage configuration
const upload = multer({ storage });

// Route to create an organisation with logo upload
router.post("/create", upload.single("org_logo"), async (req, res) => {
  const organisationData = req.body;
  const logoName = req.file ? req.file.filename : null;

  try {
    const newOrganisation = await organisationModel.createOrganisation(
      organisationData,
      logoName
    );
    res.status(201).json(newOrganisation); // Return the newly created organisation
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating organisation" });
  }
});

// Route to get an organisation by ID
router.get("/:id", async (req, res) => {
  const organisationId = req.params.id;
  try {
    const organisation = await organisationModel.getOrganisationById(
      organisationId
    );
    if (!organisation) {
      return res.status(404).json({ error: "Organisation not found" });
    }
    res.status(200).json(organisation); // Return the found organisation
  } catch (error) {
    res.status(500).json({ error: "Error fetching organisation" });
  }
});

// Route to get all organisations
router.get("/", async (req, res) => {
  try {
    const organisations = await organisationModel.getAllOrganisations();
    res.status(200).json(organisations); // Return all organisations
  } catch (error) {
    res.status(500).json({ error: "Error fetching organisations" });
  }
});

// Route to delete an organisation by ID
router.delete("/:id", async (req, res) => {
  const organisationId = req.params.id; // Extract the ID from request params
  try {
    const deletedOrganisation = await organisationModel.deleteOrganisationById(
      organisationId
    );
    if (!deletedOrganisation) {
      return res.status(404).json({ message: "Organisation not found" }); // If no rows were deleted
    }
    res
      .status(200)
      .json({
        message: "Organisation deleted successfully",
        organisation: deletedOrganisation,
      });
  } catch (error) {
    res.status(500).json({ error: "Error deleting organisation" });
  }
});

module.exports = router;
