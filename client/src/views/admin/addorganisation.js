import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, Alert } from "@mui/material";
import BreadcrumbComponent from '../../components/shared/BreadCrumbComponent';
import AdminHeader from './AdminHeader';

const AddOrganisation = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [statusMessage, setStatusMessage] = useState(null); // For success or error message
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage(null); // Reset status message
    setIsSubmitting(true);

    const newOrganisation = {
      org_name: organizationName,
      org_type: type,
      org_address: address,
      org_status: 1, // Default status
    };

    try {
      const response = await fetch('http://localhost:5000/api/organisation/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrganisation),
      });

      if (!response.ok) {
        throw new Error('Failed to create organisation');
      }

      const result = await response.json();
      console.log('Organisation created:', result);
      setStatusMessage({ type: 'success', text: 'Organisation successfully created!' });
    } catch (error) {
      console.error('Error creating organisation:', error.message);
      setStatusMessage({ type: 'error', text: 'Error creating organisation. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <BreadcrumbComponent
        pageTitle="Add Organisation"
        breadcrumbTitle1="Organisation"
        breadcrumbRoute1="/admin/organisation"
        breadcrumbTitle2="Add Organisation"
        breadcrumbRoute2="/admin/addorganisation"
        marginTop="70px"
      />
      <Box
        margin={5}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        height="100vh"
        padding={2}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          padding={3}
          boxShadow={3}
          borderRadius={2}
          width="600px"
          display="flex"
          flexDirection="column"
          gap={3}
          border={2}
          borderColor="primary.main"
        >
          <Typography variant="h4" textAlign="center" marginBottom={2}>
            Add Organisation
          </Typography>

          {/* Organisation Name */}
          <TextField
            label="Organisation Name"
            variant="outlined"
            fullWidth
            required
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />

          {/* Type of Organisation */}
          <TextField
            label="Type of Organisation"
            variant="outlined"
            fullWidth
            select
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="Agriculture">Agriculture</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Retail">Retail</MenuItem>
          </TextField>

          {/* Address */}
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            multiline
            rows={4}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>

          {/* Status Message */}
          {statusMessage && (
            <Alert severity={statusMessage.type} sx={{ marginTop: 2 }}>
              {statusMessage.text}
            </Alert>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AddOrganisation;
