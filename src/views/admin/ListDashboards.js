import React from "react"
import DashboardCard from '../../components/shared/DashboardCard';
import PageContainer from 'src/components/container/PageContainer';
import { Grid, List, Typography } from "@mui/material";
import UserDashboards from "./dashboards/UserDashboards";
import { Box } from "@mui/system";

const ListDashboards = () => {
  return (
    <PageContainer title='Dashboards'>
      <Typography variant="h2">Admin / Dashboards</Typography>
      <Box marginLeft={12} marginTop={5}>
        <Grid container spacing={3}>
          <Grid xl>
            <UserDashboards />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default ListDashboards;