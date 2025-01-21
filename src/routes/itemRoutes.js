const express = require('express');
const Item = require('../models/item');
const router = express.Router();

// Add a new item
router.post('/', async (req, res) => {
  const { name, description, userId } = req.body;

  try {
    const newItem = new Item({ name, description, userId });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an item by ID
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;
  
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id, 
      { name, description },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an item by ID
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
