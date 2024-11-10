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
    <DashboardCard>
      <Grid container spacing={3} >
              {ecoCard.map((product, index) => (
                <Grid item sm={12} md={4} lg={3} key={index} >
                      <BlankCard>
                          <Typography>
                              <img src={product.photo} alt="img" width="100%" onClick={ () => navigator(product.id)}/>
                          </Typography>
                          <CardContent sx={{ p: 3, pt: 2 }}>
                              <Typography variant="h6">{product.title}</Typography>
                              <Typography variant="subtitle1">{product.organization}</Typography>
                          </CardContent>
                      </BlankCard>
                  </Grid>
              ))}
        </Grid>
    </DashboardCard>
  )
}

export default UserDashboards;