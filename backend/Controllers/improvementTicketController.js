import sql from 'mssql/msnodesqlv8.js';
import { dbConfig } from '../dbConfig.js';

/**
 * Create a database connection pool
 */
async function connectToDatabase() {
  try {
    const pool = sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Failed to connect to the database');
  }
}

/**
 * Create Improvement ticket
 */
export const createImprovementTicket = async (req, res) => {
  const query = `
    INSERT INTO IMPROVEMENT_TICKETS (name, date, problem, improve_idea, improve_how, safety_ohs, safety_patient, aim_patient_family, aim_outcome, aim_provider, aim_value_efficiency, input_patient_family, input_community_partner, category_id)
    VALUES (@name, @date, @problem, @improve_idea, @improve_how, @safety_ohs, @safety_patient, @aim_patient_family, @aim_outcome, @aim_provider, @aim_value_efficiency, @input_patient_family, @input_community_partner, @category_id);
  `;

  try {
    const pool = await connectToDatabase();
    const request = pool
      .request()
      .input('name', sql.NVarChar, req.body.name)
      .input('date', sql.Date, req.body.date)
      .input('problem', sql.NVarChar, req.body.problem)
      .input('improve_idea', sql.NVarChar, req.body.improve_idea)
      .input('improve_how', sql.NVarChar, req.body.improve_how)
      .input('safety_ohs', sql.Bit, req.body.safety_ohs)
      .input('safety_patient', sql.Bit, req.body.safety_patient)
      .input('aim_patient_family', sql.Bit, req.body.aim_patient_family)
      .input('aim_outcome', sql.Bit, req.body.aim_outcome)
      .input('aim_provider', sql.Bit, req.body.aim_provider)
      .input('aim_value_efficiency', sql.Bit, req.body.aim_value_efficiency)
      .input('input_patient_family', sql.Bit, req.body.input_patient_family)
      .input(
        'input_community_partner',
        sql.Bit,
        req.body.input_community_partner
      )
      .input('category_id', sql.Int, req.body.category_id);

    const result = await request.query(query);
    res.status(201).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error creating improvement ticket:', error);
    res.status(500).json({ error: 'Failed to create improvement ticket' });
  }
};

/**
 * Get all improvement tickets
 */
export const getAllImprovementTickets = async (req, res) => {
  const queryString = `SELECT * FROM dbo.IMPROVEMENT_TICKETS;`;

  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query(queryString);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error retrieving improvement tickets:', error);
    res.status(500).json({ error: 'Failed to retrieve improvement tickets' });
  }
};

/**
 * Get improvement ticket by ID
 */
export const getImprovementTicketById = async (req, res) => {
  const query = `SELECT * FROM IMPROVEMENT_TICKETS WHERE ticket_id = @ticketId;`;

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input('ticketId', sql.Int, req.params.id)
      .query(query);

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Improvement ticket not found' });
    }
  } catch (error) {
    console.error('Error retrieving improvement ticket by ID:', error);
    res
      .status(500)
      .json({ error: 'Failed to retrieve improvement ticket by ID' });
  }
};

/**
 * Update improvement ticket
 */
export const updateImprovementTicket = async (req, res) => {
  const query = `
      UPDATE IMPROVEMENT_TICKETS
      SET name = @name, date = @date, problem = @problem, improve_idea = @improve_idea, improve_how = @improve_how, safety_ohs = @safety_ohs, safety_patient = @safety_patient, aim_patient_family = @aim_patient_family, aim_outcome = @aim_outcome, aim_provider = @aim_provider, aim_value_efficiency = @aim_value_efficiency, input_patient_family = @input_patient_family, input_community_partner = @input_community_partner, category_id = @category_id
      WHERE ticket_id = @ticketId;
    `;

  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input('name', sql.NVarChar, req.body.name)
      .input('date', sql.Date, req.body.date)
      .input('problem', sql.NVarChar, req.body.problem)
      .input('improve_idea', sql.NVarChar, req.body.improve_idea)
      .input('improve_how', sql.NVarChar, req.body.improve_how)
      .input('safety_ohs', sql.NVarChar, req.body.safety_ohs)
      .input('safety_patient', sql.NVarChar, req.body.safety_patient)
      .input('aim_patient_family', sql.NVarChar, req.body.aim_patient_family)
      .input('aim_outcome', sql.NVarChar, req.body.aim_outcome)
      .input('aim_provider', sql.NVarChar, req.body.aim_provider)
      .input(
        'aim_value_efficiency',
        sql.NVarChar,
        req.body.aim_value_efficiency
      )
      .input(
        'input_patient_family',
        sql.NVarChar,
        req.body.input_patient_family
      )
      .input(
        'input_community_partner',
        sql.NVarChar,
        req.body.input_community_partner
      )
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
    const pool = await connectToDatabase();
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
