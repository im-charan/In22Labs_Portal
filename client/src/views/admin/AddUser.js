import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, MenuItem, Alert } from "@mui/material";
import BreadcrumbComponent from "../../components/shared/BreadCrumbComponent";
import AdminHeader from "./AdminHeader";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const AddUser = () => {
  const [userFullName, setUserFullName] = useState("");
  const [validFrom, setValidFrom] = useState(dayjs());
  const [validTill, setValidTill] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPasswordRef, setUserPasswordRef] = useState("");
  const [userStatus, setUserStatus] = useState(1); // Default to active
  const [userType, setUserType] = useState(2); // Example default user type
  const [orgId, setOrgId] = useState("");
  const [userIp, setUserIp] = useState("127.0.0.1");
  const [userOs, setUserOs] = useState("Windows");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [organisations, setOrganisations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/organisation");
        if (!response.ok) throw new Error("Error fetching organisations");
        const data = await response.json();
        setOrganisations(data);
      } catch (error) {
        console.error("Error fetching organisations:", error.message);
      }
    };
    fetchOrganisations();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null); // Reset status message

    // Check if orgId is selected
    if (!orgId) {
      console.error("Error: Organization ID is required.");
      setStatusMessage({ type: 'error', text: 'Organization is required.' });
      setIsSubmitting(false);
      return;
    }

    // Construct user object with fallback for IP and OS
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const newUser = {
      user_name: userEmail.split("@")[0],
      valid_from: validFrom?.format("YYYY-MM-DD"),
      valid_till: validTill?.format("YYYY-MM-DD"),
      user_name: userEmail.split('@')[0],
      valid_from: validFrom?.format('YYYY-MM-DD'),
      valid_till: validTill?.format('YYYY-MM-DD'),
      user_email: userEmail,
      user_password_ref: userPasswordRef,
      user_status: userStatus,
      user_fullname: userFullName,
      user_ip: userIp, // Fallback to '127.0.0.1' if not set
      user_os: userOs, // Fallback to 'Windows' if not set
      user_type: userType,
      org_id: orgId,  // Ensure orgId is passed correctly
      user_create: new Date().toISOString(),
      user_update: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();
      console.log("User created successfully:", data);

      // Set success status message
      setStatusMessage({ type: 'success', text: 'User successfully created!' });

      // Reset form inputs after successful creation
      setUserFullName('');
      setValidFrom(null);
      
      
      setUserFullName("");
      setValidFrom(dayjs());
      setValidTill(null);
      setUserEmail('');
      setUserPasswordRef('');
      setOrgId('');
      setUserIp('127.0.0.1'); // Reset to default IP after submission
      setUserOs('Windows'); // Reset to default OS after submission
      setUserEmail("");
      setUserPasswordRef("");
      setOrgId("");
    } catch (error) {
      console.error("Error creating user:", error.message);
      setStatusMessage({ type: 'error', text: 'Error creating user. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <BreadcrumbComponent
        pageTitle="Create User"
        breadcrumbTitle1="User"
        breadcrumbRoute1="/admin/users"
        breadcrumbTitle2="Create"
        breadcrumbRoute2="/admin/createuser"
        marginTop="70px"
      />
      <Box
        margin={5}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        height="100vh"
        padding={2}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          padding={3}
          boxShadow={3}
          borderRadius={2}
          width="600px"
          display="flex"
          flexDirection="column"
          gap={3}
          border={2}
          borderColor="primary.main"
        >
          <Typography variant="h4" textAlign="center" marginBottom={2}>
            Create User
          </Typography>

          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}

          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={userFullName}
            onChange={(e) => setUserFullName(e.target.value)}
            required
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Valid From"
              value={validFrom}
              onChange={(newValue) => setValidFrom(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Valid Till"
              value={validTill}
              onChange={(newValue) => setValidTill(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
          </LocalizationProvider>

          <TextField
            label="Email ID"
            variant="outlined"
            fullWidth
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />

          <TextField
            label="Password Reference"
            variant="outlined"
            fullWidth
            value={userPasswordRef}
            onChange={(e) => setUserPasswordRef(e.target.value)}
            required
          />

          <TextField
            label="Organization"
            variant="outlined"
            fullWidth
            select
            value={orgId}
            onChange={(e) => setOrgId(e.target.value)}
            required
          >
            {organisations.map((org) => (
              <MenuItem key={org.org_id} value={org.org_id}>
                {org.org_name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>

          {/* Status Message */}
          {statusMessage && (
            <Alert severity={statusMessage.type} sx={{ marginTop: 2 }}>
              {statusMessage.text}
            </Alert>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AddUser;
