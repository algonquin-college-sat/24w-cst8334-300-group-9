import express from 'express';
import sql from 'mssql/msnodesqlv8.js'; //msnodesqlv8 driver is a Node.js module that provides support for connecting to Microsoft SQL Server using the Microsoft ODBC Driver for SQL Server.
import dotenv from 'dotenv';
import { json } from 'sequelize';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// SQL Server connection pool configuration
const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  driver: 'msnodesqlv8',
  connectionString: `Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Driver={SQL Server}`,
  options: {
    encrypt: true, // For SQL Server Azure
    trustServerCertificate: true, // For development only
  },
};

const queryString = 'Select * from dbo.DEPARTMENTS';

sql.connect(config, (err) => {
  if (err) console.log(err);

  // create Request object
  var request = new sql.Request();
  request.query(queryString, (err, records) => {
    if (err) console.log(err);
    else if (records) {
      console.log(records);
    }
  });
});

// Define your routes and other backend logic here

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
