/**
 * Handles CRUD operations for categories in a web application.
 *
 * - createCategory: Creates a new category.
 * - getAllCategories: Retrieves all categories.
 * - getCategoryById: Retrieves a category by its ID.
 * - updateCategory: Updates an existing category.
 * - deleteCategory: Deletes a category.
 */
import sql from 'mssql/msnodesqlv8.js';
import { getConnection } from '../dbConfig.js';

// Create a category
export const createCategory = async (req, res) => {
  const { category_name } = req.body;

  const query = `
    INSERT INTO CATEGORIES (category_name)
    VALUES (@category_name);
  `;

  try {
    const pool = await getConnection();
    const request = pool
      .request()
      .input('category_name', sql.NVarChar, category_name);

    const result = await request.query(query);
    res.status(201).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  const query = `SELECT * FROM CATEGORIES;`;

  try {
    const pool = await getConnection();
    const result = await pool.request().query(query);
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error retrieving categories:', error);
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  const query = `SELECT * FROM CATEGORIES WHERE category_id = @categoryId;`;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('categoryId', sql.Int, req.params.id)
      .query(query);

    if (result.recordset.length > 0) {
      res.status(200).json({ success: true, data: result.recordset[0] });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error retrieving category by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve category by ID' });
  }
};

// Update category by ID
export const updateCategory = async (req, res) => {
  const { category_name, display_board } = req.body;
  const { id } = req.params;

  const query = `
    UPDATE CATEGORIES
    SET category_name = @category_name
    WHERE category_id = @categoryId;
  `;

  try {
    const pool = await getConnection();
    const request = pool
      .request()
      .input('category_name', sql.NVarChar, category_name)
      .input('display_board', sql.Bit, display_board)
      .input('categoryId', sql.Int, id);

    const result = await request.query(query);
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
};

// Delete category by ID
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM CATEGORIES WHERE category_id = @categoryId;`;

  try {
    const pool = await getConnection();
    const request = pool.request().input('categoryId', sql.Int, id);

    const result = await request.query(query);
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
