import React from "react"
import DashboardCard from '../../components/shared/DashboardCard';
import PageContainer from 'src/components/container/PageContainer';
import { List, Typography } from "@mui/material";

const ListDashboards = () => {
  return (
    <PageContainer title='Dashboards'>
      <DashboardCard title='Dashboards' description='hehehhe'>
        <Typography>List all the dashboards here</Typography>
      </DashboardCard>
    </PageContainer>
  )
}

export default ListDashboards;