import { getProperties, createProperty, deleteProperty } from '../controllers/propertyController.js';

export default function handler(req, res) {
  const { method, url } = req;

  if (url === '/' && method === 'GET') {
    return getProperties(req, res);
  } else if (url === '/' && method === 'POST') {
    return createProperty(req, res);
  } else if (url.startsWith('/') && method === 'DELETE') {
    const id = url.split('/').pop(); // Extrae el ID de la URL
    req.params = { id }; // Simula un parámetro para el controlador
    return deleteProperty(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
