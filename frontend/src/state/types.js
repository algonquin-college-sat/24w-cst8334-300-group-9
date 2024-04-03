// Define interface for ImprovementTicket
export const ImprovementTicketSchema = {
  ticket_id: 'number',
  name: 'string',
  date: 'string',
  problem: 'string',
  improve_idea: 'string',
  source_issue: 'string',
  input_needed_from: 'string',
  safety_issue: 'string',
  quadruple_aim_id: 'number',
  solution_outcome: 'string',
  category_id: 'number',
};

export const CelebrationTicketSchema = {
  c_ticket_id: 'number',
  i_ticket_id: 'number',
  department_id: 'number',
  date: 'string', // Assuming date is stored as string in ISO format (e.g., "2024-03-26")
  who_what: 'string',
  details: 'string',
  value_compassion: 'boolean',
  value_life: 'boolean',
  value_community: 'boolean',
  value_excellence: 'boolean',
  value_respect: 'boolean',
  value_responsibility: 'boolean',
};

export const CategorySchema = {
  category_id: 'number',
  category_name: 'string',
};

export const DepartmentSchema = {
  department_id: 'number',
  department_name: 'string',
  display_board: 'boolean',
};
