import baseAPI from './baseApi.js';

const categoryAPI = '/category';

export const createCategory = async (categoryData) => {
  try {
    const response = await baseAPI.post(categoryAPI, categoryData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create category');
  }
};

export const getAllCategories = async () => {
  try {
    const response = await baseAPI.get(categoryAPI);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await baseAPI.get(`${categoryAPI}/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch category');
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await baseAPI.patch(
      `${categoryAPI}/${categoryId}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update category');
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await baseAPI.delete(`${categoryAPI}/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete category');
  }
};

export default categoryAPI;
