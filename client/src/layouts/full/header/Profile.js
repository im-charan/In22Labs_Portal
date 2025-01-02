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
// import ProfileImg from "src/assets/images/profile/user-1.jpg"; // Static Profile Image
// import { useUser } from "src/views/authentication/auth/UserContext";

// const Profile = () => {
//   const [anchorEl2, setAnchorEl2] = useState(null);
//   const [userData, setUserData] = useState(null); // Store user data
//   const [remainingTime, setRemainingTime] = useState(0); // Time remaining

//   const { user } = useUser(); // Access user data from context
//   const userId = user?.user_id; // Get userId from context
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
//   // Fetch user data
//   useEffect(() => {
//     if (!userId) return; // Do not fetch if userId is not available

//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(
//           `${backendUrl}/api/client/user/${userId}`
//         );

//         // Check if the response is valid JSON
//         const contentType = response.headers.get("Content-Type");
//         if (!contentType || !contentType.includes("application/json")) {
//           throw new Error("Received non-JSON response from the server");
//         }

//         if (!response.ok) {
//           throw new Error(`Error fetching user: ${response.statusText}`);
//         }

//         const result = await response.json();
//         console.log("Fetched User Data:", result);

//         if (result.success) {
//           setUserData(result.data); // Set user data from the API response

//           // Calculate remaining time till account validity ends
//           if (result.data.valid_till) {
//             const validTillDate = new Date(result.data.valid_till);
//             calculateRemainingTime(validTillDate);
//           } else {
//             console.warn("valid_till field is missing in the API response");
//           }
//         } else {
//           console.error("API Error:", result.message);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error.message);
//       }
//     };

//     fetchUserData();
//   }, [userId]); // Fetch user data when userId changes

//   // Calculate remaining time
//   useEffect(() => {
//     if (!userData?.valid_till) return;

//     const validTillDate = new Date(userData.valid_till);
//     const interval = setInterval(() => {
//       calculateRemainingTime(validTillDate);
//     }, 1000);

//     return () => clearInterval(interval); // Clear interval on component unmount
//   }, [userData]);

//   const calculateRemainingTime = (validTillDate) => {
//     const timeLeft = Math.max(
//       0,
//       Math.floor((validTillDate - Date.now()) / 1000)
//     );
//     setRemainingTime(timeLeft);
//   };

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
//           src={ProfileImg} // Static profile image
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
//         {userData ? (
//           <>
//             <MenuItem
//               component={userData?.user_type === 1 ? "div" : Link} // Prevent navigation for user_type 1
//               to={userData?.user_type === 1 ? null : "/dashboard/ProfilePage"}
//               onClick={userData?.user_type === 1 ? handleClose2 : undefined}
//               sx={{
//                 cursor: userData?.user_type === 1 ? "not-allowed" : "pointer",
//                 opacity: userData?.user_type === 1 ? 0.6 : 1, // Style for restricted users
//               }}
//             >
//               <ListItemIcon>
//                 <IconUser width={20} />
//               </ListItemIcon>
//               <ListItemText>
//                 <Typography variant="body1" color="textPrimary">
//                   {userData.user_fullname}
//                 </Typography>
//               </ListItemText>
//             </MenuItem>
//             <Divider />

//             <Box
//               px={2}
//               py={1}
//               sx={{ backgroundColor: "#f0f4fa", borderRadius: "8px", mt: 1 }}
//             >
//               <Typography variant="body2" color="textSecondary">
//                 Organization:
//               </Typography>
//               <Typography variant="body1" color="textPrimary">
//                 {userData.organization_name || "N/A"}
//               </Typography>
//             </Box>

//             <Box
//               px={2}
//               py={1}
//               sx={{ backgroundColor: "#f0f4fa", borderRadius: "8px", mt: 1 }}
//             >
//               <Typography variant="body2" color="textSecondary">
//                 Account Validity Ends:
//               </Typography>
//               <Typography variant="body1" color="primary">
//                 {new Date(userData.valid_till).toLocaleDateString(undefined, {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </Typography>
//               <Typography variant="caption" color="textSecondary">
//                 ({formatTime(remainingTime)} remaining)
//               </Typography>
//             </Box>

//             <Box mt={2} py={1} px={2}>
//               <Button
//                 to="/auth/login"
//                 variant="outlined"
//                 color="primary"
//                 component={Link}
//                 fullWidth
//               >
//                 Logout
//               </Button>
//             </Box>
//           </>
//         ) : (
//           <Typography variant="body2" px={2} py={1}>
//             Loading user data...
//           </Typography>
//         )}
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
  Divider,
} from "@mui/material";
import { IconUser } from "@tabler/icons-react";
import ProfileImg from "src/assets/images/profile/user-1.jpg"; // Static Profile Image
import { useUser } from "src/views/authentication/auth/UserContext";


const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [userData, setUserData] = useState(null); // Store user data
  const [remainingTime, setRemainingTime] = useState(0); // Time remaining

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { user } = useUser(); // Access user data from context
  const userId = user?.user_id; // Get userId from context


  // Fetch user data
  useEffect(() => {
    if (!userId) return; // Do not fetch if userId is not available


    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/api/client/user/${userId}`
        );


        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response from the server");
        }


        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }


        const result = await response.json();
        console.log("Fetched User Data:", result);


        if (result.success) {
          setUserData(result.data); // Set user data from the API response


          if (result.data.valid_till) {
            const validTillDate = new Date(result.data.valid_till);
            calculateRemainingTime(validTillDate);
          } else {
            console.warn("valid_till field is missing in the API response");
          }
        } else {
          console.error("API Error:", result.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };


    fetchUserData();
  }, [userId]);


  // Calculate remaining time
  useEffect(() => {
    if (!userData?.valid_till) return;


    const validTillDate = new Date(userData.valid_till);
    const interval = setInterval(() => {
      calculateRemainingTime(validTillDate);
    }, 1000);


    return () => clearInterval(interval); // Clear interval on component unmount
  }, [userData]);


  const calculateRemainingTime = (validTillDate) => {
    // Set the validTillDate to end of the day (23:59:59)
    const endOfDay = new Date(validTillDate);
    endOfDay.setHours(23, 59, 59, 999);


    const timeLeft = Math.max(0, Math.floor((endOfDay - Date.now()) / 1000));
    setRemainingTime(timeLeft);
  };


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
        {userData ? (
          <>
            <MenuItem
              component={userData?.user_type === 1 ? "div" : Link}
              to={userData?.user_type === 1 ? null : "/dashboard/ProfilePage"}
              onClick={userData?.user_type === 1 ? handleClose2 : undefined}
              sx={{
                cursor: userData?.user_type === 1 ? "not-allowed" : "pointer",
                opacity: userData?.user_type === 1 ? 0.6 : 1,
              }}
            >
              <ListItemIcon>
                <IconUser width={20} />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" color="textPrimary">
                  {userData.user_fullname}
                </Typography>
              </ListItemText>
            </MenuItem>
            <Divider />


            <Box
              px={2}
              py={1}
              sx={{ backgroundColor: "#f0f4fa", borderRadius: "8px", mt: 1 }}
            >
              <Typography variant="body2" color="textSecondary">
                Organization:
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {userData.organization_name || "N/A"}
              </Typography>
            </Box>


            <Box
              px={2}
              py={1}
              sx={{ backgroundColor: "#f0f4fa", borderRadius: "8px", mt: 1 }}
            >
              <Typography variant="body2" color="textSecondary">
                Account Validity Ends:
              </Typography>
              <Typography variant="body1" color="primary">
                {new Date(userData.valid_till).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  // hour: "2-digit",
                  // minute: "2-digit",
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
          </>
        ) : (
          <Typography variant="body2" px={2} py={1}>
            Loading user data...
          </Typography>
        )}
      </Menu>
    </Box>
  );
};


export default Profile;
