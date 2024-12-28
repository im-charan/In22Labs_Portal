import React from "react";
import AdminMenuitems from "./AdminMenuItems";
import { useLocation } from "react-router";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { uniqueId } from "lodash";
import { IconLogout } from "@tabler/icons-react";
import { red } from "@mui/material/colors";

const SidebarItems = ({ isSidebarCollapsed }) => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

 

  return (
    <Box>
      <Box sx={{ px: 3 }}>
        <List sx={{ pt: 0 }} className="sidebarNav">
          {AdminMenuitems.map((item) => {
            if (item.subheader) {
              return <NavGroup item={item} key={item.subheader} />;
            } else {
              return (
                <NavItem
                  item={item}
                  key={item.id}
                  pathDirect={pathDirect}
                  isSidebarCollapsed={isSidebarCollapsed}
                />
              );
            }
          })}
        </List>
      </Box>
      {/* <Box sx={{ px: 3 }}>
        <ListItem button key={logoutItem.id} sx={{ color: red[500] }}>
          <ListItemIcon>
            <logoutItem.icon />
          </ListItemIcon>
          {!isSidebarCollapsed && <ListItemText primary={logoutItem.title} />}
        </ListItem>
      </Box> */}
    </Box>
  );
};

export default SidebarItems;