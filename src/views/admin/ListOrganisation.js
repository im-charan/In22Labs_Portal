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
    <PageContainer
      title="Users"
      description="List of users for the selected organization"
    >
      <AdminHeader />
      <BreadcrumbComponent
        pageTitle="Organisations Table"
        breadcrumbTitle1="Organisation"
        breadcrumbRoute1="/admin/organisation"
        marginTop="70px"
      />
      {/* Main content layout */}
      <Box marginLeft={1} marginTop={1} marginRight={-5}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Box position="relative" mb={2}>
              {/* Add organisation button */}
              <Box position="absolute" bottom={-10} left={90} mb={2}>
                <Button
                  variant="contained"
                  onClick={handleAddOrganisationClick}
                >
                  Add Organisation +
                </Button>
              </Box>
            </Box>
            {/* organisation table */}
            <Organisationstable />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ListOrganisation;
