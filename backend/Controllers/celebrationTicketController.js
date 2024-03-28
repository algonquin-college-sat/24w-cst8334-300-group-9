/**
 * Handles CRUD operations for celebration tickets in a web application.
 * Uses SQL queries to interact with the database.
 *
 * - createCelebrationTicket: Creates a new celebration ticket.
 * - getAllCelebrationTickets: Retrieves all celebration tickets.
 * - getCelebrationTicketById: Retrieves an celebration ticket by its ID.
 * - updateCelebrationTicket: Updates an existing celebration ticket.
 * - deleteCelebrationTicket: Deletes an celebration ticket.
 */
import sql from 'mssql/msnodesqlv8.js';
import { getConnection } from '../dbConfig.js';
import { getImprovementTicketById } from './improvementTicketController.js';

// Create Celebration ticket
export const createCelebrationTicket = async (req, res) => {
  // SQL query for inserting data into the CELEBRATION_TICKETS table
  const query = `
    INSERT INTO CELEBRATION_TICKET
    (i_ticket_id, department_id, date, who_what, details, value_compassion, value_life, value_community, value_excellence, value_respect, value_responsibility)
    VALUES 
    (@i_ticket_id, @department_id, @date, @who_what, @details, @value_compassion, @value_life, @value_community, @value_excellence, @value_respect, @value_responsibility);
`;

  try {
    // Establish connection to the database
    const pool = await getConnection();

    const {
      i_ticket_id,
      department_id,
      date,
      who_what,
      details,
      value_compassion,
      value_life,
      value_community,
      value_excellence,
      value_respect,
      value_responsibility,
    } = req.body;

    // Check if the provided i_ticket_id exists in the ImprovementTicket table
    const improvementTicketExists = await checkImprovementTicketExists(
      i_ticket_id
    );

    if (!improvementTicketExists) {
      return res.status(400).json({
        error: `Improvement ticket with ID ${i_ticket_id} does not exist.`,
      });
    }

    // Check if the provided department_id exists in the ImprovementTicket table
    const departmentExists = await getImprovementTicketById(department_id);

    if (!departmentExists) {
      return res.status(400).json({
        error: `Department with ID ${i_ticket_id} does not exist.`,
      });
    }

    // Create a request object
    const request = pool
      .request()
      // Bind input parameters
      .input('i_ticket_id', sql.Int, i_ticket_id)
      .input('department_id', sql.Int, department_id)
      .input('date', sql.Date, date)
      .input('who_what', sql.NVarChar, who_what)
      .input('details', sql.NVarChar, details)
      .input('value_compassion', value_compassion) // Using boolean values directly
      .input('value_life', value_life)
      .input('value_community', value_community)
      .input('value_excellence', value_excellence)
      .input('value_respect', value_respect)
      .input('value_responsibility', value_responsibility);

    // Execute the query
    const result = await request.query(query);
    // Respond with success message and inserted data
    res.status(201).json({ success: true, data: result.recordset });
  } catch (error) {
    // Handle errors
    console.error('Error creating celebration ticket:', error);
    res.status(500).json({ error: 'Failed to create celebration ticket' });
  }
};

// Get all celebration tickets
export const getAllCelebrationTickets = async (req, res) => {
  // SQL query for retrieving all celebration tickets
  const queryString = `SELECT * FROM dbo.CELEBRATION_TICKET;`;

  try {
    // Establish connection to the database
    const pool = await getConnection();
    // Execute the query
    const result = await pool.request().query(queryString);
    // Respond with retrieved data
    res.json({ msg: ' Fetch tickets successfully', data: result.recordset });
  } catch (error) {
    // Handle errors
    console.error('Error retrieving celebration tickets:', error);
    res.status(500).json({ error: 'Failed to retrieve celebration tickets' });
  }
};

// Get celebration ticket by ID
export const getCelebrationTicketById = async (req, res) => {
  // SQL query for retrieving an celebration ticket by its ID
  const query = `SELECT * FROM CELEBRATION_TICKET WHERE c_ticket_id = @c_ticket_id;`;

  try {
    // Establish connection to the database
    const pool = await getConnection();
    // Create a request object
    const result = await pool
      .request()
      // Bind input parameter
      .input('c_ticket_id', sql.Int, req.params.id)
      .query(query);

    // Check if a record was found
    if (result.recordset.length > 0) {
      // Respond with the retrieved data
      res.status(200).json(result.recordset[0]);
    } else {
      // Respond with error message if no record found
      res.status(404).json({ error: 'Celebration ticket not found' });
    }
  } catch (error) {
    // Handle errors
    console.error('Error retrieving celebration ticket by ID:', error);
    res
      .status(500)
      .json({ error: 'Failed to retrieve celebration ticket by ID' });
  }
};

/**
 * Update celebration ticket
 */
export const updateCelebrationTicket = async (req, res) => {
  const query = `
        UPDATE CELEBRATION_TICKET
        SET i_ticket_id = @i_ticket_id,
            department_id = @department_id,
            date = @date,
            who_what = @who_what,
            details = @details,
            value_compassion = @value_compassion,
            value_life = @value_life,
            value_community = @value_community,
            value_excellence = @value_excellence,
            value_respect = @value_respect,
            value_responsibility = @value_responsibility
        WHERE c_ticket_id = @c_ticket_id;
      `;

  try {
    const pool = await getConnection();

    const {
      i_ticket_id,
      department_id,
      date,
      who_what,
      details,
      value_compassion,
      value_life,
      value_community,
      value_excellence,
      value_respect,
      value_responsibility,
    } = req.body;

    // Check if the provided i_ticket_id exists in the ImprovementTicket table
    const improvementTicketExists = await checkImprovementTicketExists(
      i_ticket_id
    );

    if (!improvementTicketExists) {
      return res.status(400).json({
        error: `Improvement ticket with ID ${i_ticket_id} does not exist.`,
      });
    }

    // Check if the provided department_id exists in the ImprovementTicket table
    const departmentExists = await getImprovementTicketById(department_id);

    if (!departmentExists) {
      return res.status(400).json({
        error: `Department with ID ${i_ticket_id} does not exist.`,
      });
    }

    const result = await pool
      .request()
      .input('i_ticket_id', sql.Int, i_ticket_id)
      .input('department_id', sql.Int, department_id)
      .input('date', sql.Date, date)
      .input('who_what', sql.NVarChar, who_what)
      .input('details', sql.NVarChar, details)
      .input('value_compassion', value_compassion)
      .input('value_life', value_life)
      .input('value_community', value_community)
      .input('value_excellence', value_excellence)
      .input('value_respect', value_respect)
      .input('value_responsibility', value_responsibility)
      .input('c_ticket_id', sql.Int, id)
      .query(query);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating celebration ticket:', error);
    res.status(500).json({ error: 'Failed to update celebration ticket' });
  }
};

/**
 * Delete celebration ticket
 */
export const deleteCelebrationTicket = async (req, res) => {
  const query = `DELETE FROM CELEBRATION_TICKET WHERE ticket_id = @ticketId;`;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('ticketId', sql.Int, req.params.id)
      .query(query);

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting celebration ticket:', error);
    res.status(500).json({ error: 'Failed to delete celebration ticket' });
  }
};

// Function to check if an improvement ticket exists with the given ID
async function checkImprovementTicketExists(i_ticket_id) {
  const query = `SELECT COUNT(*) AS ticketCount FROM IMPROVEMENT_TICKETS WHERE ticket_id = @i_ticket_id;`;

  try {
    const pool = await getConnection();
    const request = pool.request().input('i_ticket_id', sql.Int, i_ticket_id);
    const result = await request.query(query);
    return result.recordset[0].ticketCount > 0;
  } catch (error) {
    console.error('Error checking improvement ticket existence:', error);
    return false;
  }
}
