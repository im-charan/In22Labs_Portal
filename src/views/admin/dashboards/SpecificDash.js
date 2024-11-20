import React from "react";
import { Link, useParams } from "react-router-dom";
import { CardContent, Typography, Grid, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Import AddIcon
import img1 from "src/assets/images/products/s4.png";
import img2 from "src/assets/images/products/s5.png";
import img3 from "src/assets/images/products/s7.png";
import img4 from "src/assets/images/products/s11.png";
import BlankCard from "../../../components/shared/BlankCard"; // Adjusted path
import BreadcrumbComponent from "../../../components/shared/BreadCrumbComponent";
import AdminHeader from "../AdminHeader";

const ecoCard = [
  { id: 1, title: "Financial Dashboard", photo: img1 },
  { id: 2, title: "Statistical Dashboard", photo: img2 },
  { id: 3, title: "Inventorial Dashboard", photo: img3 },
  { id: 4, title: "Readable Dashboard", photo: img4 },
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
        marginTop="70px"
      />
      {/* Add spacing below the breadcrumb */}
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {/* Render dashboards if available */}
          {ecoCard.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <BlankCard sx={cardStyle}>
                <Box sx={{ width: "100%", overflow: "hidden" }}>
                  <img
                    src={product.photo}
                    alt={product.title}
                    width="100%"
                  />
                </Box>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6">{product.title}</Typography>
                </CardContent>
              </BlankCard>
            </Grid>
          ))}
          {/* Add Dashboard Card Always */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/admin/organisation/${organizationName}/add-dashboard`}>
              <BlankCard
                sx={{
                  ...cardStyle,
                  cursor: "pointer", // Make it clickable
                  mt: ecoCard.length === 0 ? 0 : 3, // Add margin-top to separate it from other cards
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                      transition: "background-color 0.3s ease", // Smooth transition
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)", // Hover color effect
                      },
                    }}
                  >
                    <AddIcon fontSize="large" sx={{ color: "gray" }} />
                  </Box>
                </Box>
              </BlankCard>
            </Link>
          </Grid>
        </Grid>
        {/* No Dashboards Message */}
        {ecoCard.length === 0 && (
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "gray", mt: 4 }}
          >
            No dashboards available
          </Typography>
        )}
      </Box>
    </>
  );
};

export default SpecificDash;
