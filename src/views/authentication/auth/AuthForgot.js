import React from 'react';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { Email } from '@mui/icons-material';

const AuthForgetPassword = ({ title, subtitle, subtext }) => (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={3}>
                {/* <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='name' mb="5px">Name</Typography>
                <CustomTextField id="name" variant="outlined" fullWidth /> */}

                {/* <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Registered Email Address</Typography>
                <CustomTextField id="email" variant="outlined" fullWidth /> */}
{/* 
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                <CustomTextField id="password" variant="outlined" fullWidth /> */}
                <Box mt="25px">
                  <TextField
                  color='primary'
                  id="outlined-input"
                  label="Email"
                  type="text"
                  size='medium'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color='primary'/>
                      </InputAdornment>
                    ),
                  }}
                  />
                  </Box>
            </Stack>
            <Stack alignItems={'center'}>
            <Button color="primary" variant="contained" size="small" component={Link} to="/auth/login">
                Request For Password
            </Button>
            </Stack>
        </Box>
        {subtitle}
    </>
);

export default AuthForgetPassword;
