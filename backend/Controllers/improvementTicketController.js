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
export const createImprovementTicket = async (req, res) => {
  const query = `
    INSERT INTO IMPROVEMENT_TICKETS (
      department_id,
      name, 
      date, 
      isArchived,
      problem, 
      improve_idea, 
      source_issue, 
      is_from_patient_family,
      is_from_community ,
      is_from_other,
      is_occupational_heath_safety,
      is_patient_safety,
      is_patient_family_quadAim,
      is_health_outcome_quaAim,
      is_provider_experience_quadAim, 
      is_value_efficiency_quadAim,
      solution_outcome, 
      category_id
    ) 
    VALUES
    ( 
      @department_id,
      @name, 
      @date, 
      @isArchived,
      @problem, 
      @improve_idea, 
      @source_issue, 
      @is_from_patient_family,
      @is_from_community,
      @is_from_other,
      @is_occupational_heath_safety,
      @is_patient_safety,
      @is_patient_family_quadAim,
      @is_health_outcome_quaAim,
      @is_provider_experience_quadAim, 
      @is_value_efficiency_quadAim,
      @solution_outcome, 
      @category_id
    );
  `;
  const {
    department_id,
    name,
    date,
    isArchived,
    problem,
    improve_idea,
    source_issue,
    is_from_patient_family,
    is_from_community,
    is_from_other,
    is_occupational_heath_safety,
    is_patient_safety,
    is_patient_family_quadAim,
    is_health_outcome_quaAim,
    is_provider_experience_quadAim,
    is_value_efficiency_quadAim,
    solution_outcome,
    category_id,
  } = req.body;
  try {
    const pool = await getConnection();
    const request = pool
      .request()
      .input('department_id', sql.Int, department_id)
      .input('name', sql.NVarChar, name)
      .input('date', sql.NVarChar, date)
      .input('isArchived', sql.Bit, isArchived) // Assuming isArchived is a boolean
      .input('problem', sql.NVarChar, problem)
      .input('improve_idea', sql.NVarChar, improve_idea)
      .input('source_issue', sql.NVarChar, source_issue)
      .input('is_from_patient_family', sql.Bit, is_from_patient_family) // Assuming isArchived is a boolean
      .input('is_from_community', sql.Bit, is_from_community) // Assuming isArchived is a boolean
      .input('is_from_other', sql.Bit, is_from_other) // Assuming isArchived is a boolean
      .input(
        'is_occupational_heath_safety',
        sql.Bit,
        is_occupational_heath_safety
      ) // Assuming isArchived is a boolean
      .input('is_patient_safety', sql.Bit, is_patient_safety) // Assuming isArchived is a boolean
      .input('is_patient_family_quadAim', sql.Bit, is_patient_family_quadAim) // Assuming isArchived is a boolean
      .input('is_health_outcome_quaAim', sql.Bit, is_health_outcome_quaAim) // Assuming isArchived is a boolean
      .input(
        'is_provider_experience_quadAim',
        sql.Bit,
        is_provider_experience_quadAim
      ) // Assuming isArchived is a boolean
      .input(
        'is_value_efficiency_quadAim',
        sql.Bit,
        is_value_efficiency_quadAim
      ) // Assuming isArchived is a boolean
      .input('solution_outcome', sql.NVarChar, solution_outcome)
      .input('category_id', sql.Int, category_id);

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
      res.status(200).json(result.recordset);
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

export const getImprovementTicketByDepartment = async (req, res) => {
  // SQL query for retrieving an improvement ticket by its ID
  const query = `SELECT * FROM IMPROVEMENT_TICKETS WHERE department_id = @department_id;`;

  try {
    // Establish connection to the database
    const pool = await getConnection();
    // Create a request object
    const result = await pool
      .request()
      // Bind input parameter
      .input('department_id', sql.Int, req.params.id)
      .query(query);

    // Check if a record was found
    if (result.recordset.length > 0) {
      // Respond with the retrieved data
      res.status(200).json(result.recordset);
    } else {
      // Respond with error message if no record found
      res.status(404).json({ error: 'Improvement tickets not found' });
    }
  } catch (error) {
    // Handle errors
    console.error(
      'Error retrieving improvement ticket by department ID:',
      error
    );
    res
      .status(500)
      .json({ error: 'Failed to retrieve improvement ticket by department' });
  }
};

/**
 * Update improvement ticket
 */
export const updateImprovementTicket = async (req, res) => {
  try {
    const pool = await getConnection();
    // Initialize an array to store the SQL update statements
    let updateFields = [];

    const {
      department_id,
      name,
      date,
      isArchived,
      problem,
      improve_idea,
      source_issue,
      is_from_patient_family,
      is_from_community,
      is_from_other,
      is_occupational_heath_safety,
      is_patient_safety,
      is_patient_family_quadAim,
      is_health_outcome_quaAim,
      is_provider_experience_quadAim,
      is_value_efficiency_quadAim,
      solution_outcome,
      category_id,
    } = req.body;

    const updateValues = {
      department_id,
      name,
      date,
      isArchived,
      problem,
      improve_idea,
      source_issue,
      is_from_patient_family,
      is_from_community,
      is_from_other,
      is_occupational_heath_safety,
      is_patient_safety,
      is_patient_family_quadAim,
      is_health_outcome_quaAim,
      is_provider_experience_quadAim,
      is_value_efficiency_quadAim,
      solution_outcome,
      category_id,
    };

    for (const [key, value] of Object.entries(updateValues)) {
      if (value || value !== undefined) {
        updateFields.push(`${key} = @${key}`);
      }
    }

    // Construct the SQL update query
    const query = `
    UPDATE IMPROVEMENT_TICKETS
    SET ${updateFields.join(', ')}
    WHERE ticket_id = @ticketId;
  `;
    const result = await pool
      .request()
      // Bind input parameters
      .input('ticketId', sql.Int, req.params.id)
      .input('department_id', sql.Int, department_id)
      .input('name', sql.NVarChar, name)
      .input('date', sql.NVarChar, date)
      .input('isArchived', sql.Bit, isArchived) // Assuming isArchived is a boolean
      .input('problem', sql.NVarChar, problem)
      .input('improve_idea', sql.NVarChar, improve_idea)
      .input('source_issue', sql.NVarChar, source_issue)
      .input('is_from_patient_family', sql.Bit, is_from_patient_family) // Assuming isArchived is a boolean
      .input('is_from_community', sql.Bit, is_from_community) // Assuming isArchived is a boolean
      .input('is_from_other', sql.Bit, is_from_other) // Assuming isArchived is a boolean
      .input(
        'is_occupational_heath_safety',
        sql.Bit,
        is_occupational_heath_safety
      ) // Assuming isArchived is a boolean
      .input('is_patient_safety', sql.Bit, is_patient_safety) // Assuming isArchived is a boolean
      .input('is_patient_family_quadAim', sql.Bit, is_patient_family_quadAim) // Assuming isArchived is a boolean
      .input('is_health_outcome_quaAim', sql.Bit, is_health_outcome_quaAim) // Assuming isArchived is a boolean
      .input(
        'is_provider_experience_quadAim',
        sql.Bit,
        is_provider_experience_quadAim
      ) // Assuming isArchived is a boolean
      .input(
        'is_value_efficiency_quadAim',
        sql.Bit,
        is_value_efficiency_quadAim
      ) // Assuming isArchived is a boolean
      .input('solution_outcome', sql.NVarChar, solution_outcome)
      .input('category_id', sql.Int, category_id)
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
