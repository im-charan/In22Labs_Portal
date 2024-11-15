import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PageContainer from 'src/components/container/PageContainer';
import { Grid, Button } from "@mui/material";
import UserTable from "./users/userTable";
import { Box } from "@mui/system";

const ListUsers = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleCreateUserClick = () => {
    navigate('/admin/createuser'); // Navigate to the create user page
  };

  return (
    <PageContainer title='Users' description='hehehheh'>
      <Typography variant="h2">Admin / Users</Typography>
      <Box marginLeft={12} marginTop={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            {/* Create User Button outside and aligned to the top right */}
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button variant="contained" onClick={handleCreateUserClick}>Create User</Button>
            </Box>
            {/* User Table */}
            <UserTable />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ListUsers;
