/**
 * Sets up routes for handling celebration ticket operations in a web application.
 */
import express from 'express';
import {
  createCelebrationTicket,
  deleteCelebrationTicket,
  getAllCelebrationTickets,
  getCelebrationTicketById,
  updateCelebrationTicket,
} from '../Controllers/celebrationTicketController.js';

// Creating an instance of an Express router
const celebrationTicketRoute = express.Router();

// Define routes
celebrationTicketRoute.post('/', createCelebrationTicket);
celebrationTicketRoute.get('/', getAllCelebrationTickets);
celebrationTicketRoute.get('/:id', getCelebrationTicketById);
celebrationTicketRoute.patch('/:id', updateCelebrationTicket);
celebrationTicketRoute.delete('/:id', deleteCelebrationTicket);

// Exporting the configured router
export default celebrationTicketRoute;
