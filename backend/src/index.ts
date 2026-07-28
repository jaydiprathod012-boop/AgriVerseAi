import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler';

import diseaseRoutes from './routes/disease';
import weatherRoutes from './routes/weather';
import yieldRoutes from './routes/yield';
import mandiRoutes from './routes/mandi';
import assistantRoutes from './routes/assistant';
import shopsRoutes from './routes/shops';
import schemesRoutes from './routes/schemes';
import marketplaceRoutes from './routes/marketplace';
import analyticsRoutes from './routes/analytics';
import notificationsRoutes from './routes/notifications';
import authRoutes from './routes/auth';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS — Allow all Vercel + localhost origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5173',
  'https://agri-verse-ai.vercel.app', // apna Vercel URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Allow all vercel.app subdomains
      if (origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true
}));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again after 15 minutes'
});
app.use('/api', limiter);

app.use('/api/disease', diseaseRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/yield', yieldRoutes);
app.use('/api/mandi', mandiRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api/shops', shopsRoutes);
app.use('/api/schemes', schemesRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/auth', authRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), version: '1.0.0' });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
