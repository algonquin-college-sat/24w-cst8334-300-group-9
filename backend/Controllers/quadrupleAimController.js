import { getConnection } from '../dbConfig.js';
// Get all improvement tickets
export const getAllQuadrupleAims = async (req, res) => {
  // SQL query for retrieving all improvement tickets
  const queryString = `SELECT * FROM dbo.QUADRUPLE_AIM;`;

  try {
    // Establish connection to the database
    const pool = await getConnection();
    // Execute the query
    const result = await pool.request().query(queryString);
    // Respond with retrieved data
    res.json({ msg: ' Fetch data successfully', data: result.recordset });
  } catch (error) {
    // Handle errors
    console.error('Error retrieving quadruple aim table:', error);
    res.status(500).json({ error: 'Failed to retrieve quadruple aim table' });
  }
};
