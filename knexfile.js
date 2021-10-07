require('dotenv').config();

module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'bills',
  },
  pool: { min: 10, max: 20 },
  requestTimeout: 120000,
  connectionTimeout: 120000,
 };
 