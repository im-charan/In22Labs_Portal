import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate;
import { Box, Grid, Button, Typography } from "@mui/material";
import PageContainer from 'src/components/container/PageContainer';
import UserTable from "./users/userTable";
import { useParams } from "react-router-dom"; // Import useParams

import BreadcrumbComponent from "../../components/shared/BreadCrumbComponent";
import AdminHeader from "./AdminHeader";

const ListUsers = () => {
  const { organizationName } = useParams(); // Extract organisationName from URL params

  const navigate = useNavigate(); // Initialize navigate function

  const handleCreateUserClick = () => {
    navigate('/admin/createuser'); // Navigate to the create user page
  };

  return (
    <PageContainer title="Users" description="List of users for the selected organization">
      <AdminHeader />
      
      {/* Breadcrumb and Create User Button */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3} // Adds spacing below
      >
        {/* Breadcrumb Component */}
        <BreadcrumbComponent  
          pageTitle="User Table" 
          breadcrumbTitle1="User"
          breadcrumbRoute1="/admin/users"
          marginTop="70px"
        />
        {/* Create User Button */}
        <Button variant="contained" onClick={handleCreateUserClick}>
          Create User
        </Button>
      </Box>

      {/* Main content layout */}
      <Box marginLeft={'3px'} marginTop={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            {/* User Table */}
            <UserTable />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ListUsers;
