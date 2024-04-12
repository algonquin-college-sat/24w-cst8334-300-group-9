import sql from 'mssql/msnodesqlv8.js';
import { getConnection } from '../dbConfig.js';

// Create ticket update note
export const createImpTicketUpdateNote = async (req, res) => {
  const query = `
    INSERT INTO I_TICKET_UPDATE_NOTES (
      i_ticket_id,
      date, 
      update_note, 
      owner
    ) 
    VALUES
    ( 
      @i_ticket_id,
      @date, 
      @update_note, 
      @owner
    );
  `;

  try {
    const pool = await getConnection();
    const request = pool
      .request()
      .input('i_ticket_id', sql.Int, req.body.i_ticket_id)
      .input('date', sql.NVarChar, req.body.date)
      .input('update_note', sql.NVarChar, req.body.update_note)
      .input('owner', sql.NVarChar, req.body.owner);

    const result = await request.query(query);
    res.status(201).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error creating ticket update note:', error);
    res.status(500).json({ error: 'Failed to create ticket update note' });
  }
};

// Get all improvement ticket update notes
export const getAllImpTicketUpdateNotes = async (req, res) => {
  const queryString = `SELECT * FROM dbo.I_TICKET_UPDATE_NOTES;`;

  try {
    const pool = await getConnection();
    const result = await pool.request().query(queryString);
    res.json({
      msg: 'Fetch ticket update notes successfully',
      data: result.recordset,
    });
  } catch (error) {
    console.error('Error retrieving ticket update notes:', error);
    res.status(500).json({ error: 'Failed to retrieve ticket update notes' });
  }
};

// Get ticket update note by ID
export const getImpTicketUpdateNoteById = async (req, res) => {
  const query = `SELECT * FROM I_TICKET_UPDATE_NOTES WHERE update_id = @updateId;`;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('updateId', sql.Int, req.params.id)
      .query(query);

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Ticket update note not found' });
    }
  } catch (error) {
    console.error('Error retrieving ticket update note by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve ticket update note' });
  }
};

// Update ticket update note
export const updateImpTicketUpdateNote = async (req, res) => {
  const query = `
    UPDATE I_TICKET_UPDATE_NOTES
    SET 
      date = @date,
      update_note = @update_note,
      owner = @owner
    WHERE update_id = @updateId;
  `;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('date', sql.NVarChar, req.body.date)
      .input('update_note', sql.NVarChar, req.body.update_note)
      .input('owner', sql.NVarChar, req.body.owner)
      .input('updateId', sql.Int, req.params.id)
      .query(query);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating ticket update note:', error);
    res.status(500).json({ error: 'Failed to update ticket update note' });
  }
};

// Delete ticket update note
export const deleteImpTicketUpdateNote = async (req, res) => {
  const query = `DELETE FROM I_TICKET_UPDATE_NOTES WHERE update_id = @updateId;`;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('updateId', sql.Int, req.params.id)
      .query(query);

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting ticket update note:', error);
    res.status(500).json({ error: 'Failed to delete ticket update note' });
  }
};
