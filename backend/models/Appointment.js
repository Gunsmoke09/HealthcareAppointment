const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:      { type: Date, required: true },     // store the date 
  time:      { type: String, required: true },   // store the time in HH:MM format
  status:    { type: String, default: 'pending' } // pending / confirmed / cancelled
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
