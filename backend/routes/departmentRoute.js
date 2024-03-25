/**
 * Sets up routes for handling department operations in a web application.
 */

// Importing the necessary modules and functions
import express from 'express';
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} from '../Controllers/departmentController.js';

// Creating an instance of an Express router
const departmentRoute = express.Router();

// Define routes for departments CRUD operations
departmentRoute.post('/', createDepartment);
departmentRoute.get('/', getAllDepartments);
departmentRoute.get('/:id', getDepartmentById);
departmentRoute.patch('/:id', updateDepartment);
departmentRoute.delete('/:id', deleteDepartment);

// Exporting the configured router
export default departmentRoute;
