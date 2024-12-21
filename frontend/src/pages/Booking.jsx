import React, { useState } from 'react';
import { 
  Box, TextField, Checkbox, FormControlLabel, Button, 
  Typography, Paper, Grid, Alert, Snackbar 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';

function Booking() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState({});
  const [bookingData, setBookingData] = useState({
    name: '',
    age: '',
    mobile: '',
    numberOfGuests: 1,
    checkIn: null,
    checkOut: null,
    extras: {
      breakfast: false,
      airportPickup: false
    }
  });

  const validateForm = () => {
    const newErrors = {};
    if (!bookingData.name) newErrors.name = 'Name is required';
    if (!bookingData.age) newErrors.age = 'Age is required';
    if (!bookingData.mobile) newErrors.mobile = 'Mobile number is required';
    if (!bookingData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!bookingData.checkOut) newErrors.checkOut = 'Check-out date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSnackbar(true);
    console.log('Booking Data:', bookingData);
    
    // Navigate to home after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Complete Your Booking
          </Typography>

          <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
  {/* Full Name */}
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Full Name"
      required
      value={bookingData.name}
      onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
    />
  </Grid>

  {/* Age */}
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Age"
      type="number"
      required
      value={bookingData.age}
      onChange={(e) => setBookingData({...bookingData, age: e.target.value})}
    />
  </Grid>

  {/* Mobile Number */}
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Mobile Number"
      required
      value={bookingData.mobile}
      onChange={(e) => setBookingData({...bookingData, mobile: e.target.value})}
    />
  </Grid>

  {/* Number of Guests */}
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Number of Guests"
      type="number"
      required
      value={bookingData.numberOfGuests}
      onChange={(e) => setBookingData({...bookingData, numberOfGuests: e.target.value})}
    />
  </Grid>

  {/* Check-in Date */}
  <Grid item xs={12} sm={6}>
    <DatePicker
      label="Check-in Date"
      value={bookingData.checkIn}
      onChange={(date) => setBookingData({...bookingData, checkIn: date})}
      slotProps={{ textField: { fullWidth: true } }}
    />
  </Grid>

  {/* Check-out Date */}
  <Grid item xs={12} sm={6}>
    <DatePicker
      label="Check-out Date"
      value={bookingData.checkOut}
      onChange={(date) => setBookingData({...bookingData, checkOut: date})}
      slotProps={{ textField: { fullWidth: true } }}
    />
  </Grid>



              {/* Add error handling to other fields similarly */}
              
              <Grid item xs={12}>
                <Button 
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ 
                    mt: 2,
                    height: 56,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#1565c0'
                    }
                  }} 
                >
                  Complete Booking
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
      >
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%',
            fontSize: '1.1rem',
            '& .MuiAlert-icon': {
              fontSize: '2rem'
            }
          }} 
        >
          Booking confirmed successfully!
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
}

export default Booking;
