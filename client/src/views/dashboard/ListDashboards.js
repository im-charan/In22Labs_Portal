import React, { useEffect, useState } from "react";
import { CardContent, Grid, Typography } from "@mui/material";
import BlankCard from "../../components/shared/BlankCard";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../assets/images/products/dashboard.jpg"; // Local image
import BreadcrumbComponent from "../../components/shared/BreadCrumbComponent";

const ListDashboards = () => {
  const navigate = useNavigate();
  const { orgId } = useParams(); // Extract organization ID
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboards data from API
  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/client/organisation/${orgId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setDashboards(result.data || []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching dashboards:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboards();
  }, [orgId]);

  const handleNavigation = (dashboardId) => {
    navigate(`/dashboard/${orgId}/${dashboardId}`); // Navigates to Pbpage
  };

  if (loading) {
    return <Typography>Loading dashboards...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <>
    <BreadcrumbComponent
      pageTitle="Dashboard"
     marginTop="15px"
     />
     <br></br>
    <Grid container spacing={3}>
      {dashboards.map((dashboard) => (
        <Grid item sm={12} md={4} lg={3} key={dashboard.dashboard_id}>
          <BlankCard>
            <Typography
              component="div"
              onClick={() => handleNavigation(dashboard.dashboard_id)}
              style={{ cursor: "pointer" }} // Pointer cursor for clickable cards
            >
              <img
                src={img}
                alt={dashboard.dashboard_name}
                width="100%"
                loading="lazy"
              />
            </Typography>
            <CardContent sx={{ p: 3, pt: 2 }}>
              <Typography variant="h5">{dashboard.dashboard_name}</Typography>
              <Typography variant="subtitle1">{dashboard.org_name}</Typography>
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default ListDashboards;
