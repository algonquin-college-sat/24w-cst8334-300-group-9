import { createImprovementTicket } from '../../state/improvementTicketApi.js';
document.addEventListener('DOMContentLoaded', function () {
  // Back button functionality
  const backButton = document.getElementById('backButton');
  backButton.addEventListener('click', function () {
    window.location.href = '../../pages/overview/index.html';
  });

  // Save button functionality
  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', async function () {
    try {
      // Get form data
      const problemDescription =
        document.getElementById('problemDescription').value;
      const sourceIssue = document.getElementById('sourceIssue').value;
      const proposedSolution =
        document.getElementById('proposedSolution').value;

      // Get the selected value from the radio buttons for input needed from
      let inputNeededFromValue = null;
      const inputNeededRadios = document.querySelectorAll(
        'input[name="inputNeededFrom"]'
      );
      inputNeededRadios.forEach((radio) => {
        if (radio.checked) {
          inputNeededFromValue = radio.value.toString(); // Ensure it's a string
        }
      });

      // Get the selected value from the radio buttons for safety issue
      let safetyIssueValue = null;
      const safetyIssueRadios = document.querySelectorAll(
        'input[name="safetyIssue"]'
      );
      safetyIssueRadios.forEach((radio) => {
        if (radio.checked) {
          safetyIssueValue = radio.value;
        }
      });

      // Get the index of the selected radio button in the quadrupleAim section
      let quadrupleAimIndex = null;
      const quadrupleAimRadios = document.querySelectorAll(
        'input[name="quadrupleAim"]'
      );
      quadrupleAimRadios.forEach((radio, index) => {
        if (radio.checked) {
          quadrupleAimIndex = index;
        }
      });

      // Prepare improvement ticket data object
      const improvementTicketData = {
        name: 'new', // Assuming name is fixed
        // date: new Date(),
        problem: problemDescription,
        improve_idea: proposedSolution,
        source_issue: sourceIssue,
        input_needed_from: inputNeededFromValue, // Assign the selected value
        safety_issue: safetyIssueValue, // Assign the selected safety issue
        quadruple_aim_id: quadrupleAimIndex, // Assign the index of the selected radio button
        solution_outcome: proposedSolution,
        category_id: 1, // Assuming category_id is fixed
      };

      console.log(improvementTicketData);

      // Create the improvement ticket
      const newTicket = await createImprovementTicket(improvementTicketData);
      console.log(newTicket);

      // Alert the user or perform any other actions
      alert('Improvement ticket created successfully!');
    } catch (error) {
      console.error('Frontend: Error creating improvement ticket:', error);
      alert('Failed to create improvement ticket. Please try again.');
    }
  });

  // Add note functionality
  const addProgressNoteButton = document.getElementById('addProgressNote');
  addProgressNoteButton.addEventListener('click', function () {
    const updateValue = document.getElementById('updateInput').value;
    const ownerValue = document.getElementById('ownerInput').value;
    const dateValue = document.getElementById('dateInput').value;

    // Validation to ensure that no fields are empty
    if (!updateValue || !ownerValue || !dateValue) {
      alert('Please fill in all fields before adding a note.');
      return;
    }

    const table = document
      .getElementById('progressNotesTable')
      .getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const updateCell = newRow.insertCell(0);
    const ownerCell = newRow.insertCell(1);
    const dateCell = newRow.insertCell(2);

    updateCell.textContent = updateValue;
    ownerCell.textContent = ownerValue;
    dateCell.textContent = dateValue;

    // Clear the input fields after adding
    document.getElementById('updateInput').value = '';
    document.getElementById('ownerInput').value = '';
    document.getElementById('dateInput').value = '';
  });
});
