import React from 'react';
import axios from '../utils/axiosConfig';
import PropertyForm from './PropertyForm';

const CreateProperty = () => {
  const addProperty = async (property) => {
    try {
      await axios.post('/api/properties', property, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      // Redirigir al usuario a la lista de propiedades
      window.location.href = '/properties';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Create Property</h1>
      <PropertyForm onAddProperty={addProperty} />
    </div>
  );
};

export default CreateProperty;