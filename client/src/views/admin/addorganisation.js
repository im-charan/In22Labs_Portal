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
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState(null); // For storing the uploaded image
  const [imagePreview, setImagePreview] = useState(null);

  // Client-Side Validation
  const validateInputs = () => {
    if (!organizationName.trim()) return "Organisation Name is required.";
    if (organizationName.trim().length > 50)
      return "Organisation Name cannot exceed 50 characters.";
    if (!type) return "Type of Organisation is required.";
    if (!address.trim() || address.trim().length < 10)
      return "Address must be at least 10 characters long.";
    if (!logoFile) return "Logo is required."; // Ensure logo is uploaded
    return null;
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    const MAX_FILE_SIZE = 1000000; // 1MB

    if (!allowedTypes.includes(file.type)) {
      setLogoFile(null);
      setStatusMessage({
        type: "error",
        text: "Invalid file type. Please upload a JPG or PNG image.",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setLogoFile(null);
      setStatusMessage({
        type: "error",
        text: "File size is too large. Please upload an image smaller than 1MB.",
      });
      return;
    }

    setLogoFile(file);
    setImagePreview(URL.createObjectURL(file));
    setStatusMessage(null); // Clear previous error if valid file is uploaded
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

    // Prepare FormData to send data and file
    const formData = new FormData();
    formData.append("org_name", organizationName.trim());
    formData.append("org_type", type);
    formData.append("org_address", address.trim());
    formData.append("logoFile", logoFile); // Ensure you're appending the file correctly
    
    try {
      const response = await fetch("http://localhost:5000/api/organisation/create", {
        method: "POST",
        body: formData, 
        credentials: "include"// Send form data containing the image file
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create organisation.");
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
      setLogoFile(null);
      setImagePreview(null);
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
            <MenuItem value="Retail">Admin</MenuItem>
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

          {/* Image Upload Field */}
          <Box display="flex" flexDirection="column" gap={1}>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              disabled={isSubmitting}
            />
            {logoFile && (
              <Typography variant="body2">{logoFile.name}</Typography>
            )}
            {imagePreview && (
              <Box
                component="img"
                src={imagePreview}
                alt="logo preview"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  marginTop: 1,
                  borderRadius: 1,
                  border: 1,
                  borderColor: "grey.300",
                }}
              />
            )}
          </Box>

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
