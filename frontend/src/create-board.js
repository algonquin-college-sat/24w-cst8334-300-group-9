// Import the createDepartment function from departmentAPI.js
import { createDepartment } from './state/departmentApi.js';

document.addEventListener('DOMContentLoaded', () => {
  // Get reference to the form, the create board button, and the modal
  const form = document.getElementById('createBoardForm');
  const createBoardTriggerBtn = document.getElementById('createBoardTrigger');
  const modal = new bootstrap.Modal(
    document.getElementById('modalCreateBoard')
  );

  // Add event listener to the create board button
  createBoardTriggerBtn.addEventListener('click', async () => {
    try {
      // Gather form data
      const departmentName = document.getElementById('deptName').value;
      // Get other form input values

      // Create department object
      const departmentData = {
        department_name: departmentName,
        display_board: true,
        // Other form data properties
      };

      // Call createDepartment function from departmentAPI
      const response = await createDepartment(departmentData);

      // Handle successful response
      console.log('New department created:', response);

      // Close the modal after creating the department
      modal.hide();
    } catch (error) {
      // Handle error
      console.error('Error creating department:', error);
    }
  });
});
