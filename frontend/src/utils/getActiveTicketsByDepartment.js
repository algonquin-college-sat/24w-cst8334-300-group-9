/**
 * Retrieves improvement tickets that are not archived for a specific department.
 *
 * This function fetches improvement tickets using the getAllImprovementTickets function
 * from the improvementTicketApi module. It then filters and returns tickets where
 * departmentId matches the provided departmentId and isArchived === false.
 * The result is an array of improvement tickets that are not archived for the specified department.
 *
 * @param {number} departmentId The ID of the department to filter tickets for.
 * @returns {Promise<Object[]>} A promise that resolves to an array of improvement tickets.
 */
import { getAllCelebrationTickets } from '../state/celebrationTicketApi.js';
import { getAllImprovementTickets } from '../state/improvementTicketApi.js';
export const getActiveImprovementTicketsByDepartment = async (departmentId) => {
  try {
    const ticketsResponse = await getAllImprovementTickets();
    const tickets = ticketsResponse.data;
    const activeTickets = tickets.filter((ticket) => {
      return (
        ticket.department_id === parseInt(departmentId) &&
        ticket.isArchived === false
      );
    });

    return activeTickets;
  } catch (error) {
    throw new Error('Failed to fetch improvement tickets.');
  }
};

export const getActiveCelebrationTicketsByDepartment = async (departmentId) => {
  try {
    const ticketsResponse = await getAllCelebrationTickets();
    const tickets = ticketsResponse.data;
    console.log({ tickets });
    const activeTickets = tickets.filter((ticket) => {
      return ticket.department_id == parseInt(departmentId);
    });
    console.log({ activeTickets });

    return activeTickets;
  } catch (error) {
    throw new Error('Failed to fetch celebration tickets.');
  }
};
