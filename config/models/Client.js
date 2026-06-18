const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, default: '' },
    city: { type: String, default: '' },
    orders: { type: Number, default: 0 },
    spent: { type: String, default: 'PKR 0' },
    status: { type: String, enum: ['done', 'progress', 'new'], default: 'new' },
    initials: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', ClientSchema);
