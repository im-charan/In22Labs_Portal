import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, MenuItem, Alert } from "@mui/material";
import BreadcrumbComponent from "../../components/shared/BreadCrumbComponent";
import AdminHeader from "./AdminHeader";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { set } from "lodash";

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
  const [statusMessage, setStatusMessage] = useState(null); // Success or error messages
  const [errorMessage, setErrorMessage] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/organisation`);
        if (!response.ok) throw new Error("Error fetching organisations");
        const data = await response.json();
        setOrganisations(data);
      } catch (error) {
        console.error("Error fetching organisations:", error.message);
      }
    };
    fetchOrganisations();
  }, []);

  const validateForm = () => {
    if (!/^[a-zA-Z\s]+$/.test(userFullName)) {
      setStatusMessage({ type: "error", text: "Full name should contain only alphabets and spaces." });
      return false;
    }

    if (validFrom && validFrom.isBefore(dayjs(), "day")) {
      setStatusMessage({ type: "error", text: "Valid From date must be today or a future date." });
      return false;
    }

    if (validFrom && validTill && validTill.isBefore(validFrom, "day")) {
      setStatusMessage({ type: "error", text: "Valid Till date must be after Valid From date." });
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(userEmail)) {
      setStatusMessage({ type: "error", text: "Invalid email format." });
      return false;
    }

    if (userPasswordRef.length < 6) {
      setStatusMessage({ type: "error", text: "Password must be at least 6 characters long." });
      return false;
    }
    setErrorMessage(null);
    setStatusMessage(null);
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const newUser = {
      user_name: userEmail.split("@")[0],
      valid_from: validFrom?.format("YYYY-MM-DD"),
      valid_till: validTill?.format("YYYY-MM-DD"),
      user_email: userEmail,
      user_password_ref: userPasswordRef,
      user_status: userStatus,
      user_fullname: userFullName,
      user_ip: userIp,
      user_os: userOs,
      user_type: userType,
      org_id: parseInt(orgId, 10),
      user_create: new Date().toISOString(),
      user_update: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${backendUrl}/api/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
        if (response.status === 409) {
          // Handle email conflict
          setErrorMessage(
            "Email ID already exists. Please use a different email."
          );
          setIsSubmitting(false);
          return;
        }

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message && errorData.message.includes("Email ID already exists")) {
          setErrorMessage("Email already exists. Please use a different email address.");
        } else {
          setErrorMessage(
            "Email already exists. Please use a different email address."
          );
        }
        setIsSubmitting(false);
        return;
      }

      const result = await response.json();
      console.log("User created successfully:", result);

      setStatusMessage({
        type: "success",
        text: "User successfully created!",
      });

      setTimeout(() => {
        setStatusMessage(null);
        setErrorMessage(null);
      }, 3000);
      // Reset form fields after successful submission
      setUserFullName("");
      setValidFrom(dayjs());
      setValidTill(null);
      setUserEmail("");
      setUserPasswordRef("");
      setOrgId("");
    } catch (error) {
      console.error("Error creating user:", error.message);
      setErrorMessage("An unexpected error occurred.");
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
          {statusMessage && !errorMessage &&(
            <Box display="flex" justifyContent="flex-start" marginTop={0}>
              <Alert severity={statusMessage.type}>{statusMessage.text}</Alert>
            </Box>
          )}
          {errorMessage && (
            <Box display="flex" justifyContent="flex-start" marginTop={0}>
              <Alert severity="error">{errorMessage}</Alert>
            </Box>
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
              minDate={dayjs()} // Disables previous dates before today
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
              minDate={validFrom || dayjs()} // Disables dates before "Valid From"
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
            label="Password"
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

          
        </Box>
      </Box>
    </>
  );
};

export default AddUser;