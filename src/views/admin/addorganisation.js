import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import BreadcrumbComponent from '../../components/shared/BreadCrumbComponent';
import AdminHeader from './AdminHeader';

const AddOrganisation = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [type, setType] = useState(''); // Type of organisation
  const [address, setAddress] = useState(''); // Address

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log({ organizationName, type, address });
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
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />

          {/* Type of Organisation */}
          <TextField
            label="Type of Organisation"
            variant="outlined"
            fullWidth
            select
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* Submit Button */}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddOrganisation;
