import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { breedRoutes } from './routes/breed';
import { healthRoutes } from './routes/health';
import { leadRoutes } from './routes/lead';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// CORS configuration
const allowedOrigins = [
  'https://kalvincare-j1bq.vercel.app',
  'http://localhost:3000',
  ...(process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [])
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/breed', breedRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/lead', leadRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: process.env.NODE_ENV,
    allowedOrigins
  });
});

// Connect to MongoDB if MONGODB_URI is provided
const startServer = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    } else {
      console.log('MongoDB connection skipped - no MONGODB_URI provided');
    }

    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
      console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
      console.log('Allowed origins:', allowedOrigins);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer(); 