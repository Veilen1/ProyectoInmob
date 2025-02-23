import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PropertyForm = ({ onAddProperty }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const property = { title, description, price, bedrooms, bathrooms, location, images: images.split(',') };
    onAddProperty(property);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Bedrooms:</label>
        <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} required />
      </div>
      <div>
        <label>Bathrooms:</label>
        <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} required />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>
      <div>
        <label>Images (comma separated URLs):</label>
        <input type="text" value={images} onChange={(e) => setImages(e.target.value)} required />
      </div>
      <button type="submit">Add Property</button>
    </form>
  );
};

PropertyForm.propTypes = {
  onAddProperty: PropTypes.func.isRequired,
};

export default PropertyForm;