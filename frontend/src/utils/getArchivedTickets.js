import { getAllImprovementTickets } from '../state/improvementTicketApi.js';
import { getAllCelebrationTickets } from '../state/celebrationTicketApi.js';
/**
 * Retrieves archived improvement tickets.
 *
 * This function fetches all improvement tickets using the getAllImprovementTickets function
 * from the improvementTicketApi module. It then filters and returns tickets where isArchived === true.
 * The result is an array of archived improvement tickets.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of archived improvement tickets.
 */
export const getArchivedImprovementTickets = async (departmentId) => {
  try {
    const ticketsResponse = await getAllImprovementTickets();
    const tickets = ticketsResponse.data;
    const archivedTickets = tickets.filter(
      (ticket) =>
        ticket.isArchived === true &&
        ticket.department_id === parseInt(departmentId)
    );
    return archivedTickets;
  } catch (error) {
    throw new Error('Failed to fetch improvement tickets.');
  }
};

/**
 * Retrieves archived improvement tickets.
 *
 * This function fetches all improvement tickets using the getAllImprovementTickets function
 * from the improvementTicketApi module. It then filters and returns tickets where isArchived === true.
 * The result is an array of archived improvement tickets.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of archived improvement tickets.
 */
export const getArchivedCelebrationTickets = async (departmentId) => {
  try {
    const ticketsResponse = await getAllCelebrationTickets();
    const tickets = ticketsResponse.data;
    const archivedTickets = tickets.filter(
      (ticket) =>
        ticket.isArchived === true &&
        ticket.department_id === parseInt(departmentId)
    );
    return archivedTickets;
  } catch (error) {
    throw new Error('Failed to fetch improvement tickets.');
  }
};
