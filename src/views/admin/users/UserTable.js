import { useNavigate } from "react-router";
import { useState } from "react";
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
const users = [
  {
      id: "1",
      name: "Charan",
      organizationName: "ABC Organisation",
      email: "abc@email.com",
      validTill: "7/7/2025",   
  },
  {id: "2",
      name:"Adithi",
      organizationName: "BCD organization",
      start: "11/11/2020",
      email: "abc@email.com",
      validTill: "8/7/2025",
  },
  {
      id: "3",
      name:"Sherin",
      organizationName: "CDE Organization",
      start: "12/11/2020",
      email: "abc@email.com",
      validTill: "9/7/2025", 
  },
  {
      id: "4",
      name: "Abdul",
      organizationName: "DEF Organization",
      start: "13/11/2020",
      email: "abc@email.com",
      validTill: "10/7/2025",
      
  },
  {
    id: "5",
    name: "Kaviya",
    organizationName: "EFG Organization",
    start: "14/11/2020",
    email: "abc@email.com",
    validTill: "11/10/2025",
    
  },
  {
    id: "6",
    name: "Margot",
    organizationName: "ABC Organisation",
    email: "abc@email.com",
    validTill: "7/7/2025",
   
  },
  {
    id: "7",
    name: "Robbie",
    organizationName: "ABC Organisation",
    email: "abc@email.com",
    validTill: "7/7/2025",
    
  },
  {
    id: "8",
    name:"Selena",
    organizationName: "BCD organization",
    start: "11/11/2020",
    email: "abc@email.com",
    validTill: "8/7/2025",
    
  },
  {
    id: "9",
    name:"Gomez",
    organizationName: "BCD organization",
    start: "11/11/2020",
    email: "abc@email.com",
    validTill: "8/7/2025",
    
  },
];

const UserTable = () => {
  const navigate = useNavigate();

  // Corrected navigation function
  const navigatetodashboard = (name) => {
    navigate(`/admin/dashboards/${name}`);
  }

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("All");

  // State for sorting
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setSelectedOrganization(event.target.value);
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
  const filteredData = users
    .filter((user) => {
      const matchesSearchTerm =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.organizationName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSelectedOrganization = selectedOrganization === "All" || user.organizationName === selectedOrganization;
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

        {/* Table */}
        <Table sx={{ mt: 2 }} aria-label="Users Table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6">S.No</Typography>
              </TableCell>
              <TableCell sortDirection={orderBy === "name" ? order : false} align="center">
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSortRequest("name")}
                >
                  <Typography variant="h6">Name</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "organizationName" ? order : false} align="center">
                <TableSortLabel
                  active={orderBy === "organizationName"}
                  direction={orderBy === "organizationName" ? order : "asc"}
                  onClick={() => handleSortRequest("organizationName")}
                >
                <Typography variant="h6" align="center">Organization</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "validTill" ? order : false} datatype="Date" align="center">
                <TableSortLabel
                  active={orderBy === "validTill"}
                  direction={orderBy === "validTill" ? order : "asc"}
                  onClick={() => handleSortRequest("validTill")}
                  >
                  <Typography variant="h6" align="center">Valid Till</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" align="center">Email</Typography>
              </TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell align="center">{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell
                  sx={{ cursor: "pointer", color: "primary.main" }}
                  onClick={() => navigate(`/admin/organisation/${user.organizationName}`)}
                  align="center"
                >
                  {user.organizationName}
                </TableCell>
                <TableCell align="center">{user.validTill}</TableCell>
                <TableCell align="center">{user.email}</TableCell> 
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
}
export default UserTable;
