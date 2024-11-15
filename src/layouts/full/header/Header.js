import React from 'react';
import { Box, Link, Typography, Breadcrumbs, AppBar, Toolbar, styled, Stack, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import Profile from './Profile';
import { IconMenu } from '@tabler/icons-react';

const Header = (props) => {
  const location = useLocation();
  const params = useParams();
  const overviewTitle = location.state?.overviewTitle;

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }));

  let breadcrumbsTitle = overviewTitle;

  if (params.id) {
    breadcrumbsTitle = `Overview ${params.id}`;
  }

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* Left Section with IconButton */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        </Box>

        {/* Expandable space between IconButton and Profile */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right Section with Profile Component */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ display: { xs: 'none', lg: 'flex' } }}>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
