import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCar, updateCar } from '../services/CarsAPI';
import '../App.css';

const EditCar = () => {
  const [carData, setCarData] = useState({
    model: '',
    color: '',
    year: '',
    price: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const car = await getCar(id);
        setCarData(car);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch car details');
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

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
      await updateCar(id, carData);
      navigate(`/customcars/${id}`);
    } catch (err) {
      setError('Failed to update car');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-car">
      <h2>Edit Car</h2>
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
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default EditCar;