// // // // import React from "react";
// // // // import {
// // // //   Box,
// // // //   AppBar,
// // // //   Toolbar,
// // // //   styled,
// // // //   Stack,
// // // //   IconButton,
// // // //   Typography,
// // // // } from "@mui/material";
// // // // import PropTypes from "prop-types";

// // // // // components
// // // // import Profile from "./Profile";
// // // // import { IconMenu } from "@tabler/icons-react";
// // // // const userName = "Abdul";
// // // // const OrganizationName = "ABC ORGANIZATION";

// // // // const Header = (props) => {
// // // //   const AppBarStyled = styled(AppBar)(({ theme }) => ({
// // // //     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // Adding a subtle shadow
// // // //     justifyContent: "center",
// // // //     backdropFilter: "blur(4px)",
// // // //     height: 50,
// // // //     //position:"fixed",
    
// // // //     borderBottom: "2px solid rgba(74, 118, 211, 0.2)", // 50% opacity

// // // //    // borderRadius: "0 0 0px 0px", // Optional for rounded bottom corners
// // // //   }));

// // // //   const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
// // // //     width: "100%",
// // // //     color: theme.palette.text.secondary,
// // // //   }));

// // // //   return (
// // // //     <AppBarStyled position="sticky" color="default">
// // // //       <ToolbarStyled>
// // // //         <IconButton
// // // //           color="inherit"
// // // //           aria-label="menu"
// // // //           onClick={props.toggleMobileSidebar}
// // // //           sx={{
// // // //             display: {
// // // //               lg: "none",
// // // //               xs: "inline",
// // // //             },
// // // //           }}
// // // //         >
// // // //           <IconMenu width="20" height="20" />
// // // //         </IconButton>
// // // //         <Typography
// // // //           variant="h3"
// // // //           component="div"
// // // //           sx={{ marginLeft: 8, fontWeight: "bold" }}
// // // //         >
// // // //           Single Window Portal
// // // //         </Typography>

// // // //         <Box flexGrow={1} />
// // // //         <Stack spacing={1} direction="row" alignItems="center">
// // // //           <Box
// // // //             sx={{
// // // //               background: "#ffffff",
// // // //               color: "#5d87ff",
// // // //               padding: "4px 10px",
// // // //               borderRadius: "8px",
// // // //               fontSize: "0.875rem",
// // // //               fontWeight: "bold",
// // // //               boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
// // // //               marginRight: "8px", // Adjusts space between message and avatar
// // // //             }}
// // // //           >
// // // //             Hi, {userName}
// // // //           </Box>
// // // //           <Profile />
// // // //         </Stack>
// // // //       </ToolbarStyled>
// // // //     </AppBarStyled>
// // // //   );
// // // // };

// // // // Header.propTypes = {
// // // //   sx: PropTypes.object,
// // // // };

// // // // export default Header;
// // // import React from "react";
// // // import {
// // //   Box,
// // //   AppBar,
// // //   Toolbar,
// // //   styled,
// // //   Stack,
// // //   IconButton,
// // //   Typography,
// // // } from "@mui/material";
// // // import PropTypes from "prop-types";

// // // // components
// // // import Profile from "./Profile";
// // // import { IconMenu } from "@tabler/icons-react";

// // // const userName = "Abdul";
// // // const OrganizationName = "ABC ORGANIZATION";

// // // const Header = (props) => {
// // //   const AppBarStyled = styled(AppBar)(({ theme }) => ({
// // //     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // Adding a subtle shadow
// // //     justifyContent: "center",
// // //     backdropFilter: "blur(4px)",
// // //     height: 50,
// // //     borderBottom: "2px solid rgba(74, 118, 211, 0.2)", // 50% opacity
// // //   }));

// // //   const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
// // //     width: "100%",
// // //     color: theme.palette.text.secondary,
// // //     display: "flex",
// // //     alignItems: "center",
// // //   }));

// // //   return (
// // //     <AppBarStyled position="sticky" color="default">
// // //       <ToolbarStyled>
// // //         {/* Left-side IconButton */}
// // //         <IconButton
// // //           color="inherit"
// // //           aria-label="menu"
// // //           onClick={props.toggleMobileSidebar}
// // //           sx={{
// // //             display: {
// // //               lg: "none",
// // //               xs: "inline",
// // //             },
// // //           }}
// // //         >
// // //           <IconMenu width="20" height="20" />
// // //         </IconButton>
// // //         <Typography
// // //           variant="h3"
// // //            component="div"
// // //            sx={{ marginLeft: 8, fontWeight: "bold" }}
// // //          >
// // //           Single Window Portal
// // //         </Typography>

// // //         {/* Center Organization Name */}
// // //         <Box
// // //           sx={{
// // //             flexGrow: 1,
// // //             display: "flex",
// // //             justifyContent: "center",
// // //             position: "absolute",
// // //             left: "50%",
// // //             transform: "translateX(-50%)",
// // //           }}
// // //         >
// // //           <Typography
// // //             variant="h4"
// // //             component="div"
// // //             sx={{ fontWeight: "bold", color: "#4a76d3" }}
// // //           >
// // //             {OrganizationName}
// // //           </Typography>
// // //         </Box>

// // //         {/* Right-side User Info and Profile */}
// // //         <Box flexGrow={1} />
// // //         <Stack spacing={1} direction="row" alignItems="center">
// // //           <Box
// // //             sx={{
// // //               background: "#ffffff",
// // //               color: "#5d87ff",
// // //               padding: "4px 10px",
// // //               borderRadius: "8px",
// // //               fontSize: "0.875rem",
// // //               fontWeight: "bold",
// // //               boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
// // //               marginRight: "8px", // Adjusts space between message and avatar
// // //             }}
// // //           >
// // //             Hi, {userName}
// // //           </Box>
// // //           <Profile />
// // //         </Stack>
// // //       </ToolbarStyled>
// // //     </AppBarStyled>
// // //   );
// // // };

// // // Header.propTypes = {
// // //   sx: PropTypes.object,
// // // };

// // // export default Header;
// // import React from "react";
// // import {
// //   Box,
// //   AppBar,
// //   Toolbar,
// //   styled,
// //   Stack,
// //   IconButton,
// //   Typography,
// //   useMediaQuery,
// //   useTheme,
// // } from "@mui/material";
// // import PropTypes from "prop-types";

// // // components
// // import Profile from "./Profile";
// // import { IconMenu } from "@tabler/icons-react";

// // const userName = "Abdul";
// // const OrganizationName = "ABC ORGANIZATION";

// // const Header = (props) => {
// //   const theme = useTheme();
// //   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

// //   const AppBarStyled = styled(AppBar)(({ theme }) => ({
// //     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // Adding a subtle shadow
// //     justifyContent: "center",
// //     backdropFilter: "blur(4px)",
// //     height: 50,
// //     borderBottom: "2px solid rgba(74, 118, 211, 0.2)", // 50% opacity
// //   }));

// //   const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
// //     width: "100%",
// //     color: theme.palette.text.secondary,
// //     display: "flex",
// //     alignItems: "center",
// //   }));

// //   return (
// //     <AppBarStyled position="sticky" color="default">
// //       <ToolbarStyled>
// //         {/* Left-side IconButton */}
// //         <IconButton
// //           color="inherit"
// //           aria-label="menu"
// //           onClick={props.toggleMobileSidebar}
// //           sx={{
// //             display: {
// //               lg: "none",
// //               xs: "inline",
// //             },
// //           }}
// //         >
// //           <IconMenu width="20" height="20" />
// //         </IconButton>

// //         {/* Single Window Portal Title */}
// //         <Typography
// //           variant={isSmallScreen ? "h5" : "h3"} // Adjust font size for smaller screens
// //           component="div"
// //           sx={{
// //             marginLeft: isSmallScreen ? 2 : 8,
// //             fontWeight: "bold",
// //             whiteSpace: "nowrap", // Prevents text wrapping
// //             overflow: "hidden",
// //             textOverflow: "ellipsis",
// //           }}
// //         >
// //           Single Window Portal
// //         </Typography>

// //         {/* Center Organization Name */}
// //         <Box
// //           sx={{
// //             flexGrow: 1,
// //             display: "flex",
// //             justifyContent: "center",
// //             position: "absolute",
// //             left: "50%",
// //             transform: "translateX(-50%)",
// //           }}
// //         >
// //           <Typography
// //             variant={isSmallScreen ? "h6" : "h4"} // Adjust font size for smaller screens
// //             component="div"
// //             sx={{
// //               fontWeight: "bold",
// //               color: "#4a76d3",
// //               whiteSpace: "nowrap", // Prevents text wrapping
// //               overflow: "hidden",
// //               textOverflow: "ellipsis",
// //             }}
// //           >
// //             {OrganizationName}
// //           </Typography>
// //         </Box>

// //         {/* Right-side User Info and Profile */}
// //         <Box flexGrow={1} />
// //         <Stack spacing={1} direction="row" alignItems="center">
// //           <Box
// //             sx={{
// //               background: "#ffffff",
// //               color: "#5d87ff",
// //               padding: "4px 10px",
// //               borderRadius: "8px",
// //               fontSize: "0.875rem",
// //               fontWeight: "bold",
// //               boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
// //               marginRight: "8px", // Adjusts space between message and avatar
// //               whiteSpace: "nowrap", // Prevents text wrapping
// //             }}
// //           >
// //             Hi, {userName}
// //           </Box>
// //           <Profile />
// //         </Stack>
// //       </ToolbarStyled>
// //     </AppBarStyled>
// //   );
// // };

// // Header.propTypes = {
// //   sx: PropTypes.object,
// // };

// // export default Header;
// import React from "react";
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   styled,
//   Stack,
//   IconButton,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import PropTypes from "prop-types";

// // components
// import Profile from "./Profile";
// import { IconMenu } from "@tabler/icons-react";

// const userName = "Abdul";
// const OrganizationName = "ABC ORGANIZATION";

// const Header = (props) => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const AppBarStyled = styled(AppBar)(({ theme }) => ({
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // Adding a subtle shadow
//     justifyContent: "center",
//     backdropFilter: "blur(4px)",
//     height: 50,
//     borderBottom: "2px solid rgba(74, 118, 211, 0.2)", // 50% opacity
//   }));

//   const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
//     width: "100%",
//     color: theme.palette.text.secondary,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   }));

//   return (
//     <AppBarStyled position="sticky" color="default">
//       <ToolbarStyled>
//         {/* Left-side IconButton */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             minWidth: "fit-content",
//           }}
//         >
//           <IconButton
//             color="inherit"
//             aria-label="menu"
//             onClick={props.toggleMobileSidebar}
//             sx={{
//               display: {
//                 lg: "none",
//                 xs: "inline",
//               },
//             }}
//           >
//             <IconMenu width="20" height="20" />
//           </IconButton>

//           <Typography
//             variant={isSmallScreen ? "h5" : "h3"}
//             sx={{
//               fontWeight: "bold",
//               marginLeft: isSmallScreen ? 1 : 2,
//               whiteSpace: "nowrap", // Prevent text wrapping
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             Single Window Portal
//           </Typography>
//         </Box>

//         {/* Center Organization Name */}
//         {!isSmallScreen && (
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: "bold",
//               color: "#4a76d3",
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             {OrganizationName}
//           </Typography>
//         )}

//         {/* Right-side User Info and Profile */}
//         <Stack
//           spacing={1}
//           direction="row"
//           alignItems="center"
//           sx={{
//             minWidth: "fit-content",
//           }}
//         >
//           <Box
//             sx={{
//               background: "#ffffff",
//               color: "#5d87ff",
//               padding: "4px 10px",
//               borderRadius: "8px",
//               fontSize: "0.875rem",
//               fontWeight: "bold",
//               boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
//               whiteSpace: "nowrap",
//             }}
//           >
//             Hi, {userName}
//           </Box>
//           <Profile />
//         </Stack>
//       </ToolbarStyled>
//     </AppBarStyled>
//   );
// };

// Header.propTypes = {
//   sx: PropTypes.object,
// };

// export default Header;
import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";

// components
import Profile from "./Profile";
import { IconMenu } from "@tabler/icons-react";

const userName = "Abdul";
const OrganizationName = "Tech Innovations";

// Assume a default sidebar width
const SIDEBAR_WIDTH = 240;

const Header = (props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // Adding a subtle shadow
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    height: 50,
    borderBottom: "2px solid rgba(74, 118, 211, 0.2)", // 50% opacity
    transition: "margin-left 0.3s ease", // Smooth transition for sidebar toggle
    marginLeft: props.isSidebarOpen ? `${SIDEBAR_WIDTH}px` : "0px", // Adjust based on sidebar state
    width: props.isSidebarOpen ? `calc(100% - ${SIDEBAR_WIDTH}px)` : "100%", // Dynamically reduce width
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }));

  return (
    <AppBarStyled position="fixed" color="default">
      <ToolbarStyled>
        {/* Left-side IconButton */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: "fit-content",
          }}
        >
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

          <Typography
           // variant={isSmallScreen ? "h6" :"h4"}
           variant="h5"
            sx={{
              marginLeft: 35, 
              fontWeight: "bold",
              
              whiteSpace: "nowrap", // Prevent text wrapping
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Single Window Portal
          </Typography>
        </Box>

        {/* Center Organization Name */}
        {!isSmallScreen && (
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              //color: "#4a76d3",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {OrganizationName}
          </Typography>
        )}

        {/* Right-side User Info and Profile */}
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{
            minWidth: "fit-content",
          }}
        >
          <Box
            sx={{
              background: "#ffffff",
              color: "#5d87ff",
              padding: "4px 10px",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              whiteSpace: "nowrap",
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
  isSidebarOpen: PropTypes.bool.isRequired, // Pass a boolean to control sidebar state
};

export default Header;
