/**
 * Sets up routes for handling improvement ticket operations in a web application.
 */
import express from 'express';
import {
  createImprovementTicket,
  deleteImprovementTicket,
  getAllImprovementTickets,
  getImprovementTicketByCategoryId,
  getImprovementTicketByDepartment,
  getImprovementTicketById,
  updateImprovementTicket,
} from '../Controllers/improvementTicketController.js';

// Creating an instance of an Express router
const improvementTicketRoute = express.Router();

// Define routes
improvementTicketRoute.post('/', createImprovementTicket);
improvementTicketRoute.get('/', getAllImprovementTickets);
improvementTicketRoute.get('/:id', getImprovementTicketById);
improvementTicketRoute.get('/category/:id', getImprovementTicketByCategoryId);
improvementTicketRoute.get('/department/:id', getImprovementTicketByDepartment);
improvementTicketRoute.patch('/:id', updateImprovementTicket);
improvementTicketRoute.delete('/:id', deleteImprovementTicket);

// Exporting the configured router
export default improvementTicketRoute;