import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import Blog from './components/Blog';
// import MonthlyEarnings from './components/MonthlyEarnings';
import { useAuth } from '../authentication/auth/AuthProvider';

const Dashboard = () => {
  const {isAuthenticated} = useAuth();
  console.log(isAuthenticated);
  return (<>
    <PageContainer title="Dashboard" description="this is Dashboard">

      <Box>
        
        <Grid container spacing={3}>
          
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
    </>
  );
};

export default Dashboard;
