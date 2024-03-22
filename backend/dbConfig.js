import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config(); // Load environment variables from .env file
const { DB_SERVER, DB_DATABASE, DB_DRIVER, DB_USERNAME, DB_PASSWORD } =
  process.env;

export const dbConfig = {
  server: DB_SERVER,
  database: DB_DATABASE,
  driver: DB_DRIVER,
  connectionString: `Server=${DB_SERVER};Database=${DB_DATABASE};Driver={SQL Server}`,
  options: {
    encrypt: true, // For SQL Server Azure
    trustServerCertificate: true, // For development only
  },
};

export const getConnection = async () => {
  try {
    const pool = sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Failed to connect to the database');
  }
};
export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // For SQL Server Azure
      trustServerCertificate: true, // For development only
    },
  },
});
