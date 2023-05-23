import dotenv from 'dotenv';

const loadEnvironment = () => {
  dotenv.config();
  console.log('Environment variables loaded using dotenv');
};

export default loadEnvironment;
