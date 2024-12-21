import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
// import BreadcrumbComponent from "../../../components/shared/BreadCrumbComponent";

const Adminpbpage = () => {
  const { id } = useParams(); // Get 'id' from the URL
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Fetch the dashboard metadata (name, URL, etc.)
        const response = await fetch(`http://localhost:5000/api/dashboard/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch dashboard. Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        // The actual dashboard data is nested under 'data'
        setDashboard(data.data); // Set the fetched dashboard data
  
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setDashboard(null); // Reset dashboard to null on error
      } finally {
        setLoading(false); // Stop loading state
      }
    };
  
    fetchDashboard();
  }, [id]); // Depend on the 'id' parameter
  

  if (loading) {
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  }

  if (!dashboard) {
    return (
      <Typography variant="h6" align="center">
        Dashboard not found.
      </Typography>
    );
  }

  return (
    <>
   
    <Box sx={{ mt: 4, textAlign: "center" }}>
     
      <Box
        sx={{
          mt: 2,
          height: "600px", // Set height for iframe
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
       
        <iframe
          src={dashboard.dashboard_url} 
          title={dashboard.dashboard_name}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          loading="lazy"
        />
      </Box>
    </Box>
    </>
  );
};

export default Adminpbpage;
