document.addEventListener('DOMContentLoaded', function() {
    // Back button functionality
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function() {
      window.location.href = "../../pages/overview/index.html";
    });
    
    // Save button functionality
    const saveButton = document.querySelector('.btn-primary');
    saveButton.addEventListener('click', function() {
      // Placeholder for save functionality
      // Perform form validation
      // Possibly, submit the form data via AJAX to a server endpoint
  
      alert('Form data saved.');
    });

    // Add note functionality
    const addProgressNoteButton = document.getElementById('addProgressNote');
    addProgressNoteButton.addEventListener('click', function() {
        const updateValue = document.getElementById('updateInput').value;
        const ownerValue = document.getElementById('ownerInput').value;
        const dateValue = document.getElementById('dateInput').value;

        // Validation to ensure that no fields are empty
        if (!updateValue || !ownerValue || !dateValue) {
        alert('Please fill in all fields before adding a note.');
        return;
        }

        const table = document.getElementById('progressNotesTable').getElementsByTagName('tbody')[0];
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
  