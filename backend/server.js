const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Configure CORS to allow cross-origin requests
// When credentials are enabled, '*' cannot be used. Reflect the request
// origin by default or use the explicit CLIENT_URL env var when provided.
const corsOptions = {
  origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL] : true,
  credentials: true,
};
app.use(cors(corsOptions));
// Ensure preflight requests succeed for all routes
app.options('*', cors(corsOptions));

app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/medical-records', require('./routes/medicalRecordRoutes'));

if (require.main === module) {
  connectDB();
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;