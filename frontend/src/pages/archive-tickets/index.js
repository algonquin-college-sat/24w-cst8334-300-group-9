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
  console.log({ archivedTickets });

  archivedTickets.forEach((ticket) => {
    console.log('ticket.id', ticket.ticket_id);

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
    archivedTicketsContainer.appendChild(ticketItem);
  });
};

// Event delegation to handle unarchive button clicks
document
  .getElementById('archivedTickets')
  .addEventListener('click', async (event) => {
    if (event.target.classList.contains('unarchive-btn')) {
      const ticketId = event.target.dataset.ticketId;
      console.log({ ticketId });

      try {
        // Update ticket to set isArchived to false
        await updateImprovementTicket(ticketId, { isArchived: false });
        // Reload archived tickets after unarchiving
        const updated = await getArchivedImprovementTickets();
        // window.location.reload();
        console.log({ updated });
        // Display updated tickets
        // displayArchivedTickets(updated);
        alert('Ticket unarchived successfully.');
      } catch (error) {
        console.error('Error unarchiving ticket:', error);
        alert('Failed to unarchive ticket.');
      }
    }
  });
