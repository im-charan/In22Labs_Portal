import React, { useEffect, useState } from "react";
import { CardContent, Grid, Typography } from "@mui/material";
import BlankCard from "../../components/shared/BlankCard";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../assets/images/products/dashboard.jpg"; // Local image
import fallbackImg from "../../assets/images/backgrounds/empd.jpg"; // Fallback image
import BreadcrumbComponent from "../../components/shared/BreadCrumbComponent";

const ListDashboards = () => {
  const navigate = useNavigate();
  const { orgId } = useParams(); // Extract organization ID
  const [dashboards, setDashboards] = useState([]);
  const [count, setCount] = useState(0); // Dashboard count
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // Fetch dashboards data from API
  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${backendUrl}/api/client/organisation/${orgId}`
        );
        const result = await response.json();

        if (response.ok && result.success) {
          setDashboards(result.data || []);
          setCount(result.count || 0);
        } else {
          throw new Error(result.message || "Failed to fetch dashboards");
        }
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
      <BreadcrumbComponent pageTitle="Dashboard" marginTop="15px" />
      <br />
      {count === 0 ? (
        <div style={{ textAlign: "center" }}>
          <img
            src={fallbackImg}
            alt="No dashboards available"
            width="40%"
            style={{ opacity: 0.7 }}
          />
          <Typography
            variant="h6"
            color="textSecondary"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            No dashboards available
          </Typography>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default ListDashboards;
