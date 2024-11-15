import React from 'react';
import { useParams } from 'react-router-dom';
import { CardContent, Typography } from '@mui/material';
import BlankCard from '../../../components/shared/BlankCard';
import img1 from 'src/assets/images/products/s4.png';
import img2 from 'src/assets/images/products/s5.png';
import img3 from 'src/assets/images/products/s7.png';
import img4 from 'src/assets/images/products/s11.png';
import BreadcrumbComponent from '../../../components/shared/BreadCrumbComponent';

const ecoCard = [
    { id: 1, title: 'Financial Dashboard', photo: img1 },
    { id: 2, title: 'Statistical Dashboard', photo: img2 },
    { id: 3, title: 'Inventorial Dashboard', photo: img3 },
    { id: 4, title: 'Readable Dashboard', photo: img4 },
];

const Pbpage = () => {
    const { id } = useParams();  // Get the product ID from the URL
    const product = ecoCard.find((item) => item.id === parseInt(id));  // Find the product by ID

    if (!product) {
        return <Typography>Product not found.</Typography>;
    }

    return (<>
        <BreadcrumbComponent
        pageTitle={product.title}
        breadcrumbTitle1="Dashboard"
        breadcrumbRoute1="/dashboard"
        breadcrumbTitle2={product.title}
        breadcrumbRoute2={`/dashboard/product/${product.id}`}
      />
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
        </>
    );
};

export default Pbpage;
