import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

const ContactUsPage = () => (
    <PageContainer title= "Contact Us" description ="This is contact us" > 
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        px={3}
    >
        <Grid container spacing={4} alignItems="center">
            {/* Left Side - Image */}
            <Grid item xs={12} md={6} display="flex" justifyContent="center">
                <Box
                    component="img"
                    src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?semt=ais_hybrid"
                    alt="Customer Support"
                    sx={{
                        width: '100%',
                        maxWidth: '700px',
                        borderRadius: '8px' // Optional: adds rounded corners
                    }}
                />
            </Grid>

            {/* Right Side - Contact Details */}
            <Grid item xs={12} md={6}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems={{ xs: 'center', md: 'flex-start' }}
                    textAlign={{ xs: 'center', md: 'left' }}
                >
                    <Typography
                        variant="h1"
                        fontWeight="700"
                        color="primary"
                        sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '4rem', mb: 2 }}
                    >
                        Contact Us
                    </Typography>
                    <Typography variant="h6" fontWeight="500" color="textSecondary" sx={{ mt: 2 }}>
                        To call: <strong>9876543210</strong>
                    </Typography>
                    <Typography variant="h6" fontWeight="500" color="textSecondary" sx={{ mt: 1 }}>
                        To email: <strong>info@in22labs.com</strong>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    </Box>
    </PageContainer>
);
export default ContactUsPage;
