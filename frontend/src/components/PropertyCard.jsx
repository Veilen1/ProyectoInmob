import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel

const PropertyCard = ({ property, onDeleteProperty, role, userId }) => {
  const handleDelete = () => {
    onDeleteProperty(property._id);
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg m-4 p-4 bg-white w-64">
      <Carousel showThumbs={false} className="property-carousel">
        {property.images.map((image, index) => (
          <div key={index} className="h-40 overflow-hidden">
            <img src={image} alt={`Property ${index + 1}`} className="object-contain w-full h-full rounded-lg" />
          </div>
        ))}
      </Carousel>
      <div className="p-4">
        <h5 className="text-lg font-bold mb-2">{property.title}</h5>
        <p className="text-sm mb-2">{property.description}</p>
        <p className="text-sm mb-2"><strong>Price:</strong> ${property.price}</p>
        <p className="text-sm mb-2"><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p className="text-sm mb-2"><strong>Bathrooms:</strong> {property.bathrooms}</p>
        <p className="text-sm mb-2"><strong>Location:</strong> {property.location}</p>
        {(role === 'admin' || (role === 'inmobiliario' && property.user && property.user._id === userId)) && (
          <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 text-sm" onClick={handleDelete}>Delete</button>
        )}
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
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
  onDeleteProperty: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default PropertyCard;