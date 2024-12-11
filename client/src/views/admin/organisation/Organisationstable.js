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
  CircularProgress
} from "@mui/material";

const Organisationstable = () => {
  const navigate = useNavigate();

  // State variables for organisations, loading, and errors
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // Sorting state
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  // Fetch organisations when the component mounts
  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/organisation");  // Replace with your actual API endpoint
        const data = await response.json();  // Assuming the API returns JSON
        setOrganisations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrganisations();
  }, []);

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter by type
  const handleFilterChange = (event) => {
    setSelectedType(event.target.value);
  };

  // Sorting handler
  const handleSortRequest = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter and sort organisations
  const filteredData = organisations
    .filter((org) => {
      const matchesSearchTerm =
        org.org_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.org_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.org_address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSelectedType = selectedType === "All" || org.org_type === selectedType;
      return matchesSearchTerm && matchesSelectedType;
    })
    .sort((a, b) => {
      if (orderBy) {
        const valueA = a[orderBy];
        const valueB = b[orderBy];
        return (valueA < valueB ? -1 : 1) * (order === "asc" ? 1 : -1);
      }
      return 0;
    });

  // Paginate filtered data
  const displayedRows = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{`Error: ${error}`}</Typography>;
  }

  return (
    <DashboardCard>
      <Box sx={{ padding: 2 }}>
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
            {[...new Set(organisations.map((org) => org.org_type))].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </TextField>
        </Box>

        {/* Table with organisations */}
        <Table sx={{ mt: 2 }} aria-label="Organisations Table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>S.No</Typography>
              </TableCell>
              <TableCell sortDirection={orderBy === "org_name" ? order : false}>
                <TableSortLabel
                  active={orderBy === "org_name"}
                  direction={orderBy === "org_name" ? order : "asc"}
                  onClick={() => handleSortRequest("org_name")}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>Organisation Name</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "org_type" ? order : false}>
                <TableSortLabel
                  active={orderBy === "org_type"}
                  direction={orderBy === "org_type" ? order : "asc"}
                  onClick={() => handleSortRequest("org_type")}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>Type</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Location</Typography>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "org_id"}
                  direction={orderBy === "org_id" ? order : "asc"}
                  onClick={() => handleSortRequest("org_id")}
                >
                  <Typography variant="h6" align="center">Dashboard</Typography>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((org, index) => (
              <TableRow key={org.org_id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell
                  sx={{ cursor: "pointer", color: "primary.main" }}
                  onClick={() => navigate(`/admin/organisation/${org.org_name}`)}
                >
                  {org.org_name}
                </TableCell>
                <TableCell>{org.org_type}</TableCell>
                <TableCell>{org.org_address}</TableCell>
                <TableCell align="center">{org.org_id}</TableCell>
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
