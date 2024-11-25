import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const getProperties = async () => {
  try {
    const response = await axios.get(`${API_URL}/properties`);
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const createProperty = async (property) => {
  try {
    const response = await axios.post(`${API_URL}/properties`, property);
    return response.data;
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
};