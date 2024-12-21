import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import api from '../../src/api'
const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await api.get(`/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error('Error fetching hotel:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const handleBookingClick = () => {
    navigate('/booking');
  };

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4">Loading...</Typography>
      </Container>
    );
  }

  if (!hotel) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4">Hotel not found</Typography>
        <Button onClick={() => navigate('/tourist-places')}>
          Back to Hotels
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        {hotel.name}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>About</Typography>
            <Typography paragraph>{hotel.description}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>Details</Typography>
            <Typography>Location: {hotel.location}</Typography>
            <Typography>Price Range: {hotel.priceRange}</Typography>
          </Paper>

          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            fullWidth 
            onClick={handleBookingClick}
            sx={{ mt: 2 }}
          >
            Book Now
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HotelDetails;
