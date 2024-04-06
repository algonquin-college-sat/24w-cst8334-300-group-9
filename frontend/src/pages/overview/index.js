import { getDepartmentById } from '../../state/departmentApi.js';
import {
  deleteImprovementTicket,
  getImprovementTicketByDepartmentId,
} from '../../state/improvementTicketApi.js';

const categoryMapping = {
  'New Ideas': 1,
  'Work in Progress': 2,
  'Almost Done': 3,
  Implement: 4,
  Challenge: 5,
  Possible: 6,
  Kibosh: 7,
  Celebration: 8,
  Complete: 9,
};

// Event listeners
document.addEventListener('DOMContentLoaded', async () => {
  // Get the department ID from the URL parameters
  const urlParams = new URLSearchParams(window.location.search); //this will returns  the query string portion of the URL (everything after the question mark)
  const departmentId = urlParams.get('departmentId'); //retrieves the value of the query parameter named 'departmentId'

  try {
    const department = await getDepartmentById(departmentId);
    const departmentName = department.data.department_name;

    document.querySelector('.department-name').textContent = departmentName;
  } catch (error) {
    console.error('Error fetching department: ', error);
  }

  document.querySelector('.button').addEventListener('click', openModal);
  document.querySelector('.close-button').addEventListener('click', closeModal);
  document
    .getElementById('improvementButton')
    .addEventListener('click', addImprovement);
  document
    .getElementById('celebrationButton')
    .addEventListener('click', addCelebration);

  // Fetch and display improvement tickets by category
  fetchImprovementTicketByDepartment(departmentId);
});

const fetchImprovementTicketByDepartment = async (departmentId) => {
  try {
    // Fetch improvement ticket data from the backend
    const improvementTickets = await getImprovementTicketByDepartmentId(
      departmentId
    );
    console.log(improvementTickets);

    // Loop through each category and display corresponding tickets
    for (const category in categoryMapping) {
      const categoryId = categoryMapping[category];
      const categoryTickets = improvementTickets.filter((ticket) => {
        return ticket.category_id === categoryId;
      });

      displayTicketsByCategory(category, categoryTickets);
    }
  } catch (error) {
    console.error('Error fetching improvement tickets:', error);
  }
};

const displayTicketsByCategory = (category, tickets) => {
  const formattedCategoryName = category.toLowerCase().replace(/\s/g, '-');

  const panelElement = document.querySelector(
    `.${formattedCategoryName}-tickets`
  );
  if (!panelElement) {
    console.error(
      `Element with class '${formattedCategoryName}-tickets' not found.`
    );
    return;
  }
  panelElement.innerHTML = ''; // Clear previous content

  tickets.forEach((ticket) => {
    const ticketElement = document.createElement('div');
    ticketElement.classList.add(
      'card',
      'h-100',
      'shadow',
      'improvement-ticket'
    );

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = ticket.name;

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card-description'); // Add a class for description
    cardDescription.textContent = ticket.problem;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);

    ticketElement.appendChild(cardBody);

    // Event listener to prompt user to update or delete the ticket
    ticketElement.addEventListener('click', () => {
      const confirmAction = window.confirm(
        'Do you want to update or delete this ticket?'
      );
      if (confirmAction) {
        const updateAction = window.prompt(
          'Type "update" to edit the ticket or "delete" to remove it.'
        );
        if (updateAction === 'update') {
          window.location.href = `../../tickets/improvement/updateTicketForm.html?ticketId=${ticket.ticket_id}`;
        } else if (updateAction === 'delete') {
          deleteTicket(ticket.ticket_id);
        } else {
          alert('Invalid action. Please type "update" or "delete".');
        }
      }
    });

    panelElement.appendChild(ticketElement);
  });
};

// Function to delete the ticket
const deleteTicket = async (ticketId) => {
  try {
    await deleteImprovementTicket(ticketId);
    alert('Ticket deleted successfully.');
    // Reload the page to reflect the changes
    location.reload();
  } catch (error) {
    console.error('Error deleting ticket:', error);
    alert('Failed to delete ticket.');
  }
};

const modal = document.getElementById('ticketModal');

// Function to open the modal
function openModal() {
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
}

// Function to handle adding an improvement ticket
function addImprovement() {
  window.location.href = '../../tickets/improvement/index.html';
}

// Function to handle adding a celebration ticket
function addCelebration() {
  window.location.href = '../../tickets/celebration/index.html';
}
