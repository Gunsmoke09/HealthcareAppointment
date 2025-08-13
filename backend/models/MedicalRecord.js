const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  visitDate: { type: Date, required: true },
  diagnosis: { type: String, required: true },
  prescription: { type: String },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);