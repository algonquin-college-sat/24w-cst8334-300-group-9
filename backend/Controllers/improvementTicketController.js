import sql from 'mssql/msnodesqlv8.js';
import { dbConfig } from '../dbConfig.js';

/**
 * Create Improvement ticket
 */
export const createImprovementTicket = async (req, res) => {
  const query = `
      INSERT INTO IMPROVEMENT_TICKETS (name, date, problem, improve_idea, improve_how, safety_ohs, safety_patient, aim_patient_family, aim_outcome, aim_provider, aim_value_efficiency, input_patient_family, input_community_partner, category_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

  const request = new sql.Request();
  try {
    request.query(
      query,
      [
        req.body.name,
        req.body.date,
        req.body.problem,
        req.body.improve_idea,
        req.body.improve_how,
        req.body.safety_ohs,
        req.body.safety_patient,
        req.body.aim_patient_family,
        req.body.aim_outcome,
        req.body.aim_provider,
        req.body.aim_value_efficiency,
        req.body.input_patient_family,
        req.body.input_community_partner,
        req.body.category_id,
      ],
      (error, result) => {
        if (error) {
          console.error('Error creating improvement ticket:', error);
          res
            .status(500)
            .json({ error: 'Failed to create improvement ticket' });
        } else {
          res.status(201).json({ success: true });
        }
      }
    );
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

  sql.connect(dbConfig, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to retrieve improvement tickets' });
    } else {
      var request = new sql.Request();
      request.query(queryString, (err, records) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ error: 'Failed to retrieve improvement tickets' });
        } else if (records) {
          console.log(records);
          res.status(200).json(records.recordset);
        }
      });
    }
  });
};

/**
 * Get improvement ticket by ID
 */
export const getImprovementTicketById = async (req, res) => {
  const queryString = `SELECT * FROM IMPROVEMENT_TICKETS WHERE ticket_id = ?;`;

  const request = new sql.Request();
  try {
    request.query(queryString, [req.params.id], (error, result) => {
      if (error) {
        console.error('Error retrieving improvement ticket by ID:', error);
        res
          .status(500)
          .json({ error: 'Failed to retrieve improvement ticket by ID' });
      } else {
        res.status(200).json(result.recordset[0]);
      }
    });
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
      SET name = ?, date = ?, problem = ?, improve_idea = ?, improve_how = ?, safety_ohs = ?, safety_patient = ?, aim_patient_family = ?, aim_outcome = ?, aim_provider = ?, aim_value_efficiency = ?, input_patient_family = ?, input_community_partner = ?, category_id = ?
      WHERE ticket_id = ?;
    `;

  const request = new sql.Request();
  try {
    request.query(
      query,
      [
        req.body.name,
        req.body.date,
        req.body.problem,
        req.body.improve_idea,
        req.body.improve_how,
        req.body.safety_ohs,
        req.body.safety_patient,
        req.body.aim_patient_family,
        req.body.aim_outcome,
        req.body.aim_provider,
        req.body.aim_value_efficiency,
        req.body.input_patient_family,
        req.body.input_community_partner,
        req.body.category_id,
        req.params.id,
      ],
      (error, result) => {
        if (error) {
          console.error('Error updating improvement ticket:', error);
          res
            .status(500)
            .json({ error: 'Failed to update improvement ticket' });
        } else {
          res.status(200).json({ success: true });
        }
      }
    );
  } catch (error) {
    console.error('Error updating improvement ticket:', error);
    res.status(500).json({ error: 'Failed to update improvement ticket' });
  }
};

/**
 * Delete improvement ticket
 */
export const deleteImprovementTicket = async (req, res) => {
  const query = `DELETE FROM IMPROVEMENT_TICKETS WHERE ticket_id = ?;`;

  const request = new sql.Request();
  try {
    request.query(query, [req.params.id], (error, result) => {
      if (error) {
        console.error('Error deleting improvement ticket:', error);
        res.status(500).json({ error: 'Failed to delete improvement ticket' });
      } else {
        res.status(204).send(); // No content
      }
    });
  } catch (error) {
    console.error('Error deleting improvement ticket:', error);
    res.status(500).json({ error: 'Failed to delete improvement ticket' });
  }
};
