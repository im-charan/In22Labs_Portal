import React, { useEffect, useState } from "react";
import { CardContent, Grid, List, Typography } from "@mui/material";
import BlankCard from "../../components/shared/BlankCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import img from "../../assets/images/products/dashboard.jpg"; // Import your local image here
import DashboardCard from "../../components/shared/DashboardCard";

const ListDashboards = () => {
  const navigate = useNavigate();
  const {orgId} = useParams();
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboards data from API
  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(http://localhost:5000/api/dashboard/organisation/${orgId}); // Adjust the API endpoint
        console.log(orgId);
        if (!response.ok) {
          throw new Error(HTTP error! status: ${response.status});
        }
        const result = await response.json();
        if (result?.data) {
          setDashboards(result.data); // Ensure to extract data correctly
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching dashboards:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboards();
  }, []);

  const handleNavigation = (url) => {
    window.location.href = url;
  };

  if (loading) {
    return <Typography>Loading dashboards...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <DashboardCard >
            <Grid container spacing={3}>
              {dashboards.map((dashboard) => (
          <Grid item sm={12} md={4} lg={3} key={dashboard.dashboard_id}>
            <BlankCard>
              <Typography
                component={Link}
                onClick={() => handleNavigation(dashboard.dashboard_url)}
              >
                {/* If dashboard has no URL, use a default image */}
                      <img
                  src={img} // Use local image if URL is missing
                        alt={dashboard.dashboard_name}
                        width="100%"
                  loading="lazy" // Improves performance by lazy-loading images
                      />
              </Typography>
              <CardContent sx={{ p: 3, pt: 2 }}>
                <Typography variant="h5">{dashboard.dashboard_name}</Typography>
                <Typography variant="subtitle1">
                  {dashboard.org_name}
                      </Typography>
                    </CardContent>
                  </BlankCard>
                </Grid>
              ))}
            </Grid>
    </DashboardCard>
  );
};

export default ListDashboards;