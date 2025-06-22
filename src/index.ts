import dotenv from 'dotenv';
// Load environment variables
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { errorHandler } from '@/libs/error-handler';
import { logger } from '@/libs/logger';
import { authRoutes } from '@/handlers/auth-routes';
import { statsRoutes } from '@/handlers/stats-routes';
import { swaggerOptions } from '@/libs/swagger-config';

const app = express();
const PORT = process.env['PORT'] || 4000;

// Parse CORS origins
const corsOrigins = process.env['CORS_ORIGIN']?.split(',') || ['http://localhost:3000'];

// Security middleware
app.use(helmet());
app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '3600000'), // 1 hour
  max: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '500'), // 500 requests per hour
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Logging middleware
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
const specs = swaggerJsdoc(swaggerOptions);
// @ts-expect-error: swaggerUi.serve and setup are not typed as compatible with app.use
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env['NODE_ENV'] || 'development',
    version: '1.0.0'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 AIDONIC Backend Server running on port ${PORT}`);
  logger.info(`🌍 Environment: ${process.env['NODE_ENV'] || 'development'}`);
  logger.info(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
  logger.info(`🔒 CORS Origins: ${corsOrigins.join(', ')}`);
});

export default app;
