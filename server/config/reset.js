import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from the current directory
dotenv.config({ path: path.join(__dirname, '.env') });

const createTablesQuery = `
  DROP TABLE IF EXISTS cars;

  CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    color VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

async function resetDatabase() {
  try {
    await pool.query(createTablesQuery);
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating database tables:', error);
  } finally {
    await pool.end();
  }
}

resetDatabase();