import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";

// components
import Profile from "./Profile";
import { IconMenu } from "@tabler/icons-react";

const userName = "Abdul";
const OrganizationName = "Tech Innovations";

// Assume a default sidebar width
const SIDEBAR_WIDTH = 240;

const Header = (props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // Adding a subtle shadow
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    height: 50,
    borderBottom: "2px solid rgba(74, 118, 211, 0.2)", // 50% opacity
    transition: "margin-left 0.3s ease", // Smooth transition for sidebar toggle
    marginLeft: props.isSidebarOpen ? `${SIDEBAR_WIDTH}px` : "0px", // Adjust based on sidebar state
    width: props.isSidebarOpen ? `calc(100% - ${SIDEBAR_WIDTH}px)` : "100%", // Dynamically reduce width
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }));

  return (
    <AppBarStyled position="fixed" color="default">
      <ToolbarStyled>
        {/* Left-side IconButton */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: "fit-content",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={props.toggleMobileSidebar}
            sx={{
              display: {
                lg: "none",
                xs: "inline",
              },
            }}
          >
            <IconMenu width="20" height="20" />
          </IconButton>

          {/* <Typography
           //variant={isSmallScreen ? "h6" :"h4"}
           variant="h5"
            sx={{
              marginLeft: 35, 
              fontWeight: "bold",
              
              whiteSpace: "nowrap", // Prevent text wrapping
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Single Window Portal
          </Typography> */}
          <Typography
            variant="h5"
            sx={{
              position: "absolute", // Position the text absolutely within the header
              marginLeft: 45, // Center horizontally
              transform: "translateX(-50%)", // Adjust for perfect centering
              fontWeight: "bold",
              whiteSpace: "nowrap", // Prevent text wrapping
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Single Window Portal
          </Typography>
        </Box>

        {/* Right-side User Info and Profile */}
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{
            minWidth: "fit-content",
          }}
        >
          <Box
            sx={{
              background: "#ffffff",
              color: "#5d87ff",
              padding: "4px 10px",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              whiteSpace: "nowrap",
            }}
          >
            Hi, {userName}
          </Box>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  isSidebarOpen: PropTypes.bool.isRequired, // Pass a boolean to control sidebar state
};

export default Header;
