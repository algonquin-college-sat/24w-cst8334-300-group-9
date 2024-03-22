import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file
const { DB_SERVER, DB_DATABASE, DB_DRIVER } = process.env;

export const dbConfig = {
  server: DB_SERVER,
  database: DB_DATABASE,
  driver: DB_DRIVER,
  connectionString: `Server=${DB_SERVER};Database=${DB_DATABASE};Driver={SQL Server}`,
  options: {
    encrypt: true, // For SQL Server Azure
    trustServerCertificate: true, // For development only
  },
};
