/**
 * Handles CRUD operations for departments in a web application.
 *
 * - createDepartment: Creates a new department.
 * - getAllDepartments: Retrieves all departments.
 * - getDepartmentById: Retrieves a department by its ID.
 * - updateDepartment: Updates an existing department.
 * - deleteDepartment: Deletes a department.
 */
import sql from 'mssql/msnodesqlv8.js';
import { getConnection } from '../dbConfig.js';

// Create a department
export const createDepartment = async (req, res) => {
  const { department_name, display_board } = req.body;

  const query = `
    INSERT INTO DEPARTMENTS (department_name, display_board)
    VALUES (@department_name, @display_board);
  `;

  try {
    const pool = await getConnection();
    const request = pool
      .request()
      .input('department_name', sql.NVarChar, department_name)
      .input('display_board', sql.Bit, display_board);

    const result = await request.query(query);
    res.status(201).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Failed to create department' });
  }
};

// Get all departments
export const getAllDepartments = async (req, res) => {
  const query = `SELECT * FROM DEPARTMENTS;`;

  try {
    const pool = await getConnection();
    const result = await pool.request().query(query);
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error retrieving departments:', error);
    res.status(500).json({ error: 'Failed to retrieve departments' });
  }
};

// Get department by ID
export const getDepartmentById = async (req, res) => {
  const query = `SELECT * FROM DEPARTMENTS WHERE department_id = @departmentId;`;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('departmentId', sql.Int, req.params.id)
      .query(query);

    if (result.recordset.length > 0) {
      res.status(200).json({ success: true, data: result.recordset[0] });
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error('Error retrieving department by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve department by ID' });
  }
};

// Update department by ID
export const updateDepartment = async (req, res) => {
  const { department_name, display_board } = req.body;
  const { id } = req.params;

  const query = `
    UPDATE DEPARTMENTS
    SET department_name = @department_name, display_board = @display_board
    WHERE department_id = @departmentId;
  `;

  try {
    const pool = await getConnection();
    const request = pool
      .request()
      .input('department_name', sql.NVarChar, department_name)
      .input('display_board', sql.Bit, display_board)
      .input('departmentId', sql.Int, id);

    const result = await request.query(query);
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'Failed to update department' });
  }
};

// Delete department by ID
export const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM DEPARTMENTS WHERE department_id = @departmentId;`;

  try {
    const pool = await getConnection();
    const request = pool.request().input('departmentId', sql.Int, id);

    const result = await request.query(query);
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'Failed to delete department' });
  }
};
