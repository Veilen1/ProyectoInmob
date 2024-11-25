import express from 'express';
import { getProperties, createProperty, deleteProperty } from '../controllers/propertyController.js';

const router = express.Router();

router.route('/').get(getProperties).post(createProperty);
router.route('/:id').delete(deleteProperty);

export default router;