import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box, Divider } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import '../../styles/TouristPlaces.css';
import SearchBar from './SearchBar';
import api from '../api';

const TouristPlaces = () => {
  const navigate = useNavigate();
  const [placesData, setPlacesData] = useState([]);
  const [hotelsData, setHotelsData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkInDate: null,
    checkOutDate: null,
    guests: 1
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [placesRes, hotelsRes] = await Promise.all([
          api.get('/places'),
          api.get('/hotels')
        ]);
        
        console.log('Places data:', placesRes.data);
        console.log('Hotels data:', hotelsRes.data);
        
        setPlacesData(placesRes.data);
        setHotelsData(hotelsRes.data);
      } catch (error) {
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data
        });
      }
    };
  
    fetchData();
  }, []);
  
  
  

  const handlePlaceClick = (place) => {
    navigate(`/place/${place._id}`);
  };

  const handleHotelClick = (hotel) => {
    navigate(`/hotel/${hotel._id}`);
  };

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const filteredPlaces = placesData.filter(place => {
    if (!searchParams.destination) return true;
    return place.name.toLowerCase().includes(searchParams.destination.toLowerCase());
  });

  return (
    <Box className="tourist-places-container">
      <SearchBar onSearch={handleSearch} />
      
      <Typography variant="h3" className="section-title" sx={{ mb: 3 }}>
        Tourist Places
      </Typography>

      <Grid container spacing={4}>
        {filteredPlaces.map((place) => (
          <Grid item xs={12} sm={4} md={4} key={place._id}>
            <Card className="card" onClick={() => handlePlaceClick(place)}>
                  <CardMedia
                      component="img"
                      className="card-media"
                      image={place.image} // Direct URL from MongoDB
                      alt={place.name}
                      sx={{ height: 200, objectFit: 'cover' }}
                  />
              <CardContent>
                <Typography className="card-title">
                  {place.name}
                </Typography>
                <Typography className="card-description">
                  {place.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider className="divider" sx={{ my: 4 }} />

      <Typography variant="h3" className="section-title" sx={{ mb: 3 }}>
        Luxury Hotels
      </Typography>

      <Grid container spacing={4}>
        {hotelsData.map((hotel) => (
          <Grid item xs={12} sm={4} md={4} key={hotel._id}>
            <Card className="card" onClick={() => handleHotelClick(hotel)}>
            <CardMedia
                component="img"
                className="card-media"
                image={hotel.image} // Direct URL from MongoDB
                alt={hotel.name}
                sx={{ height: 200, objectFit: 'cover' }}
            />
              <CardContent>
                <Typography className="card-title">
                  {hotel.name}
                </Typography>
                <Typography className="location-text">
                  <LocationOnIcon fontSize="small" />
                  {hotel.location}
                </Typography>
                <Typography className="card-description">
                  {hotel.description}
                </Typography>
                <Typography className="price-text">
                  <HotelIcon fontSize="small" />
                  {hotel.priceRange} per night
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TouristPlaces;
