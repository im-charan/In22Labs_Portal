import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, CardContent, Typography, Grid } from "@mui/material";
// import img1 from "src/assets/images/products/s4.png";
// import img2 from "src/assets/images/products/s5.png";
// import img3 from "src/assets/images/products/s7.png";
// import img4 from "src/assets/images/products/s11.png";
import BlankCard from "../../../components/shared/BlankCard";
import BreadcrumbComponent from "../../../components/shared/BreadCrumbComponent";
import img from "../../../assets/images/products/analytics.png"

const ecoCard = [
  { id: 1, title: "Financial Dashboard", photo: img },
  { id: 2, title: "Statistical Dashboard", photo: img },
  { id: 3, title: "Inventorial Dashboard", photo: img },
  { id: 4, title: "Readable Dashboard", photo: img},
];

const Blog = () => {
  const [breadcrumbsTitle, setBreadcrumbsTitle] = useState("Overview");

  // Function to handle setting the breadcrumb title
  const handleClick = (title) => {
    setBreadcrumbsTitle(title);
  };

  useEffect(() => {
    // This effect ensures that the title is set before rendering BreadcrumbComponent
  }, [breadcrumbsTitle]);

  return (
    <>
      {/* Breadcrumb component displaying the title */}
      <BreadcrumbComponent
        pageTitle="Welcome to In22labs Analytics Portal"
        breadcrumbTitle1="Dashboard"
        breadcrumbRoute1="/dashboard"
      />

      {/* Add space between BreadcrumbComponent and Grid */}
      <Box sx={{ mt: 3 }}>
        {/* Grid containing the ecoCard items */}
        <Grid container spacing={3}>
          {ecoCard.map((product) => (
            <Grid item sm={12} md={4} lg={3} key={product.id}>
              <BlankCard>
                <Typography
                  component={Link}
                  onClick={() => handleClick(product.title)} // Set title on click
                  to={`/dashboard/product/${product.id}`}
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

export default Blog;
