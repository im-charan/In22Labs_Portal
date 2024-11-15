import React from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom

const BreadcrumbComponent = ({pageTitle,breadcrumbTitle1,
    breadcrumbRoute1,
    breadcrumbTitle2,
    breadcrumbRoute2, }) => {
  return (
    <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
      {/* Page Title */}
     {/* Conditionally Centered Page Title */}
     {pageTitle && (
        <Typography 
          variant="h3"
          sx={{
            textAlign: pageTitle === "Welcome to In22labs Analytics Portal" ? 'center' : 'left', // Center only for this specific title
            fontWeight: 'bold',
            color: 'text.primary',
            mb: 2, 
          }}
        >
          {pageTitle}
        </Typography>
      )}
      <br />

      {/* Breadcrumbs */}
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          justifyContent: 'left',
          display: 'flex',
          flexWrap: 'wrap',
          textAlign: 'left',
        }}
      >
        {/*Breadcrumbs level1 */}
        {breadcrumbTitle1 && (
          <Link
            component={RouterLink}
            to={breadcrumbRoute1 || '/'}
            underline="hover"
            color="inherit"
          >
            {breadcrumbTitle1}
          </Link>
        )}


          {/* Breadcrumb Level 2 */}
        {breadcrumbTitle2 && (
          <Link
            component={RouterLink}
            to={breadcrumbRoute2 || '/'}
            underline="hover"
            color="inherit"
          >
            {breadcrumbTitle2}
          </Link>
        )}
       
      </Breadcrumbs>
      <br />
    </Box>
  );
};

export default BreadcrumbComponent;
