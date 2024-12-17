import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import BreadcrumbComponent from "../../../components/shared/BreadCrumbComponent";
import AdminHeader from "../AdminHeader";

const AddDashboard = () => {
  const { organizationName } = useParams(); // Extract org_name from the URL
  const navigate = useNavigate();

  const [dashboardName, setDashboardName] = useState("");
  const [powerBIUrl, setPowerBIUrl] = useState("");
  const [orgId, setOrgId] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the org_id using the organizationName
  useEffect(() => {
    const fetchOrgId = async () => {
      try {
        // Use encodeURIComponent to encode the organization name before using it in the URL
        const encodedOrgName = encodeURIComponent(organizationName);

        // Correct URL pattern with :organizationName
        const response = await fetch(`http://localhost:5000/api/dashboard/getIdByName/${encodedOrgName}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch organization ID for "${organizationName}"`);
        }

        const { org_id } = await response.json();
        setOrgId(org_id);
      } catch (error) {
        console.error("Error fetching organization ID:", error.message);
        setStatusMessage({ type: "error", text: "Unable to fetch organization details. Please try again." });
      }
    };

    if (organizationName) {
      fetchOrgId();
    } else {
      setStatusMessage({ type: "error", text: "Organization name is missing from the URL." });
    }
  }, [organizationName]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage(null); // Clear previous messages
    setIsSubmitting(true);

    if (!orgId) {
      setStatusMessage({ type: "error", text: "Organization ID not found. Please try again later." });
      setIsSubmitting(false);
      return;
    }

    const newDashboard = {
      dashboard_name: dashboardName,
      dashboard_url: powerBIUrl,
      org_id: orgId, // Use the fetched org_id
    };

    try {
      const response = await fetch("http://localhost:5000/api/dashboard/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDashboard),
      });

      if (!response.ok) {
        throw new Error("Failed to create dashboard");
      }

      const result = await response.json();
      console.log("Dashboard created:", result);
      setStatusMessage({ type: "success", text: "Dashboard successfully created!" });

      // Redirect back to the organization page after successful creation
      navigate(`/admin/organisation/${organizationName}`);
    } catch (error) {
      console.error("Error creating dashboard:", error.message);
      setStatusMessage({ type: "error", text: "Error creating dashboard. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <BreadcrumbComponent
        pageTitle={`Add Dashboard for ${organizationName || "Organization"}`}
        breadcrumbTitle1="Dashboard"
        breadcrumbRoute1={`/admin/organisation/${organizationName}`}
        breadcrumbTitle2="Add Dashboard"
        breadcrumbRoute2={`/admin/organisation/${organizationName}/adddashboard`}
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
            Add Dashboard
          </Typography>

          {/* Dashboard Name */}
          <TextField
            label="Dashboard Name"
            variant="outlined"
            fullWidth
            required
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
          />

          {/* PowerBI URL */}
          <TextField
            label="PowerBI URL"
            variant="outlined"
            fullWidth
            required
            value={powerBIUrl}
            onChange={(e) => setPowerBIUrl(e.target.value)}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={isSubmitting || !orgId}
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

export default AddDashboard;
