import { getDepartmentById } from '../../state/departmentApi.js';
import { deleteImprovementTicket } from '../../state/improvementTicketApi.js';
import { getActiveTicketsByDepartment } from '../../utils/getActiveTicketsByDepartment.js';

// Define category mapping
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

document.addEventListener('DOMContentLoaded', async () => {
  // Fetch and display department name
  const departmentId = getDepartmentIdFromUrl();
  const departmentName = await fetchDepartmentName(departmentId);
  displayDepartmentName(departmentName);

  // Attach event listeners
  attachEventListeners();

  // Fetch and display improvement tickets
  fetchAndDisplayImprovementTickets(departmentId);
});

// Helper function to extract department ID from URL
const getDepartmentIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('departmentId');
};

// Helper function to fetch department name
const fetchDepartmentName = async (departmentId) => {
  try {
    const department = await getDepartmentById(departmentId);
    return department.data.department_name;
  } catch (error) {
    console.error('Error fetching department:', error);
    return '';
  }
};

// Helper function to display department name
const displayDepartmentName = (departmentName) => {
  const departmentNameElement = document.querySelector('.department-name');
  if (departmentNameElement) {
    departmentNameElement.textContent = departmentName;
  }
};

// Helper function to attach event listeners
const attachEventListeners = () => {
  document
    .getElementById('openModalButton')
    .addEventListener('click', openModal);
  document.querySelector('.close-button').addEventListener('click', closeModal);
  document
    .getElementById('improvementButton')
    .addEventListener('click', addImprovement);
  document
    .getElementById('celebrationButton')
    .addEventListener('click', addCelebration);
  document
    .getElementById('logo')
    .addEventListener('click', goToSelectBoard);
};

// Helper function to fetch and display improvement tickets
const fetchAndDisplayImprovementTickets = async (departmentId) => {
  try {
    const improvementTickets = await getActiveTicketsByDepartment(departmentId);
    displayTicketsByCategory(improvementTickets);
  } catch (error) {
    console.error('Error fetching improvement tickets:', error);
  }
};

// Helper function to display improvement tickets by category
const displayTicketsByCategory = (improvementTickets) => {
  for (const category in categoryMapping) {
    const categoryId = categoryMapping[category];
    const categoryTickets = improvementTickets.filter(
      (ticket) => ticket.category_id === categoryId
    );
    console.log({ categoryTickets });

    displayTickets(category, categoryTickets);
  }
};

// Helper function to display tickets in a category
const displayTickets = (category, tickets) => {
  const panelElement = document.querySelector(
    `.${category.toLowerCase().replace(/\s/g, '-')}-tickets`
  );
  if (!panelElement) {
    console.error(
      `Element with class '${category
        .toLowerCase()
        .replace(/\s/g, '-')}-tickets' not found.`
    );
    return;
  }
  panelElement.innerHTML = ''; // Clear previous content

  tickets.forEach((ticket) => {
    const ticketElement = createTicketElement(ticket);
    attachTicketEventListeners(ticketElement, ticket);
    panelElement.appendChild(ticketElement);
  });
};

// Helper function to create a ticket element
const createTicketElement = (ticket) => {
  const ticketElement = document.createElement('div');
  ticketElement.classList.add('card', 'h-100', 'improvement-ticket');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = ticket.name;

  const cardDescription = document.createElement('div');
  cardDescription.classList.add('card-description');
  cardDescription.textContent = ticket.problem;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDescription);

  ticketElement.appendChild(cardBody);
  return ticketElement;
};

// Helper function to attach event listeners to tickets
const attachTicketEventListeners = (ticketElement, ticket) => {
  ticketElement.addEventListener('click', () => {
      window.location.href = `../../tickets/improvement/updateTicketForm.html?ticketId=${ticket.ticket_id}`;
  });
};



// Function to open the modal
const openModal = () => {
  const modal = document.getElementById('ticketModal');
  if (modal) {
    modal.style.display = 'block';
  }
};

// Function to close the modal
const closeModal = () => {
  const modal = document.getElementById('ticketModal');
  if (modal) {
    modal.style.display = 'none';
  }
};

// Function to handle adding an improvement ticket
const addImprovement = () => {
  window.location.href = '../../tickets/improvement/iTicket.html';
};

// Function to handle adding a celebration ticket
const addCelebration = () => {
  window.location.href = '../../tickets/celebration/cTicket.html';
};

// Function to return to board selection page
const goToSelectBoard = () => {
  window.location.href = '../../index.html';
};