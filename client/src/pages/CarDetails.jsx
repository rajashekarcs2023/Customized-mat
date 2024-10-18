import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCar, deleteCar } from '../services/CarsAPI';
import '../App.css';

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCar(id);
        setCar(carData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch car details');
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(id);
        navigate('/customcars');
      } catch (err) {
        setError('Failed to delete car');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!car) return <div>Car not found</div>;

  return (
    <div className="car-details">
      <h2>{car.model} ({car.year})</h2>
      <p>Color: {car.color}</p>
      <p>Price: ${car.price}</p>
      <Link to={`/edit/${car.id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
      <Link to="/customcars">Back to All Cars</Link>
    </div>
  );
};

export default CarDetails;