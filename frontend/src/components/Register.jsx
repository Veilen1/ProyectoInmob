import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosConfig';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('invitado');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('api/auth/register', { username, email, password, role });
      // Redirigir al usuario a la página de login
      window.location.href = '/login';
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="invitado">Invitado</option>
          <option value="inmobiliario">Inmobiliario</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Register
        </button>
        <p className="mt-4 text-center">
          Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Inicia sesión acá
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;