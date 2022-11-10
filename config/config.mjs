import dotenv from 'dotenv';

dotenv.config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
    mongoUri: process.env.MONGODB_URI,
    apiKey : process.env.API_KEY,
    domain : process.env.DOMAIN,
    email: process.env.EMAIL,
    host: process.env.HOST,
    credential:process.env.FIREBASE_CERT
  };
  
  export default config;
