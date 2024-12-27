import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Card, Stack, Typography, ToggleButtonGroup, ToggleButton, Paper, CardHeader} from "@mui/material";
import {MDBCol} from 'mdb-react-ui-kit';
import { useRef } from "react";

// components
import PageContainer from "../../components/container/PageContainer";
//import Logo from "../../layouts/full/shared/logo/Logo";
import logo from "../../../assets/images/logos/dark1-logo.svg";  // Default logo for the sidebar footer

import AuthLogin from "./auth/AuthLogin";
import ReactLogo from "../../layouts/full/shared/logo/Logo";
import logindesign from '../authentication/login-design.svg';
// import amicodesign from '../../assets/images/backgrounds/Update-amico.svg';
import amicodesign from '../../assets/images/backgrounds/Stats-amico.svg';
import bg from './loginbg.svg'
import { useEffect } from "react";
import axios from 'axios';



const Login2 = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchApi = async() =>{
    const response = await axios.get(`${backendUrl}/api/user/1`);
    console.log(response.data);
  }

  useEffect(() => {
    fetchApi();
  })

  
  // Define alignment with a default value (e.g., 'left')
  const [alignment, setAlignment] = useState('centre');

  // Handler function to change alignment
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  

  return (
    <Paper>

    {/* <Box
      sx={{
        position: "relative",
        background: 'linear-gradient(to right, #dfe9f3 30%, white 50% , #c8d1da 90% )',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        backgroundImage: {bg},
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
          xs={2}  
          sm={5}  
          lg={6}
          display='flex'
          justifyContent="center"
          alignItems="center"
          item 
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
          {/* <Grid justifyContent='center' alignItems='center'>
            < Typography variant="h2">WELCOME TO SINGLE WINDOW PORTAL</Typography>
          </Grid> */}
          <Card
            elevation={10}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "400px", borderRadius: "55px", }}
            >
            <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 'auto',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mx: 'auto' }} />
              
              
            
            
            <AuthLogin
              subtitle={
                <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                  <Typography
                    component={Link}
                    to="/auth/register"
                    fontWeight="500"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                    >
                    Forgot Password?
                  </Typography>
                </Stack>
              }
              />
          </Card>
        </Grid>
      </Grid>
    </Box>
</Paper>
  );
};


export default Login2;