import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";

// Components
import { IconMenu } from "@tabler/icons-react";

const AdminHeader = (props) => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Adding a subtle shadow
    backdropFilter: "blur(4px)",
    height: 60, // Adjust height for your needs
    position: "fixed", // Fixed at the top of the page
    top: 0,
    left: 0,
    right: 0, // Ensure it spans the full width
    width: "100%",
    zIndex: theme.zIndex.appBar, // Make sure it's on top of other content
    borderBottom: "2px solid rgba(74, 118, 211, 0.2)", // Border at the bottom
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "space-between", // Space out the items
    alignItems: "center",
    padding: "0 16px", // Padding inside the toolbar
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
        {/* Add more elements as needed */}
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* You can add additional elements here like Profile or Notifications */}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

AdminHeader.propTypes = {
  sx: PropTypes.object,
};

export default AdminHeader;
