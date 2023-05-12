import express from 'express';
import cors from 'cors';
import './loadEnvironment.mjs';
import records from './routes/record.mjs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, './frontend/build')));

app.use('/record', records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});
