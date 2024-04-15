import { updateCelebrationTicket } from '../../state/celebrationTicketApi.js';
import { updateImprovementTicket } from '../../state/improvementTicketApi.js';
import {
  getArchivedImprovementTickets,
  getArchivedCelebrationTickets,
} from '../../utils/getArchivedTickets.js';

const iTicketsContainer = document.getElementById('improvementTickets');
const cTicketsContainer = document.getElementById('celebrationTickets');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const iTickets = await getArchivedImprovementTickets();
    displayImprovementTickets(iTickets);

    const cTickets = await getArchivedCelebrationTickets();
    displayCelebrationTickets(cTickets);
  } catch (error) {
    console.error(error);
  }
});

const displayImprovementTickets = (tickets) => {
  tickets.forEach((ticket) => {
    const ticketItem = createTicketElement(ticket);
    iTicketsContainer.appendChild(ticketItem);
  });
};

const displayCelebrationTickets = (tickets) => {
  tickets.forEach((ticket) => {
    const ticketItem = createTicketElement(ticket);
    cTicketsContainer.appendChild(ticketItem);
  });
};

const createTicketElement = (ticket) => {
  const ticketItem = document.createElement('div');
  ticketItem.classList.add('card', 'mb-3');
  if (ticket) {
    ticketItem.innerHTML = `
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-md-1 text-center">
            <i class="bi bi-archive-fill" style="font-size: 2rem"></i>
          </div>
          <div class="col-md">
            <h5 class="card-title mb-1">${
              ticket.name ?? ticket.who_what
            } - <small>${ticket.date}</small></h5>
            <p class="card-text mb-1">${ticket.problem ?? ticket.details}</p>
            <small>${ticket.solution_outcome}</small>
          </div>
          <div class="col-md-3">
            <button class="btn btn-primary unarchive-btn" data-ticket-id="${
              ticket.ticket_id ?? ticket.c_ticket_id
            }">Unarchive</button>
          </div>
        </div>
      </div>
    `;
  }
  return ticketItem;
};

// Event delegation to handle unarchive button clicks for Improvement Tickets
iTicketsContainer.addEventListener('click', async (event) => {
  if (event.target.classList.contains('unarchive-btn')) {
    const ticketId = event.target.dataset.ticketId;

    try {
      // Update ticket to set isArchived to false
      await updateImprovementTicket(ticketId, { isArchived: false });

      // Remove the unarchived ticket from the UI
      const ticketElement = event.target.closest('.card');
      ticketElement.remove();

      alert('Improvement ticket unarchived successfully.');
    } catch (error) {
      console.error('Error unarchiving improvement ticket:', error);
      alert('Failed to unarchive improvement ticket.');
    }
  }
});

// Event delegation to handle unarchive button clicks for Celebration Tickets
cTicketsContainer.addEventListener('click', async (event) => {
  if (event.target.classList.contains('unarchive-btn')) {
    const ticketId = event.target.dataset.ticketId;

    try {
      // Update ticket to set isArchived to false
      await updateCelebrationTicket(parseInt(ticketId), { isArchived: false });

      // Remove the unarchived ticket from the UI
      const ticketElement = event.target.closest('.card');
      ticketElement.remove();

      alert('Celebration ticket unarchived successfully.');
    } catch (error) {
      console.error('Error unarchiving celebration ticket:', error);
      alert('Failed to unarchive celebration ticket.');
    }
  }
});
