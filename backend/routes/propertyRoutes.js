import express from 'express';
import { getProperties, createProperty, deleteProperty } from '../controllers/propertyController.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// Obtener todas las propiedades
router.get('/', getProperties);

// Crear una nueva propiedad
router.post('/', auth, authorize(['admin', 'inmobiliario']), createProperty);

// Eliminar una propiedad
router.delete('/:id', auth, authorize(['admin', 'inmobiliario']), deleteProperty);

export default router;