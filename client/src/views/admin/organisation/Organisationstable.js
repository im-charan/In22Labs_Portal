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

  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/organisation");
        const data = await response.json();

        const enrichedData = data.map((org) => ({
          ...org,
          poc: org.poc_name || `${org.poc_id}`,
        }));

        setOrganisations(enrichedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
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
      <Box
        sx={{
          padding: 6,
          mt: -3,
          mx: -3,
          border: "2px solid #555", // Border applied to the entire box
          borderRadius: "9px", // Rounded corners for the box
          backgroundColor: "background.paper", // Matches theme
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
        </Box>

        {/* Table with organisations */}
        <Table sx={{ mt: 2 }} aria-label="Organisations Table">
          <TableHead>
            <TableRow>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((org, index) => (
              <TableRow key={org.org_id}>
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
                <TableCell align="center">{org.dash_count || "N/A"}</TableCell>
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
