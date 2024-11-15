import React from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom

const BreadcrumbComponent = ({
  pageTitle,
  breadcrumbTitle1,
  breadcrumbRoute1,
  breadcrumbTitle2,
  breadcrumbRoute2,
  marginTop = 0 // Default marginTop to 0 if not provided
}) => {
  return (
    <Box sx={{ flexGrow: 1, textAlign: 'left', marginTop: marginTop }}>
      {/* Page Title */}
      {pageTitle && (
        <Typography
          variant="h3"
          sx={{
            textAlign: pageTitle === "Welcome to In22labs Analytics Portal" ? 'center' : 'left', // Center only for this specific title
            fontWeight: 'bold',
            color: 'text.primary',
            mb: 2, // Margin-bottom for spacing
          }}
        >
          {pageTitle}
        </Typography>
      )}

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
        {/* Breadcrumb Level 1 */}
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
     
    </Box>
  );
};

export default BreadcrumbComponent;
