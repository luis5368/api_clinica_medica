import knex from 'knex';
import config from './knexfile';
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

// Se separa el host y la instancia si existe
const [server, instanceName] = process.env.DB_HOST?.split('\\') || [];

// Configuración para MSSQL
const dbConfig: sql.config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  server: server || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_NAME!,
  options: {
    trustServerCertificate: true,
    encrypt: false,
    ...(instanceName && { instanceName }),
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
};

// Exporta la promesa de conexión
export const poolPromise = sql.connect(dbConfig);
