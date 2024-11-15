import React from "react"
import DashboardCard from '../../components/shared/DashboardCard';
import PageContainer from 'src/components/container/PageContainer';
import {  Link, Grid, List, Typography } from "@mui/material";
import UserDashboards from "./dashboards/UserDashboards";
import { Link as RouterLink } from "react-router-dom"; 
import { Box } from "@mui/system";
import BreadcrumbComponent from "../../components/shared/BreadCrumbComponent";
import AdminHeader from "./AdminHeader";






const ListDashboards = () => {
  return (<>
  
    <PageContainer title='Dashboards'>
    <AdminHeader/>
    
      <BreadcrumbComponent  
        pageTitle="Dashboards" 
        breadcrumbTitle1="Dashboard"
        breadcrumbRoute1="/dashboard"
         marginTop="70px"
        
      />

      <Box marginLeft={12} marginTop={5}>
        <Grid container spacing={3}>
          <Grid xl>
            <UserDashboards />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
    </>
  )
}
  
export default ListDashboards;