import express from 'express';
import sql from 'mssql/msnodesqlv8.js'; //msnodesqlv8 driver is a Node.js module that provides support for connecting to Microsoft SQL Server using the Microsoft ODBC Driver for SQL Server.
import dotenv from 'dotenv';
import { dbConfig } from './dbConfig.js';
import improvementTicketRoute from './routes/improvementTicketRoute.js';
import { IMPROVEMENTTICKETS } from './routes/routePaths.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const { DB_PORT } = process.env;
const PORT = DB_PORT || 3000;

app.use(express.json()); // Parse JSON bodies

sql.connect(dbConfig, (err) => {
  if (err) console.log(err);
  console.log('Connected to the database');

  // create Request object
});

// Use the improvement ticket route
app.use(IMPROVEMENTTICKETS, improvementTicketRoute);
// app.get('/improvement-ticket', getAllImprovementTickets);
// Define your routes and other backend logic here

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
