import React, { useState, useEffect } from "react";
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

const UserTable = () => {
  const navigate = useNavigate();

  // State hooks
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("All");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/all");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedOrganization(event.target.value);
  };

  const handleSortRequest = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = users
    .filter((user) => {
      const matchesSearchTerm =
        user.user_fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.organizationName?.toLowerCase() || "").includes(searchTerm.toLowerCase());
      const matchesSelectedOrganization =
        selectedOrganization === "All" || user.organizationName === selectedOrganization;
      return matchesSearchTerm && matchesSelectedOrganization;
    })
    .sort((a, b) => {
      if (orderBy) {
        const valueA = a[orderBy];
        const valueB = b[orderBy];
        return (valueA < valueB ? -1 : 1) * (order === "asc" ? 1 : -1);
      }
      return 0;
    });

  const displayedRows = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const navigatetodashboard = (name) => {
    navigate(`/admin/dashboards/${name}`);
  };

  return (
    <DashboardCard>
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ flex: 1, marginRight: 2 }}
          />
          <TextField
            label="Filter by Organization"
            variant="outlined"
            size="small"
            select
            value={selectedOrganization}
            onChange={handleFilterChange}
            sx={{ width: 200 }}
          >
            <option value="All">All</option>
            {[...new Set(users.map((user) => user.organizationName))].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </TextField>
        </Box>

        <Table sx={{ mt: 2 }} aria-label="Users Table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6">S.No</Typography>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "user_fullname"}
                  direction={orderBy === "user_fullname" ? order : "asc"}
                  onClick={() => handleSortRequest("user_fullname")}
                >
                  <Typography variant="h6">Name</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "organizationName"}
                  direction={orderBy === "organizationName" ? order : "asc"}
                  onClick={() => handleSortRequest("organizationName")}
                >
                  <Typography variant="h6">Organization</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "valid_till"}
                  direction={orderBy === "valid_till" ? order : "asc"}
                  onClick={() => handleSortRequest("valid_till")}
                >
                  <Typography variant="h6">Valid Till</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "user_email"}
                  direction={orderBy === "user_email" ? order : "asc"}
                  onClick={() => handleSortRequest("user_email")}
                >
                  <Typography variant="h6">Email</Typography>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((user, index) => (
              <TableRow key={user.user_id}>
                <TableCell align="center">{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell align="center">{user.user_fullname}</TableCell>
                <TableCell
                  sx={{ cursor: "pointer", color: "primary.main" }}
                  onClick={() => navigate(`/admin/organisation/${user.organizationName}`)}
                  align="center"
                >
                  {user.organizationName}
                </TableCell>
                <TableCell align="center">{user.valid_till}</TableCell>
                <TableCell align="center">{user.user_email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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

export default UserTable;
