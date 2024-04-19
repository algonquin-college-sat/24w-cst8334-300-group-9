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
        const isArchived =
          document.querySelector('input[name="isArchived"]:checked').value ===
          'true'; // Convert to boolean
        const problemDescription =
          document.getElementById('problemDescription').value;
        const source_issue = document.getElementById('sourceIssue').value;
        const improve_idea = document.getElementById('proposedSolution').value;
        const is_from_patient_family =
          document.getElementById('patientFamily').checked;
        const is_from_community =
          document.getElementById('communityPartner').checked;
        const is_from_other =
          document.getElementById('otherDepartments').checked;
        const is_occupational_heath_safety = document.getElementById(
          'occupationalHealthSafety'
        ).checked;
        const is_patient_safety =
          document.getElementById('patientSafety').checked;
        const is_patient_family_quadAim =
          document.getElementById('patientExperience').checked;
        const is_health_outcome_quaAim =
          document.getElementById('bestHealthOutcome').checked;
        const is_provider_experience_quadAim =
          document.getElementById('providerExperience').checked;
        const is_value_efficiency_quadAim =
          document.getElementById('valueEfficiency').checked;

        const solution_outcome = document.getElementById(
          'groupDiscussionOutcome'
        ).value;
        const selectedCategoryId = parseInt(categorySelect.value);

        // Prepare improvement ticket data object
        const improvementTicketData = {
          department_id: selectedDepartmentId,
          name: ticketName, // Use the value from the ticket name textarea
          date: ticketDate, // Add the date to the ticket data
          isArchived: isArchived,
          problem: problemDescription,
          improve_idea,
          source_issue,
          is_from_patient_family,
          is_from_community,
          is_from_other,
          is_occupational_heath_safety,
          is_patient_safety,
          is_patient_family_quadAim,
          is_health_outcome_quaAim,
          is_provider_experience_quadAim,
          is_value_efficiency_quadAim,
          solution_outcome,
          category_id: selectedCategoryId, // Assign the selected category ID
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
