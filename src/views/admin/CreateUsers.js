import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from "@mui/material";

const CreateUser = () => {
  const [organisationName, setOrganisationName] = useState('');
  const [pocName, setPocName] = useState(''); // Added state for POC Name
  const [contactNumber, setContactNumber] = useState('');
  const [emailId, setEmailId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ organisationName, pocName, contactNumber, emailId });
  };

  return (
    <Box
      margin={5}
      display="flex"
      justifyContent="center" // Centers horizontally
      alignItems="flex-start" // Aligns content to the top
      height="100vh" // Full viewport height
      padding={2}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        padding={3}
        boxShadow={3}
        borderRadius={2}
        width="600px" // Increased width
        display="flex"
        flexDirection="column"
        gap={3}
        border={2} // Bolder border
        borderColor="primary.main" // Border color
      >
        <Typography variant="h4" textAlign="center" marginBottom={2}>
          Create User
        </Typography>

        {/* Organisation Name */}
        <TextField
          label="Organisation Name"
          variant="outlined"
          fullWidth
          value={organisationName}
          onChange={(e) => setOrganisationName(e.target.value)}
        />

        {/* POC Name */}
        <TextField
          label="POC Name"
          variant="outlined"
          fullWidth
          value={pocName}
          onChange={(e) => setPocName(e.target.value)}
        />

        {/* Contact Number */}
        <TextField
          label="Contact Number"
          variant="outlined"
          fullWidth
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />

        {/* Email ID */}
        <TextField
          label="Email ID"
          variant="outlined"
          fullWidth
          type="email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CreateUser;