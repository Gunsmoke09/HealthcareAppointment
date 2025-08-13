const MedicalRecord = require('../models/MedicalRecord');

const getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ userId: req.user.id }).sort({ visitDate: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMedicalRecord = async (req, res) => {
    const { visitDate, diagnosis, prescription, notes } = req.body;
    try {
      const record = await MedicalRecord.create({
        userId: req.user.id,
        visitDate,
        diagnosis,
        prescription,
        notes,
      });
      res.status(201).json(record);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };