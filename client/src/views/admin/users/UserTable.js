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
  MenuItem,
  Checkbox,
  Button,
  Alert,
} from "@mui/material";
import dayjs from "dayjs";
const UserTable = () => {
  const navigate = useNavigate();

  // State hooks
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("All");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]); // Track selected users
  const [statusMessage, setStatusMessage] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/all`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
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

  // Handlers for filters and sorting
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleFilterChange = (event) => setSelectedOrganization(event.target.value);

  const handleSortRequest = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = filteredData.map((user) => user.user_id);
      setSelectedUserIds(allIds);
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  // const reloadTable = async () => {
  //   // setLoading(true);
  //   await fetchUsers();
    
  // };

  const handleDisableUsers = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/status/disable`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {selectedUserIds} ) // Match backend's expected format
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to disable users");
      }
      setStatusMessage(
        {type: 'success',
        message: 'Users disabled successfully'}
      );
      await fetchUsers();
      setSelectedUserIds([]);
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: "Error disabling users: " + error.message,
      });
      console.error("Error:", error);
    }
    finally {
    setTimeout(() => setStatusMessage(""), 3000); // Clear status message after delay
    setLoading(false);
    }
  };
  
  

  const areAllSelectedUsersDisabled = () =>{
    return selectedUserIds.every(
      (id) => users.find((user) => user.user_id === id)?.user_status !== 1
    );
  }

  const areAllSelectedUsersActive = () =>{
    return selectedUserIds.every(
      (id) => users.find((user) => user.user_id === id)?.user_status !== 0
    );
  }
  const handleActivateUsers = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/status/activate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedUserIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to activate users");
      }

      setStatusMessage(
        {type: 'success',
        message: 'Users Activated successfully'}
      );
      await fetchUsers();
      setSelectedUserIds([]);
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: "Error activating users: " + error.message,
      });
      console.error("Error:", error);
    }
    finally {
      setTimeout(() => setStatusMessage(""), 3000); // Clear status message after delay
      setLoading(false);
      }
  };

  // Filter, search, and sort users
// Filter, search, and sort users
const filteredData = users
.filter((user) => {
  const matchesSearchTerm =
    user.user_fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.organization_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    user.user_email.toLowerCase().includes(searchTerm.toLowerCase()); // Fixed
  const matchesSelectedOrganization =
    selectedOrganization === "All" ||
    user.organization_name === selectedOrganization;
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

const displayedRows = filteredData.slice(
page * rowsPerPage,
page * rowsPerPage + rowsPerPage
);

  return (
    <DashboardCard>
      {statusMessage && <Alert severity={statusMessage.type}>{statusMessage.message}</Alert>}
      <Box sx={{ padding: 6, mt: -3, mx: -3, backgroundColor: "background.paper" }}>
        {loading ? (
          <Typography align="center" variant="h6">
            Loading...
          </Typography>
        ) : (
          <>
            {/* Search, Filters, Buttons */}
            
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
                <MenuItem value="All">All</MenuItem>
                {[...new Set(users.map((user) => user.organization_name))].map(
                  (org) => (
                    <MenuItem key={org} value={org}>
                      {org}
                    </MenuItem>
                  )
                )}
              </TextField>
              <Button
                variant="contained"
                color="error"
                onClick={handleDisableUsers}
                disabled={selectedUserIds.length === 0 || !areAllSelectedUsersActive()}
                sx={{ ml: 2 }}
              >
                Disable User
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleActivateUsers}
                disabled={selectedUserIds.length === 0 || !areAllSelectedUsersDisabled()}
                sx={{ ml: 2 }}
              >
                Activate User
              </Button>
            </Box>
  
            {/* Table */}
            <Table sx={{ mt: 2 }} aria-label="Users Table">
              {/* Table Head */}
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedUserIds.length > 0 &&
                        selectedUserIds.length < filteredData.length
                      }
                      checked={selectedUserIds.length === filteredData.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell align="center">S.No</TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === "user_fullname"}
                      direction={orderBy === "user_fullname" ? order : "asc"}
                      onClick={() => handleSortRequest("user_fullname")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === "organization_name"}
                      direction={orderBy === "organization_name" ? order : "asc"}
                      onClick={() => handleSortRequest("organization_name")}
                    >
                      Organization
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === "valid_till"}
                      direction={orderBy === "valid_till" ? order : "asc"}
                      onClick={() => handleSortRequest("valid_till")}
                    >
                      Valid Till
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === "user_email"}
                      direction={orderBy === "user_email" ? order : "asc"}
                      onClick={() => handleSortRequest("user_email")}
                    >
                      Email
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === "user_status"}
                      direction={orderBy === "user_status" ? order : "asc"}
                      onClick={() => handleSortRequest("user_status")}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
  
              {/* Table Body */}
              <TableBody>
                {displayedRows.map((user, index) => (
                  <TableRow key={user.user_id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUserIds.includes(user.user_id)}
                        onChange={() => handleSelectUser(user.user_id)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {index + 1 + page * rowsPerPage}
                    </TableCell>
                    <TableCell
sx={{ cursor: "pointer", color: "primary.main" }}
onClick={() =>
navigate(`profile/${user.user_id}`) // Use user_id for navigation
}
align="center"
>
{user.user_fullname}
</TableCell>

                    <TableCell
                      sx={{ cursor: "pointer", color: "primary.main" }}
                      onClick={() =>
                        navigate(`/admin/organisation/${user.organization_name}`)
                      }
                      align="center"
                    >
                      {user.organization_name}
                    </TableCell>
                    <TableCell align="center" >
                    {dayjs(user.valid_till).format("DD/MM/YYYY")}
                      </TableCell>
                    <TableCell align="center" >{user.user_email}</TableCell>
                    <TableCell align="center">
                      {user.user_status === 1 ? (
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
          </>
        )}
      </Box>
    </DashboardCard>
  );
}  

export default UserTable;