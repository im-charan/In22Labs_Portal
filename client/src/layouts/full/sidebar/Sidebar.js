import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Stack, useMediaQuery, Box, Drawer, Typography, CircularProgress } from "@mui/material"; // Import CircularProgress
import SidebarItems from "./SidebarItems";
import { Sidebar, Logo } from "react-mui-sidebar";
import logo from "../../../assets/images/logos/dark1-logo.svg";  // Default logo for the sidebar footer
import { useUser } from "src/views/authentication/auth/UserContext"; // Assuming you have this context

const MSidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const sidebarWidth = "200px";

  const { user } = useUser(); // Access user data from context
  const userId = user?.user_id;
  const [organizationName, setOrganizationName] = useState("");
  const [organizationLogo, setOrganizationLogo] = useState("");

  // Fetch user data and organization name based on userId
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/client/user/${userId}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setOrganizationName(data.data.organization_name); // Name
          setOrganizationLogo(data.data.organization_logo); // Logo
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData(); // Fetch user data when userId is available
    }
  }, [userId]);

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#eff2f7",
      borderRadius: "15px",
    },
  };

  // Logo styling for both views
  const logoStyles = {
    width: "50px",
    height: "50px",
    objectFit: "contain",
    marginBottom: "8px",
  };

  // Sidebar for desktop
  if (lgUp) {
    return (
      <Box sx={{ width: sidebarWidth, flexShrink: 0 }}>
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: "border-box",
              ...scrollbarStyles,
            },
          }}
        >
          <Box sx={{ height: "100%", position: "relative" }}>
            <Sidebar
              width={"270px"}
              collapsewidth="80px"
              open={props.isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              {/* Logo and Organization Name at the Top */}
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100px" }}>
                {/* Logo */}
                {organizationLogo ? (
                  <img
                    src={`http://localhost:5000/uploads/${organizationLogo}`}
                    alt={`${organizationName} logo`}
                    style={logoStyles}
                  />
                ) : (
                  <CircularProgress size={50} />
                )}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#D3D3D3",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {organizationName || "Loading..."} {/* Display the organization name */}
                </Typography>
              </Box>

              {/* Sidebar Items */}
              <Box sx={{ height: "calc(100% - 150px)", overflowY: "auto" }}>
                <SidebarItems />
              </Box>

              {/* Logo at the Bottom */}
              <Box sx={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", paddingBottom: "16px", display: "flex", justifyContent: "center" }}>
                <Logo img={logo} />
              </Box>
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  // Sidebar for mobile
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      <Sidebar
        width={"270px"}
        collapsewidth="80px"
        isCollapse={false}
        mode="light"
        direction="ltr"
        themeColor="#5d87ff"
        themeSecondaryColor="#49beff"
        showProfile={false}
      >
        {/* Organization Name at the Top */}
        <Box sx={{ display: "flex", flexDirection: "column",justifyContent: "center", alignItems: "center", height: "90px" }}>
          {/* Mobile Logo */}
          {organizationLogo ? (
            <img
              src={`http://localhost:5000/uploads/${organizationLogo}`}
              alt={`${organizationName} logo`}
              style={logoStyles}
            />
          ) : (
            <CircularProgress size={50} />
          )}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "#D3D3D3",
            }}
          >
            {organizationName || "Loading..."} {/* Display the organization name */}
          </Typography>
        </Box>

        {/* Sidebar Items */}
        <Box sx={{ height: "calc(100% - 150px)", overflowY: "auto" }}>
          <SidebarItems />
        </Box>

        {/* Logo at the Bottom */}
        <Box sx={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", paddingBottom: "16px", display: "flex", justifyContent: "center" }}>
          <Logo img={logo} />
        </Box>
      </Sidebar>
    </Drawer>
  );
};

export default MSidebar;
