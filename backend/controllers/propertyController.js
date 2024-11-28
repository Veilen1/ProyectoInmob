import Property from '../models/Property.js';

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).populate('user', 'username email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties' });
  }
};

export const createProperty = async (req, res) => {
  try {
    const { title, description, price, bedrooms, bathrooms, location, images } = req.body;
    const property = new Property({ title, description, price, bedrooms, bathrooms, location, images, user: req.user.id });
    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property' });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (!req.user || !req.user.id || !req.user.role) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!property.user) {
      return res.status(500).json({ message: 'Property does not have an associated user' });
    }

    if (property.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'User not authorized' });
    }

    await Property.deleteOne({ _id: id });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
};