import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, CircularProgress } from '@mui/material';
import { Email } from '@mui/icons-material';

const AuthForgetPassword = ({ title, subtitle, subtext }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSubmit = async () => {
        if (!email) {
            setMessage("Please enter your email address");
            return;
        }

        setLoading(true); // Set loading state to true

        try {
            const response = await fetch('http://localhost:5000/api/client/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // Send email in request body
            });

            const data = await response.json(); // Parse JSON response

            if (response.ok) {
                setMessage(data.message); // Success message from backend
            } else {
                setMessage(data.message || 'Failed to send email'); // Error message
            }
        } catch (error) {
            setMessage('Failed to send email due to a network error');
        } finally {
            setLoading(false);
            setEmail(''); 
            setTimeout(() => setMessage(''), 3000); // Clear message after 5 seconds
        }
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box>
                <TextField
                    color="primary"
                    id="outlined-input"
                    placeholder="Enter your Email"
                    label="Email"
                    type="email"
                    size="medium"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email color="primary" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 3 }}
                />
                <Box display="flex" justifyContent="center">
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={handleSubmit}
                        disabled={loading} // Disable button during loading
                    >
                        {loading ? <CircularProgress size={24} color="secondary" /> : "Submit"}
                    </Button>
                </Box>
                {message && (
                    <Typography color={message.includes('successfully') ? 'green' : 'red'} mt={2}>
                        {message}
                    </Typography>
                )}
            </Box>
            {subtitle}
        </>
    );
};

export default AuthForgetPassword;
