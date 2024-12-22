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

// Create a new organisation
const createOrganisation = async (organisation) => {
  if (
    !organisation.org_name ||
    !organisation.org_type ||
    !organisation.org_address 
  ) {
    throw new Error(
      "Missing required fields: org_name, org_type, org_address, or poc_id"
    );
  }

  try {
    // Insert the organization into the database
    const result = await pool.query(
      `INSERT INTO in22labs.organizations (
         org_name, org_type, org_address, org_status, poc_id, dash_count, org_create, org_update
       ) VALUES (
         $1, $2, $3, $4, $5, $6, NOW(), NOW()
       ) RETURNING org_id`,
      [
        organisation.org_name,
        organisation.org_type,
        organisation.org_address,
        organisation.org_status || 1, // Default org_status to 1 if not provided
        organisation.poc_id,          // Foreign key to users table
        organisation.dash_count || 0, // Default dash_count to 0
      ]
    );

    const orgId = result.rows[0].org_id;

    console.log(
      "Inserted organisation:",
      organisation.org_name,
      organisation.org_type,
      organisation.org_address,
      organisation.org_status,
      organisation.poc_id
    );

    // Return the created organisation
    const updatedOrgResult = await pool.query(
      `SELECT * FROM in22labs.organizations WHERE org_id = $1`,
      [orgId]
    );

    return updatedOrgResult.rows[0];
  } catch (error) {
    console.error("Error creating organisation:", error.message);
    throw new Error("Error creating organisation in the database");
  }
};

// Delete an organisation by ID
const deleteOrganisationById = async (organisationId) => {
  if (!organisationId) throw new Error("Organisation ID is required.");
  try {
    const result = await pool.query(
      `DELETE FROM in22labs.organizations WHERE org_id = $1 RETURNING *`,
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
      `SELECT o.*, 
              u.user_id AS poc_id
       FROM in22labs.organizations o
       LEFT JOIN in22labs.users u ON u.user_id = o.poc_id
       WHERE o.org_id = $1`,
      [organisationId]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching organisation:", error.message);
    throw new Error("Database error while fetching organisation.");
  }
};

// Get all organisations in LIFO order (newest first)
const getAllOrganisations = async () => {
  try {
    const result = await pool.query(
      `SELECT o.*, 
              u.user_id AS poc_id
       FROM in22labs.organizations o
       LEFT JOIN in22labs.users u ON u.user_id = o.poc_id
       ORDER BY o.org_create DESC` // Order by org_create in descending order for LIFO
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching organisations:", error.message);
    throw new Error("Database error while fetching organisations.");
  }
};

const getOrganisationIdbyUserName = async (userName) => {
  try{
    const result = await pool.query(`SELECT org_id FROM in22labs.users WHERE user_name = $1`, [userName]);
    return result.rows[0].org_id;
  }
  catch(error){
    console.error('Error fetching organisationId:', error);
    throw new Error('Error fetching organisationID by user_name');
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
