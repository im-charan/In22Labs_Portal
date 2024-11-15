import { useNavigate } from "react-router"
import DashboardCard from "../../../components/shared/DashboardCard";
import { Box } from "@mui/system";
import { Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";



const clients = [
  {
      id: "1",
      name: "ABC Organization",
      email: "abc@email.com",
      start: "10/11/2020",
      end: "7/7/2025",
      count: "3",
  },
  {
      id: "2",
      name: "BCD organization",
      start: "11/11/2020",
      email: "abc@email.com",
      end: "8/7/2025",
      count: "1",
  },
  {
      id: "3",
      name: "CDE Organization",
      start: "12/11/2020",
      email: "abc@email.com",
      end: "9/7/2025",
      count: "1",
  },
  {
      id: "4",
      name: "DEF Organization",
      start: "13/11/2020",
      email: "abc@email.com",
      end: "10/7/2025",
      count: "2",
  },
  {
    id: "5",
    name: "EFG Organization",
    start: "14/11/2020",
    email: "abc@email.com",
    end: "11/7/2025",
    count: "4",
  },
  {
    id: "6",
    name: "FGH Organization",
    start: "15/11/2020",
    email: "abc@email.com",
    end: "12/7/2025",
    count: "7",
  },
];

const UserTable = () => {
  var count = 1;
  const navigate = useNavigate();

  const navigatetodashboard = (id) => {
    navigate(`/admin/dashboards/${id}`);
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
                                <Typography variant="h4" align="center" fontWeight={600}>
                                  S.No
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h4" align="center" fontWeight={600}>
                                    Organization
                                </Typography>
                            </TableCell>
                            
                            <TableCell>
                              <Typography variant="h4" align="center" fontWeight={600}>
                                  Email
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h4" align="center" fontWeight={600}>
                                Valid Till
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h4" fontWeight={600}>
                                    Dashboards
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.map((client) => (
                            <TableRow key={client.name}>
                                <TableCell>
                                    <Typography variant="subtitle2" align="center">
                                        {count++}
                                    </Typography>
                                </TableCell>
                                <TableCell onClick={() => navigatetodashboard(client.id)}>
                                    <Box
                                        sx={{
                                            // display: "flex",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" align="center" fontWeight={600}>
                                                {client.name}
                                            </Typography>
                                            
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                      <Box
                                        sx={{
                                          // display: "flex",
                                          alignItems: "center",
                                        }}>
                                        <Typography variant="subtitle2" align="center" fontWeight={600}>
                                            {client.email}
                                        </Typography>
                                      </Box>
                                </TableCell>
                                <TableCell>
                                      <Box
                                        sx={{
                                          // display: "flex",
                                          alignItems: "center",
                                        }}>
                                        <Typography variant="subtitle2" align="center" fontWeight={600}>
                                            {client.end}
                                        </Typography>
                                      </Box>
                                </TableCell>
                                <TableCell align="center">
                                   <Typography variant="h6" align="center" >{client.count}</Typography>
                                </TableCell> 
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
  )

}

export default UserTable;