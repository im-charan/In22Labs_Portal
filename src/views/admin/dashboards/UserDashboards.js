import { CardContent, Fab, Grid, Rating, Tooltip, Typography } from "@mui/material";
import BlankCard from "../../../components/shared/BlankCard";
import { IconBasket } from "@tabler/icons-react";
import { Stack } from "@mui/system";
import img from "../../../assets/images/products/dashboard.jpg"
import { Link, useNavigate } from "react-router-dom";
import DashboardCard from "../../../components/shared/DashboardCard";

const ecoCard = [
  {
      id: 1,
      title: 'Cycle 1 Analysis',
      organization: "ABC Organization",
      photo: img,
  },
  {   
      id: 2,
      title: 'Sales Analysis',
      organization: "BCD Organization",
      photo: img,
  },
  {   
      id : 3,
      title: 'Gross Profit Analysis',
      organization: "DCE Organization",
      photo: img,
  },
  {   
      id: 4,
      title: 'Stock Market Trends',
      organization: "EFG Organization",
      photo: img,
  },
  {   
    id: 5,
    title: 'Student Enrollments',
    organization: "GHI Organization",
    photo: img,
  },
  {   
    id: 6,
    title: 'Customer Involvement',
    organization: "HIJ Organization",
    photo: img,
  },

];

const UserDashboards = () =>{
  const navigate = useNavigate();

  const navigator = (id) => {
    navigate(`/dashboard/${id}`);
  }

  return (
   <>
  
    <DashboardCard>
      <Grid container spacing={3} >
              {ecoCard.map((product, index) => (
                <Grid item sm={12} md={4} lg={3} key={index} >
                      <BlankCard>
                      <Typography 
                                component={Link}
                                onClick={() => handleClick(product.title)} // Set title on click
                                to={`/dashboards/${product.title}`}
                            >
                                <img src={product.photo} alt={product.title} width="100%" />
                            </Typography>
                          <CardContent sx={{ p: 3, pt: 2 }}>
                              <Typography variant="h6">{product.organization}</Typography>
                              <Typography variant="subtitle1">{product.title}</Typography>
                          </CardContent>
                      </BlankCard>
                  </Grid>
              ))}
        </Grid>
    </DashboardCard>
    </>
  
  )
}

export default UserDashboards;