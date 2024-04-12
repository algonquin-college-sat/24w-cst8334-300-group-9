/**
 * Sets up routes for handling improvement ticket operations in a web application.
 */
import express from 'express';
import {
  getAllImpTicketUpdateNotes,
  createImpTicketUpdateNote,
  deleteImpTicketUpdateNote,
  getImpTicketUpdateNoteById,
  updateImpTicketUpdateNote,
} from '../Controllers/impTicketUpdateNoteController.js';

// Creating an instance of an Express router
const impTicketUpdateNoteRoute = express.Router();

// Define routes
impTicketUpdateNoteRoute.post('/', createImpTicketUpdateNote);
impTicketUpdateNoteRoute.get('/', getAllImpTicketUpdateNotes);
impTicketUpdateNoteRoute.get('/:id', getImpTicketUpdateNoteById);
impTicketUpdateNoteRoute.patch('/:id', updateImpTicketUpdateNote);
impTicketUpdateNoteRoute.delete('/:id', deleteImpTicketUpdateNote);

// Exporting the configured router
export default impTicketUpdateNoteRoute;
