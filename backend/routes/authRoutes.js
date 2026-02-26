import express from 'express';
import { loginUser, registerUser, getMe, logoutUser } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Iniciar sesión
router.post('/login', (req, res, next) => {
    console.log('Received login request:', req.body);
    next();
  }, loginUser);

// Registrar un nuevo usuario
router.post('/register', registerUser);

// Obtener información del usuario autenticado
router.get('/me', auth, getMe);

// Cerrar sesión
router.post('/logout', logoutUser);

export default router;