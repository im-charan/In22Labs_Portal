import React from "react";
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

// components
import Profile from "./Profile";
import { IconMenu } from "@tabler/icons-react";
const userName = "Admin";


const Header = (props) => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Adding a subtle shadow
    // background: "#5d87ff",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    height: 50,
    //borderBottom: "2px solid #4a76d3", // Adding a border
    borderBottom: "2px solid rgba(74, 118, 211, 0.)", // 50% opacity

    borderRadius: "0 0 0px 0px", // Optional for rounded bottom corners
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


        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === 'object' && {
              color: 'primary.main',
            }),
          }}
        >
          {/* <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge> */}

        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
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
};

export default Header;