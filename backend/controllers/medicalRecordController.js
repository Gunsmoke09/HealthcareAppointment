const MedicalRecord = require('../models/MedicalRecord');

const getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMedicalRecord = async (req, res) => {
    const { patientName, dob, gender, medicalHistory, reasonForVisit } = req.body;
    try {
      const record = await MedicalRecord.create({
        userId: req.user.id,
        patientName,
        dob,
        gender,
        medicalHistory,
        reasonForVisit,
      });
      res.status(201).json(record);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const updateMedicalRecord = async (req, res) => {
    const { patientName, dob, gender, medicalHistory, reasonForVisit } = req.body;
    try {
      const record = await MedicalRecord.findById(req.params.id);
      if (!record) return res.status(404).json({ message: 'Medical record not found' });
      record.patientName = patientName || record.patientName;
      record.dob = dob || record.dob;
      record.gender = gender || record.gender;
      record.medicalHistory = medicalHistory || record.medicalHistory;
      record.reasonForVisit = reasonForVisit || record.reasonForVisit;
      const updatedRecord = await record.save();
      res.json(updatedRecord);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteMedicalRecord = async (req, res) => {
    try {
      const record = await MedicalRecord.findById(req.params.id);
      if (!record) return res.status(404).json({ message: 'Medical record not found' });
      await record.remove();
      res.json({ message: 'Medical record deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getMedicalRecords,
    addMedicalRecord,
    updateMedicalRecord,
    deleteMedicalRecord,
  };