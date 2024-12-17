import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/axiosConfig'; // Asegúrate de tener una instancia de Axios configurada

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('api/auth/me'); // Usa la instancia de Axios configurada
          setUser(res.data);
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('api/auth/login', { email, password }); // Usa la instancia de Axios configurada
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.error('Login error:', err);
      throw err; // Re-throw the error to handle it in the component
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;