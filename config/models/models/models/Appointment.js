const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], required: true },
    time: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    service: { type: String, default: '' },
    note: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
