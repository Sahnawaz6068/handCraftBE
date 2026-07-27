import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './src/config/env.js';
import connectDB from './src/config/db.js';
import apiRoute from './src/routes/index.js';

const requiredEnvVars = ['PORT', 'MONGO_URI'];
const missing = requiredEnvVars.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Routes
app.use('/api', apiRoute);

app.get('/', (req, res) => {
  res.json('Server test');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ errorResponse: { message: 'Route not found' } });
});

// Global error handler — must be last, 4 args required
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    errorResponse: { message: err.message || 'Internal server error' },
  });
});

async function startServer() {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect to DB:', err.message);
    process.exit(1);
  }
}

startServer();