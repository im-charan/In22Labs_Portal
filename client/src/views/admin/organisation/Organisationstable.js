import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../../../components/shared/DashboardCard";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  TextField,
  TableSortLabel,
  CircularProgress,
  Button,
  Alert,
} from "@mui/material";

const Organisationstable = () => {
  const navigate = useNavigate();

  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedOrgIds, setSelectedOrgIds] = useState([]); // Track selected organizations for disable/activate
  const [statusMessage, setStatusMessage] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  
    const fetchOrganisations = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/organisation`);
        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }
        const data = await response.json();

        const enrichedData = await Promise.all(
          data.map(async (org) => {
            const resp = await fetch(`${backendUrl}/api/user/${org.poc_id}`);
            const pocData = await resp.json();
            return {
              ...org,
              poc: pocData.user_name,
            };``
          })
        );

        setOrganisations(enrichedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchOrganisations();
}, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectOrg = (orgId) => {
    setSelectedOrgIds((prev) =>
      prev.includes(orgId)
        ? prev.filter((id) => id !== orgId)
        : [...prev, orgId]
    );
  };

  const handleSelectAllOrgs = (event) => {
    if (event.target.checked) {
      setSelectedOrgIds(organisations.map((org) => org.org_id));
    } else {
      setSelectedOrgIds([]);
    }
  };

  const handleDisableOrganisations = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/status/disablebyorg`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedOrgIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to disable organizations");
      }

      setStatusMessage({ type: "success", message: "Organizations disabled successfully" });
      await fetchOrganisations();
      setSelectedOrgIds([]);
    } catch (error) {
      setStatusMessage({ type: "error", message: `Error: ${error.message} `});
      console.error(error);
    } finally {
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  const handleActivateOrganisations = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/status/activatebyorg`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedOrgIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to activate organizations");
      }

      setStatusMessage({ type: "success", message: "Organizations activated successfully" });
      await fetchOrganisations();
      setSelectedOrgIds([]);
    } catch (error) {
      setStatusMessage({ type: "error", message: `Error: ${error.message}` });
      console.error(error);
    } finally {
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };
  
  const areAllSelectedOrgsDisabled = () => {
    return selectedOrgIds.every(
      (id) => organisations.find((org) => org.org_id === id)?.org_status === 0
    );
  };
  
  const areAllSelectedOrgsActive = () => {
    return selectedOrgIds.every(
      (id) => organisations.find((org) => org.org_id === id)?.org_status === 1
    );
  };

  const filteredData = organisations.filter((org) => {
    const matchesSearchTerm =
      org.org_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.org_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.org_address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSelectedType =
      selectedType === "All" || org.org_type === selectedType;
    return matchesSearchTerm && matchesSelectedType;
  });

  const displayedRows = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">{`Error: ${error}`}</Typography>
    );
  }

  return (
    <DashboardCard>
      {statusMessage && <Alert severity={statusMessage.type}>{statusMessage.message}</Alert>}
      <Box
        sx={{
          padding: 6,
          mt: -3,
          mx: -3,
          backgroundColor: "background.paper",
        }}
      >
        {/* Search and Filter Options */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <TextField
            label="Search Organisations"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ flex: 1, marginRight: 2 }}
          />
          <TextField
            label="Filter by Type"
            variant="outlined"
            size="small"
            select
            value={selectedType}
            onChange={handleFilterChange}
            sx={{ width: 200 }}
          >
            <option value="All">All</option>
            {[...new Set(organisations.map((org) => org.org_type))].map(
              (type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              )
            )}
          </TextField>
          <Button
            variant="contained"
            color="error"
            onClick={handleDisableOrganisations}
            disabled={selectedOrgIds.length === 0 || !areAllSelectedOrgsActive() }
            sx={{ ml: 2 }}
          >
            Disable Organisations
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleActivateOrganisations}
            disabled={selectedOrgIds.length === 0 || !areAllSelectedOrgsDisabled() }
            sx={{ ml: 2 }}
          >
            Activate Organisations
          </Button>
        </Box>

        {/* Table with organisations */}
        <Table sx={{ mt: 2 }} aria-label="Organisations Table">
          <TableHead>
            <TableRow>
              <TableCell>
                <input
                  type="checkbox"
                  onChange={handleSelectAllOrgs}
                  checked={selectedOrgIds.length === organisations.length}
                />
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  S.No
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Organisation Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Type
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Location
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  POC
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" align="center">
                  Dashboard
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" align="center">
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((org, index) => (
              <TableRow key={org.org_id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedOrgIds.includes(org.org_id)}
                    onChange={() => handleSelectOrg(org.org_id)}
                  />
                </TableCell>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell
                  sx={{ cursor: "pointer", color: "primary.main" }}
                  onClick={() =>
                    navigate(`/admin/organisation/${org.org_name}`)
                  }
                >
                  {org.org_name}
                </TableCell>
                <TableCell>{org.org_type}</TableCell>
                <TableCell>{org.org_address}</TableCell>
                <TableCell>{org.poc}</TableCell>
                <TableCell align="center">{org.dash_count || "-"}</TableCell>
                <TableCell align="center">
                                      {org.org_status === 1 ? (
                                        <span style={{ color: "green" }}>Active</span>
                                      ) : (
                                        <span style={{ color: "red" }}>Disabled</span>
                                      )}
                                    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </DashboardCard>
  );
};

export default Organisationstable;