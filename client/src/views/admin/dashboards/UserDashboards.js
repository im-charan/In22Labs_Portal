// import { CardContent, Fab, Grid, Rating, Tooltip, Typography } from "@mui/material";
// import BlankCard from "../../../components/shared/BlankCard";
// import { IconBasket } from "@tabler/icons-react";
// import { Stack } from "@mui/system";
// import img from "../../../assets/images/products/dashboard.jpg"
// import { Link, useNavigate } from "react-router-dom";
// import DashboardCard from "../../../components/shared/DashboardCard";
// // const ecoCard = [
// //   {
// //       id: 1,
// //       title: 'Cycle 1 Analysis',
// //       organization: "ABC Organization",
// //       photo: img,
// //   },
// //   {   
// //       id: 2,
// //       title: 'Sales Analysis',
// //       organization: "BCD Organization",
// //       photo: img,
// //   },
// //   {   
// //       id : 3,
// //       title: 'Gross Profit Analysis',
// //       organization: "DCE Organization",
// //       photo: img,
// //   },
// //   {   
// //       id: 4,
// //       title: 'Stock Market Trends',
// //       organization: "EFG Organization",
// //       photo: img,
// //   },
// //   {   
// //     id: 5,
// //     title: 'Student Enrollments',
// //     organization: "GHI Organization",
// //     photo: img,
// //   },
// //   {   
// //     id: 6,
// //     title: 'Customer Involvement',
// //     organization: "HIJ Organization",
// //     photo: img,
// //   },

// // ];

// const UserDashboards = () =>{
//   const navigate = useNavigate();

//   const navigator = (id) => {
//     navigate(`/dashboard/${id}`);
//   }

//   return (
//    <>
  
//     <DashboardCard>
//       <Grid container spacing={3} >
//               {ecoCard.map((product, index) => (
//                 <Grid item sm={12} md={4} lg={3} key={index} >
//                       <BlankCard>
//                       <Typography 
//                                 component={Link}
//                                 onClick={() => handleClick(product.title)} // Set title on click
//                                 to={`/dashboards/${product.title}`}
//                             >
//                                 <img src={product.photo} alt={product.title} width="100%" />
//                             </Typography>
//                           <CardContent sx={{ p: 3, pt: 2 }}>
//                               <Typography variant="h6">{product.organization}</Typography>
//                               <Typography variant="subtitle1">{product.title}</Typography>
//                           </CardContent>
//                       </BlankCard>
//                   </Grid>
//               ))}
//         </Grid>
//     </DashboardCard>
//     </>
  
//   )
// }

// export default UserDashboards;
// import React, { useEffect, useState } from "react";
// import { CardContent, Grid, Typography } from "@mui/material";
// import BlankCard from "../../../components/shared/BlankCard";
// import { Link, useNavigate } from "react-router-dom";
// import DashboardCard from "../../../components/shared/DashboardCard";

// const UserDashboards = () => {
//   const navigate = useNavigate();
//   const [dashboards, setDashboards] = useState([]);

//   // Fetch dashboards data from API
//   useEffect(() => {
//     const fetchDashboards = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/dashboard/all"); // Adjust the API endpoint as needed
//         const data = await response.json();
//         setDashboards(data);
//       } catch (error) {
//         console.error("Error fetching dashboards:", error);
//       }
//     };

//     fetchDashboards();
//   }, []);

//   const navigator = (url) => {
//     navigate(url);
//   };

//   return (
//     <DashboardCard>
//       <Grid container spacing={3}>
//         {dashboards.map((dashboard) => (
//           <Grid item sm={12} md={4} lg={3} key={dashboard.dashboard_id}>
//             <BlankCard>
//               <Typography
//                 component={Link}
//                 onClick={() => navigator(dashboard.dashboard_url)}
//               >
//                 <img
//                   src={dashboard.dashboard_url}
//                   alt={dashboard.dashboard_name}
//                   width="100%"
//                 />
//               </Typography>
//               <CardContent sx={{ p: 3, pt: 2 }}>
//                 <Typography variant="h6">{dashboard.org_id}</Typography>
//                 <Typography variant="subtitle1">
//                   {dashboard.dashboard_name}
//                 </Typography>
//               </CardContent>
//             </BlankCard>
//           </Grid>
//         ))}
//       </Grid>
//     </DashboardCard>
//   );
// };

// export default UserDashboards;
import React, { useEffect, useState } from "react";
import { CardContent, Grid, Typography } from "@mui/material";
import BlankCard from "../../../components/shared/BlankCard";
import { Link, useNavigate } from "react-router-dom";
import DashboardCard from "../../../components/shared/DashboardCard";

const UserDashboards = () => {
  const navigate = useNavigate();
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboards data from API
  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/all"); // Adjust the API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result?.data) {
          setDashboards(result.data); // Ensure to extract data correctly
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching dashboards:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboards();
  }, []);

  const handleNavigation = (url) => {
    navigate(url);
  };

  if (loading) {
    return <Typography>Loading dashboards...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <DashboardCard>
      <Grid container spacing={3}>
        {dashboards.map((dashboard) => (
          <Grid item sm={12} md={4} lg={3} key={dashboard.dashboard_id}>
            <BlankCard>
              <Typography
                component={Link}
                onClick={() => handleNavigation(dashboard.dashboard_url)}
              >
                <img
                  src={dashboard.dashboard_url}
                  alt={dashboard.dashboard_name}
                  width="100%"
                  loading="lazy" // Improves performance by lazy-loading images
                />
              </Typography>
              <CardContent sx={{ p: 3, pt: 2 }}>
                <Typography variant="h6">
                  Organization ID: {dashboard.org_id}
                </Typography>
                <Typography variant="subtitle1">
                  {dashboard.dashboard_name}
                </Typography>
              </CardContent>
            </BlankCard>
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
};

export default UserDashboards;
