import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    }
  };
  return (
    <Grid container className="auth-container">
      <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="https://s3.india.com/wp-content/uploads/2024/08/kerala-hidden-gems.jpg##image/jpg" alt="Register" style={{ width: '100%', height: 'auto',borderRadius:'50px',marginTop:'50px' }} />
      </Grid>
      <Grid item xs={12} sm={7}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" align='center' component="h1" gutterBottom>
            Register Form
          </Typography>
          <form className="auth-form"  onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Name"
              type="text"
              fullWidth
              required
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Back to Login
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
