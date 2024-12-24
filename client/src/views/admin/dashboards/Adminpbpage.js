import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import BreadcrumbComponent from "../../../components/shared/BreadCrumbComponent";

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

  const handleInspect = () =>{
    document.addEventListener('contextmenu', (e) => e.preventDefault());

  function ctrlShiftKey(e, keyCode) {
    return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
  }

  document.onkeydown = (e) => {
    // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
    if (
      event.keyCode === 123 ||
      ctrlShiftKey(e, 'I') ||
      ctrlShiftKey(e, 'J') ||
      ctrlShiftKey(e, 'C') ||
      (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
    )
      return false;
  };
  }

  return (
    <>
      <BreadcrumbComponent
        breadcrumbTitle1="Dashboard"
        breadcrumbRoute1="/admin/dashboard"
        breadcrumbTitle2={dashboard.dashboard_name}
        breadcrumbRoute2={null} // Ensure second breadcrumb is unclickable
        marginTop="60px" // Minimal margin to reduce space
      />
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
        <div
            onContextMenu={(event) => event.preventDefault()} // Disable right-click
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10,
              backgroundColor: "transparent", // Keep it transparent
            }}
            onLoad={handleInspect}
          >
          </div>
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
