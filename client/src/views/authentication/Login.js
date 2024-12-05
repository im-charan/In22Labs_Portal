import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Box,
  Card,
  Stack,
  Typography,
  Paper,
} from "@mui/material";

// components
import AuthLogin from "./auth/AuthLogin";
import logindesign from "../authentication/login-design.svg";
import amicodesign from "../../assets/images/backgrounds/Stats-amico.svg";
import bg from "./loginbg.svg";

const Login2 = () => {
  // Define alignment with a default value (e.g., 'center')
  const [alignment, setAlignment] = useState("centre");

  // Handler function to change alignment
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Paper>
      <Box
        item
        sx={{
          backgroundImage: `url(${bg})`,
          position: "relative",
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <Grid container sx={{ height: "100vh" }} flexDirection="row">
          <Grid
            item
            xs={12}
            sm={5}
            lg={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={amicodesign}
              alt="Login Design"
              style={{ width: "70vh", height: "auto" }}
            />
          </Grid>

          <Grid
            container
            item
            xs={12}
            sm={7}
            lg={6}
            justifyContent="center"
            alignItems="center"
            width="400px"
          >
            <Card
              elevation={10}
              sx={{
                p: 4,
                zIndex: 1,
                width: "100%",
                maxWidth: "400px",
                borderRadius: "55px",
              }}
            >
              <Box
                component="img"
                src="/src/assets/images/logos/dark1-logo.svg"
                alt="Logo"
                sx={{
                  width: "auto",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mx: "auto",
                }}
              />
              <AuthLogin
                subtitle={
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  >
                    <Typography
                      component={Link}
                      to="/auth/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
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
    </Paper>
  );
};

export default Login2;