const MedicalRecord = require('../models/MedicalRecord');

const getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ userId: req.user.id }).sort({ visitDate: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

