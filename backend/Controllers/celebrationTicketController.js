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
import { getDepartmentById } from './departmentController.js';

// Create Celebration ticket
export const createCelebrationTicket = async (req, res) => {
  // SQL query for inserting data into the CELEBRATION_TICKETS table
  const query = `
    INSERT INTO CELEBRATION_TICKET
    (department_id, date, who_what, details, value_compassion, value_life, value_community, value_excellence, value_respect, value_responsibility, isArchived)
    VALUES 
    (@department_id, @date, @who_what, @details, @value_compassion, @value_life, @value_community, @value_excellence, @value_respect, @value_responsibility, @isArchived);
`;

  try {
    // Establish connection to the database
    const pool = await getConnection();

    const {
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
      isArchived,
    } = req.body;
    console.log(department_id);
    // Check if the provided department_id exists in the ImprovementTicket table
    // const departmentExists = await getDepartmentById(department_id);

    // if (!departmentExists) {
    //   return res.status(400).json({
    //     error: `Department with ID ${i_ticket_id} does not exist.`,
    //   });
    // }

    // Create a request object
    const request = pool
      .request()
      // Bind input parameters
      .input('department_id', sql.Int, department_id)
      .input('date', sql.NVarChar, date)
      .input('who_what', sql.NVarChar, who_what)
      .input('details', sql.NVarChar, details)
      .input('value_compassion', sql.Bit, value_compassion) // Using boolean values directly
      .input('value_life', sql.Bit, value_life)
      .input('value_community', sql.Bit, value_community)
      .input('value_excellence', sql.Bit, value_excellence)
      .input('value_respect', sql.Bit, value_respect)
      .input('value_responsibility', sql.Bit, value_responsibility)
      .input('isArchived', sql.Bit, isArchived);

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
  try {
    const pool = await getConnection();

    const {
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
      c_ticket_id,
      isArchived,
    } = req.body;

    let updateFields = [];
    const updateValues = {
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
      isArchived,
    };

    // Construct the SET clause for the SQL query
    for (const [key, value] of Object.entries(updateValues)) {
      if (value || value !== undefined) {
        updateFields.push(`${key} = @${key}`);
      }
    }

    // Construct the SQL query dynamically
    const query = `
        UPDATE CELEBRATION_TICKET
        SET ${updateFields.join(', ')}
        WHERE c_ticket_id = @c_ticket_id;
      `;

    // Execute the query
    const result = await pool
      .request()
      .input('c_ticket_id', sql.Int, c_ticket_id)
      .input('department_id', sql.Int, department_id)
      .input('date', sql.NVarChar, date)
      .input('who_what', sql.NVarChar, who_what)
      .input('details', sql.NVarChar, details)
      .input('value_compassion', sql.Bit, value_compassion)
      .input('value_life', sql.Bit, value_life)
      .input('value_community', sql.Bit, value_community)
      .input('value_excellence', sql.Bit, value_excellence)
      .input('value_respect', sql.Bit, value_respect)
      .input('value_responsibility', sql.Bit, value_responsibility)
      .input('isArchived', sql.Bit, isArchived)
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
  const query = `DELETE FROM CELEBRATION_TICKET WHERE c_ticket_id = @ticketId;`;

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

// // Function to check if an improvement ticket exists with the given ID
// async function checkImprovementTicketExists(i_ticket_id) {
//   const query = `SELECT COUNT(*) AS ticketCount FROM IMPROVEMENT_TICKETS WHERE ticket_id = @i_ticket_id;`;

//   try {
//     const pool = await getConnection();
//     const request = pool.request().input('i_ticket_id', sql.Int, i_ticket_id);
//     const result = await request.query(query);
//     return result.recordset[0].ticketCount > 0;
//   } catch (error) {
//     console.error('Error checking improvement ticket existence:', error);
//     return false;
//   }
// }
