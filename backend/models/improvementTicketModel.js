// // Import Sequelize and define your models
// import { DataTypes } from 'sequelize';
// import { sequelize } from '../dbConfig.js'; // Import your Sequelize instance

// // Define the DEPARTMENTS model
// export const Department = sequelize.define(
//   'Department',
//   {
//     department_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: true,
//     },
//     department_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     display_board: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//   },
//   { tableName: 'DEPARTMENTS' }
// );

// // Define the CATEGORIES model
// export const Category = sequelize.define('Category', {
//   category_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//   },
//   category_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// // Define the IMPROVEMENT_TICKETS model
// export const ImprovementTicket = sequelize.define(
//   'ImprovementTicket',
//   {
//     ticket_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     problem: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     improve_idea: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     improve_how: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     safety_ohs: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     safety_patient: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     aim_patient_family: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     aim_outcome: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     aim_provider: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     aim_value_efficiency: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     input_patient_family: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     input_community_partner: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     category_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'Category',
//         key: 'category_id',
//       },
//     },
//   },
//   {
//     tableName: 'IMPROVEMENT_TICKETS', // Specify the actual table name here
//   }
// );

// // Define the CELEBRATION_TICKET model
// export const CelebrationTicket = sequelize.define('CelebrationTicket', {
//   c_ticket_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//   },
//   i_ticket_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'ImprovementTicket',
//       key: 'ticket_id',
//     },
//   },
//   department_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'Department',
//       key: 'department_id',
//     },
//   },
//   date: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   who_what: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   details: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
// });

// // Define the TICKET_UPDATES model
// export const TicketUpdate = sequelize.define('TicketUpdate', {
//   update_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//   },
//   i_ticket_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'ImprovementTicket',
//       key: 'ticket_id',
//     },
//   },
//   date: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   update_note: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   owner: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// // Define the IMPROVEMENT_DEPARTMENT model
// export const ImprovementDepartment = sequelize.define('ImprovementDepartment', {
//   ticket_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'ImprovementTicket',
//       key: 'ticket_id',
//     },
//   },
//   department_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'Department',
//       key: 'department_id',
//     },
//   },
//   display_ticket: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//   },
// });
