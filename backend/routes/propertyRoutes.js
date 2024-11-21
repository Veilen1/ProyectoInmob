const express = require('express');
const { getProperties, createProperty, deleteProperty } = require('../controllers/propertyController');
const router = express.Router();

router.route('/').get(getProperties).post(createProperty);
router.route('/:id').delete(deleteProperty);

module.exports = router;