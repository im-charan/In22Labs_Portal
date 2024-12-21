const multer = require("multer");
const pool = require("../config/database");

// Set up Multer memory storage for handling file uploads
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
}).single("logoFile");

// Validate input data
const validateOrganisationData = (organisation) => {
  if (!organisation.org_name || organisation.org_name.trim() === "") {
    throw new Error("Organisation name is required.");
  }
  if (organisation.org_name.trim().length > 50) {
    throw new Error("Organisation name cannot exceed 50 characters.");
  }
  if (!organisation.org_type || organisation.org_type.trim() === "") {
    throw new Error("Type of organisation is required.");
  }
  if (!organisation.org_address || organisation.org_address.trim().length < 10) {
    throw new Error("Address must be at least 10 characters long.");
  }

  if (organisation.org_logo && !isValidBase64Image(organisation.org_logo)) {
    throw new Error("Invalid logo image format.");
  }
  if (organisation.org_logo && organisation.org_logo.length > 500000) {
    throw new Error("Logo image is too large. Please upload a smaller image.");
  }
};

// Utility function to check if a string is a valid Base64 image
const isValidBase64Image = (base64String) => {
  const regex = /^data:image\/(jpeg|png|jpg);base64,/i;
  return regex.test(base64String);
};

const createOrganisation = async (organisation) => {
  try {
    validateOrganisationData(organisation);
    const result = await pool.query(
      `INSERT INTO in22labs.organizations 
          (org_name, org_type, org_address, org_status, poc_id, org_create, org_update, org_logo)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6) RETURNING *`,
      [
        organisation.org_name,
        organisation.org_type,
        organisation.org_address,
        1, // Active status
        null, // poc_id can be null
        organisation.org_logo,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating organisation:", error.message);
    throw new Error("Failed to create organisation");
  }
};

const getOrganisationIdbyUserName = async (userName) => {
  try {
    const result = await pool.query(`SELECT org_id FROM in22labs.users WHERE user_name = $1`, [userName]);
    return result.rows[0].org_id;
  } catch (error) {
    console.error('Error fetching organisationId:', error.message);
    throw new Error('Error fetching organisationID by user_name');
  }
};

const deleteOrganisationById = async (organisationId) => {
  if (!organisationId) throw new Error("Organisation ID is required.");
  try {
    const result = await pool.query(
      "DELETE FROM in22labs.organizations WHERE org_id = $1 RETURNING *",
      [organisationId]
    );
    if (result.rows.length === 0) throw new Error("Organisation not found.");
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting organisation:", error.message);
    throw new Error("Database error while deleting organisation.");
  }
};

const getOrganisationById = async (organisationId) => {
  if (!organisationId) throw new Error("Organisation ID is required.");
  try {
    const result = await pool.query(
      "SELECT * FROM in22labs.organizations WHERE org_id = $1",
      [organisationId]
    );
    if (result.rows.length === 0) throw new Error("Organisation not found.");
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching organisation:", error.message);
    throw new Error("Database error while fetching organisation.");
  }
};

const getAllOrganisations = async () => {
  try {
    const result = await pool.query("SELECT * FROM in22labs.organizations");
    return result.rows;
  } catch (error) {
    console.error("Error fetching organisations:", error.message);
    throw new Error("Database error while fetching organisations.");
  }
};

module.exports = {
  createOrganisation,
  deleteOrganisationById,
  getOrganisationById,
  getAllOrganisations,
  getOrganisationIdbyUserName,
};
