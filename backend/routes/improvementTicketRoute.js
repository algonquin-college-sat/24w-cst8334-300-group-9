import express from 'express';
import {
  createImprovementTicket,
  deleteImprovementTicket,
  getAllImprovementTickets,
  getImprovementTicketById,
  updateImprovementTicket,
} from '../Controllers/improvementTicketController.js';

const improvementTicketRoute = express.Router();

// Define routes
improvementTicketRoute.post('/', createImprovementTicket);
improvementTicketRoute.get('/', getAllImprovementTickets);
improvementTicketRoute.get('/:id', getImprovementTicketById);
improvementTicketRoute.patch('/:id', updateImprovementTicket);
improvementTicketRoute.delete('/:id', deleteImprovementTicket);

export default improvementTicketRoute;
