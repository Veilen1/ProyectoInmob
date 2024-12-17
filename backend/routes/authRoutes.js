import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Registrar un nuevo usuario
router.post('/register', registerUser);

// Iniciar sesión
router.post('/login', (req, res, next) => {
    console.log('Received login request:', req.body);
    next();
  }, loginUser);

// Obtener información del usuario autenticado
router.get('/me', auth, getMe);

export default router;