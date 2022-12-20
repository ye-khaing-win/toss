import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import * as dotenv from 'dotenv';
import AppError from './utils/AppError.js';
import connectDB from './database/connect.js';

import globalErrorHandler from './middlewares/errorMiddleware.js';
import sectorRouter from './routers/sectorRouter.js';
import branchRouter from './routers/branchRouter.js';
import jobRouter from './routers/jobRouter.js';

// CATCH UNCAHGHT SYNC EXCEPTION
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHTEXCEPTION! Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

// LOAD ENVIRONMENT VARIABLES
dotenv.config({ path: 'src/config/config.env' });

// CONNECT TO DATABASE
connectDB();

const PORT = process.env.PORT || 7000;

// EXPRESS APP
const app = express();

// MIDDLEWARES
// 1) HELMET
app.use(helmet());

// 2) BODY PARSER
app.use(express.json());

// 3) DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());

// 4) PREVENT PARAMETER POLLUTION
app.use(hpp());

// 5) REQUEST LIMITER
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,
  message: 'Too many requests from this IP, please try again in an hour',
});

app.use('/api', limiter);

// 6) LOGGER
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES
// DEFINE DEFAULT ROUTE
app.get('/', (req, res) => {
  res.send('WELCOME TO THE SERVER');
});

// 1) SECTOR
app.use('/api/v1/sectors', sectorRouter);

// 2) BRANCH
app.use('/api/v1/branches', branchRouter);

// 3) JOB
app.use('/api/v1/jobs', jobRouter);

//  CATCH UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// CATCH GLOBAL ERRORS
app.use(globalErrorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

// CATCH UNHANDLED PROMESE REJECTION
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
