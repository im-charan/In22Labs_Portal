import React from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Await, Link, useNavigate } from 'react-router-dom';

import InputAdornment from '@mui/material/InputAdornment';
import { AccountCircle, Password } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Captcha from './Captcha';
import { useState } from 'react';
import axios, { Axios } from 'axios';




const AuthLogin = ({ title, subtitle, subtext }) => {
  
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(userName,password);
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth', {user_name : userName, user_password: password})
    .then(result => {console.log(result)
      if(result.status === 200){
        axios.get(`http://localhost:5000/api/user/name/${userName}`)
        .then(result => { 
          console.log(result.data.user_type);
          const userType = result.data.user_type;
          if(userType === 1){
            navigate('/admin/dashboards')
          }
          else{
            navigate('/dashboard')}
        })
      //   console.log(userType);
      //   if(userType === 1){
      //     navigate('/admin/dashboard')
      //   }
      //   else{
      //     navigate('/dashboard')}
      //   }
      //  else{
      //   console.log(result.message);
       }
  })
    .catch(err => console.log(err))
  }

  
  
  return (

    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Stack>
            <Box mt="25px">
              <TextField
              color='primary'
              id="outlined-input"
              placeholder='Username'
              label="Username"
              type="text"
              size='medium'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color='primary'/>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setUserName(e.target.value)}
              />
            </Box>
            <Box mt="25px">
              <TextField
              color='primary'
              id="outlined-password-input"
              placeholder='Password'
              label="Password"
              type="password"
              autoComplete="current-password"
              size='medium'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color='primary'/>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end' >
                    <VisibilityIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Stack justifyContent="center" direction="column" alignItems="center" my={2} marginTop={4}>
              <Box marginBottom={2}>
                <Captcha/>
              </Box>
              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component={Link}
                  // to="/dashboard"
                  type="submit"
                  onClick={handleSubmit}
                >
                Login 
                </Button>
              </Box>
            </Stack>
        {subtitle}
        </Stack>
        
    </>

  );
};

export default AuthLogin;
