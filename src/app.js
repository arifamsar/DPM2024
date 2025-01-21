const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Import CORS

// Import Routes
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Initialize dotenv
dotenv.config();

// Initialize Express
const app = express();

// CORS Configuration (adjust the origin to your Expo IP or URL)
const corsOptions = {
  origin: "http://192.168.32.166:8000", // Replace with your Expo device IP or localhost URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions)); // Apply CORS middleware with the options

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/items', itemRoutes); // Item routes

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  await connectDB(); // Connect to MongoDB before starting server
  console.log(`Server is running on http://${process.env.HOST || 'localhost'}:${PORT}`);
});

module.exports = app;
