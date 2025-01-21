const Item = require('../models/Item');

// Add Item
const addItem = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    const item = await Item.create({
      name,
      description,
      user: req.user._id,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user._id });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Item
const updateItem = async (req, res) => {
  try {
    const { name, description } = req.body;

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this item' });
    }

    item.name = name || item.name;
    item.description = description || item.description;

    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this item' });
    }

    await item.remove();
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addItem, getAllItems, updateItem, deleteItem };
