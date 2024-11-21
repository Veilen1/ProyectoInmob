import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const getProperties = async () => {
  const response = await axios.get(`${API_URL}/properties`);
  return response.data;
};