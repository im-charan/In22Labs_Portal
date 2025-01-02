import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Divider, CircularProgress, TextField, Button, IconButton, Alert } from "@mui/material";
import dayjs from 'dayjs';
import EventIcon from '@mui/icons-material/Event'; // Import the new Event icon
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [backendErrorMessage, setBackendErrorMessage] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
        setUserData({
          user_fullname: data.user_fullname || "",
          user_email: data.user_email || "",
          organization_name: data.organization_name || "N/A",
          valid_till: data.valid_till || "",
          created_at: data.created_at || "",
          user_password_ref: data.user_password_ref || ""
        });
      } catch (error) {
        setBackendErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [userId]);

  const validateFields = () => {
    if (!userData.user_fullname || !userData.user_email) {
      alert("Full name and email are required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.user_email)) {
      alert("Please enter a valid email.");
      return false;
    }
    if (isEditing && !userData.user_password_ref) {
      alert("Password reference is required.");
      return false;
    }
    return true;
  };

  const handleUpdateUser = async () => {
    if (!validateFields()) return;

    if (userData.valid_till) {
      const formattedValidTill = dayjs(userData.valid_till).format("YYYY-MM-DD");
      setUserData((prevData) => ({
        ...prevData,
        valid_till: formattedValidTill,
      }));
    }

    try {
      const response = await fetch(`${backendUrl}/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user.");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      setStatusMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setBackendErrorMessage(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography variant="h6" color="error" sx={{ textAlign: "center", paddingTop: 3 }}>
        User not found!
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", padding: { xs: 2, sm: 3 }, mt: 3 }}>
      <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
        <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 600, color: "primary.main", textAlign: "center" }}>
          {user.user_fullname}'s Profile
        </Typography>

        {statusMessage && !backendErrorMessage && (
          <Box display="flex" justifyContent="flex-start" marginTop={0}>
            <Alert severity={statusMessage.type}>{statusMessage.text}</Alert>
          </Box>
        )}

        {backendErrorMessage && (
          <Box display="flex" justifyContent="flex-start" marginTop={0}>
            <Alert severity="error">{backendErrorMessage}</Alert>
          </Box>
        )}

        <Divider sx={{ marginBottom: 3 }} />

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.secondary" }}>
            Full Name:
          </Typography>
          {isEditing ? (
            <TextField
              name="user_fullname"
              value={userData.user_fullname}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          ) : (
            <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "text.primary" }}>
              {user.user_fullname}
            </Typography>
          )}
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.secondary" }}>
            Email:
          </Typography>
          {isEditing ? (
            <TextField
              name="user_email"
              value={userData.user_email}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          ) : (
            <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "text.primary" }}>
              {user.user_email}
            </Typography>
          )}
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.secondary" }}>
            Organization:
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "text.primary" }}>
            {user.organization_name}
          </Typography>
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.secondary" }}>
            Valid Till:
          </Typography>
          {isEditing ? (
            <TextField
              name="valid_till"
              type="date"
              value={userData.valid_till}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <IconButton edge="start">
                    <EventIcon />
                  </IconButton>
                ),
              }}
            />
          ) : (
            <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "text.primary" }}>
              {user.valid_till ? dayjs(user.valid_till).format("DD/MM/YYYY") : "N/A"}
            </Typography>
          )}
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.secondary" }}>
            Password Reference:
          </Typography>
          {isEditing ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                name="user_password_ref"
                value={userData.user_password_ref}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
              />
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "text.primary" }}>
              {user.user_password_ref || "N/A"}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {isEditing ? (
            <Button variant="contained" onClick={handleUpdateUser}>Save Changes</Button>
          ) : (
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default UserProfile;
