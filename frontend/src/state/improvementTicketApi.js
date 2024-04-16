import baseAPI from './baseApi.js';

const improvementTicketAPI = '/improvement-ticket';

export const createImprovementTicket = async (improvementTicketData) => {
  try {
    const response = await baseAPI.post(
      improvementTicketAPI,
      improvementTicketData
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to create improvement ticket');
  }
};

export const getAllImprovementTickets = async () => {
  try {
    const response = await baseAPI.get(improvementTicketAPI);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch improvement tickets');
  }
};

export const getImprovementTicketById = async (ticketId) => {
  try {
    const response = await baseAPI.get(`${improvementTicketAPI}/${ticketId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch improvement ticket');
  }
};

export const getImprovementTicketByCategoryId = async (categoryId) => {
  try {
    const response = await baseAPI.get(
      `${improvementTicketAPI}/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch improvement ticket');
  }
};

export const getImprovementTicketByDepartmentId = async (departmentId) => {
  try {
    const response = await baseAPI.get(
      `${improvementTicketAPI}/department/${departmentId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch improvement ticket');
  }
};

export const updateImprovementTicket = async (
  ticketId,
  improvementTicketData
) => {
  try {
    const response = await baseAPI.patch(
      `${improvementTicketAPI}/${ticketId}`,
      improvementTicketData
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update improvement ticket');
  }
};

export const deleteImprovementTicket = async (ticketId) => {
  try {
    const response = await baseAPI.delete(
      `${improvementTicketAPI}/${ticketId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete improvement ticket');
  }
};
