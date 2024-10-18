import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';
import cors from 'cors';
import carsRoutes from './routes/carsRoutes.js';
import { pool } from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(favicon(path.join(__dirname, '..', 'client', 'public', 'lightning.png')));
} else if (process.env.NODE_ENV === 'production') {
  app.use(favicon(path.join(__dirname, 'public', 'lightning.png')));
  app.use(express.static('public'));
}

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Change this line
app.use('/cars', carsRoutes);

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Connected to Database. Current time:', result.rows[0].now);
  });
});

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});