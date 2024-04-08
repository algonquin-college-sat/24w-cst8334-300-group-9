// Import the createDepartment function from departmentAPI.js
import { createDepartment } from './state/departmentApi.js';

document.addEventListener('DOMContentLoaded', () => {
  // Get reference to the form and the create board button
  const form = document.querySelector('form');
  const createBoardTriggerBtn = document.getElementById('createBoardBtn');

  // Add event listener to the create board button
  createBoardTriggerBtn.addEventListener('click', async () => {
    try {
      // Gather form data
      const departmentName = document.getElementById('deptName').value;

      // Create department object
      const departmentData = {
        department_name: departmentName,
        // Add other form data properties as needed
      };

      // Call createDepartment function from departmentAPI
      const response = await createDepartment(departmentData);

      // Handle successful response
      console.log('New department created:', response);

      // Prompt user with confirmation message
      window.alert('Department created successfully!');

      // Navigate back to the previous page
      window.location.href = './index.html'; // Replace './index.html' with the desired URL
    } catch (error) {
      // Handle error
      console.error('Error creating department:', error);
    }
  });
});
