// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Avatar,
//   Box,
//   Menu,
//   Button,
//   IconButton,
//   MenuItem,
//   ListItemIcon,
//   ListItemText
// } from '@mui/material';

// import { IconListCheck, IconMail, IconUser } from '@tabler/icons-react';

// import ProfileImg from 'src/assets/images/profile/user-1.jpg';

// const Profile = () => {
//   const [anchorEl2, setAnchorEl2] = useState(null);
//   const handleClick2 = (event) => {
//     setAnchorEl2(event.currentTarget);
//   };
//   const handleClose2 = () => {
//     setAnchorEl2(null);
//   };

//   return (
//     <Box>
//       <IconButton
//         size="large"
//         aria-label="show 11 new notifications"
//         color="inherit"
//         aria-controls="msgs-menu"
//         aria-haspopup="true"
//         sx={{
//           ...(typeof anchorEl2 === 'object' && {
//             color: 'primary.main',
//           }),
//         }}
//         onClick={handleClick2}
//       >
//         <Avatar
//           src={ProfileImg}
//           alt={ProfileImg}
//           sx={{
//             width: 35,
//             height: 35,
//           }}
//         />
//       </IconButton>
//       {/* ------------------------------------------- */}
//       {/* Message Dropdown */}
//       {/* ------------------------------------------- */}
//       <Menu
//         id="msgs-menu"
//         anchorEl={anchorEl2}
//         keepMounted
//         open={Boolean(anchorEl2)}
//         onClose={handleClose2}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         sx={{
//           '& .MuiMenu-paper': {
//             width: '200px',
//           },
//         }}
//       >
//         <MenuItem>
//           <ListItemIcon>
//             <IconUser width={20} />
//           </ListItemIcon>
//           <ListItemText>My Profile</ListItemText>
//         </MenuItem>
//         {/* <MenuItem>
//           <ListItemIcon>
//             <IconMail width={20} />
//           </ListItemIcon>
//           <ListItemText>My Account</ListItemText>
//         </MenuItem>
//         <MenuItem>
//           <ListItemIcon>
//             <IconListCheck width={20} />
//           </ListItemIcon>
//           <ListItemText>My Tasks</ListItemText>
//         </MenuItem> */}
//         <Box mt={1} py={1} px={2}>
//           <Button to="/auth/login" variant="outlined" color="primary" component={Link} fullWidth>
//             Logout
//           </Button>
//         </Box>
//       </Menu>
//     </Box>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";

import ProfileImg from "src/assets/images/profile/user-1.jpg";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [remainingTime, setRemainingTime] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const months = Math.floor(time / (30 * 24 * 3600));
    const days = Math.floor((time % (30 * 24 * 3600)) / (24 * 3600));
    const hours = Math.floor((time % (24 * 3600)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);

    return `${months}m ${days}d ${hours}h ${minutes}m`;
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt="Profile"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        {/* Display Remaining Time */}
        <Box px={2} py={1}>
          <Typography variant="body2" color="textSecondary">
            Account Validity: {formatTime(remainingTime)}
          </Typography>
        </Box>
        <Box mt={1} py={1} px={2}>
          <Button
            to="/auth/login"
            variant="outlined"
            color="primary"
            component={Link}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
