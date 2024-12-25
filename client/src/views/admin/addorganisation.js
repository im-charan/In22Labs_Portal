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
  const [logo, setLogo] = useState(null); // State for storing logo
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Client-Side Validation
  const validateInputs = () => {
    if (!organizationName.trim()) return "Organisation Name is required.";
    if (organizationName.trim().length > 50)
      return "Organisation Name cannot exceed 50 characters.";
    if (!type) return "Type of Organisation is required.";
    if (!address.trim() || address.trim().length < 10)
      return "Address must be at least 10 characters long.";
    if (!logo) return "Organisation Logo is required.";
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage(null);

    const validationError = validateInputs();
    if (validationError) {
      setStatusMessage({ type: "error", text: validationError });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("org_name", organizationName.trim());
    formData.append("org_type", type);
    formData.append("org_address", address.trim());
    formData.append("org_logo", logo); // Append logo file

    try {
      const response = await fetch(
        "http://localhost:5000/api/organisation/create",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create organisation.");
      }

      setStatusMessage({
        type: "success",
        text: "Organisation successfully created!",
      });

      // Reset form fields
      setOrganizationName("");
      setType("");
      setAddress("");
      setLogo(null);
      document.getElementById("logo-input").value = "";

      // Clear the status message after 3 seconds
      setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
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
            helperText="Maximum 50 characters allowed."
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
            <MenuItem value="Admin">Admin</MenuItem>
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

          <TextField
            id="logo-input"
            type="file"
            fullWidth
            required
            onChange={(e) => setLogo(e.target.files[0])}
            disabled={isSubmitting}
            helperText="Upload an organisation logo (JPEG/PNG only)."
            inputProps={{ accept: "image/png, image/jpeg" }}
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