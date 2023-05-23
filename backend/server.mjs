import express from 'express';
import cors from 'cors';
import './loadEnvironment.mjs';
import journalEntrys from './routes/journalEntryRoute.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { logger, logEvents } from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import db from './config/conn.mjs';
import corsOptions from './config/corsOptions.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 5050;
const app = express();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static(path.join(__dirname, './frontend/build')));

app.use('/journalEntry', journalEntrys);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});

app.use(errorHandler);
