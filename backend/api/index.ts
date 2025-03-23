import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../src/config/swagger';
import { breedRoutes } from '../src/routes/breed';
import { healthRoutes } from '../src/routes/health';
import { leadRoutes } from '../src/routes/lead';

dotenv.config();

const app = express();

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
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    } else {
      console.log('MongoDB connection skipped - no MONGODB_URI provided');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Initialize MongoDB connection
connectDB();

// Export the Express app for Vercel
export default app; 