import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../../src/api';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };
  
  return (
    <Grid container className="auth-container">
      <Grid item xs={12} sm={4}>
        <img 
          src="https://s3.india.com/wp-content/uploads/2024/08/kerala-hidden-gems.jpg##image/jpg" 
          alt="Login" 
          style={{ width: '100%', height: 'auto', marginTop: '50px', borderRadius: '50px' }} 
        />
      </Grid>
      <Grid item xs={12} sm={7}>
        <Typography variant="h4" component="h1" align='center' gutterBottom>
          Login Form
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => navigate('/register')}
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
