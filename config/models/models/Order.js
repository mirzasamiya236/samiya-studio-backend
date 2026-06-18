const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    orderRef: { type: String, required: true, unique: true },
    client: { type: String, required: true, trim: true },
    item: { type: String, default: '' },
    due: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'progress', 'done'], default: 'pending' },
    amount: { type: String, default: 'PKR 0' },
    initials: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
