import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Slider from 'react-slick';

const PropertyCard = ({ property, onDeleteProperty }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300'; // URL de una imagen de reemplazo
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/properties/${property._id}`);
      onDeleteProperty(property._id);
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [property.images.length]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current, next) => setCurrentImageIndex(next),
  };

  return (
    <div className="card">
      <Slider {...settings}>
        {property.images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={property.title}
              onError={handleImageError}
              className="card-img"
            />
          </div>
        ))}
      </Slider>
      <div className="card-body">
        <h5 className="card-title">{property.title}</h5>
        <p className="card-text">{property.description}</p>
        <p className="card-text"><strong>Price:</strong> ${property.price}</p>
        <p className="card-text"><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p className="card-text"><strong>Bathrooms:</strong> {property.bathrooms}</p>
        <p className="card-text"><strong>Location:</strong> {property.location}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteProperty: PropTypes.func.isRequired,
};

export default PropertyCard;