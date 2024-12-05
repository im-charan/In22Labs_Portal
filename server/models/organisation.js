const pool = require('../config/database');

// Create a new organisation
const createOrganisation = async (organisation) => {
  // Validate the organisation data before proceeding
  if (!organisation.org_name || !organisation.org_type || !organisation.org_address || !organisation.org_status) {
    throw new Error('Missing required fields: org_name, org_type, org_address, or org_status');
  }

  try {
    // If poc_id is provided, add it to the insert query; otherwise, it will be NULL
    const result = await pool.query(
      `INSERT INTO in22labs.organizations (org_name, org_type, org_address, org_status, poc_id, org_create, org_update)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`,
      [
        organisation.org_name,  // org_name
        organisation.org_type,  // org_type
        organisation.org_address,  // org_address
        organisation.org_status,  // org_status
        organisation.poc_id || null  // poc_id is optional, default to NULL if not provided
      ]
    );
    console.log('Inserting values:', organisation.org_name, organisation.org_type, organisation.org_address, organisation.org_status, organisation.poc_id);

    return result.rows[0];  // Return the newly created organisation
  } catch (error) {
    console.error('Error creating organisation:', error.message);
    throw new Error('Error creating organisation in the database');
  }
};

// Get an organisation by ID
const getOrganisationById = async (organisationId) => {
  try {
    const result = await pool.query('SELECT * FROM in22labs.organizations WHERE org_id = $1', [organisationId]);
    return result.rows[0];  // Return the organisation
  } catch (error) {
    console.error('Error fetching organisation:', error);
    throw new Error('Error fetching organisation by ID');
  }
};

// Get all organisations
const getAllOrganisations = async () => {
  try {
    const result = await pool.query('SELECT * FROM in22labs.organizations');
    return result.rows;  // Return all organisations
  } catch (error) {
    console.error('Error fetching organisations:', error);
    throw new Error('Error fetching organisations');
  }
};

module.exports = {
  createOrganisation,
  getOrganisationById,
  getAllOrganisations,
};
