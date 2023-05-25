import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const connectDB = () => {
  let nodeEnv = process.env.NODE_ENV?.trim();
  let dbName = nodeEnv === 'test' ? 'pct-map-test' : 'pct-map';

  return new Promise((resolve, reject) => {
    const connectionString = process.env.COSMOS_URI || '';

    mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName,
      })
      .then((conn) => {
        // Receive connection object
        console.log('MongoDB connected!');
        resolve(conn); // Resolve with connection object
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        reject(error);
      });
  });
};

export default connectDB;
