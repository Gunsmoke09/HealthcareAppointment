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

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingRecord ? 'Edit Medical Record' : 'Add Medical Record'}</h1>
      <input
        type="date"
        value={formData.visitDate}
        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Diagnosis"
        value={formData.diagnosis}
        onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Prescription"
        value={formData.prescription}
        onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Notes"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingRecord ? 'Update Record' : 'Add Record'}
      </button>
    </form>
  );
};

export default MedicalRecordForm;