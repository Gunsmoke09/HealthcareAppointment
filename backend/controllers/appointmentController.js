const Appointment = require("../models/Appointment");
const User = require("../models/User");

const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const patientId = req.user.id; // set by protect middleware

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: "doctorId, date, and time are required" });
    }

    const doctor = await User.findById(doctorId);
    if (!doctor) return res.status(400).json({ message: "Doctor not found" });

    const isoDate = new Date(date);
    const appointment = new Appointment({ patientId, doctorId, date: isoDate, time });
    await appointment.save();

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createAppointment };
