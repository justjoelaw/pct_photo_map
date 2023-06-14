import express from 'express';
import cors from 'cors';
import './config/loadEnvironment.js';
import journalEntrys from './routes/journalEntryRoutes.js';
import users from './routes/userRoutes.js';
import auth from './routes/authRoutes.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { logger, logEvents } from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/conn.js';
import corsOptions from './config/corsOptions.js';
import loadEnvironment from './config/loadEnvironment.js';
import cookieParser from 'cookie-parser';

const setupServer = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  loadEnvironment();
  console.log('NODE_ENV = ', process.env.NODE_ENV);
  const PORT = process.env.PORT || 5050;
  console.log('About to attempt connectDB using ', process.env.COSMOS_URI);
  let conn = await connectDB();
  const app = express();

  app.use(logger);

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(cookieParser());

  app.use(express.static(path.join(__dirname, './frontend/build')));

  app.use('/auth', auth);

  app.use('/journalEntrys', journalEntrys);

  app.use('/users', users);

  // start the Express server
  let server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));
  });

  app.use(errorHandler);

  return { server, conn, app };
};

export { setupServer };
