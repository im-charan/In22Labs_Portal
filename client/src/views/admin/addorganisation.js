import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
} from "@mui/material";
import BreadcrumbComponent from "../../components/shared/BreadCrumbComponent";
import AdminHeader from "./AdminHeader";

const AddOrganisation = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [statusMessage, setStatusMessage] = useState(null); // For success or error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  // Client-Side Validation
  const validateInputs = () => {
    if (!organizationName.trim()) return "Organisation Name is required.";
    if (organizationName.trim().length > 50)
      return "Organisation Name cannot exceed 50 characters.";
    if (!type) return "Type of Organisation is required.";
    if (!address.trim() || address.trim().length < 10)
      return "Address must be at least 10 characters long.";
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage(null);

    // Validate inputs before submission
    const validationError = validateInputs();
    if (validationError) {
      setStatusMessage({ type: "error", text: validationError });
      return;
    }

    setIsSubmitting(true);

    const newOrganisation = {
      org_name: organizationName.trim(),
      org_type: type,
      org_address: address.trim(),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/organisation/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrganisation),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create organisation");
      }

      const result = await response.json();
      setStatusMessage({
        type: "success",
        text: "Organisation successfully created!",
      });

      // Reset form fields after successful submission
      setOrganizationName("");
      setType("");
      setAddress("");
    } catch (error) {
      console.error("Error creating organisation:", error.message);
      setStatusMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <BreadcrumbComponent
        pageTitle="Add Organisation"
        breadcrumbTitle1="Organisation"
        breadcrumbRoute1="/admin/organisation"
        breadcrumbTitle2="Add Organisation"
        breadcrumbRoute2="/admin/addorganisation"
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
            Add Organisation
          </Typography>

          <TextField
            label="Organisation Name"
            variant="outlined"
            fullWidth
            required
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            disabled={isSubmitting}
            helperText={
              organizationName.length > 50
                ? "Maximum 50 characters allowed!"
                : "Maximum 50 characters allowed."
            }
            error={organizationName.length > 50}
            inputProps={{ maxLength: 51 }}
          />

          <TextField
            label="Type of Organisation"
            variant="outlined"
            fullWidth
            select
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={isSubmitting}
          >
            <MenuItem value="Agriculture">Agriculture</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Retail">Retail</MenuItem>
          </TextField>

          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            multiline
            rows={4}
            disabled={isSubmitting}
            helperText="At least 10 characters required."
            error={address.trim().length < 10 && address.trim().length > 0}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>

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

export default AddOrganisation;
