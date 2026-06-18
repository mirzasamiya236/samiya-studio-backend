const mongoose = require('mongoose');

const CatalogItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, enum: ['Bridal', 'Formal', 'Pret', 'Kids'], default: 'Bridal' },
    price: { type: String, default: '' },
    color: { type: String, default: '#e8356d' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CatalogItem', CatalogItemSchema);
