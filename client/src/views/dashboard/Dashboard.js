import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';


// import MonthlyEarnings from './components/MonthlyEarnings';
import { useAuth } from '../authentication/auth/AuthProvider';
import UserDashboards from '../admin/dashboards/UserDashboards';
import ListDashboards from './ListDashboards';

const Dashboard = () => {
  const {isAuthenticated} = useAuth();
  console.log(isAuthenticated);
  return (<>
    <PageContainer title="Dashboard" description="this is Dashboard">

      <Box>
        
        <Grid container spacing={3}>
          
          <Grid item xs={12} marginTop={3}>
            <ListDashboards />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
    </>
  );
};

export default Dashboard;
