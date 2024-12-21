const pool = require("../config/database");

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
  if (
    !organisation.org_address ||
    organisation.org_address.trim().length < 10
  ) {
    throw new Error("Address must be at least 10 characters long.");
  }
};

const createOrganisation = async (organisation,org_logo) => {
  validateOrganisationData(organisation); // Validate data before proceeding

  try {
    const result = await pool.query(
      `INSERT INTO in22labs.organizations (org_name, org_type, org_address, org_status, poc_id, org_create, org_update, org_logo)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6) RETURNING *`,
      [
        organisation.org_name.trim(),
        organisation.org_type.trim(),
        organisation.org_address.trim(),
        organisation.org_status || 1,
        organisation.poc_id || null,
        org_logo, // Pass the logoPath here
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating organisation:", error.message);
    throw new Error("Database error while creating organisation.");
  }
};

const getOrganisationIdbyUserName = async (userName) =>{
  try{
    const result = await pool.query(`SELECT org_id FROM in22labs.users WHERE user_name = $1`, [userName]);
    return result.rows[0].org_id;
  }
  catch(error){
    console.error('Error fetching organisationId:', error);
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

// Get organisation by ID
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

// Get all organisations
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
  deleteOrganisationById,
  getOrganisationIdbyUserName
};
