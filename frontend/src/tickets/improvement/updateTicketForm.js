import {
  getImprovementTicketById,
  updateImprovementTicket,
} from '../../state/improvementTicketApi.js';
import { getAllCategories } from '../../state/categoryApi.js';
import { getAllDepartments } from '../../state/departmentApi.js';
import { getUpdateNotesByImpTicketId } from '../../utils/getUpdateNotesByImpTicketId.js';
import { createImpTicketUpdateNote } from '../../state/impTicketUpdateNotesApi.js';

// Function to populate the progress notes table
const populateUpdateNotesTable = (notes) => {
  const tbody = document
    .getElementById('progressNotesTable')
    .getElementsByTagName('tbody')[0];
  tbody.innerHTML = ''; // Clear existing table rows

  notes.forEach((note) => {
    const row = tbody.insertRow();
    const updateCell = row.insertCell(0);
    const ownerCell = row.insertCell(1);
    const dateCell = row.insertCell(2);

    updateCell.textContent = note.update_note;
    ownerCell.textContent = note.owner;
    dateCell.textContent = note.date;
  });
};

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

  const notes = await getUpdateNotesByImpTicketId(ticketId);
  populateUpdateNotesTable(notes);

  // Function to populate form fields with ticket data
  function populateFormFields(ticket) {
    document.getElementById('departmentSelect').value = ticket.department_id;
    document.getElementById('ticketName').value = ticket.name;
    document.getElementById('ticketDate').value = ticket.date;
    document.getElementById('problemDescription').value = ticket.problem;
    document.getElementById('sourceIssue').value = ticket.source_issue;
    document.getElementById('proposedSolution').value = ticket.improve_idea;

    // Populate checkbox button for input needed from
    const inputNeededFromCheckbox = document.querySelector(
      `input[name="inputNeededFrom"][value="${ticket.input_needed_from}"]`
    );
    if (inputNeededFromCheckbox) {
      inputNeededFromCheckbox.checked = true;
    } else {
      console.error(
        'Input needed from value not found in checkbox buttons:',
        ticket.input_needed_from
      );
    }

    // Check if the safety issue checkbox button exists before setting its checked property
    const safetyIssueCheckbox = document.querySelector(
      `input[name="safetyIssue"][value="${ticket.safety_issue}"]`
    );
    if (safetyIssueCheckbox) {
      safetyIssueCheckbox.checked = true;
    } else {
      console.error(
        'Safety issue value not found in checkbox buttons:',
        ticket.safety_issue
      );
    }

    // Populate checkbox button for quadruple aim
    const quadrupleAimCheckbox = document.querySelector(
      `input[name="quadrupleAim"][value="${ticket.quadruple_aim_id}"]`
    );
    if (quadrupleAimCheckbox) {
      quadrupleAimCheckbox.checked = true;
    } else {
      console.error(
        'Quadruple aim value not found in checkbox buttons:',
        ticket.quadruple_aim_id
      );
    }

    // Populate "Is Archived" checkbox button
    const isArchivedCheckbox = document.querySelector(
      `input[name="isArchived"][value="${ticket.isArchived.toString()}"]`
    );
    if (isArchivedCheckbox) {
      isArchivedCheckbox.checked = true;
    } else {
      console.error(
        'Is Archived value not found in checkbox buttons:',
        ticket.isArchived.toString()
      );
    }

    document.getElementById('categorySelect').value = ticket.category_id;
    document.getElementById('groupDiscussionOutcome').value =
      ticket.solution_outcome;
  }

  const backButton = document.getElementById('backButton');
  backButton.addEventListener('click', function () {
    window.history.back();
  });

  // Event listener for the ticket form submission
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
      };

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

  // Event listener for the Tracking note submission
  document
    .getElementById('addProgressNote')
    .addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent the default form submission
      const update_note = document.getElementById('updateInput').value;
      const owner = document.getElementById('ownerInput').value;
      const update_date = document.getElementById('dateInput').value;
      const progressNoteData = {
        i_ticket_id: parseInt(ticketId),
        date: update_date,
        update_note,
        owner,
      };

      try {
        await createImpTicketUpdateNote(progressNoteData);
        alert('Progress note created successfully');
        // Update the notes table UI without reloading the page
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${update_note}</td>
          <td>${owner}</td>
          <td>${update_date}</td>
        `;
        document
          .getElementById('progressNotesTable')
          .getElementsByTagName('tbody')[0]
          .appendChild(newRow);
      } catch (error) {
        console.error('Error creating progress note:', error);
        alert('Failed to create progress note.');
      }
    });
});
