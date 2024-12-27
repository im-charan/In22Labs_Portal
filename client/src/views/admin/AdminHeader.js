import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { IconMenu } from "@tabler/icons-react";
import { useUser } from "src/views/authentication/auth/UserContext";
import ProfileImg from "src/assets/images/profile/user-1.jpg"; // Importing profile image

const AdminHeader = (props) => {
  const [adminName, setAdminName] = useState("Admin"); // Default to "Admin"
  const { user } = useUser(); // Access user data from context
  const userId = user?.user_id; // Get userId from context
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    if (!userId) {
      console.error("User ID not available");
      return;
    }

    const fetchAdminName = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/api/user/${userId}`
        );

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} - ${response.statusText}`
          );
        }

        const result = await response.json();
        console.log("API Response:", result);

        if (result.user_name) {
          setAdminName(result.user_name); // Update admin name from response
        } else {
          console.error(
            "Invalid response: 'user_name' not found in API response"
          );
        }
      } catch (error) {
        console.error("Error fetching admin name:", error.message);
      }
    };

    fetchAdminName();
  }, [userId]);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Adding a subtle shadow
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    height: 50, // Adjust height for your needs
    position: "fixed", // Fixed at the top of the page
    left: 0,
    right: 0, // Ensure it spans the full width
    zIndex: theme.zIndex.appBar, // Make sure it's on top of other content
    borderBottom: "2px solid rgba(74, 118, 211, 0.2)", // Border at the bottom
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
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

        {/* Portal Heading */}
        <Typography
          variant="h3"
          component="div"
          sx={{ marginLeft: 33, fontWeight: "bold" }}
        >
          Single Window Portal
        </Typography>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* Admin Greeting */}
          <Box
            sx={{
              background: "#ffffff",
              color: "#5d87ff",
              padding: "4px 10px",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              marginRight: "8px", // Adjusts space between message and avatar
            }}
          >
            Hi, {adminName}
          </Box>

          {/* Profile Image */}
          <img
            src={ProfileImg}
            alt="Admin Logo"
            style={{
              width: "40px", // Adjust width as needed
              height: "40px", // Adjust height as needed
              borderRadius: "50%", // Makes it circular
              pointerEvents: "none", // Disables click events
            }}
          />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

AdminHeader.propTypes = {
  sx: PropTypes.object,
};

export default AdminHeader;
