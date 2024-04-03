import baseAPI from './baseApi.js';

const departmentAPI = '/department';
// Define functions for CRUD operations on departments
export const createDepartment = async (departmentData) => {
  try {
    const response = await baseAPI.post(departmentAPI, departmentData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create department');
  }
};

export const getAllDepartments = async () => {
  try {
    const response = await baseAPI.get(departmentAPI);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch departments');
  }
};

export const getDepartmentById = async (departmentId) => {
  try {
    const response = await baseAPI.get(`${departmentAPI}/${departmentId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch department');
  }
};

export const updateDepartment = async (departmentId, departmentData) => {
  try {
    const response = await departmentAPI.patch(
      `/department/${departmentId}`,
      departmentData
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update department');
  }
};

export const deleteDepartment = async (departmentId) => {
  try {
    const response = await departmentAPI.delete(
      `${departmentAPI}/${departmentId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete department');
  }
};

export default departmentAPI;
