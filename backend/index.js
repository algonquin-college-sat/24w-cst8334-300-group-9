import express from 'express';
import mssql from 'mssql';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// SQL Server connection pool configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // For SQL Server Azure
    trustServerCertificate: true, // For development only
  },
};

// Create a new instance of mssql.ConnectionPool
const pool = new mssql.ConnectionPool(config);

// Connect to the database
pool
  .connect()
  .then(() => {
    console.log('Connected to SQL Server database');
  })
  .catch((err) => {
    console.error('Error connecting to SQL Server:', err);
  });

// Define your routes and other backend logic here

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
