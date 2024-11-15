
// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import {
// //   Avatar,
// //   Box,
// //   Menu,
// //   Button,
// //   IconButton,
// //   MenuItem,
// //   ListItemIcon,
// //   ListItemText,
// //   Typography,
// //   Divider,
// // } from "@mui/material";

// // import { IconUser } from "@tabler/icons-react";
// // import ProfileImg from "src/assets/images/profile/user-1.jpg";

// // const Profile = () => {
// //   const [anchorEl2, setAnchorEl2] = useState(null);
// //   const [showGreeting, setShowGreeting] = useState(false);

// //   const userName = "Abdul ";

// //   const getEndDate = () => {
// //     const savedEndDate = localStorage.getItem("endDate");
// //     if (savedEndDate) return new Date(savedEndDate);

// //     const defaultEndDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
// //     localStorage.setItem("endDate", defaultEndDate);
// //     return defaultEndDate;
// //   };

// //   const [endDate] = useState(getEndDate);
// //   const [remainingTime, setRemainingTime] = useState(
// //     Math.max(0, Math.floor((endDate - Date.now()) / 1000))
// //   );

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setRemainingTime((prevTime) => {
// //         const newTime = Math.max(0, Math.floor((endDate - Date.now()) / 1000));
// //         if (newTime === 0) clearInterval(interval);
// //         return newTime;
// //       });
// //     }, 1000);

// //     return () => clearInterval(interval);
// //   }, [endDate]);

// //   useEffect(() => {
// //     setShowGreeting(true);
// //     const greetingTimeout = setTimeout(() => setShowGreeting(false), 3000); // Hide after 3 seconds

// //     return () => clearTimeout(greetingTimeout);
// //   }, []);

// //   const formatTime = (time) => {
// //     const days = Math.floor(time / (24 * 3600));
// //     const hours = Math.floor((time % (24 * 3600)) / 3600);
// //     const minutes = Math.floor((time % 3600) / 60);
// //     return `${days}d ${hours}h ${minutes}m`;
// //   };

// //   const handleClick2 = (event) => {
// //     setAnchorEl2(event.currentTarget);
// //   };

// //   const handleClose2 = () => {
// //     setAnchorEl2(null);
// //   };

// //   return (
// //     <Box position="relative">
// //       <IconButton
// //         size="large"
// //         aria-label="show profile menu"
// //         color="inherit"
// //         aria-controls="msgs-menu"
// //         aria-haspopup="true"
// //         sx={{
// //           ...(typeof anchorEl2 === "object" && {
// //             color: "primary.main",
// //           }),
// //         }}
// //         onClick={handleClick2}
// //       >
// //         <Avatar
// //           src={ProfileImg}
// //           alt="Profile"
// //           sx={{
// //             width: 35,
// //             height: 35,
// //           }}
// //         />
// //       </IconButton>

// //       <Menu
// //         id="msgs-menu"
// //         anchorEl={anchorEl2}
// //         keepMounted
// //         open={Boolean(anchorEl2)}
// //         onClose={handleClose2}
// //         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
// //         transformOrigin={{ horizontal: "right", vertical: "top" }}
// //         sx={{
// //           "& .MuiMenu-paper": {
// //             width: "220px",
// //           },
// //         }}
// //       >
// //         <MenuItem>
// //           <ListItemIcon>
// //             <IconUser width={20} />
// //           </ListItemIcon>
// //           <ListItemText>My Profile</ListItemText>
// //         </MenuItem>
// //         <Divider />

// //         <Box
// //           px={2}
// //           py={1}
// //           sx={{ backgroundColor: "#f0f4fa", borderRadius: "8px", mt: 1 }}
// //         >
// //           <Typography variant="body2" color="textSecondary">
// //             Account Validity Ends:
// //           </Typography>
// //           <Typography variant="body1" color="primary">
// //             {endDate.toLocaleDateString(undefined, {
// //               year: "numeric",
// //               month: "long",
// //               day: "numeric",
// //               hour: "2-digit",
// //               minute: "2-digit",
// //             })}
// //           </Typography>
// //           <Typography variant="caption" color="textSecondary">
// //             ({formatTime(remainingTime)} remaining)
// //           </Typography>
// //         </Box>

// //         <Box mt={2} py={1} px={2}>
// //           <Button
// //             to="/auth/login"
// //             variant="outlined"
// //             color="primary"
// //             component={Link}
// //             fullWidth
// //           >
// //             Logout
// //           </Button>
// //         </Box>
// //       </Menu>

// //       {/* Custom Popup Greeting */}
// //       {showGreeting && (
// //         <Box
// //           sx={{
// //             position: "absolute",
// //             top: "45px", // Adjust to position just below the avatar
// //             left: "-50px", // Align to the left of the avatar
// //             backgroundColor: "#FFFFFF", // White background
// //             color: "#000000", // Black text
// //             borderRadius: "6px", // Slightly smaller border radius
// //             padding: "5px 10px", // Reduced padding
// //             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
// //             fontWeight: "bold",
// //             fontSize: "14px", // Reduced font size
// //             display: "flex", // Flexbox to keep message on a single line
// //             alignItems: "center", // Vertically center the text
// //             maxWidth: "150px", // Limiting the width to keep it compact
// //             whiteSpace: "nowrap", // Prevent the message from wrapping to the next line
// //           }}
// //         >
// //           Hello, {userName}!
// //         </Box>
// //       )}
// //     </Box>
// //   );
// // };

// // export default Profile;
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Avatar,
//   Box,
//   Menu,
//   Button,
//   IconButton,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Divider,
// } from "@mui/material";

// import { IconUser } from "@tabler/icons-react";
// import ProfileImg from "src/assets/images/profile/user-1.jpg"; // Ensure this path is correct

// const Profile = () => {
//   const [anchorEl2, setAnchorEl2] = useState(null);
//   const [showGreeting, setShowGreeting] = useState(false);

//   const userName = "Abdul ";

//   const getEndDate = () => {
//     const savedEndDate = localStorage.getItem("endDate");
//     if (savedEndDate) return new Date(savedEndDate);

//     const defaultEndDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
//     localStorage.setItem("endDate", defaultEndDate);
//     return defaultEndDate;
//   };

//   const [endDate] = useState(getEndDate);
//   const [remainingTime, setRemainingTime] = useState(
//     Math.max(0, Math.floor((endDate - Date.now()) / 1000))
//   );

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setRemainingTime((prevTime) => {
//         const newTime = Math.max(0, Math.floor((endDate - Date.now()) / 1000));
//         if (newTime === 0) clearInterval(interval);
//         return newTime;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [endDate]);

//   useEffect(() => {
//     setShowGreeting(true);
//     const greetingTimeout = setTimeout(() => setShowGreeting(false), 3000); // Hide after 3 seconds

//     return () => clearTimeout(greetingTimeout);
//   }, []);

//   const formatTime = (time) => {
//     const days = Math.floor(time / (24 * 3600));
//     const hours = Math.floor((time % (24 * 3600)) / 3600);
//     const minutes = Math.floor((time % 3600) / 60);
//     return `${days}d ${hours}h ${minutes}m`;
//   };

//   const handleClick2 = (event) => {
//     setAnchorEl2(event.currentTarget);
//   };

//   const handleClose2 = () => {
//     setAnchorEl2(null);
//   };

//   return (
//     <Box position="relative">
//       <IconButton
//         size="large"
//         aria-label="show profile menu"
//         color="inherit"
//         aria-controls="msgs-menu"
//         aria-haspopup="true"
//         sx={{
//           ...(typeof anchorEl2 === "object" && {
//             color: "primary.main",
//           }),
//         }}
//         onClick={handleClick2}
//       >
//         <Avatar
//           src={ProfileImg}
//           alt="Profile"
//           sx={{
//             width: 35,
//             height: 35,
//           }}
//         />
//       </IconButton>

//       <Menu
//         id="msgs-menu"
//         anchorEl={anchorEl2}
//         keepMounted
//         open={Boolean(anchorEl2)}
//         onClose={handleClose2}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         sx={{
//           "& .MuiMenu-paper": {
//             width: "220px",
//           },
//         }}
//       >
//         <MenuItem>
//           <ListItemIcon>
//             <IconUser width={20} />
//           </ListItemIcon>
//           <ListItemText>
//             {/* Link to the ProfilePage when clicking "My Profile" */}
//             <Link
//               to="/page/ProfilePage"
//               style={{ textDecoration: "none", color: "inherit" }}
//             >
//               My Profile
//             </Link>
//           </ListItemText>
//         </MenuItem>
//         <Divider />

//         <Box
//           px={2}
//           py={1}
//           sx={{ backgroundColor: "#f0f4fa", borderRadius: "8px", mt: 1 }}
//         >
//           <Typography variant="body2" color="textSecondary">
//             Account Validity Ends:
//           </Typography>
//           <Typography variant="body1" color="primary">
//             {endDate.toLocaleDateString(undefined, {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </Typography>
//           <Typography variant="caption" color="textSecondary">
//             ({formatTime(remainingTime)} remaining)
//           </Typography>
//         </Box>

//         <Box mt={2} py={1} px={2}>
//           <Button
//             to="/auth/login"
//             variant="outlined"
//             color="primary"
//             component={Link}
//             fullWidth
//           >
//             Logout
//           </Button>
//         </Box>
//       </Menu>

//       {/* Custom Popup Greeting */}
//       {showGreeting && (
//         <Box
//           sx={{
//             position: "absolute",
//             top: "45px", // Adjust to position just below the avatar
//             left: "-50px", // Align to the left of the avatar
//             backgroundColor: "#FFFFFF", // White background
//             color: "#000000", // Black text
//             borderRadius: "6px", // Slightly smaller border radius
//             padding: "5px 10px", // Reduced padding
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
//             fontWeight: "bold",
//             fontSize: "14px", // Reduced font size
//             display: "flex", // Flexbox to keep message on a single line
//             alignItems: "center", // Vertically center the text
//             maxWidth: "150px", // Limiting the width to keep it compact
//             whiteSpace: "nowrap", // Prevent the message from wrapping to the next line
//           }}
//         >
//           Hello, {userName}!
//         </Box>
//       )}
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
  Divider,
} from "@mui/material";

import { IconUser } from "@tabler/icons-react";
import ProfileImg from "src/assets/images/profile/user-1.jpg"; // Ensure this path is correct

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [showGreeting, setShowGreeting] = useState(false);

  const userName = "Abdul ";

  const getEndDate = () => {
    const savedEndDate = localStorage.getItem("endDate");
    if (savedEndDate) return new Date(savedEndDate);

    const defaultEndDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    localStorage.setItem("endDate", defaultEndDate);
    return defaultEndDate;
  };

  const [endDate] = useState(getEndDate);
  const [remainingTime, setRemainingTime] = useState(
    Math.max(0, Math.floor((endDate - Date.now()) / 1000))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = Math.max(0, Math.floor((endDate - Date.now()) / 1000));
        if (newTime === 0) clearInterval(interval);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  useEffect(() => {
    setShowGreeting(true);
    const greetingTimeout = setTimeout(() => setShowGreeting(false), 3000); // Hide after 3 seconds

    return () => clearTimeout(greetingTimeout);
  }, []);

  const formatTime = (time) => {
    const days = Math.floor(time / (24 * 3600));
    const hours = Math.floor((time % (24 * 3600)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box position="relative">
      <IconButton
        size="large"
        aria-label="show profile menu"
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
            width: "220px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>
            {/* Link to the ProfilePage when clicking "My Profile" */}
            <Link
              to="/page/ProfilePage"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              My Profile
            </Link>
          </ListItemText>
        </MenuItem>
        <Divider />

        <Box
          px={2}
          py={1}
          sx={{ backgroundColor: "#f0f4fa", borderRadius: "8px", mt: 1 }}
        >
          <Typography variant="body2" color="textSecondary">
            Account Validity Ends:
          </Typography>
          <Typography variant="body1" color="primary">
            {endDate.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            ({formatTime(remainingTime)} remaining)
          </Typography>
        </Box>

        <Box mt={2} py={1} px={2}>
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
