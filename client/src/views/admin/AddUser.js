import React, { useState } from 'react';
import { Box, Typography, TextField, Button , MenuItem} from "@mui/material";
import BreadcrumbComponent from '../../components/shared/BreadCrumbComponent';
import AdminHeader from './AdminHeader'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


const AddUser = () => {
  const [organisationName, setOrganisationName] = useState('');
  const [pocName, setPocName] = useState(''); // Added state for POC Name
  const [contactNumber, setContactNumber] = useState('');
  const [emailId, setEmailId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ organisationName, pocName, contactNumber, emailId });
  };

  return (<>
  <AdminHeader/>
    <BreadcrumbComponent  
        pageTitle="Create User" 
        breadcrumbTitle1="User"
        breadcrumbRoute1="/admin/users"
        breadcrumbTitle2="Create"
        breadcrumbRoute2="/admin/createuser"
       marginTop="70px"
        
      />
    <Box
      margin={5}
      display="flex"
      justifyContent="center" // Centers horizontally
      alignItems="flex-start" // Aligns content to the top
      height="100vh" // Full viewport height
      padding={2}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        padding={3}
        boxShadow={3}
        borderRadius={2}
        width="600px" // Increased width
        display="flex"
        flexDirection="column"
        gap={3}
        border={2} // Bolder border
        borderColor="primary.main" // Border color
      >
        <Typography variant="h4" textAlign="center" marginBottom={2}>
          Create User
        </Typography>

        {/* Organisation Name */}
        <TextField
          label="Organisation Name"
          variant="outlined"
          fullWidth
          select
          value={organisationName}
          onChange={(e) => setOrganisationName(e.target.value)}
        >
          <MenuItem value="ABC Organization">ABC Organization</MenuItem>
          <MenuItem value="BCD Organization">BCD Organization</MenuItem>
          <MenuItem value="CDE Organization">CDE Organization</MenuItem>
          <MenuItem value="DEF Organization">DEF Organization</MenuItem>
          <MenuItem value="EFG Organization">EFG Organization</MenuItem>
          <MenuItem value="FGH Organization">FGH Organization</MenuItem>
        </TextField>

        {/* POC Name */}
        <TextField
          label="POC Name"
          variant="outlined"
          fullWidth
          value={pocName}
          onChange={(e) => setPocName(e.target.value)}
        />

        {/* Contact Number */}
        {/* <TextField
          label="Contact Number"
          variant="outlined"
          fullWidth
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        /> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker/>
        </LocalizationProvider>

        {/* Email ID */}
        <TextField
          label="Email ID"
          variant="outlined"
          fullWidth
          type="email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default AddUser;