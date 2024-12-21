import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/tourist-places', { replace: true });
  };

  return (
    <Box className="home-container">
      <Box className="content-wrapper" >
        <Typography 
          variant="h2" 
          className="main-title"
        >
          Explore the Green Symphony of Kerala!
        </Typography>

        <Typography 
          variant="h5" 
          className="subtitle"
        >
          Welcome to Kerala – Where Every Journey Tells a Story! Immerse yourself <br></br>in breathtaking backwaters, serene beaches, lush greenery, and a vibrant culture. Your unforgettable adventure begins here.
        </Typography>
<br />
        <Typography 
          variant="body1"
          className="description"
        >
          Kerala, located on the southwestern coast of India, is a paradise of palm-lined beaches,
          serene backwaters, rolling hills of tea plantations, and exotic wildlife.
          Experience the rich culture, authentic cuisine, and warm hospitality.
        </Typography>

        <Button
          variant="contained"
          className="explore-button"
          onClick= {handleExplore}
        >
          Explore Kerala
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
