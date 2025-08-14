const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  medicalHistory: [{ type: String }],
  reasonForVisit: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);