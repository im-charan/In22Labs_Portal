import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CardContent, Typography, CircularProgress } from "@mui/material";
import BlankCard from "../../../components/shared/BlankCard";
import BreadcrumbComponent from "../../../components/shared/BreadCrumbComponent";

const Pbpage = () => {
  const { orgId, dashboardId } = useParams(); // Extract both orgId and dashboardId
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
  
        const response = await fetch(`http://localhost:5000/api/client/${dashboardId}`);
        console.log("Response:", response);
  
        if (!response.ok) {
          throw new Error(`Failed to fetch dashboard. Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Dashboard data:", data);
  
        // Correctly access the 'data' key from the API response
        setDashboard(data.data);  // Set the 'data' object from the response to your state
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboard();
  }, [dashboardId]); // Depend on dashboardId
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {error || "An unexpected error occurred."}
        </Typography>
      </Box>
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
        pageTitle={dashboard.dashboard_name}
        breadcrumbTitle1="Dashboard"
        breadcrumbRoute1={`/dashboard/${orgId}`}
        breadcrumbTitle2={dashboard.dashboard_name}
        breadcrumbRoute2={`/dashboard/${orgId}/${dashboard.dashboard_id}`}
        marginTop="35px"
      />
      <Box sx={{ mt: 2 }}>
        <BlankCard>
          <Box sx={{ p: 1 }}>
            <Typography component="div">
              {dashboard.dashboard_url ? (
                <>
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
                  width="100%"
                  height="600px"
                  style={{ border: "none" }}
                  />
                </>
              ) : (
                <Typography variant="h6" align="center">
                  Dashboard URL not available.
                </Typography>
              )}
            </Typography>
          
          </Box>
        </BlankCard>
      </Box>
    </>
  );
};

export default Pbpage;
