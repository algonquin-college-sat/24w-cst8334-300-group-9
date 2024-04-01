/**
 * Sets up routes for handling improvement ticket operations in a web application.
 */
import express from 'express';
import {
  getAllQuadrupleAims,
} from '../Controllers/quadrupleAimController.js';

// Creating an instance of an Express router
const quadrupleAimRoute = express.Router();

// Define routes
quadrupleAimRoute.get('/', getAllQuadrupleAims);

// Exporting the configured router
export default quadrupleAimRoute;
