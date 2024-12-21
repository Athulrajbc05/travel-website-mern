import { Box, Typography } from '@mui/material';
import '../../styles/About.css';

const About = () => {
  return (
    <Box className="about-container">
      <Box className="about-content">
        <Typography
          variant="h3"
          className="about-title"
        >
          About ExploreMalabar
        </Typography>

        <Typography
          variant="body1"
          className="about-description"
        >
          Founded in 2024, <b>ExploreMalabar</b> began as a small startup with a big vision: to showcase the timeless beauty and cultural richness of Kerala to the world. Inspired by the breathtaking landscapes, serene backwaters, and vibrant traditions of God's Own Country, we set out on a mission to make Kerala’s most prestigious destinations accessible to every traveler.

          What started as a passion for travel and discovery soon grew into a trusted platform for wanderers seeking authentic experiences. We understood that every traveler craves more than just a destination—they seek stories, connections, and memories that last a lifetime.

          At ExploreMalabar, we focus on curating the best experiences Kerala has to offer, from its tranquil hill stations and pristine beaches to its bustling markets and heritage towns. We believe that travel is not just about seeing places—it's about feeling them.

          As we continue to grow, our commitment remains the same: to help you explore Kerala like never before. Whether you're a solo adventurer, a family vacationer, or a culture enthusiast, we’re here to guide you on a journey of wonder and discovery.

          <b>Explore with us. Discover Malabar. Create stories</b>
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
