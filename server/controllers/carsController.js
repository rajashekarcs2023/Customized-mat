import { pool } from '../config/database.js';

export const getAllCars = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCar = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCar = async (req, res) => {
  console.log('createCar function called');
  console.log('Request body:', req.body);
  const { model, color, year, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cars (model, color, year, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [model, color, year, price]
    );
    console.log('Car created successfully:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: error.message });
  }
};


export const updateCar = async (req, res) => {
  const { id } = req.params;
  const { model, color, year, price } = req.body;
  try {
    const result = await pool.query(
      'UPDATE cars SET model = $1, color = $2, year = $3, price = $4 WHERE id = $5 RETURNING *',
      [model, color, year, price, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};