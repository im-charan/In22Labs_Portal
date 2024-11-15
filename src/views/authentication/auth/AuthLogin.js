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
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { IconLock } from '@tabler/icons-react';
import InputAdornment from '@mui/material/InputAdornment';
import { AccountCircle } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
const AuthLogin = ({ title, subtitle, subtext }) => (
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
              />
            </Box>
            <Box mt="25px">
              <TextField
              color='primary'
              id="outlined-password-input"
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
              />
            </Box>
            <Stack justifyContent="center" direction="row" alignItems="center" my={2} marginTop={4}>
              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component={Link}
                  to="/dashboard"
                  type="submit"
                >
                Login 
                </Button>
              </Box>
            </Stack>
        {subtitle}
        </Stack>
        
    </>
);

export default AuthLogin;
