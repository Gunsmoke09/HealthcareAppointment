const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorId:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date:      { type: Date, required: true },   // calendar date
    time:      { type: String, required: true }, // "HH:MM"
    status:    { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
