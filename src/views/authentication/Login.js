import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Card, Stack, Typography, ToggleButtonGroup, ToggleButton} from "@mui/material";
import {MDBCol} from 'mdb-react-ui-kit';
import { useRef } from "react";

// components
import PageContainer from "../../components/container/PageContainer";
import Logo from "../../layouts/full/shared/logo/Logo";
import AuthLogin from "./auth/AuthLogin";
import ReactLogo from "../../layouts/full/shared/logo/Logo";
import logindesign from '../authentication/login-design.svg';
import amicodesign from '../../assets/images/backgrounds/Update-amico.svg';




const Login2 = () => {


  
  // Define alignment with a default value (e.g., 'left')
  const [alignment, setAlignment] = useState('centre');

  // Handler function to change alignment
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  

  return (
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

      
      <Grid container sx={{ height: "100vh" }}>
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
          sm={7}
          lg={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "400px", borderRadius: "55px", }}
          >
            <Box
            component="img"
            src="/src/assets/images/logos/dark1-logo.svg"
            alt="Logo"
            sx={{
              width: 'auto',
              height: 100,
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
                    Forget Password?
                  </Typography>
                </Stack>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};


export default Login2;