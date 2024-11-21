const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  location: { type: String, required: true },
  images: [{ type: String }],
}, {
  timestamps: true,
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;