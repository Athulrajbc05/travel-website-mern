require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotels');
const placeRoutes = require('./routes/places');
const bookingRoutes = require('./routes/bookings');
const path = require('path');

const app = express();

// Request logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files - Single declaration
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API Routes with version prefix
const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/hotels', hotelRoutes);
apiRouter.use('/places', placeRoutes);
apiRouter.use('/bookings', bookingRoutes);
app.use('/api', apiRouter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}\nStack: ${err.stack}`);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Database connection
connectDB();

// Server initialization
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

// Process handlers
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err.name, err.message);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Graceful shutdown initiated...');
  server.close(() => {
    console.log('Server closed successfully');
    process.exit(0);
  });
});

module.exports = app;
