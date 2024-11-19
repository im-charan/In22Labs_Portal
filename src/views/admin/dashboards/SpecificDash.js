import React from "react";
import { Link, useParams } from "react-router-dom";
import { CardContent, Typography, Grid, Box } from "@mui/material";
import img1 from "src/assets/images/products/s4.png";
import img2 from "src/assets/images/products/s5.png";
import img3 from "src/assets/images/products/s7.png";
import img4 from "src/assets/images/products/s11.png";
import BlankCard from "../../../components/shared/BlankCard"; // Adjusted path
import BreadcrumbComponent from "../../../components/shared/BreadCrumbComponent";
import AdminHeader from "../AdminHeader";

const ecoCard = [
  { id: 1, title: "Overview 1", photo: img1 },
  { id: 2, title: "Overview 2", photo: img2 },
  { id: 3, title: "Overview 3", photo: img3 },
  { id: 4, title: "Overview 4", photo: img4 },
];

const SpecificDash = () => {
  const { organizationName } = useParams();
  console.log("organizationName:", organizationName);

  return (
    <>
      <AdminHeader />
      {/* Breadcrumb Component */}
      <BreadcrumbComponent
        pageTitle={organizationName}
        breadcrumbTitle1="User"
        breadcrumbRoute1="/admin/users"
        breadcrumbTitle2={organizationName}
        breadcrumbRoute2={`/admin/dashboard/${organizationName}`}
        marginTop="70px"
      />
      {/* Add spacing below the breadcrumb */}
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {ecoCard.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <BlankCard>
                <Typography
                  component={Link}
                  to={`/admin/dashboards/${organizationName}`}
                >
                  <img src={product.photo} alt={product.title} width="100%" />
                </Typography>
                <CardContent sx={{ p: 3, pt: 2 }}>
                  <Typography variant="h6">{product.title}</Typography>
                </CardContent>
              </BlankCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default SpecificDash;
