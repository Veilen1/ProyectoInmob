const Property = require('../models/Property');

const getProperties = async (req, res) => {
  const properties = await Property.find({});
  res.json(properties);
};

const createProperty = async (req, res) => {
  const { title, description, price, bedrooms, bathrooms, location, images } = req.body;
  const property = new Property({ title, description, price, bedrooms, bathrooms, location, images });
  const createdProperty = await property.save();
  res.status(201).json(createdProperty);
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  await Property.findByIdAndDelete(id);
  res.status(204).send();
};

module.exports = { getProperties, createProperty, deleteProperty };