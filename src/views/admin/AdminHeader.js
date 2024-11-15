import React from 'react';
import { AppBar, Toolbar, styled, Stack, IconButton } from '@mui/material';

import Profile from '../../layouts/full/header/Profile';
import { IconMenu } from '@tabler/icons-react';


const AdminHeader = (props) => {
  const {  toggleMobileSidebar } = props;

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
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

      
      </ToolbarStyled>
    </AppBarStyled>
  );
};



export default AdminHeader; 