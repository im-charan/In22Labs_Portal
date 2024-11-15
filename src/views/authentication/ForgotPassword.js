import React from 'react';
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthRegister from './auth/AuthForgot';
import amicodesign from '../../assets/images/backgrounds/Update-amico.svg';

const ForgetPassword2 = () => (
  <PageContainer title="Forgot password" description="this is Forgot Password page">
    <Box
      sx={{
        position: "relative",
        background: 'linear-gradient(to right, #dfe9f3 30%, white 50% , #c8d1da 90% )',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        "&:before": {
          content: '""',
          background: 'linear-gradient(to right, #dfe9f3 30%, white 100%)',
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.3",
        },
      }}
    >
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
      <Grid
          item
          xs={0}  
          sm={5}  
          lg={6}  
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img src={amicodesign} alt="Login Design" style={{ width: "70%", height: "auto" }} />
          

        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px', borderRadius: '55px' }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>
            <AuthRegister
              // subtext={
              //   <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
              //     Your Social Campaigns
              //   </Typography>
              // }
              // subtitle={
              //   <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
              //     {/* <Typography color="textSecondary" variant="h6" fontWeight="400">
              //       Already have an Account?
              //     </Typography> */}
              //     <Typography 
              //       component={Link}
              //       to="/auth/login"
              //       fontWeight="500"
              //       sx={{
              //         textDecoration: 'none',
              //         color: 'primary.main',
              //       }}
              //     >
              //       Sign In
              //     </Typography>
              //   </Stack>
              // }
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default ForgetPassword2;
