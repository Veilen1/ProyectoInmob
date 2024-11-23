import { useEffect, useState } from 'react';
import { getProperties } from '../api/propertyApi.js';
import PropertyCard from './PropertyCard';
import PropertyForm from './PropertyForm';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleAddProperty = (newProperty) => {
    setProperties([...properties, newProperty]);
  };

  const handleDeleteProperty = (id) => {
    setProperties(properties.filter(property => property._id !== id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <PropertyForm onAddProperty={handleAddProperty} />
      <div className="property-list">
        {properties.map(property => (
          <PropertyCard key={property._id} property={property} onDeleteProperty={handleDeleteProperty} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;