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
import { useUser } from "src/views/authentication/auth/UserContext";

// Assume a default sidebar width
const SIDEBAR_WIDTH = 340;

const Header = (props) => {
  const theme = useTheme();

  // Use MUI's useMediaQuery hook to detect screen sizes
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // For small screens (<600px)
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md")); // For medium screens (600px - 960px)
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md")); // For large screens (>960px)

  // Access user context and safely get userName
  const { user } = useUser();
  const userName = user?.user_name || "Guest"; // Default to 'Guest' if userName is undefined

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // Adding a subtle shadow
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    height: 50,
    borderBottom: "2px solid rgba(74, 118, 211, 0.2)", // 50% opacity
    transition: "margin-left 0.3s ease", // Smooth transition for sidebar toggle
    marginLeft: isSmallScreen
      ? "0px" // No margin on small screens
      : props.isSidebarOpen
      ? `${SIDEBAR_WIDTH}px` // If sidebar is open, apply margin on medium/large screens
      : "0px", // No margin when sidebar is closed on medium/large screens
    width: isSmallScreen
      ? "100%" // Full width for small screens
      : props.isSidebarOpen
      ? `calc(100% - ${SIDEBAR_WIDTH}px)` // Adjust width based on sidebar state on medium/large screens
      : "100%", // Full width when sidebar is closed on medium/large screens
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
                xs: "inline", // Show on small screens
              },
            }}
          >
            <IconMenu width="20" height="20" />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              marginLeft: isSmallScreen
                ? "1rem" // Less margin for small screens
                : isMediumScreen
                ? "2rem" // More margin for medium screens
                : isLargeScreen
                ? "16rem" // Even more margin for large screens
                : "15rem", // Default margin for large screens
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
