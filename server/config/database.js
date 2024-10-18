import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from the parent directory of the current file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

console.log('Environment variables:');
console.log('PGUSER:', process.env.PGUSER);
console.log('PGHOST:', process.env.PGHOST);
console.log('PGPORT:', process.env.PGPORT);
console.log('PGDATABASE:', process.env.PGDATABASE);
console.log('PGPASSWORD:', process.env.PGPASSWORD ? '[REDACTED]' : 'undefined');

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false
  }
};

export const pool = new pg.Pool(config);

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
    console.error('Database connection details:', {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      database: process.env.PGDATABASE
    });
  } else {
    client.query('SELECT NOW()', (err, result) => {
      release();
      if (err) {
        console.error('Error executing query', err.stack);
      } else {
        console.log('Successfully connected to the database');
        console.log('Current time from database:', result.rows[0].now);
      }
    });
  }
});