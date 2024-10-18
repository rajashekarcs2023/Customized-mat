import express from 'express';
import { getAllCars, getCar, createCar, updateCar, deleteCar } from '../controllers/carsController.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('GET request to /api/cars');
  getAllCars(req, res, next);
});

router.get('/:id', (req, res, next) => {
  console.log(`GET request to /api/cars/${req.params.id}`);
  getCar(req, res, next);
});

router.post('/', (req, res, next) => {
  console.log('POST request to /api/cars');
  console.log('Request body:', req.body);
  createCar(req, res, next);
});

router.put('/:id', (req, res, next) => {
  console.log(`PUT request to /api/cars/${req.params.id}`);
  updateCar(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  console.log(`DELETE request to /api/cars/${req.params.id}`);
  deleteCar(req, res, next);
});

export default router;