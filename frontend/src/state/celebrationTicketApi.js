import baseAPI from './baseApi.js';

const celebrationTicketAPI = '/celebration-ticket';

export const createCelebrationTicket = async (celebrationTicketData) => {
  try {
    const response = await baseAPI.post(
      celebrationTicketAPI,
      celebrationTicketData
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to create celebration ticket');
  }
};

export const getAllCelebrationTickets = async () => {
  try {
    const response = await baseAPI.get(celebrationTicketAPI);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch celebration tickets');
  }
};

export const getCelebrationTicketById = async (ticketId) => {
  try {
    const response = await baseAPI.get(`${celebrationTicketAPI}/${ticketId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch celebration ticket');
  }
};

export const updateCelebrationTicket = async (
  ticketId,
  celebrationTicketData
) => {
  try {
    const response = await baseAPI.patch(
      `${celebrationTicketAPI}/${ticketId}`,
      celebrationTicketData
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update celebration ticket');
  }
};

export const deleteCelebrationTicket = async (ticketId) => {
  try {
    const response = await baseAPI.delete(
      `${celebrationTicketAPI}/${ticketId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete celebration ticket');
  }
};

export default celebrationTicketAPI;
