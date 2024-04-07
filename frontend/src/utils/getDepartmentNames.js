/**
 * Retrieves the names of all departments asynchronously.
 *
 * This function fetches all departments using the getAllDepartments function
 * from the departmentApi module. It then maps over the fetched departments
 * to extract only the department names. The result is an array of department names.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of department names.
 */
import { getAllDepartments } from '../state/departmentApi.js';

export const getDepartmentNames = async () => {
  const departments = await getAllDepartments();
  const departmentNames = departments.map(
    (department) => department.departmentName
  );
  return departmentNames;
};
