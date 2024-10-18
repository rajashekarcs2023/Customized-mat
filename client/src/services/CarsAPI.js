import axios from 'axios';

// For Vite, we use /api as the base URL. Vite will proxy these requests to your backend server.
const API_URL = '/api/cars';

export const getAllCars = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCar = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCar = async (carData) => {
  const response = await axios.post(API_URL, carData);
  return response.data;
};

export const updateCar = async (id, carData) => {
  const response = await axios.put(`${API_URL}/${id}`, carData);
  return response.data;
};

export const deleteCar = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};