const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

const makeInitials = (name = '') =>
  name.split(' ').filter(Boolean).map((w) => w[0]).join('').toUpperCase().slice(0, 2);

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { client, item, due, amount, status } = req.body;
    if (!client) return res.status(400).json({ error: 'Client name is required' });
    const count = await Order.countDocuments();
    const orderRef = 'ORD-' + String(count + 1).padStart(3, '0');
    const order = await Order.create({
      orderRef, client, item, due,
      amount: amount || 'PKR 0',
      status: status || 'pending',
      initials: makeInitials(client),
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.client) updates.initials = makeInitials(updates.client);
    const order = await Order.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
