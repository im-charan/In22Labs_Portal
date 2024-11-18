import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate;
import { Box } from "@mui/material";
import PageContainer from 'src/components/container/PageContainer';
import { Grid, Button, Typography } from "@mui/material";

import { useParams } from "react-router-dom"; // Import useParams
import AdminHeader from "./AdminHeader";
import BreadcrumbComponent from "../../components/shared/BreadCrumbComponent";
import Organisationstable from "./organisation/Organisationstable";

const ListOrganisation = () => {
  const { organizationName } = useParams(); // Extract organisationName from URL params

  const navigate = useNavigate(); // Initialize navigate function

  const handleAddOrganisationClick = () => {
    navigate('/admin/addorganisation'); // Navigate to the create user page
  };

  return (
    <PageContainer title="Users" description="List of users for the selected organization">
        <AdminHeader/>
<BreadcrumbComponent  
        pageTitle="Organisations Table" 
        breadcrumbTitle1="Organisation"
        breadcrumbRoute1="/admin/organisation"
        marginTop="70px"
      />
      {/* Main content layout */}
      <Box marginLeft={12} marginTop={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            {/* Add organisation button */}
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button variant="contained" onClick={handleAddOrganisationClick}>Add Organisation</Button>
            </Box>
            {/* organisation table */}
           <Organisationstable/>
          </Grid>
        </Grid>
      </Box>

    </PageContainer>
  );
};

export default ListOrganisation;
