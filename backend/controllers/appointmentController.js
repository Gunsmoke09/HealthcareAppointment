const Appointment = require("../models/Appointment");

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAppointment = async (req, res) => {
  const { doctor, date, reason, status } = req.body;
  try {
    const appointment = await Appointment.create({
      userId: req.user.id,
      doctor,
      date,
      reason,
      status,
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAppointment = async (req, res) => {
  const { doctor, date, reason, status } = req.body;
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    appointment.doctor = doctor || appointment.doctor;
    appointment.date = date || appointment.date;
    appointment.reason = reason || appointment.reason;
    appointment.status = status || appointment.status;
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    await appointment.remove();
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAppointments, addAppointment, updateAppointment, deleteAppointment };
