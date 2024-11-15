import React from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from 'src/components/container/PageContainer';
import UserTable from "./users/userTable"; // Assuming this is the user table component
import { useParams } from "react-router-dom";
import BreadcrumbComponent from "../../components/shared/BreadCrumbComponent";
import AdminHeader from "./AdminHeader";

const ListUsers = () => {
  const { organizationName } = useParams(); // Extract organisationName from URL params

  return (
    <PageContainer title="Users" description="List of users for the selected organization">
        <AdminHeader/>
<BreadcrumbComponent  
        pageTitle="User Table" 
        breadcrumbTitle1="User"
        breadcrumbRoute1="admin/users"
        breadcrumbTitle2={organizationName}
        breadcrumbRoute2={`/admin/users/${organizationName}`}
        marginTop="70px"
      />
      {/* Main content layout */}
      <Box marginLeft={12} marginTop={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <UserTable /> {/* Display the user table */}
          </Grid>
        </Grid>
      </Box>

    </PageContainer>
  );
};

export default ListUsers;
