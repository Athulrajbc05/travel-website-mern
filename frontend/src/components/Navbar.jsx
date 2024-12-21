import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogoutClick = () =>{
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <AppBar position="static" style={{backgroundColor : '#D22B2B'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         ExploreMalabar
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/home">Home</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          <Button color='inherit' onClick={handleLogoutClick}>Log Out</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
