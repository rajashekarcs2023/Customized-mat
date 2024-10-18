import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';
import cors from 'cors';
import carsRoutes from './routes/carsRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')));
} else if (process.env.NODE_ENV === 'production') {
  app.use(favicon(path.resolve('public', 'lightning.png')));
  app.use(express.static('public'));
}

app.use('/api', carsRoutes);

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (_, res) =>
    res.sendFile(path.resolve('public', 'index.html'))
  );
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});