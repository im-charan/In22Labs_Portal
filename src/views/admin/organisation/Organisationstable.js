import React, { useState } from "react";
import { useNavigate } from "react-router";
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

const clients = [
  { id: "1", organizationName: "ABC Organization", type: "Agriculture", address: "123 Maple Street, Springfield, IL" },
  { id: "2", organizationName: "BCD Organization", type: "Technology", address: "456 Oak Avenue, Metropolis, NY" },
  { id: "3", organizationName: "CDE Organization", type: "Agriculture", address: "789 Pine Road, Gotham City, NJ" },
  { id: "4", organizationName: "DEF Organization", type: "Education", address: "101 Elm Street, Star City, CA" },
  { id: "5", organizationName: "EFG Organization", type: "Finance", address: "202 Cedar Boulevard, Central City, TX" },
  { id: "6", organizationName: "FGH Organization", type: "Retail", address: "303 Birch Lane, Coast City, FL" },
];

const Organisationstable = () => {
  const navigate = useNavigate();

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  const filteredData = clients
    .filter((client) => {
      const matchesSearchTerm =
        client.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSelectedType = selectedType === "All" || client.type === selectedType;
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
            label="Search "
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
            {[...new Set(clients.map((client) => client.type))].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </TextField>
        </Box>

        {/* Table */}
        <Table sx={{ mt: 2 }} aria-label="Organisation Table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">S.No</Typography>
              </TableCell>
              <TableCell sortDirection={orderBy === "organizationName" ? order : false}>
                <TableSortLabel
                  active={orderBy === "organizationName"}
                  direction={orderBy === "organizationName" ? order : "asc"}
                  onClick={() => handleSortRequest("organizationName")}
                >
                  Organisation Name
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "type" ? order : false}>
                <TableSortLabel
                  active={orderBy === "type"}
                  direction={orderBy === "type" ? order : "asc"}
                  onClick={() => handleSortRequest("type")}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((client, index) => (
              <TableRow key={client.id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell
                  sx={{ cursor: "pointer", color: "primary.main" }}
                  onClick={() => navigate(`/admin/organisation/${client.organizationName}`)}
                >
                  {client.organizationName}
                </TableCell>
                <TableCell>{client.type}</TableCell>
                <TableCell>{client.address}</TableCell>
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
