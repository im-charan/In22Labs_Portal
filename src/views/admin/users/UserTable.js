import { useNavigate } from "react-router";
import DashboardCard from "../../../components/shared/DashboardCard";
import { Box } from "@mui/system";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const clients = [
  {
    id: "1",
    name: "ABC Organization",
    start: "10/11/2020",
    end: "7/7/2025",
    count: "3",
  },
  {
    id: "2",
    name: "BCD organization",
    start: "11/11/2020",
    end: "8/7/2025",
    count: "1",
  },
  {
    id: "3",
    name: "CDE Organization",
    start: "12/11/2020",
    end: "9/7/2025",
    count: "1",
  },
  {
    id: "4",
    name: "DEF Organization",
    start: "13/11/2020",
    end: "10/7/2025",
    count: "2",
  },
  {
    id: "5",
    name: "EFG Organization",
    start: "14/11/2020",
    end: "11/7/2025",
    count: "4",
  },
  {
    id: "6",
    name: "FGH Organization",
    start: "15/11/2020",
    end: "12/7/2025",
    count: "7",
  },
];

const UserTable = () => {
  const navigate = useNavigate();

  // Corrected navigation function
  const navigatetodashboard = (name) => {
    navigate(`/admin/dashboards/${name}`);
  }

  return (
    <DashboardCard>
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Organization
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Start Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  End Date
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Dashboards
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell onClick={() => navigatetodashboard(client.name)} sx={{ cursor: "pointer" }}>
                  
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {client.name}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {client.start}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {client.end}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{client.count}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
}

export default UserTable;
