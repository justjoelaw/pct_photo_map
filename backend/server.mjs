import express from 'express';
import cors from 'cors';
import './config/loadEnvironment.mjs';
import journalEntrys from './routes/journalEntryRoutes.mjs';
import users from './routes/userRoutes.mjs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { logger, logEvents } from './middleware/logger.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import connectDB from './config/conn.mjs';
import corsOptions from './config/corsOptions.mjs';
import loadEnvironment from './config/loadEnvironment.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

loadEnvironment();
const PORT = process.env.PORT || 5050;
console.log('About to attempt connectDB using ', process.env.COSMOS_URI);
connectDB();
const app = express();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static(path.join(__dirname, './frontend/build')));

app.use('/journalEntry', journalEntrys);

app.use('/users', users);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});

app.use(errorHandler);
