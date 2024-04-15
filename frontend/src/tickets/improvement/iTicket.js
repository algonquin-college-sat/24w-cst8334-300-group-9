import { createImprovementTicket } from '../../state/improvementTicketApi.js';
import { getAllCategories } from '../../state/categoryApi.js';
import { getAllDepartments } from '../../state/departmentApi.js';

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Fetch all categories from the API
    const categories = await getAllCategories();

    // Get the dropdown element
    const categorySelect = document.getElementById('categorySelect');

    // Populate dropdown options with fetched categories
    categories.data.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.category_id;
      option.textContent = category.category_name;
      categorySelect.appendChild(option);
    });

    const departments = await getAllDepartments();

    // Get the dropdown element
    const departmentSelect = document.getElementById('departmentSelect');
    // Populate dropdown options with fetched categories
    departments.data.forEach((department) => {
      const option = document.createElement('option');
      option.value = department.department_id;
      option.textContent = department.department_name;
      departmentSelect.appendChild(option);
    });

    // Back button functionality
    const cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', function () {
      window.history.back();
    });

    // Save button functionality
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', async function () {
      try {
        // Get form data
        const ticketDate = document.getElementById('ticketDate').value;
        const selectedDepartmentId = parseInt(departmentSelect.value);
        const ticketName = document.getElementById('ticketName').value;
        const problemDescription =
          document.getElementById('problemDescription').value;
        const sourceIssue = document.getElementById('sourceIssue').value;
        const proposedSolution =
          document.getElementById('proposedSolution').value;
        // Get the value from the checkboxes for input needed from
        let inputNeededFromValue = [];
        const inputNeededCheckboxes = document.querySelectorAll(
          'input[name="inputNeededFrom"]:checked'
        );
        inputNeededCheckboxes.forEach((checkbox) => {
          inputNeededFromValue.push(checkbox.value);
        });
        const inputNeededFromValueString = inputNeededFromValue.join(', ');

        // Get the value from the checkboxes for safety issue
        let safetyIssueValue = [];
        const safetyIssueCheckboxes = document.querySelectorAll(
          'input[name="safetyIssue"]:checked'
        );
        safetyIssueCheckboxes.forEach((checkbox) => {
          safetyIssueValue.push(checkbox.value);
        });
        const safetyIssueValueString = safetyIssueValue.join(', ');

        // Get the index of the selected checkboxes in the quadrupleAim section
        let quadrupleAimIndex = [];
        const quadrupleAimCheckboxes = document.querySelectorAll(
          'input[name="quadrupleAim"]:checked'
        );
        quadrupleAimCheckboxes.forEach((checkbox) => {
          quadrupleAimIndex.push(parseInt(checkbox.value));
        });

        const selectedCategoryId = parseInt(categorySelect.value);
        const isArchived =
          document.querySelector('input[name="isArchived"]:checked').value ===
          'true'; // Convert to boolean
        // Prepare improvement ticket data object
        const improvementTicketData = {
          date: ticketDate, // Add the date to the ticket data
          name: ticketName, // Use the value from the ticket name textarea
          problem: problemDescription,
          source_issue: sourceIssue,
          improve_idea: proposedSolution,
          input_needed_from: inputNeededFromValueString,
          safety_issue: safetyIssueValueString,
          quadruple_aim_id: quadrupleAimIndex,
          solution_outcome: proposedSolution,
          category_id: selectedCategoryId, // Assign the selected category ID
          department_id: selectedDepartmentId,
          isArchived: isArchived,
        };

        // Create the improvement ticket
        await createImprovementTicket(improvementTicketData);

        // Alert the user or perform any other actions
        alert('Improvement ticket created successfully!');
        window.history.back();
      } catch (error) {
        console.error('Frontend: Error creating improvement ticket:', error);
        alert('Failed to create improvement ticket. Please try again.');
      }
    });
  } catch (error) {
    console.error('Frontend: Error fetching data:', error);
  }
});
