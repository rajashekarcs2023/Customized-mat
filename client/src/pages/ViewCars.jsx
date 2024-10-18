import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCars, deleteCar } from '../services/CarsAPI';
import '../App.css';

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const carsData = await getAllCars();
      setCars(carsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cars');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(id);
        fetchCars(); // Refresh the list after deletion
      } catch (err) {
        setError('Failed to delete car');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="view-cars">
      <h2>Custom Cars</h2>
      {cars.length === 0 ? (
        <p>No cars found. <button onClick={() => navigate('/')}>Create a new car</button></p>
      ) : (
        <ul className="car-list">
          {cars.map((car) => (
            <li key={car.id} className="car-item">
              <h3>{car.model} ({car.year})</h3>
              <p>Color: {car.color}</p>
              <p>Price: ${car.price}</p>
              <button onClick={() => navigate(`/customcars/${car.id}`)}>View Details</button>
              <button onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
              <button onClick={() => handleDelete(car.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/')}>Back to Create Car</button>
    </div>
  );
};

export default ViewCars;