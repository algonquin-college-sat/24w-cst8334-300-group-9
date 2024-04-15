import baseAPI from './baseApi.js';

const impTicketUpdateNoteAPI = '/impTicket-note';

export const createImpTicketUpdateNote = async (updateNoteData) => {
  try {
    const response = await baseAPI.post(impTicketUpdateNoteAPI, updateNoteData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create improvement ticket update note');
  }
};

export const getAllImpTicketUpdateNotes = async () => {
  try {
    const response = await baseAPI.get(impTicketUpdateNoteAPI);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch improvement ticket update notes');
  }
};

export const getImpTicketUpdatenoteById = async (noteId) => {
  try {
    const response = await baseAPI.get(`${impTicketUpdateNoteAPI}/${noteId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch improvement ticket update note');
  }
};

export const updateImpTicketUpdateNote = async (noteId, updateNoteData) => {
  try {
    const response = await baseAPI.patch(
      `${impTicketUpdateNoteAPI}/${noteId}`,
      updateNoteData
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update the note');
  }
};

export const deleteImpTicketUpdateNote = async (noteId) => {
  try {
    const response = await baseAPI.delete(
      `${impTicketUpdateNoteAPI}/${noteId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete the note');
  }
};
