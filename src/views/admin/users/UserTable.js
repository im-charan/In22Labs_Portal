import { useNavigate } from "react-router"
import DashboardCard from "../../../components/shared/DashboardCard";
import { Box } from "@mui/system";
import { Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";



const products = [
  {
      id: "1",
      name: "ABC Organization",
      post: "Web Designer",
      pname: "Elite Admin",
      priority: "Low",
      pbg: "primary.main",
      budget: "3.9",
  },
  {
      id: "2",
      name: "BCD organization",
      post: "Project Manager",
      pname: "Real Homes WP Theme",
      priority: "Medium",
      pbg: "secondary.main",
      budget: "24.5",
  },
  {
      id: "3",
      name: "CDE Organization",
      post: "Project Manager",
      pname: "MedicalPro WP Theme",
      priority: "High",
      pbg: "error.main",
      budget: "12.8",
  },
  {
      id: "4",
      name: "DEF Organization",
      post: "Frontend Engineer",
      pname: "Hosting Press HTML",
      priority: "Critical",
      pbg: "success.main",
      budget: "2.4",
  },
];

const UserTable = () => {
  
  const navigate = useNavigate();

  const navigatetodashboard = () => {
    navigate(`/admin/dashboards/`);
  }

  return (
    <DashboardCard title="Product Performance">
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
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Assigned
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Priority
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Budget
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.name} onClick={navigatetodashboard}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.post}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.pname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: product.pbg,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.priority}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">${product.budget}k</Typography>
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