import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Grid, Paper } from "@mui/material";
import BreadcrumbComponent from "../components/shared/BreadCrumbComponent";
import { useUser } from "src/views/authentication/auth/UserContext";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null); // State for user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const { user } = useUser(); // Access user data from context
  const userId = user?.user_id; 
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/client/user/${userId}`); // Replace with your API endpoint
        const result = await response.json();

        if (response.ok && result.success) {
          setUserData(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="h6">Loading user data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <BreadcrumbComponent
        pageTitle="User Profile"
        breadcrumbTitle1="Dashboard"
        breadcrumbRoute1="/dashboard"
        breadcrumbTitle2="User Profile"
        breadcrumbRoute2="/dashboard/ProfilePage"
      />
      <Box sx={{ padding: 2 }}>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          {/* Profile Image and Name */}
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              src={userData.image_url || "src/assets/images/profile/user-placeholder.jpg"}
              alt="User Profile"
              sx={{ width: 80, height: 80, marginRight: 2 }}
            />
            <Typography variant="h5">{userData.user_fullname}</Typography>
          </Box>

          {/* User Details */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Organization:
              </Typography>
              <Typography variant="body1">{userData.organization_name || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Account Created On:
              </Typography>
              <Typography variant="body1">
                {new Date(userData.user_create).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Account Valid Until:
              </Typography>
              <Typography variant="body1">
                {userData.valid_till
                  ? new Date(userData.valid_till).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Number of Dashboards:
              </Typography>
              <Typography variant="body1">{userData.dashboard_count || 0}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Email:
              </Typography>
              <Typography variant="body1">{userData.user_email}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default ProfilePage;
