// import React, { useState } from "react";
// import { styled, Container, Box } from '@mui/material';
// import { Outlet } from 'react-router-dom';
// import AdminHeader from "../../views/admin/AdminHeader";
// import AdminSidebar from "./sidebar/AdminSidebar";

// const MainWrapper = styled('div')(() => ({
//   display: 'flex',
//   minHeight: '100vh',
//   width: '100%',
// }));

// const PageWrapper = styled('div')(() => ({
//   display: 'flex',
//   flexGrow: 1,
//   paddingBottom: '60px',
//   flexDirection: 'column',
//   zIndex: 1,
//   backgroundColor: 'transparent',
// }));

// const AdminLayout = () => {

//   const [isSidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

//   return (
//     <MainWrapper className="mainwrapper">
//       {/* ------------------------------------------- */}
//       {/* Sidebar */}
//       {/* ------------------------------------------- */}
//       <AdminSidebar
//         isSidebarOpen={isSidebarOpen}
//         isMobileSidebarOpen={isMobileSidebarOpen}
//         onSidebarClose={() => setMobileSidebarOpen(false)}
//       />
//       {/* ------------------------------------------- */}
//       {/* Main Wrapper */}
//       {/* ------------------------------------------- */}
//       <PageWrapper className="page-wrapper">
//         {/* ------------------------------------------- */}
//         {/* AdminHeader */}
//         {/* ------------------------------------------- */}
//         <AdminHeader
//           toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
//           toggleMobileSidebar={() => setMobileSidebarOpen(true)}
//         />
//         {/* ------------------------------------------- */}
//         {/* PageContent */}
//         {/* ------------------------------------------- */}
//         <Container
//           sx={{
//             paddingTop: "20px",
//             maxWidth: "1200px",
//           }}
//         >
//           {/* ------------------------------------------- */}
//           {/* Page Route */}
//           {/* ------------------------------------------- */}
//           <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
//             <Outlet />
//           </Box>
//           {/* ------------------------------------------- */}
//           {/* End Page */}
//           {/* ------------------------------------------- */}
//         </Container>
//       </PageWrapper>
//     </MainWrapper>
//   );
// };

// export default AdminLayout;
import React, { useState } from 'react';
import { styled, Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AdminHeader from "../../views/admin/AdminHeader";
import AdminSidebar from "./sidebar/AdminSidebar";

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const AdminLayout = () => {
  // Sidebar state for both desktop and mobile
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Toggle functions
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle desktop sidebar
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(true); // Open mobile sidebar
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false); // Close mobile sidebar
  };

  return (
    <MainWrapper className="mainwrapper">
      {/* Sidebar Component */}
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={closeMobileSidebar}
      />
      {/* Main Wrapper */}
      <PageWrapper className="page-wrapper">
        {/* Admin Header */}
        <AdminHeader
          toggleSidebar={toggleSidebar}
          toggleMobileSidebar={toggleMobileSidebar}
        />
        {/* Page Content */}
        <Container
          sx={{
            paddingTop: '20px',
            maxWidth: '1200px',
          }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            {/* The content rendered by the Outlet (dynamic routes) */}
            <Outlet />
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default AdminLayout;
