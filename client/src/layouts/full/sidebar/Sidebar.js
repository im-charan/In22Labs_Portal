
import { Stack, useMediaQuery, Box, Drawer, Typography } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Sidebar, Logo } from "react-mui-sidebar";
import logo from "../../../assets/images/logos/dark1-logo.svg";

const MSidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const sidebarWidth = "200px";

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

  const OrganizationName = "Techno Organization"; // Replace with actual organization name or prop

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* Sidebar for desktop */}
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
          {/* Sidebar Box */}
          <Box
            sx={{
              height: "100%",
              position: "relative", // Enable absolute positioning inside
            }}
          >
            <Sidebar
              width={"270px"}
              collapsewidth="80px"
              open={props.isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              {/* Organization Name at the Top */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "80px", // Adjust height as needed
                }}
              >
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
                  {OrganizationName}
                </Typography>
              </Box>

              {/* Sidebar Items */}
              <Box sx={{ height: "calc(100% - 150px)", overflowY: "auto" }}>
                <SidebarItems />
              </Box>

              {/* Logo at the Bottom */}
              <Box
                sx={{
                  position: "absolute", // Fix to bottom
                  bottom: 0, // Attach to the bottom edge
                  left: "50%", // Move to horizontal center
                  transform: "translateX(-50%)", // Adjust for centering
                  paddingBottom: "16px", // Add padding for spacing
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Logo img={logo} />
              </Box>
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80px", // Adjust height as needed
          }}
        >
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
            {OrganizationName}
          </Typography>
        </Box>

        {/* Sidebar Items */}
        <Box sx={{ height: "calc(100% - 150px)", overflowY: "auto" }}>
          <SidebarItems />
        </Box>

        {/* Logo at the Bottom */}
        <Box
          sx={{
            position: "absolute", // Fix to bottom
            bottom: 0, // Attach to the bottom edge
            left: "50%", // Move to horizontal center
            transform: "translateX(-50%)", // Adjust for centering
            paddingBottom: "16px", // Add padding for spacing
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Logo img={logo} />
        </Box>
      </Sidebar>
    </Drawer>
  );
};

export default MSidebar;
