// Import the getDepartmentById function from departmentApi.js
import { getDepartmentById } from '../../state/departmentApi.js';
import { getAllImprovementTickets } from '../../state/improvementTicketApi.js';
const fetchAndDisplayImprovementTicket = async () => {
  try {
    // Fetch improvement ticket data from the backend
    const improvementTicketData = await getAllImprovementTickets(); // Implement this function to fetch data from the backend
    const improvementTickets = improvementTicketData.data;
    console.log(improvementTickets);

    // Select the improvement ticket element
    const improvementTicketElement = document.querySelector(
      '.improvement-ticket'
    );

    // Clear previous content
    improvementTicketElement.innerHTML = '';

    // Loop through improvement tickets and create HTML elements for each ticket
    improvementTickets.forEach((improvementTicket) => {
      // Create card element
      const ticketElement = document.createElement('div');
      ticketElement.classList.add('card', 'h-100', 'shadow');

      // Create card body
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      // Create card title
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = improvementTicket.name;

      // Create card description
      const cardDescription = document.createElement('div');
      cardDescription.textContent = improvementTicket.problem;

      // Append title and description to card body
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardDescription);

      // Append card body to card
      ticketElement.appendChild(cardBody);

      // Add click event listener
      ticketElement.addEventListener('click', () => {
        console.log(`Ticket ${improvementTicket.ticket_id} clicked!`);
      });

      // Append card to improvement ticket element
      improvementTicketElement.appendChild(ticketElement);
    });
  } catch (error) {
    console.error('Error fetching improvement ticket:', error);
  }
};

// Function to fetch department details and update the department name in the HTML
async function updateDepartmentName(departmentId) {
  try {
    const department = await getDepartmentById(departmentId);
    const departmentName = department.data.department_name;
    document.querySelector('.department-name').textContent = departmentName;
  } catch (error) {
    console.error('Error fetching department:', error);
  }
}
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

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.button').addEventListener('click', openModal);
  document.querySelector('.close-button').addEventListener('click', closeModal);
  document
    .getElementById('improvementButton')
    .addEventListener('click', addImprovement);
  document
    .getElementById('celebrationButton')
    .addEventListener('click', addCelebration);
  updateDepartmentName(1); // Replace 1 with the actual department ID
  fetchAndDisplayImprovementTicket();
});
