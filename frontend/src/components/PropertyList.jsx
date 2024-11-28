import React, { useState, useEffect, useContext } from 'react';
import axios from '../utils/axiosConfig';
import PropertyCard from './PropertyCard';
import AuthContext from '../context/AuthContext';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('/api/properties');
        setProperties(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/properties/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setProperties(properties.filter(property => property._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Properties</h1>
      <div className="flex flex-wrap justify-around">
        {properties.map(property => (
          <PropertyCard key={property._id} property={property} onDeleteProperty={handleDelete} role={user?.role} userId={user?._id} />
        ))}
      </div>
      {user?.role === 'admin' || user?.role === 'inmobiliario' ? (
        <div className="mt-4">
          <a href="/create-property" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Add Property</a>
        </div>
      ) : null}
    </div>
  );
};

export default PropertyList;