import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  CardContent,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [open, setOpen] = useState(false);
  const [dashboardToDelete, setDashboardToDelete] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const cardStyle = {
    height: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const handleOpen = (dashboardId) => {
    console.log(dashboardId);
    setDashboardToDelete(dashboardId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDashboardToDelete(null);
  };

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        setLoading(true);
        setError(null);

        const encodedOrgName = encodeURIComponent(organizationName);
        const orgIdResponse = await fetch(
         ` ${backendUrl}/api/dashboard/getIdByName/${encodedOrgName}`
        );

        if (!orgIdResponse.ok) {
          throw new Error("Failed to fetch organization ID");
        }

        const { org_id } = await orgIdResponse.json();

        const dashboardsResponse = await fetch(
         ` ${backendUrl}/api/dashboard/organisation/${org_id}`
        );

        if (!dashboardsResponse.ok) {
          throw new Error("Failed to fetch dashboards");
        }
        setDashboards((prevDashboards) =>
          prevDashboards.filter((dashboard) => dashboard.dashboard_id !== dashboardToDelete)
        );
        const { data } = await dashboardsResponse.json();
        setDashboards(data || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
        handleClose();
      }
    };

    fetchDashboards();
  }, [organizationName]);

  const deleteDashboard = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/dashboard/delete/${dashboardToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete dashboard");
      }

      // Remove the deleted dashboard from the state
      setDashboards((prevDashboards) =>
        prevDashboards.filter((dashboard) => dashboard.dashboard_id !== dashboardToDelete)
      );
      handleClose();
    } catch (err) {
      console.error(err);
      setError(err.message);
      handleClose();
    }
  };

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
                  <BlankCard sx={cardStyle}>
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
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                      <Link
                        to={`${dashboard.dashboard_id}`}
                        style={{ textDecoration: "none", flexGrow: 1 }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ textAlign: "center", color: "primary.main" }}
                        >
                          View
                        </Typography>
                      </Link>
                      <IconButton
                        onClick={() => handleOpen(dashboard.dashboard_id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </BlankCard>
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
      <Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="delete-confirmation-dialog"
>
  <DialogTitle id="delete-confirmation-dialog">
    Confirm Deletion
  </DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete this dashboard? This action cannot be undone.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button onClick={deleteDashboard} color="error">
      Delete
    </Button>
  </DialogActions>
</Dialog>

    </>
  );
};

export default SpecificDash;