import React from 'react';
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthRegister from './auth/AuthForgot';
import amicodesign from '../../assets/images/backgrounds/Stats-amico.svg';

import bg from './loginbg.svg'

const ForgetPassword2 = () => (
  <PageContainer title="Forgot password" description="this is Forgot Password page">
    {/* <Box
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
    > */}
    <Box item sx={{backgroundImage: `url(${bg})`, position: 'relative' , height: '100vh', backgroundSize: 'cover'}}>
    <Grid container sx={{ height: "100vh" }} flexDirection='row'>
        {/* <Grid item display='flex' marginBottom={-15}>
            < Typography variant="h2">WELCOME TO SINGLE WINDOW PORTAL</Typography>
          </Grid> */}
        <Grid
          item
          xs={2}  
          sm={5}  
          lg={6}
          display='flex'
          justifyContent="center"
          alignItems="center"
          >
          <img src={amicodesign} alt="Login Design" style={{ width: "70vh", height: "auto" }} />
          

        </Grid>
        <Grid
          container
          xs={12}
          sm={7}
          lg={6}
          justifyContent="center"
          alignItems="center"
          width='400px'
        >
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '400px', borderRadius: '55px' }}>
            <Box display="flex" alignItems="center" justifyContent="center">
            <Box
            component="img"
            src="/src/assets/images/logos/dark1-logo.svg"
            alt="Logo"
            sx={{
              width: 'auto',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mx: 'auto' }} />
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
