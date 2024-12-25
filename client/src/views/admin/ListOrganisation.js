import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Button } from "@mui/material";
import PageContainer from 'src/components/container/PageContainer';
import AdminHeader from "./AdminHeader";
import BreadcrumbComponent from "../../components/shared/BreadCrumbComponent";
import Organisationstable from "./organisation/Organisationstable";

const ListOrganisation = () => {
  const navigate = useNavigate();

  const handleAddOrganisationClick = () => {
    navigate('/admin/addorganisation');
  };

  return (
    <PageContainer
      title="Organisations"
      description="List of organisations"
    >
      <AdminHeader />
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={5} mb={2}>
        <BreadcrumbComponent
          pageTitle="Organisations Table"
         
          marginTop="0"
        />
        <Button
          variant="contained"
          onClick={handleAddOrganisationClick}
        >
          Add Organisation +
        </Button>
      </Box>
      {/* Main content layout */}
      <Box marginLeft={1} marginTop={1} marginRight={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Organisationstable />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ListOrganisation;
