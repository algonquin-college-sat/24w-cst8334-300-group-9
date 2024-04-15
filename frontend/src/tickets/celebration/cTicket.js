import {
  createCelebrationTicket,
  getCelebrationTicketById,
  updateCelebrationTicket,
} from '../../state/celebrationTicketApi.js';
import { getAllDepartments } from '../../state/departmentApi.js';

document.addEventListener('DOMContentLoaded', async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const ticketId = urlParams.get('ticketId');
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

  if (ticketId) {
    populateTicketInfo(parseInt(ticketId));
  } else {
    try {
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
          const value_respect =
            document.getElementById('mutual_respect').checked;
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

          window.history.back();
        } catch (error) {
          console.error('Frontend: Error creating celebration ticket:', error);
          alert('Failed to create celebration ticket. Please try again.');
        }
      });
    } catch (error) {
      console.error('Frontend: Error fetching data:', error);
    }
  }
  // cancle button functionality
  const cancelButton = document.getElementById('cancelButton');
  cancelButton.addEventListener('click', function () {
    window.history.back();
  });
});

const populateTicketInfo = async (ticketId) => {
  try {
    const ticket = await getCelebrationTicketById(ticketId);

    let date = document.getElementById('ticketDate');
    let who_what = document.getElementById('whoWhat');
    let department_id = document.getElementById('departmentSelect');
    let details = document.getElementById('details');
    let value_compassion = document.getElementById('compassion_and_caring');
    let value_life = document.getElementById('sacredness_of_life');
    let value_community = document.getElementById('community_spirit');
    let value_excellence = document.getElementById('excellence_and_innovation');
    let value_respect = document.getElementById('mutual_respect');
    let value_responsibility = document.getElementById(
      'social_and_fiscalresponsibility'
    );
    let isArchivedCheckbox = document.querySelector(
      `input[name="isArchived"][value="${ticket.isArchived.toString()}"]`
    );

    console.log(typeof ticketId);

    date.value = ticket.date;
    who_what.value = ticket.who_what;
    department_id.value = ticket.department_id;
    details.value = ticket.details;
    value_compassion.checked = ticket.value_compassion;
    value_life.checked = ticket.value_life;
    value_community.checked = ticket.value_community;
    value_excellence.checked = ticket.value_excellence;
    value_respect.checked = ticket.value_respect;
    value_responsibility.checked = ticket.value_responsibility;
    if (isArchivedCheckbox) {
      isArchivedCheckbox.checked = true;
    } else {
      console.error(
        'Is Archived value not found in checkbox buttons:',
        ticket.isArchived.toString()
      );
    }
    document
      .getElementById('submitButton')
      .addEventListener('click', async (event) => {
        event.preventDefault();
        const isArchived =
          document.querySelector('input[name="isArchived"]:checked').value ===
          'true';
        const updatedTicketData = {
          c_ticket_id: ticketId,
          department_id: parseInt(department_id.value),
          date: date.value,
          who_what: who_what.value,
          details: details.value,
          value_compassion: value_compassion.checked,
          value_life: value_life.checked,
          value_community: value_community.checked,
          value_excellence: value_excellence.checked,
          value_respect: value_respect.checked,
          value_responsibility: value_responsibility.checked,
          isArchived: isArchived,
        };
        await updateCelebrationTicket(ticketId, updatedTicketData);
        alert('Ticket updated successfully');
        window.history.back();
      });
  } catch (error) {
    console.error('Frontend: Error populating data:', error);
  }
};
