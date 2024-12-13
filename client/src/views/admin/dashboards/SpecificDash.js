import React from "react";
import { Link, useParams } from "react-router-dom";
import { CardContent, Typography, Grid, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
//import img from "../../../assets/images/products/analytics.png"

import BlankCard from "../../../components/shared/BlankCard"; // Adjusted path
import BreadcrumbComponent from "../../../components/shared/BreadCrumbComponent";
import AdminHeader from "../AdminHeader";
import noDashboardsImage from "src/assets/images/backgrounds/empd.jpg"; // Path to your image

const ecoCard = [
  // { id: 1, title: "Financial Dashboard", photo: img },
  // { id: 2, title: "Statistical Dashboard", photo: img},
  // { id: 3, title: "Inventorial Dashboard", photo: img },
  // { id: 4, title: "Readable Dashboard", photo: img },
]; // Example with dashboards

const SpecificDash = () => {
  const { organizationName } = useParams();
  console.log("organizationName:", organizationName);

  const cardStyle = {
    height: "250px", // Ensure all cards have the same height
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <>
      <AdminHeader />
      {/* Breadcrumb Component */}
      <BreadcrumbComponent
        pageTitle={organizationName}
        breadcrumbTitle1="Organisation"
        breadcrumbRoute1="/admin/organisation"
        breadcrumbTitle2={organizationName}
        breadcrumbRoute2={`/admin/organisation/${organizationName}`}
        marginTop="60px"
      />
      {/* Add spacing below the breadcrumb */}
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {/* Render dashboards if available */}
          {ecoCard.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <BlankCard sx={cardStyle}>
                <Box sx={{ width: "100%", overflow: "hidden" }}>
                  <img src={product.photo} alt={product.title} width="100%" />
                </Box>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6">{product.title}</Typography>
                </CardContent>
              </BlankCard>
            </Grid>
          ))}
          {/* Add Dashboard Card Always */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
  <Link to={`/admin/organisation/${organizationName}/add-dashboard`}
  style={{ textDecoration: "none" }}>
    <BlankCard
      sx={{
        ...cardStyle,
        cursor: "pointer", // Make it clickable
        mt: ecoCard.length === 0 ? 0 : 3, // Add margin-top to separate it from other cards
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effect
        "&:hover": {
          transform: "scale(1.05)", // Slight zoom on hover
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)", // Enhanced shadow
        },
        backgroundColor: "primary.light", // Light primary background
        borderRadius: 2, // Rounded corners
        textAlign: "center", // Center align text
        p: 2, // Padding for spacing
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column", // Stack icon and text vertically
          width: "100%",
          height: "190px",
        }}
      >
        {/* Add Icon with hover effect */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px", // Space around the icon
            borderRadius: "50%", // Circular background around the icon
            backgroundColor: "primary.light", // Light primary background
            transition: "background-color 0.3s ease, transform 0.3s ease", // Smooth transition
            "&:hover": {
              backgroundColor: "primary.main", // Primary color on hover
              transform: "scale(1.1)", // Fun hover animation
            },
            mb: 1.5, // Add spacing below the icon
          }}
        >
          <AddIcon fontSize="large" sx={{ color: "grey.500" }} />
        </Box>
        {/* Add Dashboard Text */}
        <Typography
          variant="body1"
          sx={{
            color: "grey.500", // Text color
            fontWeight: "500", // Slightly bold text
          }}
        >
          Add Dashboard
        </Typography>
      </Box>
    </BlankCard>
  </Link>
</Grid>


        </Grid>
{/* No Dashboards Message with Image */}
{ecoCard.length === 0 && (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      mt: -18, // Add margin-top for spacing
    }}
  >
    {/* Add Image */}
    <Box
      component="img"
      src={noDashboardsImage} // Image path
      alt="No dashboards available"
      sx={{
        width: "500px", // Increased width
        height: "auto", // Maintain aspect ratio
        mb: 3, // Add margin-bottom for spacing between image and text
        display: "block", // Ensure the image is treated as a block element
      }}
    />
    {/* Add Text */}
    <Typography variant="h6" align="center" sx={{ color: "gray" }}>
      No dashboards available
    </Typography>
  </Box>
)}
      </Box>
    </>
  );
};

export default SpecificDash;
