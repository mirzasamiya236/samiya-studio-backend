const express = require('express');
const router = express.Router();
const CatalogItem = require('../models/CatalogItem');

router.get('/', async (req, res) => {
  try {
    const items = await CatalogItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, category, price, color } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const item = await CatalogItem.create({
      name,
      category: category || 'Bridal',
      price,
      color: color || '#e8356d',
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const item = await CatalogItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Catalog item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await CatalogItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Catalog item not found' });
    res.json({ message: 'Catalog item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
