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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.visitDate || !formData.diagnosis) {
      alert('Visit date and diagnosis are required.');
      return;
    }
    if (isNaN(Date.parse(formData.visitDate))) {
      alert('Invalid date format.');
      return;
    }
    try {
      if (editingRecord) {
        const response = await axiosInstance.put(
          `/api/medical-records/${editingRecord._id}`,
          formData,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setRecords(records.map((rec) => (rec._id === response.data._id ? response.data : rec)));
      } else {
        const response = await axiosInstance.post('/api/medical-records', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRecords([...records, response.data]);
      }
      setEditingRecord(null);
      setFormData({ visitDate: '', diagnosis: '', prescription: '', notes: '' });
      alert('Record saved successfully.');
    } catch (error) {
      alert('Failed to save record.');
    }
  };
