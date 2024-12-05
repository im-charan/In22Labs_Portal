import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from "@mui/material";
import BreadcrumbComponent from "../../../components/shared/BreadCrumbComponent";
import AdminHeader from "../AdminHeader";

const AddDashboard = () => {
  const [dashboardName, setDashboardName] = useState('');
  const [powerBIUrl, setPowerBIUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic (e.g., save to database, make API call)
    console.log({ dashboardName, powerBIUrl });
  };

  return (
    <>
      <AdminHeader />
      <BreadcrumbComponent pageTitle="Add Dashboard"
        breadcrumbTitle1="Dashboard"
        breadcrumbRoute1="/admin/organisation"
        breadcrumbTitle2="Add Dashboard"
        breadcrumbRoute2="/admin/adddashboard"
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
            Add Dashboard
          </Typography>

          {/* Dashboard Name */}
          <TextField
            label="Dashboard Name"
            variant="outlined"
            fullWidth
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
          />

          {/* PowerBI URL */}
          <TextField
            label="PowerBI URL"
            variant="outlined"
            fullWidth
            value={powerBIUrl}
            onChange={(e) => setPowerBIUrl(e.target.value)}
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

export default AddDashboard;
