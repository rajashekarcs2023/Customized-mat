import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCars } from '../services/CarsAPI';
import '../App.css';

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchCars();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="view-cars">
      <h2>Custom Cars</h2>
      {cars.length === 0 ? (
        <p>No cars found. <Link to="/">Create a new car</Link></p>
      ) : (
        <ul className="car-list">
          {cars.map((car) => (
            <li key={car.id} className="car-item">
              <h3>{car.model} ({car.year})</h3>
              <p>Color: {car.color}</p>
              <p>Price: ${car.price}</p>
              <Link to={`/customcars/${car.id}`}>View Details</Link>
              <Link to={`/edit/${car.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewCars;