/**
 * Sets up routes for handling category operations in a web application.
 */

// Importing the necessary modules and functions
import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../Controllers/categoryController.js';

// Creating an instance of an Express router
const categoryRoute = express.Router();

// Define routes for categories CRUD operations
categoryRoute.post('/', createCategory);
categoryRoute.get('/', getAllCategories);
categoryRoute.get('/:id', getCategoryById);
categoryRoute.patch('/:id', updateCategory);
categoryRoute.delete('/:id', deleteCategory);

// Exporting the configured router
export default categoryRoute;
