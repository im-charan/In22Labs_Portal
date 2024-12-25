import React from 'react';
import AdminMenuitems from './AdminMenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { uniqueId } from 'lodash';
import { IconLogout } from '@tabler/icons-react';
import { red } from '@mui/material/colors';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  const logoutItem = {
    id: uniqueId(),
    title: "Logout",
    icon: IconLogout,
    href: "/auth/login",
  };

  return (
    <Box>

      <Box sx={{ px: 3 }}>
        <List sx={{ pt: 0 }} className="sidebarNav">
          {AdminMenuitems.map((item) => {
            // {/********SubHeader**********/}
            if (item.subheader) {
              return <NavGroup item={item} key={item.subheader} />;
              
              // {/********If Sub Menu**********/}
              /* eslint no-else-return: "off" */
            } else {
              return (
                <NavItem item={item} key={item.id} pathDirect={pathDirect} />
              );
            }
          })}
        </List>
      </Box>
      <Box sx={{ px: 3 }} >
        <NavItem item={logoutItem} key={logoutItem.id} pathDirect={pathDirect} />
      </Box>
    </Box>
  );
};
export default SidebarItems;
