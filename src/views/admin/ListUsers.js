import React from "react"
import PageContainer from 'src/components/container/PageContainer';
import { Grid, Typography } from "@mui/material";
import UserTable from "./users/userTable";
import { Box } from "@mui/system";

const ListUsers = () => {
  return (
    <PageContainer title='Users' description='hehehheh'>
      <Box marginLeft={12} marginTop={5}>
        <Grid container spacing={3}>
          <Grid xl>
            <UserTable />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>

    // <PageContainer title="Dashboard" description="this is Dashboard">
    //   <Box>
    //     <Grid container spacing={3}>
    //       <Grid item xs={12} lg={12}>
    //         <SalesOverview />
    //       </Grid>
    //       <Grid item xs={12} lg={4}>
    //         <Grid container spacing={3}>
    //           <Grid item xs={12}>
    //             <YearlyBreakup />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <MonthlyEarnings />
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //       <Grid item xs={12} lg={4}>
    //         <RecentTransactions />
    //       </Grid>
    //       <Grid item xs={12} lg={8}>
    //         <ProductPerformance />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <Blog />
    //       </Grid>
    //     </Grid>
    //   </Box>
    // </PageContainer>
  )
}

export default ListUsers;