import Property from '../models/Property.js';

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties' });
  }
};

export const createProperty = async (req, res) => {
  try {
    const { title, description, price, bedrooms, bathrooms, location, images } = req.body;
    const property = new Property({ title, description, price, bedrooms, bathrooms, location, images });
    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property' });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    await Property.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property' });
  }
};