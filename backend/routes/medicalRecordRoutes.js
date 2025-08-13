const express = require('express');
const {
  getMedicalRecords,
  addMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require('../controllers/medicalRecordController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getMedicalRecords)
  .post(protect, addMedicalRecord);

router.route('/:id')
  .put(protect, updateMedicalRecord)
  .delete(protect, deleteMedicalRecord);

module.exports = router;