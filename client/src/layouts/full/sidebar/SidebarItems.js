import React, { useEffect, useState } from 'react';
import Menuitems from './MenuItems';  // Import static Menuitems
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { useUser } from "src/views/authentication/auth/UserContext";

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  // Access user context to get userId
  const { user } = useUser();
  const userId = user?.user_id;

  // State to store the orgId
  const [orgId, setOrgId] = useState(null);

  useEffect(() => {
    const fetchUserOrgData = async () => {
      if (!userId) return; // Don't fetch if no userId exists

      try {
        // Adjust the fetch URL to match the API structure
        const response = await fetch(`http://localhost:5000/api/client/user/${userId}`);
        const userData = await response.json();

        if (userData.success && userData.data && userData.data.org_id) {
          // Set the orgId from the response
          setOrgId(userData.data.org_id);
        }
      } catch (error) {
        console.error("Error fetching user and organization data:", error);
      }
    };

    fetchUserOrgData();
  }, [userId]); // Re-fetch if userId changes

  // Dynamically update Menuitems based on orgId
  const updatedMenuItems = Menuitems.map((item) => {
    if (item.title === "Dashboard" && orgId) {
      return {
        ...item,
        href: `/dashboard/${orgId}`, // Update the href with orgId
      };
    }
    return item;
  });

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {updatedMenuItems.map((item) => {
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
  );
};

export default SidebarItems;
