import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Typography,
  Drawer,
  List,
} from "@mui/material";
import PropTypes from "prop-types";
import { IconMenu } from "@tabler/icons-react";
import { useUser } from "src/views/authentication/auth/UserContext";
import ProfileImg from "src/assets/images/profile/user-1.jpg";
import Logo from "../../assets/images/logos/dark1-logo.svg"; // Import the logo here
import { useLocation } from "react-router";
import { uniqueId } from "lodash";
import AdminMenuitems from "../../layouts/admin/sidebar/AdminMenuItems";
import NavItem from "../../layouts/admin/sidebar/NavItem/index";
import NavGroup from "../../layouts/admin/sidebar/NavGroup/NavGroup";
import { IconLogout } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material"; // Import useMediaQuery

const AdminHeader = () => {
  const [adminName, setAdminName] = useState("Admin");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { user } = useUser();
  const userId = user?.user_id;
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Media query for detecting desktop screens (>= 960px)
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    if (!userId) {
      console.error("User ID not available");
      return;
    }

    const fetchAdminName = async () => {
      try {
        const response = await fetch(
         ` ${backendUrl}/api/user/${userId}`
        );
        if (!response.ok) {
          throw new Error(
           ` API error: ${response.status} - ${response.statusText}`
          );
        }
        const result = await response.json();
        if (result.user_fullname) {
          setAdminName(result.user_fullname);
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

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  // Close the sidebar on desktop and reset drawer state
  useEffect(() => {
    if (isDesktop) {
      setDrawerOpen(false); // Close the drawer on desktop
    }
  }, [isDesktop]);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    justifyContent: "center",
    height: 50,
    position: "fixed",
    zIndex: theme.zIndex.appBar,
    borderBottom: "2px solid rgba(74, 118, 211, 0.2)",
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // Aligns the content to the left and right
  }));

  const logoutItem = {
    id: uniqueId(),
    title: "Logout",
    icon: IconLogout,
    href: "/auth/login",
  };

  return (
    <>
      <AppBarStyled position="sticky" color="default">
        <ToolbarStyled>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start", // Ensures the logo is left-aligned
            }}
          >
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{
                display: {
                  xs: "inline", // Visible on small screens
                  lg: "none", // Hidden on larger screens
                },
              }}
            >
              <IconMenu width="20" height="20" />
            </IconButton>
            {/* <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginLeft: {lg:"250px",isDrawerOpen ? "250px" : "16px",}, // Adjust margin based on sidebar state
                transition: "margin-left 0.3s ease", // Smooth transition when toggling sidebar
              }}
            >
              Single Window Portal
            </Typography> */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginLeft: {
                  lg: "260px", // Apply 250px margin for large screens
                  xs: isDrawerOpen ? "250px" : "16px", // Apply 250px for small screens if drawer is open, else 16px
                },
                transition: "margin-left 0.3s ease", // Smooth transition when toggling sidebar
              }}
            >
              Single Window Portal
            </Typography>
          </Box>

          {/* Profile Section */}
          <Stack spacing={1} direction="row" alignItems="center">
            <Box
              sx={{
                background: "#ffffff",
                color: "#5d87ff",
                padding: "4px 10px",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: "bold",
                marginRight: "8px",
              }}
            >
              Hi, {adminName}
            </Box>
            <img
              src={ProfileImg}
              alt="Admin Logo"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </Stack>
        </ToolbarStyled>
      </AppBarStyled>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": { width: "250px", boxSizing: "border-box" },
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px 0",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "120px", height: "auto" }}
          />
        </Box>
        <Box sx={{ px: 3 }}>
          <List sx={{ pt: 0 }} className="sidebarNav">
            {AdminMenuitems.map((item) => {
              if (item.subheader) {
                return <NavGroup item={item} key={item.subheader} />;
              } else {
                return (
                  <NavItem item={item} key={item.id} pathDirect={pathDirect} />
                );
              }
            })}
          </List>
        </Box>
        {/* <Box sx={{ px: 3 }}>
          <NavItem
            item={logoutItem}
            key={logoutItem.id}
            pathDirect={pathDirect}
          /> */}
        {/* </Box> */}
      </Drawer>
    </>
  );
};

AdminHeader.propTypes = {
  sx: PropTypes.object,
};

export default AdminHeader;