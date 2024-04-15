import dotenv from 'dotenv';
import sql from 'mssql/msnodesqlv8.js';

dotenv.config(); // Load environment variables from .env file
const { DB_SERVER, DB_DATABASE, DB_DRIVER } = process.env;

/** Windows Authentication
 * Database configuration for SQL Server using mssql/msnodesqlv8 driver.
 */
export const dbConfig = {
  server: DB_SERVER,
  database: DB_DATABASE,
  driver: DB_DRIVER,
  connectionString: `Server=.;Database=${DB_DATABASE};Driver={SQL Server}`,
  connectionTimeout: 30000,
  options: {
    encrypt: true, // For SQL Server Azure
    trustServerCertificate: true, // For development only
  },
};

/** SQL Server Authentication
 * Database configuration for SQL Server using mssql/msnodesqlv8 driver.
 */
// export const dbConfig = {
//   server: DB_SERVER,
//   database: DB_DATABASE,
//   driver: DB_DRIVER,
//   username: DB_USERNAME,
//   password: DB_PASSWORD,
//   connectionString: `Server=${DB_SERVER};Database=${DB_DATABASE};User ID=${DB_USERNAME};Password=${DB_PASSWORD};Driver=${DB_DRIVER}`,
//   connectionTimeout: 30000,
//   options: {
//     encrypt: true, // For SQL Server Azure
//     trustServerCertificate: true, // For development only
//   },
// };

/**
 * Establishes a connection to the database using the configured dbConfig.
 * Returns a pool object for executing queries.
 */
export const getConnection = async () => {
  try {
    const pool = sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Failed to connect to the database');
  }
};
