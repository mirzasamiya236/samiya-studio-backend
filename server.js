require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const clientsRoutes = require('./routes/clients');
const ordersRoutes = require('./routes/orders');
const appointmentsRoutes = require('./routes/appointments');
const catalogRoutes = require('./routes/catalog');

const app = express();

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Samiya Studio API is running' });
});

app.use('/api/clients', clientsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/catalog', catalogRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
