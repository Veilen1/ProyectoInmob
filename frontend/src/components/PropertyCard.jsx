import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AuthContext from '../context/AuthContext';
import axios from '../utils/axiosConfig';

const PropertyCard = ({ property, onDeleteProperty, onEditProperty }) => {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: property.title,
    description: property.description,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    location: property.location,
    images: property.images.join(', '),
  });

  const isOwner = property.user && property.user._id === user?._id;
  const isAdmin = user?.role === 'admin';
  const canEdit = isAdmin || (user?.role === 'inmobiliario' && isOwner);
  const canDelete = isAdmin || (user?.role === 'inmobiliario' && isOwner);

  const handleDelete = () => {
    if (window.confirm('¿Seguro que querés eliminar esta propiedad?')) {
      onDeleteProperty(property._id);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`/api/properties/${property._id}`, {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        images: form.images.split(',').map((s) => s.trim()),
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onEditProperty(res.data);
      setEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Error al editar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-slate-600 transition-all duration-300 w-full max-w-sm">
      {/* Carousel */}
      <div className="h-48 bg-slate-900 overflow-hidden">
        {property.images.length > 0 ? (
          <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay interval={4000} className="h-full">
            {property.images.map((image, index) => (
              <div key={index} className="h-48">
                <img src={image} alt={`Imagen ${index + 1}`} className="w-full h-48 object-cover" />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {!editing ? (
          <>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-white font-bold text-lg leading-tight">{property.title}</h3>
              <span className="text-blue-400 font-bold text-lg whitespace-nowrap ml-2">
                ${property.price.toLocaleString()}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{property.description}</p>
            <div className="flex items-center gap-4 text-slate-400 text-sm mb-3">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                {property.bedrooms} dorm.
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v16a2 2 0 002 2z" />
                </svg>
                {property.bathrooms} baños
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-sm mb-4">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{property.location}</span>
            </div>

            {/* Actions */}
            {(canEdit || canDelete) && (
              <div className="flex gap-2 pt-3 border-t border-slate-700">
                {canEdit && (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 rounded-lg text-sm font-medium transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={handleDelete}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 rounded-lg text-sm font-medium transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          /* Edit form inline */
          <form onSubmit={handleEditSubmit} className="space-y-3">
            <h3 className="text-white font-bold text-base mb-3">Editar propiedad</h3>
            {[
              { label: 'Título', key: 'title', type: 'text' },
              { label: 'Descripción', key: 'description', type: 'text' },
              { label: 'Precio', key: 'price', type: 'number' },
              { label: 'Dormitorios', key: 'bedrooms', type: 'number' },
              { label: 'Baños', key: 'bathrooms', type: 'number' },
              { label: 'Ubicación', key: 'location', type: 'text' },
              { label: 'Imágenes (URLs separadas por coma)', key: 'images', type: 'text' },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-xs text-slate-400 mb-1">{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium rounded-lg transition"
              >
                Cancelar
              </button>
            </div>
          </form>
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
      _id: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
  onDeleteProperty: PropTypes.func.isRequired,
  onEditProperty: PropTypes.func.isRequired,
};

export default PropertyCard;
