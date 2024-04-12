/**
 * Retrieves archived improvement tickets.
 *
 * This function fetches all improvement tickets using the getAllImprovementTickets function
 * from the improvementTicketApi module. It then filters and returns tickets where isArchived === true.
 * The result is an array of archived improvement tickets.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of archived improvement tickets.
 */
import { getAllImpTicketUpdateNotes } from '../state/impTicketUpdateNotesApi.js';
export const getUpdateNotesByImpTicketId = async (ticketId) => {
  try {
    const response = await getAllImpTicketUpdateNotes();
    const allUpdateNotes = response.data;
    const notesByTicket = allUpdateNotes.filter(
      (note) => note.i_ticket_id == ticketId
    );

    return notesByTicket;
  } catch (error) {
    throw new Error('Failed to fetch update notes');
  }
};
