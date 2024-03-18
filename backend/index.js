import express from 'express';
import sql from 'mssql/msnodesqlv8.js'; //msnodesqlv8 driver is a Node.js module that provides support for connecting to Microsoft SQL Server using the Microsoft ODBC Driver for SQL Server.
import dotenv from 'dotenv';
import { json } from 'sequelize';
import { dbConfig } from './dbConfig.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const { DB_PORT } = process.env;
const PORT = DB_PORT || 3000;

const queryString = 'Select * from dbo.DEPARTMENTS';

sql.connect(dbConfig, (err) => {
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
