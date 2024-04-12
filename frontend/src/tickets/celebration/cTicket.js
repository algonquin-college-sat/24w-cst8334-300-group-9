import { createCelebrationTicket } from '../../state/celebrationTicketApi.js';
import { getAllCategories } from '../../state/categoryApi.js';
import { getAllDepartments } from '../../state/departmentApi.js';

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const departments = await getAllDepartments();
    console.log({ departments });
    // Get the dropdown element
    const departmentSelect = document.getElementById('departmentSelect');
    // Populate dropdown options with fetched categories
    departments.data.forEach((department) => {
      const option = document.createElement('option');
      option.value = department.department_id;
      option.textContent = department.department_name;
      departmentSelect.appendChild(option);
    });

    // Submit the form
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', async () => {
      try {
        const ticketDate = document.getElementById('ticketDate').value;
        const selectedDepartmentId = parseInt(departmentSelect.value);
        const who_what = document.getElementById('whoWhat').value;
        const details = document.getElementById('details').value;
        const value_compassion = document.getElementById(
          'compassion_and_caring'
        ).checked;
        const value_life =
          document.getElementById('sacredness_of_life').checked;
        const value_community =
          document.getElementById('community_spirit').checked;
        const value_excellence = document.getElementById(
          'excellence_and_innovation'
        ).checked;
        const value_respect = document.getElementById('mutual_respect').checked;
        const value_responsibility = document.getElementById(
          'social_and_fiscalresponsibility'
        ).checked;
        const isArchived =
          document.querySelector('input[name="isArchived"]:checked').value ===
          'true'; // Convert to boolean

        const celebrationTicketData = {
          department_id: selectedDepartmentId,
          date: ticketDate,
          who_what,
          details,
          value_compassion,
          value_life,
          value_community,
          value_excellence,
          value_respect,
          value_responsibility,
          isArchived,
        };
        console.log({ celebrationTicketData });
        await createCelebrationTicket(celebrationTicketData);
        // Alert the user or perform any other actions
        alert('Celebration ticket created successfully!');
        window.history.back();
      } catch (error) {
        console.error('Frontend: Error creating celebration ticket:', error);
        alert('Failed to create celebration ticket. Please try again.');
      }
    });
    // cancle button functionality
    const cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', function () {
      window.history.back();
    });
  } catch (error) {
    console.error('Frontend: Error fetching data:', error);
  }
});
