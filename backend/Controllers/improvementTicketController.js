/**
 * Handles CRUD operations for improvement tickets in a web application.
 * Uses SQL queries to interact with the database.
 *
 * - createImprovementTicket: Creates a new improvement ticket.
 * - getAllImprovementTickets: Retrieves all improvement tickets.
 * - getImprovementTicketById: Retrieves an improvement ticket by its ID.
 * - updateImprovementTicket: Updates an existing improvement ticket.
 * - deleteImprovementTicket: Deletes an improvement ticket.
 */
import sql from 'mssql/msnodesqlv8.js';
import { getConnection } from '../dbConfig.js';

// Create Improvement ticket
// Create Improvement ticket
export const createImprovementTicket = async (req, res) => {
  const query = `
    INSERT INTO IMPROVEMENT_TICKETS (
      name, 
      date, 
      problem, 
      improve_idea, 
      source_issue, 
      input_needed_from, 
      safety_issue, 
      quadruple_aim_id,
      solution_outcome, 
      category_id
    ) 
    VALUES
    ( 
      @name, @date, @problem, @improve_idea, @source_issue, @input_needed_from, @safety_issue, @quadruple_aim_id, @solution_outcome, @category_id
    );
  `;

  try {
    const pool = await getConnection();
    const request = pool
      .request()
      .input('name', sql.NVarChar, req.body.name)
      .input('date', sql.Date, req.body.date)
      .input('problem', sql.NVarChar, req.body.problem)
      .input('improve_idea', sql.NVarChar, req.body.improve_idea)
      .input('source_issue', sql.NVarChar, req.body.source_issue)
      .input('input_needed_from', sql.NVarChar, req.body.input_needed_from)
      .input('safety_issue', sql.NVarChar, req.body.safety_issue)
      .input('quadruple_aim_id', sql.Int, req.body.quadruple_aim_id)
      .input('solution_outcome', sql.NVarChar, req.body.solution_outcome)
      .input('category_id', sql.Int, req.body.category_id);

    const result = await request.query(query);
    res.status(201).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error creating improvement ticket:', error);
    res.status(500).json({ error: 'Failed to create improvement ticket' });
  }
};

// Get all improvement tickets
export const getAllImprovementTickets = async (req, res) => {
  // SQL query for retrieving all improvement tickets
  const queryString = `SELECT * FROM dbo.IMPROVEMENT_TICKETS;`;

  try {
    // Establish connection to the database
    const pool = await getConnection();
    // Execute the query
    const result = await pool.request().query(queryString);
    // Respond with retrieved data
    res.json({ msg: ' Fetch tickets successfully', data: result.recordset });
  } catch (error) {
    // Handle errors
    console.error('Error retrieving improvement tickets:', error);
    res.status(500).json({ error: 'Failed to retrieve improvement tickets' });
  }
};

// Get improvement ticket by ID
export const getImprovementTicketById = async (req, res) => {
  // SQL query for retrieving an improvement ticket by its ID
  const query = `SELECT * FROM IMPROVEMENT_TICKETS WHERE ticket_id = @ticketId;`;

  try {
    // Establish connection to the database
    const pool = await getConnection();
    // Create a request object
    const result = await pool
      .request()
      // Bind input parameter
      .input('ticketId', sql.Int, req.params.id)
      .query(query);

    // Check if a record was found
    if (result.recordset.length > 0) {
      // Respond with the retrieved data
      res.status(200).json(result.recordset[0]);
    } else {
      // Respond with error message if no record found
      res.status(404).json({ error: 'Improvement ticket not found' });
    }
  } catch (error) {
    // Handle errors
    console.error('Error retrieving improvement ticket by ID:', error);
    res
      .status(500)
      .json({ error: 'Failed to retrieve improvement ticket by ID' });
  }
};

// Get improvement ticket by ID
export const getImprovementTicketByCategoryId = async (req, res) => {
  // SQL query for retrieving an improvement ticket by its ID
  const query = `SELECT * FROM IMPROVEMENT_TICKETS WHERE category_id = @category_id;`;

  try {
    // Establish connection to the database
    const pool = await getConnection();
    // Create a request object
    const result = await pool
      .request()
      // Bind input parameter
      .input('category_id', sql.Int, req.params.id)
      .query(query);

    // Check if a record was found
    if (result.recordset.length > 0) {
      // Respond with the retrieved data
      res.status(200).json(result.recordset[0]);
    } else {
      // Respond with error message if no record found
      res.status(404).json({ error: 'Improvement tickets not found' });
    }
  } catch (error) {
    // Handle errors
    console.error('Error retrieving improvement ticket by category ID:', error);
    res
      .status(500)
      .json({ error: 'Failed to retrieve improvement ticket by ID' });
  }
};

/**
 * Update improvement ticket
 */
// Update improvement ticket
export const updateImprovementTicket = async (req, res) => {
  const query = `
      UPDATE IMPROVEMENT_TICKETS
      SET name = @name, date = @date, problem = @problem, improve_idea = @improve_idea, source_issue = @source_issue, input_needed_from = @input_needed_from, safety_issue = @safety_issue, quadruple_aim_id = @quadruple_aim_id, solution_outcome = @solution_outcome, category_id = @category_id
      WHERE ticket_id = @ticketId;
    `;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('name', sql.NVarChar, req.body.name)
      .input('date', sql.Date, req.body.date)
      .input('problem', sql.NVarChar, req.body.problem)
      .input('improve_idea', sql.NVarChar, req.body.improve_idea)
      .input('source_issue', sql.NVarChar, req.body.source_issue)
      .input('input_needed_from', sql.NVarChar, req.body.input_needed_from)
      .input('safety_issue', sql.NVarChar, req.body.safety_issue)
      .input('quadruple_aim_id', sql.Int, req.body.quadruple_aim_id)
      .input('solution_outcome', sql.NVarChar, req.body.solution_outcome)
      .input('category_id', sql.Int, req.body.category_id)
      .input('ticketId', sql.Int, req.params.id)
      .query(query);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating improvement ticket:', error);
    res.status(500).json({ error: 'Failed to update improvement ticket' });
  }
};

/**
 * Delete improvement ticket
 */
export const deleteImprovementTicket = async (req, res) => {
  const query = `DELETE FROM IMPROVEMENT_TICKETS WHERE ticket_id = @ticketId;`;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('ticketId', sql.Int, req.params.id)
      .query(query);

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting improvement ticket:', error);
    res.status(500).json({ error: 'Failed to delete improvement ticket' });
  }
};
