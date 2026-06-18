const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

const makeInitials = (name = '') =>
  name.split(' ').filter(Boolean).map((w) => w[0]).join('').toUpperCase().slice(0, 2);

router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, phone, city, status, orders, spent } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const client = await Client.create({
      name, phone, city,
      status: status || 'new',
      orders: orders || 0,
      spent: spent || 'PKR 0',
      initials: makeInitials(name),
    });
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.name) updates.initials = makeInitials(updates.name);
    const client = await Client.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
