import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Paper, ImageList, ImageListItem } from '@mui/material';
import { useState, useEffect } from 'react';
import api from '../../src/api';

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await api.get(`/places/${id}`);
        setPlace(response.data);
      } catch (error) {
        console.error('Error fetching place:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id]);
  

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!place) {
    return (
      <Container>
        <Typography>Place not found</Typography>
        <Button onClick={() => navigate('/tourist-places')}>Back to Places</Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        {place.name}
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>About</Typography>
            <Typography paragraph>{place.description}</Typography>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>Photo Gallery</Typography>
            <ImageList cols={3} gap={8}>
              {place.images?.map((img, index) => (
                <ImageListItem key={index}>
                  <img
                    src={img}
                    alt={`${place.name} view ${index + 1}`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>Key Attractions</Typography>
            <Box component="ul">
              {place.attractions?.map((attraction, index) => (
                <Typography component="li" key={index}>
                  {attraction}
                </Typography>
              ))}
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Activities</Typography>
            <Box component="ul">
              {place.activities?.map((activity, index) => (
                <Typography component="li" key={index}>
                  {activity}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceDetails;
