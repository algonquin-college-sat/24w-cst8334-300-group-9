import {
  getImprovementTicketById,
  updateImprovementTicket,
} from '../../state/improvementTicketApi.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Get the ticket ID from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const ticketId = urlParams.get('ticketId');

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
    document.getElementById('ticketName').value = ticket.name;
    document.getElementById('problemDescription').value = ticket.problem;
    document.getElementById('sourceIssue').value = ticket.source_issue;
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
    document.getElementById('groupDiscussionOutcome').value =
      ticket.solution_outcome;
    document.getElementById('categorySelect').value = ticket.category_id;
    // Populate other form fields similarly
  }

  // Event listener for the form submission
  document
    .getElementById('saveButton')
    .addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Validate form fields
      const ticketName = document.getElementById('ticketName').value;
      const problemDescription =
        document.getElementById('problemDescription').value;
      const sourceIssue = document.getElementById('sourceIssue').value;
      const inputNeededFrom = document.querySelector(
        'input[name="inputNeededFrom"]:checked'
      );
      const safetyIssue = document.querySelector(
        'input[name="safetyIssue"]:checked'
      );
      const quadrupleAim = document.querySelector(
        'input[name="quadrupleAim"]:checked'
      );
      const groupDiscussionOutcome = document.getElementById(
        'groupDiscussionOutcome'
      ).value;
      const categorySelect = document.getElementById('categorySelect').value;

      // if (
      //   !ticketName ||
      //   !problemDescription ||
      //   !sourceIssue ||
      //   !inputNeededFrom ||
      //   !safetyIssue ||
      //   !quadrupleAim ||
      //   !groupDiscussionOutcome ||
      //   !categorySelect
      // ) {
      //   alert('Please fill out all fields.');
      //   return;
      // }

      // Get the updated ticket data from the form
      const updatedTicketData = {
        name: ticketName,
        problem: problemDescription,
        source_issue: sourceIssue,
        input_needed_from: inputNeededFrom.value,
        safety_issue: safetyIssue.value,
        quadruple_aim_id: parseInt(quadrupleAim.value),
        solution_outcome: groupDiscussionOutcome,
        category_id: parseInt(categorySelect),
        // Get other form field values similarly
      };

      // Update the ticket with the new data
      try {
        await updateImprovementTicket(ticketId, updatedTicketData);
        alert('Ticket updated successfully.');
        // Redirect the user to the ticket list page after updating
        window.location.href = '../../overview/index.html';
      } catch (error) {
        console.error('Error updating ticket:', error);
        alert('Failed to update ticket.');
      }
    });
});
