import React from 'react';
import { useParams } from 'react-router-dom';
import { CardContent, Typography } from '@mui/material';
import BlankCard from '../../../components/shared/BlankCard';
import img1 from 'src/assets/images/products/s4.png';
import img2 from 'src/assets/images/products/s5.png';
import img3 from 'src/assets/images/products/s7.png';
import img4 from 'src/assets/images/products/s11.png';

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

const Pbpage = () => {
    const { id } = useParams();  // Get the product ID from the URL
    const product = ecoCard.find((item) => item.id === parseInt(id));  // Find the product by ID

    if (!product) {
        return <Typography>Product not found.</Typography>;
    }

    return (
        <BlankCard>
          <Typography variant='h2'marginBottom={3}>Dashboard / 1</Typography>
            <Typography component="div">
                <img src={product.photo} alt={product.title} width="100%" />
            </Typography>
            <CardContent sx={{ p: 3, pt: 2 }}>
                <Typography variant="h6">{product.title}</Typography>
                {/* Additional details can be added here */}
            </CardContent>
        </BlankCard>
    );
};

export default Pbpage;
