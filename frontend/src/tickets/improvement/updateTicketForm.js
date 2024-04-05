import {
  getImprovementTicketById,
  updateImprovementTicket,
} from '../../state/improvementTicketApi.js';
import { getAllCategories } from '../../state/categoryApi.js';
import { getAllDepartments } from '../../state/departmentApi.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Get the ticket ID from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const ticketId = urlParams.get('ticketId');
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

  // Fetch the ticket details based on the ticket ID
  try {
    const ticket = await getImprovementTicketById(ticketId);
    populateFormFields(ticket);
  } catch (error) {
    console.error('Error fetching ticket details:', error);
    alert('Failed to fetch ticket details.');
  }

  // Function to populate form fields with ticket data
  function populateFormFields(ticket) {
    document.getElementById('departmentSelect').value = ticket.department_id;
    document.getElementById('ticketName').value = ticket.name;
    document.getElementById('ticketDate').value = ticket.date;
    document.getElementById('problemDescription').value = ticket.problem;
    document.getElementById('sourceIssue').value = ticket.source_issue;
    document.getElementById('proposedSolution').value = ticket.improve_idea;
    // Populate radio button for input needed from
    const inputNeededFromRadio = document.querySelector(
      `input[name="inputNeededFrom"][value="${ticket.input_needed_from}"]`
    );
    if (inputNeededFromRadio) {
      inputNeededFromRadio.checked = true;
    } else {
      console.error(
        'Input needed from value not found in radio buttons:',
        ticket.input_needed_from
      );
      // Provide a default value or handle this scenario as appropriate
    }

    // Check if the safety issue radio button exists before setting its checked property
    const safetyIssueRadio = document.querySelector(
      `input[name="safetyIssue"][value="${ticket.safety_issue}"]`
    );
    if (safetyIssueRadio) {
      safetyIssueRadio.checked = true;
    } else {
      console.error(
        'Safety issue value not found in radio buttons:',
        ticket.safety_issue
      );
      // Provide a default value or handle this scenario as appropriate
    }
    // Populate radio button for quadruple aim
    const quadrupleAimRadio = document.querySelector(
      `input[name="quadrupleAim"][value="${ticket.quadruple_aim_id}"]`
    );
    if (quadrupleAimRadio) {
      quadrupleAimRadio.checked = true;
    } else {
      console.error(
        'Quadruple aim value not found in radio buttons:',
        ticket.quadruple_aim_id
      );
      // Provide a default value or handle this scenario as appropriate
    }
    // Populate "Is Archived" radio button
    const isArchivedRadio = document.querySelector(
      `input[name="isArchived"][value="${ticket.isArchived.toString()}"]`
    );
    if (isArchivedRadio) {
      isArchivedRadio.checked = true;
    } else {
      console.error(
        'Is Archived value not found in radio buttons:',
        ticket.isArchived.toString()
      );
    }
    console.log({ isArchivedRadio });

    document.getElementById('categorySelect').value = ticket.category_id;
    document.getElementById('groupDiscussionOutcome').value =
      ticket.solution_outcome;

    document.getElementById('groupDiscussionOutcome').value =
      ticket.solution_outcome;
    document.getElementById('categorySelect').value = ticket.category_id;
  }

  const backButton = document.getElementById('backButton');
  backButton.addEventListener('click', function () {
    window.history.back();
  });

  // Event listener for the form submission
  document
    .getElementById('saveButton')
    .addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Validate form fields
      const ticketName = document.getElementById('ticketName').value;
      // Get the value of the date input
      const ticketDate = document.getElementById('ticketDate').value;
      const problemDescription =
        document.getElementById('problemDescription').value;
      const sourceIssue = document.getElementById('sourceIssue').value;
      const proposedSolution =
        document.getElementById('proposedSolution').value;
      const inputNeededFrom = document.querySelector(
        'input[name="inputNeededFrom"]:checked'
      );
      const safetyIssue = document.querySelector(
        'input[name="safetyIssue"]:checked'
      );
      const quadrupleAim = document.querySelector(
        'input[name="quadrupleAim"]:checked'
      );
      const isArchived =
        document.querySelector('input[name="isArchived"]:checked').value ===
        'true'; // Convert to boolean
      const groupDiscussionOutcome = document.getElementById(
        'groupDiscussionOutcome'
      ).value;
      const updatedCategory = document.getElementById('categorySelect').value;
      const updatedDepartment =
        document.getElementById('departmentSelect').value;
      console.log(updatedCategory);

      // Get the updated ticket data from the form
      const updatedTicketData = {
        date: ticketDate,
        name: ticketName,
        problem: problemDescription,
        source_issue: sourceIssue,
        improve_idea: proposedSolution,
        input_needed_from: inputNeededFrom.value,
        safety_issue: safetyIssue.value,
        quadruple_aim_id: parseInt(quadrupleAim.value),
        solution_outcome: groupDiscussionOutcome,
        category_id: parseInt(updatedCategory),
        department_id: parseInt(updatedDepartment),
        isArchived: isArchived,
        // Get other form field values similarly
      };
      console.log({ updatedTicketData });
      // Update the ticket with the new data
      try {
        await updateImprovementTicket(ticketId, updatedTicketData);
        alert('Ticket updated successfully.');
        // Redirect the user to the ticket list page after updating
        window.history.back();
      } catch (error) {
        console.error('Error updating ticket:', error);
        alert('Failed to update ticket.');
      }
    });
});
