import React, { useState } from "react";
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
} from "@mui/material";

const organisations = [
  { id: "1", name: "ABC Org", type: "Tech", location: "New York", projects: 5 },
  { id: "2", name: "DEF Org", type: "Finance", location: "London", projects: 3 },
  { id: "3", name: "GHI Org", type: "Retail", location: "Sydney", projects: 7 },
  { id: "4", name: "JKL Org", type: "Education", location: "Toronto", projects: 2 },
  { id: "5", name: "MNO Org", type: "Healthcare", location: "Mumbai", projects: 4 },
  // Add more organisations as needed
];

const ListOrganisations = () => {
  const navigate = useNavigate();

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // State for sorting
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter change
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

  // Filter and sort data
  const filteredData = organisations
    .filter((org) => {
      const matchesSearchTerm =
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSelectedType = selectedType === "All" || org.type === selectedType;
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

  // Paginate the filtered data
  const displayedRows = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
            {[...new Set(organisations.map((org) => org.type))].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </TextField>
        </Box>

        {/* Table */}
        <Table sx={{ mt: 2 }} aria-label="Organisations Table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>S.No</Typography>
              </TableCell>
              <TableCell sortDirection={orderBy === "name" ? order : false}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSortRequest("name")}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>Organisation Name</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "type" ? order : false}>
                <TableSortLabel
                  active={orderBy === "type"}
                  direction={orderBy === "type" ? order : "asc"}
                  onClick={() => handleSortRequest("type")}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>Type</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Location</Typography>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "projects"}
                  direction={orderBy === "projects" ? order : "asc"}
                  onClick={() => handleSortRequest("projects")}
                >
                  <Typography variant="h6" align="center">Projects</Typography>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((org, index) => (
              <TableRow key={org.id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell
                  sx={{ cursor: "pointer", color: "primary.main" }}
                  onClick={() => navigate(`/admin/organisation/${org.name}`)}
                >
                  {org.name}
                </TableCell>
                <TableCell>{org.type}</TableCell>
                <TableCell>{org.location}</TableCell>
                <TableCell align="center">{org.projects}</TableCell>
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

export default ListOrganisations;
