// import { useMediaQuery, Box, Drawer } from '@mui/material';
// import SidebarItems from './AdminSidebarItems';
// import { Sidebar, Logo } from 'react-mui-sidebar';
// import logo from '../../../assets/images/logos/dark1-logo.svg'
// import { Stack } from '@mui/material';
// const AdminSidebar = (props) => {

//   const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
//   const sidebarWidth = '200px';

//   // Custom CSS for short scrollbar
//   const scrollbarStyles = {
//     '&::-webkit-scrollbar': {
//       width: '7px',

//     },
//     '&::-webkit-scrollbar-thumb': {
//       backgroundColor: '#eff2f7',
//       borderRadius: '15px',
//     },
//   };


//   if (lgUp) {
//     return (
//       <Box
//         sx={{
//           width: sidebarWidth,
//           flexShrink: 0,
//         }}
//       >
//         {/* ------------------------------------------- */}
//         {/* Sidebar for desktop */}
//         {/* ------------------------------------------- */}
//         <Drawer
//           anchor="left"
//           open={props.isSidebarOpen}
//           variant="permanent"
//           PaperProps={{
//             sx: {
//               boxSizing: 'border-box',
//               ...scrollbarStyles,
//             },
//           }}
//         >
//           {/* ------------------------------------------- */}
//           {/* Sidebar Box */}
//           {/* ------------------------------------------- */}
//           <Box
//             sx={{
//               height: '100%',
//             }}
//           >

//             <Sidebar
//               width={'270px'}
//               collapsewidth="80px"
//               open={props.isSidebarOpen}
//               themeColor="#5d87ff"
//               themeSecondaryColor="#49beff"
//               showProfile={false}
//             >
//               {/* ------------------------------------------- */}
//               {/* Logo */}
//               {/* ------------------------------------------- */}
             
//               <Box
//                 sx={{
//                   width: '100%',  // Take up full width
//                     // Take full height
//                 }}
//               >
//                 <Stack
//                   sx={{
//                     alignItems: 'center',  
//                     display: 'flex',  
//                   }}
//                 >
//                   <Logo img={logo} /> {/* The logo */}
//                 </Stack>
//               </Box> {/* The logo */}
               
//               <Box>
//                 {/* ------------------------------------------- */}
//                 {/* Sidebar Items */}
//                 {/* ------------------------------------------- */}
//                 <SidebarItems />
//               </Box>
//             </Sidebar >
//           </Box>
//         </Drawer >
//       </Box >
//     );
//   }
//   return (
//     <Drawer
//       anchor="left"
//       open={props.isMobileSidebarOpen}
//       onClose={props.onSidebarClose}
//       variant="temporary"
//       PaperProps={{
//         sx: {

//           boxShadow: (theme) => theme.shadows[8],
//           ...scrollbarStyles,
//         },
//       }}
//     >
//       <Sidebar
//         width={'270px'}
//         collapsewidth="80px"
//         isCollapse={false}
//         mode="light"
//         direction="ltr"
//         themeColor="#5d87ff"
//         themeSecondaryColor="#49beff"
//         showProfile={false}
//       >
//         {/* ------------------------------------------- */}
//         {/* Logo */}
//         {/* ------------------------------------------- */}

//         <Logo img={logo} />

//         {/* ------------------------------------------- */}
//         {/* Sidebar For Mobile */}
//         {/* ------------------------------------------- */}
//         <SidebarItems />
//       </Sidebar>
//     </Drawer>
//   );
// };
// export default AdminSidebar;
import React from 'react';
import { useMediaQuery, Box, Drawer, Stack } from '@mui/material';
import SidebarItems from './AdminSidebarItems';
import { Sidebar, Logo } from 'react-mui-sidebar';
import logo from '../../../assets/images/logos/dark1-logo.svg';

const AdminSidebar = (props) => {
  // Check for large screens (lgUp)
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const sidebarWidth = '270px'; // Adjust sidebar width

  // Custom scrollbar styles
  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eff2f7',
      borderRadius: '15px',
    },
  };

  // For large screens (lgUp), permanent sidebar
  if (lgUp) {
    return (
      <Box sx={{ width: sidebarWidth, flexShrink: 0 }}>
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: 'border-box',
              ...scrollbarStyles,
            },
          }}
        >
          <Box sx={{ height: '100%' }}>
            <Sidebar
              width={sidebarWidth}
              collapsewidth="80px"
              open={props.isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              <Box sx={{ width: '100%' }}>
                <Stack sx={{ alignItems: 'center', display: 'flex' }}>
                  <Logo img={logo} /> {/* Logo */}
                </Stack>
              </Box>

              {/* Sidebar Items */}
              <Box>
                <SidebarItems />
              </Box>
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  // For medium or small screens, temporary sidebar that toggles
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      <Sidebar
        width={sidebarWidth}
        collapsewidth="80px"
        isCollapse={false}
        mode="light"
        direction="ltr"
        themeColor="#5d87ff"
        themeSecondaryColor="#49beff"
        showProfile={false}
      >
        {/* Logo */}
        <Logo img={logo} />

        {/* Sidebar Items */}
        <SidebarItems />
      </Sidebar>
    </Drawer>
  );
};

export default AdminSidebar;
