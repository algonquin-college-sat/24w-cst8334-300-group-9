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
    const celebDetails = document.getElementById('details').value;
    const value1 = null;
    const value2 = null;
    const value3 = null;
    const value4 = null;
    const value5 = null;
    const value6 = null;
    
    const valCompass = document.getElementById('value1');
    if (valCompass.checked){
      value1=1;
    }
    else {
      value1=0;
    }
    const valLife = document.getElementById('value2');
    if (valLife.checked){
      value2=1;
    }
    else {
      value2=0;
    }

    const valSpirit = document.getElementById('value3');
    if (valSpirit.checked){
      value3=1;
    }
    else {
      value3=0;
    }

    const valExcell = document.getElementById('value4');
    if (valExcell.checked){
      value4=1;
    }
    else {
      value4=0;
    }

    const valRespect = document.getElementById('value5');
    if (valRespect.checked){
      value5=1;
    }
    else {
      value5=0;
    }
    const valRespons = document.getElementById('value6');
    if (valRespons.checked){
      value6=1;
    }
    else {
      value6=0;
    }

    const deptId = 8;

    alert("Work in progress: " + ticketDate + whoWhat + department + celebDetails + value1 + value2 + value3 + value4 + value5 + value6 + deptId);

    // const isArchived =
    //   document.querySelector('input[name="isArchived"]:checked').value ===
    //   'true'; // Convert to boolean

    // const celbrationTicketData = {
    //   department_id: deptId,
    //   date: ticketDate,
    //   who_what: whoWhat,
    //   details: celebDetails,
    //   value_compassion: value1,
    //   value_life: value2,
    //   value_community: value3,
    //   value_excellence: value4,
    //   value_respect: value5,
    //   value_responsibility: value6,
    //   isArchived: isArchived
    // };

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
