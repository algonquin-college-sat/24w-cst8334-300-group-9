import express from 'express';
import sql from 'mssql/msnodesqlv8.js'; //msnodesqlv8 driver is a Node.js module that provides support for connecting to Microsoft SQL Server using the Microsoft ODBC Driver for SQL Server.
import dotenv from 'dotenv';
import { dbConfig } from './dbConfig.js';
import improvementTicketRoute from './routes/improvementTicketRoute.js';
import departmentRoute from './routes/departmentRoute.js';
import cors from 'cors';
import {
  CATEGORIES,
  CELEBRATIONTICKETS,
  DEPARTMENTS,
  IMPROVEMENTTICKETS,
  IMP_TICKET_UPDATE_NOTES,
  QUADRUPLE_AIM,
} from './routes/routePaths.js';
import categoryRoute from './routes/categoryRoute.js';
import celebrationTicketRoute from './routes/celebrationTicketRoute.js';
import quadrupleAimRoute from './routes/quardrupleAimRoute.js';
import impTicketUpdateNoteRoute from './routes/i_ticketUpdateNoteRoute.js';

dotenv.config(); // Load environment variables from .env file

const app = express();

const { DB_PORT } = process.env;
const PORT = DB_PORT || 3000;

app.use(express.json()); //Middleware to parse JSON bodies in incoming requests

// Enable CORS
app.use(cors());

sql.connect(dbConfig, (err) => {
  if (err) console.log(err);
  console.log('Connected to the database');

  // create Request object
});
//Access to all the route paths
app.use(IMPROVEMENTTICKETS, improvementTicketRoute);
app.use(DEPARTMENTS, departmentRoute);
app.use(CATEGORIES, categoryRoute);
app.use(CELEBRATIONTICKETS, celebrationTicketRoute);
app.use(QUADRUPLE_AIM, quadrupleAimRoute);
app.use(IMP_TICKET_UPDATE_NOTES, impTicketUpdateNoteRoute);
// app.get('/improvement-ticket', getAllImprovementTickets);
// Define your routes and other backend logic here

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
