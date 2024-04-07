import { updateImprovementTicket } from '../../state/improvementTicketApi.js';
import { getArchivedImprovementTickets } from '../../utils/getArchivedImprovementTickets.js';

const archivedTicketsContainer = document.getElementById('archivedTickets');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const archivedTickets = await getArchivedImprovementTickets();
    displayArchivedTickets(archivedTickets);
  } catch (error) {
    console.error(error);
  }
});

const displayArchivedTickets = (archivedTickets) => {
  archivedTickets.forEach((ticket) => {
    const ticketItem = createTicketElement(ticket);
    archivedTicketsContainer.appendChild(ticketItem);
  });
};

const createTicketElement = (ticket) => {
  const ticketItem = document.createElement('div');
  ticketItem.classList.add('list-group-item');
  ticketItem.innerHTML = `
    <div class="row align-items-center">
      <div class="col-md-1 text-center">
        <i class="bi bi-archive-fill" style="font-size: 2rem"></i>
      </div>
      <div class="col-md">
        <h5 class="mb-1">${ticket.name} - <small>${ticket.date}</small></h5>
        <p class="mb-1">${ticket.problem}</p>
        <small>${ticket.solution_outcome}</small>
      </div>
      <div class="col-md-1">
        <button class="btn btn-primary unarchive-btn" data-ticket-id="${ticket.ticket_id}">Unarchive</button>
      </div>
    </div>
    `;
  return ticketItem;
};

// Event delegation to handle unarchive button clicks
archivedTicketsContainer.addEventListener('click', async (event) => {
  if (event.target.classList.contains('unarchive-btn')) {
    const ticketId = event.target.dataset.ticketId;

    try {
      // Update ticket to set isArchived to false
      await updateImprovementTicket(ticketId, { isArchived: false });

      // Remove the unarchived ticket from the UI
      const ticketElement = event.target.closest('.list-group-item');
      ticketElement.remove();

      alert('Ticket unarchived successfully.');
    } catch (error) {
      console.error('Error unarchiving ticket:', error);
      alert('Failed to unarchive ticket.');
    }
  }
});
