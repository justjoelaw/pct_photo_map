import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const connectionString = process.env.COSMOS_URI || '';

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'pct-map',
  })
  .then(() => {
    console.log('MongoDB connected!');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const db = mongoose.connection;

export default db;