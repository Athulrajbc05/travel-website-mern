import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import TouristPlaces from './pages/TouristPlaces';
import PlaceDetails from './pages/PlaceDetails';
import HotelDetails from './pages/HotelDetails';
import Booking from './pages/Booking';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/register' element={<Register />} />
        {isAuthenticated ? (
          <>
            {/* Navbar will only appear for authenticated routes */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar isAuthenticated={isAuthenticated} />
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/tourist-places" element={<TouristPlaces />} />
                    <Route path="/place/:id" element={<PlaceDetails />} />
                    <Route path="/hotel/:id" element={<HotelDetails />} />
                  </Routes>
                </>
              }
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
