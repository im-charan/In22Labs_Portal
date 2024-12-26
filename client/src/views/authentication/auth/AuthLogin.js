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
import { AccountCircle, Login, Password } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Captcha from './Captcha';
import { useState , useRef} from 'react';
import axios, { Axios } from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import LoginValidation from './LoginValidation';
import { useAuth } from './AuthProvider';
import { useUser } from './UserContext';

const AuthLogin = ({ title, subtitle, subtext }) => {

  const [islogin, setIsLogin] = useState('');
  const recaptcha = useRef();
  const key = import.meta.env.VITE_SITE_KEY;
  const [captcha, setCaptcha] = useState('');
  
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const {login} = useAuth();
  const { setUserData } = useUser();

  const handleSubmit = (e) => {
    console.log(userName,password);
    console.log(login);
    e.preventDefault();
    setErrors(LoginValidation({userName, password}));
    const token = recaptcha.current.getValue();

    axios.post('http://localhost:5000/api/auth', {user_name : userName, user_password: password})
    .then(result => {console.log(result)
      if(result.status === 200){
        login();
        setIsLogin('');
        axios.get(`http://localhost:5000/api/user/name/${userName}`)
        .then(result => { 
          console.log(result.data.user_type);
          const userType = result.data.user_type;
          const orgId = result.data.org_id;
          const userId = result.data.user_id;
          const userName = result.data.user_name;
          console.log("Setting user_id in context:", userId);
          setUserData({
            user_type: userType,
            org_id: orgId,
            user_id: userId,
            user_name:userName, 
          });
          const validtill = result.data.valid_till;
          var date = new Date();
          var current = date.toISOString().slice(0,10);
          console.log(token);
          
          if(!token){
            setCaptcha('Please authenticate captcha');
            return;
          }
          if(validtill < current && validtill !== null){
            setIsLogin('Your account has been expired');
            return;
          }
          if(userType === 1){
            
            navigate('/admin/dashboard')
          }
          else{
            navigate('/dashboard/'+orgId);
          }
        })
      }
    })
    .catch(err => {
      var error = err.response.data.message;
      setIsLogin(error);
      if(!token){
        setCaptcha('Please authenticate captcha');
        return;
      }
    })
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
          {islogin && !captcha && (!errors.username && !errors.password) && <span className='text-danger'>{islogin}</span>}
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
              {errors.userName && <span className='text-danger'>{errors.userName}</span>}
            </Box>
            <Box mt="25px">
              
              <TextField
                color='primary'
                id="outlined-password-input"
                placeholder='Password'
                label="Password"
                autoComplete="current-password"
                size='medium'
                fullWidth
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <VisibilityIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                        />
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color='primary'/>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span className='text-danger'>{errors.password}</span>}
            </Box>
            <Stack justifyContent="center" direction="column" alignItems="center" my={2} marginTop={4}>
              <Box marginBottom={2}>
                {/* {!token && <p className='text-danger'>Authenticate captcha</p>} */}
                <ReCAPTCHA sitekey={key} ref={recaptcha}/>
                {captcha && !errors.userName && !errors.password && <span className='text-danger'>{captcha}</span>}
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
