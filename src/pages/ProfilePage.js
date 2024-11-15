// // import React from "react";
// // import { Box, Typography, Avatar, Button, Grid, Paper } from "@mui/material";
// // import { Link } from "react-router-dom";

// // // Sample data
// // const userInfo = {
// //   name: "John Doe",
// //   organization: "Tech Innovations",
// //   accountInitialDate: new Date("2023-01-01"),
// //   dashboardsCount: 5,
// //   email: "johndoe@example.com",
// //   imageUrl: "src/assets/images/profile/user-1.jpg", // Path to user image
// // };

// // const ProfilePage = () => {
// //   return (
// //     <Box sx={{ padding: 2 }}>
// //       <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
// //         {/* Profile Image and Name */}
// //         <Box display="flex" alignItems="center" mb={3}>
// //           <Avatar
// //             src={userInfo.imageUrl}
// //             alt="User Profile"
// //             sx={{ width: 80, height: 80, marginRight: 2 }}
// //           />
// //           <Typography variant="h5">{userInfo.name}</Typography>
// //         </Box>

// //         {/* User Details */}
// //         <Grid container spacing={2}>
// //           <Grid item xs={12} sm={6}>
// //             <Typography variant="subtitle1" color="textSecondary">
// //               Organization:
// //             </Typography>
// //             <Typography variant="body1">{userInfo.organization}</Typography>
// //           </Grid>
// //           <Grid item xs={12} sm={6}>
// //             <Typography variant="subtitle1" color="textSecondary">
// //               Account Created On:
// //             </Typography>
// //             <Typography variant="body1">
// //               {userInfo.accountInitialDate.toLocaleDateString()}
// //             </Typography>
// //           </Grid>
// //           <Grid item xs={12} sm={6}>
// //             <Typography variant="subtitle1" color="textSecondary">
// //               Number of Dashboards:
// //             </Typography>
// //             <Typography variant="body1">{userInfo.dashboardsCount}</Typography>
// //           </Grid>
// //           <Grid item xs={12} sm={6}>
// //             <Typography variant="subtitle1" color="textSecondary">
// //               Email:
// //             </Typography>
// //             <Typography variant="body1">{userInfo.email}</Typography>
// //           </Grid>
// //         </Grid>

// //         {/* Edit Profile Button */}
// //         <Box mt={3}>
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             component={Link}
// //             to="/edit-profile" // Route to edit profile page
// //             fullWidth
// //           >
// //             Edit Profile
// //           </Button>
// //         </Box>
// //       </Paper>
// //     </Box>
// //   );
// // };

// // export default ProfilePage;
// import React from "react";
// import { Box, Typography, Avatar, Grid, Paper } from "@mui/material";

// // Sample data with updated information
// const userInfo = {
//   name: "Abdul Razack",
//   organization: "Tech Innovations",
//   accountInitialDate: new Date("2023-01-01"),
//   dashboardsCount: 5,
//   email: "Abdul@gmil.com",
//   imageUrl: "src/assets/images/profile/user-1.jpg", // Path to user image
// };

// const ProfilePage = () => {
//   return (
//     <Box sx={{ padding: 2 }}>
//       <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
//         {/* Profile Image and Name */}
//         <Box display="flex" alignItems="center" mb={3}>
//           <Avatar
//             src={userInfo.imageUrl}
//             alt="User Profile"
//             sx={{ width: 80, height: 80, marginRight: 2 }}
//           />
//           <Typography variant="h5">{userInfo.name}</Typography>
//         </Box>

//         {/* User Details */}
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle1" color="textSecondary">
//               Organization:
//             </Typography>
//             <Typography variant="body1">{userInfo.organization}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle1" color="textSecondary">
//               Account Created On:
//             </Typography>
//             <Typography variant="body1">
//               {userInfo.accountInitialDate.toLocaleDateString()}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle1" color="textSecondary">
//               Number of Dashboards:
//             </Typography>
//             <Typography variant="body1">{userInfo.dashboardsCount}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle1" color="textSecondary">
//               Email:
//             </Typography>
//             <Typography variant="body1">{userInfo.email}</Typography>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default ProfilePage;
import React from "react";
import { Box, Typography, Avatar, Grid, Paper } from "@mui/material";

// Sample data with updated information
const userInfo = {
  name: "Abdul Razack",
  organization: "Tech Innovations",
  accountInitialDate: new Date("2023-01-01"),
  accountEndDate: new Date("2024-01-01"), // Added end date for account validity
  dashboardsCount: 5,
  email: "Abdul@gmil.com",
  imageUrl: "src/assets/images/profile/user-1.jpg", // Path to user image
};

const ProfilePage = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        {/* Profile Image and Name */}
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            src={userInfo.imageUrl}
            alt="User Profile"
            sx={{ width: 80, height: 80, marginRight: 2 }}
          />
          <Typography variant="h5">{userInfo.name}</Typography>
        </Box>

        {/* User Details */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Organization:
            </Typography>
            <Typography variant="body1">{userInfo.organization}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Account Created On:
            </Typography>
            <Typography variant="body1">
              {userInfo.accountInitialDate.toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Account Valid Until:
            </Typography>
            <Typography variant="body1">
              {userInfo.accountEndDate.toLocaleDateString()}{" "}
              {/* Displaying end date */}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Number of Dashboards:
            </Typography>
            <Typography variant="body1">{userInfo.dashboardsCount}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Email:
            </Typography>
            <Typography variant="body1">{userInfo.email}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
