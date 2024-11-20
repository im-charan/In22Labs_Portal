import React from "react";
import { useParams } from "react-router-dom";
import { Box, CardContent, Typography } from "@mui/material";
import BlankCard from "../../../components/shared/BlankCard";
import img1 from "src/assets/images/products/s4.png";
import img2 from "src/assets/images/products/s5.png";
import img3 from "src/assets/images/products/s7.png";
import img4 from "src/assets/images/products/s11.png";
import BreadcrumbComponent from "../../../components/shared/BreadCrumbComponent";
import img from "../../../assets/images/products/analytics.png"

const ecoCard = [
  { id: 1, title: "Financial Dashboard", photo: img },
  { id: 2, title: "Statistical Dashboard", photo: img },
  { id: 3, title: "Inventorial Dashboard", photo: img},
  { id: 4, title: "Readable Dashboard", photo: img },
];

const Pbpage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const product = ecoCard.find((item) => item.id === parseInt(id)); // Find the product by ID

  if (!product) {
    return <Typography>Product not found.</Typography>;
  }

  return (
    <>
      {/* Breadcrumb component */}
      <BreadcrumbComponent
        pageTitle={product.title}
        breadcrumbTitle1="Dashboard"
        breadcrumbRoute1="/dashboard"
        breadcrumbTitle2={product.title}
        breadcrumbRoute2={`/dashboard/product/${product.id}`}
      />
      <Box sx={{ mt: 2 }}>
        <BlankCard>
          <Box sx={{ p: 1 }}>
            <Typography component="div">
              <Box
                sx={{
                  p: 1,                   // Padding inside this Box for consistent spacing
                  border: "1px solid transparent", 
                  borderRadius: "12px", 
                  overflow: "hidden", 
                }}
              >
                <img src={product.photo} alt={product.title} width="100%" />
              </Box>
            </Typography>
          </Box>
        </BlankCard>
      </Box>
    </>
  );
};

export default Pbpage;
