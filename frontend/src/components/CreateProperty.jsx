import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';

const CreateProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
    images: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/properties', {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        images: form.images.split(',').map((s) => s.trim()),
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/properties');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la propiedad');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'title', label: 'Título', type: 'text', placeholder: 'Casa en Palermo', col: 'full' },
    { name: 'price', label: 'Precio (USD)', type: 'number', placeholder: '150000', col: 'half' },
    { name: 'location', label: 'Ubicación', type: 'text', placeholder: 'Buenos Aires, Argentina', col: 'half' },
    { name: 'bedrooms', label: 'Dormitorios', type: 'number', placeholder: '3', col: 'half' },
    { name: 'bathrooms', label: 'Baños', type: 'number', placeholder: '2', col: 'half' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/properties')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-6 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a propiedades
          </button>
          <h1 className="text-3xl font-bold text-white">Nueva propiedad</h1>
          <p className="text-slate-400 mt-1">Completá los datos de la propiedad a publicar</p>
        </div>

        {/* Form card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
              <svg className="w-4 h-4 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map(({ name, label, type, placeholder, col }) => (
                <div key={name} className={col === 'full' ? 'sm:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    min={type === 'number' ? '0' : undefined}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              ))}

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Descripción</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Hermosa propiedad con jardín y piscina..."
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                />
              </div>

              {/* Images */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Imágenes
                  <span className="text-slate-500 font-normal ml-2">URLs separadas por coma</span>
                </label>
                <input
                  type="text"
                  name="images"
                  value={form.images}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/img1.jpg, https://ejemplo.com/img2.jpg"
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium rounded-xl transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Publicando...
                  </>
                ) : 'Publicar propiedad'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProperty;
