import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Rating, Tooltip, Fab } from '@mui/material';
import img1 from 'src/assets/images/products/s4.png';
import img2 from 'src/assets/images/products/s5.png';
import img3 from 'src/assets/images/products/s7.png';
import img4 from 'src/assets/images/products/s11.png';
import { Stack } from '@mui/system';
// import { IconBasket } from '@tabler/icons-react';
import BlankCard from '../../../components/shared/BlankCard';


const ecoCard = [
    {   id:1,
        title: 'Overview 1',
        photo: img1,  
    },
    {   id:2,
        title: 'Overview 2',
        photo: img2,
    },
    {   id:3,
        title: 'Overview 3',
        photo: img3,
    },
    {   id:4,
        title: 'Overview 4',
        photo: img4,
    },
];

const Blog = () => {
    return (
        <Grid container spacing={3}>
            {ecoCard.map((product) => (
                <Grid item sm={12} md={4} lg={3} key={product.id}>
                    <BlankCard >
                        <Typography component={Link} to={`/dashboard/product/${product.id}`}>
                            <img src={product.photo} alt={product.title} width="100%" />
                        </Typography>
                        <CardContent sx={{ p: 3, pt: 2 }}>
                            <Typography variant="h6">{product.title}</Typography>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    );
};


export default Blog;
