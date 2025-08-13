import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const MedicalRecordForm = ({ records, setRecords, editingRecord, setEditingRecord }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    visitDate: '',
    diagnosis: '',
    prescription: '',
    notes: '',
  });

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        visitDate: editingRecord.visitDate,
        diagnosis: editingRecord.diagnosis,
        prescription: editingRecord.prescription,
        notes: editingRecord.notes,
      });
    } else {
      setFormData({ visitDate: '', diagnosis: '', prescription: '', notes: '' });
    }
  }, [editingRecord]);
