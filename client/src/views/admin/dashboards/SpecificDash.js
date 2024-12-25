import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import BlankCard from "../../../components/shared/BlankCard";
import AdminHeader from "../AdminHeader";
import BreadcrumbComponent from "../../../components/shared/BreadCrumbComponent";
import noDashboardsImage from "src/assets/images/backgrounds/empd.jpg";
import img from "../../../assets/images/products/analytics.png";

const SpecificDash = () => {
  const { organizationName } = useParams();
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cardStyle = {
    height: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        setLoading(true);
        setError(null);

        const encodedOrgName = encodeURIComponent(organizationName);
        const orgIdResponse = await fetch(
          `http://localhost:5000/api/dashboard/getIdByName/${encodedOrgName}`
        );

        if (!orgIdResponse.ok) {
          throw new Error("Failed to fetch organization ID");
        }

        const { org_id } = await orgIdResponse.json();

        const dashboardsResponse = await fetch(
          `http://localhost:5000/api/dashboard/organisation/${org_id}`
        );

        if (!dashboardsResponse.ok) {
          throw new Error("Failed to fetch dashboards");
        }

        const { data } = await dashboardsResponse.json();
        setDashboards(data || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboards();
  }, [organizationName]);

  return (
    <>
      <AdminHeader />
      <BreadcrumbComponent
        pageTitle={organizationName}
        breadcrumbTitle1="Organisation"
        breadcrumbRoute1="/admin/organisation"
        breadcrumbTitle2={organizationName}
        breadcrumbRoute2={`/admin/organisation/${organizationName}`}
        marginTop="60px"
      />
      <Box sx={{ mt: 3 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {dashboards.map((dashboard) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={dashboard.dashboard_id}
                >
                  <Link
                    to={`${dashboard.dashboard_id}`} // Dynamic link to Pbpage
                    style={{ textDecoration: "none" }}
                  >
                    <BlankCard sx={{ ...cardStyle, cursor: "pointer" }}>
                      <Box sx={{ width: "100%", overflow: "hidden" }}>
                        <img
                          src={img}
                          alt={dashboard.dashboard_name}
                          width="100%"
                          style={{
                            maxHeight: "150px",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="h6">
                          {dashboard.dashboard_name}
                        </Typography>
                      </CardContent>
                    </BlankCard>
                  </Link>
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Link
                  to={`/admin/organisation/${organizationName}/add-dashboard`}
                  style={{ textDecoration: "none" }}
                >
                  <BlankCard
                    sx={{
                      ...cardStyle,
                      cursor: "pointer",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                      },
                      backgroundColor: "primary.light",
                      borderRadius: 2,
                      textAlign: "center",
                      p: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "100%",
                        height: "190px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "8px",
                          borderRadius: "50%",
                          backgroundColor: "primary.light",
                          "&:hover": {
                            backgroundColor: "primary.main",
                          },
                          mb: 1.5,
                        }}
                      >
                        <AddIcon fontSize="large" sx={{ color: "grey.500" }} />
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{ color: "grey.500", fontWeight: 500 }}
                      >
                        Add Dashboard
                      </Typography>
                    </Box>
                  </BlankCard>
                </Link>
              </Grid>
            </Grid>
            {dashboards.length === 0 && (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      mt: 5,
    }}
  >
    <Box
      component="img"
      src={noDashboardsImage}
      alt="No dashboards available"
      sx={{
        maxWidth: "100%",
        maxHeight: "150px",
        objectFit: "contain",
        mb: 3,
      }}
    />
    <Typography variant="h6" align="center" color="textSecondary">
      No dashboards available
    </Typography>
  </Box>
)}

          </>
        )}
      </Box>
    </>
  );
};

export default SpecificDash;
