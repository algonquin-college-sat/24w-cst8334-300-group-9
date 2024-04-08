// import { createCelebrationTicket } from '../../state/celebrationTicketApi.js';
// import { getAllCategories } from '../../state/categoryApi.js';
// import { getAllDepartments } from '../../state/departmentApi.js';

document.addEventListener('DOMContentLoaded', async function(){
  const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function () {
      window.history.back();
    });

  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', async function () {
    const ticketDate = document.getElementById('ticketDate').value;
    const whoWhat = document.getElementById('whoWhat').value;
    const department = document.getElementById('department').value;
    const details = document.getElementById('details').value;
    alert("Work in progress");
  });


});

// document.addEventListener('DOMContentLoaded', async function () {
//   try {


//     // Save button functionality


      //       try {
//         // Get form data
//         const ticketDate = document.getElementById('ticketDate').value;
//         const selectedDepartmentId = parseInt(departmentSelect.value);
//         const ticketName = document.getElementById('ticketName').value;
//         const problemDescription =
//           document.getElementById('problemDescription').value;
//         const sourceIssue = document.getElementById('sourceIssue').value;
//         const proposedSolution =
//           document.getElementById('proposedSolution').value;
//         // Get the selected value from the radio buttons for input needed from
//         let inputNeededFromValue = null;
//         const inputNeededRadios = document.querySelectorAll(
//           'input[name="inputNeededFrom"]'
//         );
//         inputNeededRadios.forEach((radio) => {
//           if (radio.checked) {
//             inputNeededFromValue = radio.value.toString(); // Ensure it's a string
//           }
//         });

//         // Get the selected value from the radio buttons for safety issue
//         let safetyIssueValue = null;
//         const safetyIssueRadios = document.querySelectorAll(
//           'input[name="safetyIssue"]'
//         );
//         safetyIssueRadios.forEach((radio) => {
//           if (radio.checked) {
//             safetyIssueValue = radio.value;
//           }
//         });

//         // Get the index of the selected radio button in the quadrupleAim section
//         let quadrupleAimIndex = null;
//         const quadrupleAimRadios = document.querySelectorAll(
//           'input[name="quadrupleAim"]'
//         );
//         quadrupleAimRadios.forEach((radio, index) => {
//           if (radio.checked) {
//             quadrupleAimIndex = index + 1;
//           }
//         });

//         const selectedCategoryId = parseInt(categorySelect.value);
//         const isArchived =
//           document.querySelector('input[name="isArchived"]:checked').value ===
//           'true'; // Convert to boolean
//         // Prepare improvement ticket data object
//         const improvementTicketData = {
//           date: ticketDate, // Add the date to the ticket data
//           name: ticketName, // Use the value from the ticket name textarea
//           problem: problemDescription,
//           source_issue: sourceIssue,
//           improve_idea: proposedSolution,
//           input_needed_from: inputNeededFromValue,
//           safety_issue: safetyIssueValue,
//           quadruple_aim_id: quadrupleAimIndex,
//           solution_outcome: proposedSolution,
//           category_id: selectedCategoryId, // Assign the selected category ID
//           department_id: selectedDepartmentId,
//           isArchived: isArchived,
//         };

//         console.log(improvementTicketData);

//         // Create the improvement ticket
//         const newTicket = await createImprovementTicket(improvementTicketData);
//         console.log(newTicket);

//         // Alert the user or perform any other actions
//         alert('Improvement ticket created successfully!');
//         window.history.back();
//       } catch (error) {
//         console.error('Frontend: Error creating improvement ticket:', error);
//         alert('Failed to create improvement ticket. Please try again.');
//       }
//     });

//     // Add note functionality
//     const addProgressNoteButton = document.getElementById('addProgressNote');
//     addProgressNoteButton.addEventListener('click', function () {
//       const updateValue = document.getElementById('updateInput').value;
//       const ownerValue = document.getElementById('ownerInput').value;
//       const dateValue = document.getElementById('dateInput').value;

//       // Validation to ensure that no fields are empty
//       if (!updateValue || !ownerValue || !dateValue) {
//         alert('Please fill in all fields before adding a note.');
//         return;
//       }

//       const table = document
//         .getElementById('progressNotesTable')
//         .getElementsByTagName('tbody')[0];
//       const newRow = table.insertRow();
//       const updateCell = newRow.insertCell(0);
//       const ownerCell = newRow.insertCell(1);
//       const dateCell = newRow.insertCell(2);

//       updateCell.textContent = updateValue;
//       ownerCell.textContent = ownerValue;
//       dateCell.textContent = dateValue;

//       // Clear the input fields after adding
//       document.getElementById('updateInput').value = '';
//       document.getElementById('ownerInput').value = '';
//       document.getElementById('dateInput').value = '';
//     });
//   } catch (error) {
//     console.error('Frontend: Error fetching categories:', error);
//     alert('Failed to fetch categories. Please try again.');
//   }
// });
