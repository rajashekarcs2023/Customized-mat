import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCar } from '../services/CarsAPI';
import '../App.css';

const CreateCar = () => {
  const [carData, setCarData] = useState({
    model: '',
    color: '',
    year: '',
    price: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCar(carData);
      navigate('/customcars');
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  return (
    <div className="create-car">
      <h2>Create a Custom Car</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            name="model"
            value={carData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={carData.color}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={carData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={carData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Car</button>
      </form>
    </div>
  );
};

export default CreateCar;