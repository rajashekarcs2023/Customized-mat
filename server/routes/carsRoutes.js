import express from 'express';
import { getAllCars, getCar, createCar, updateCar, deleteCar } from '../controllers/carsController.js';

const router = express.Router();

router.get('/cars', getAllCars);
router.get('/cars/:id', getCar);
router.post('/cars', createCar);
router.put('/cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

export default router;