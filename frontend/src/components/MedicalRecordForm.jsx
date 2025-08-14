import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const historyOptions = ['cancer','heart disease','hypertension','diabetic','other','none'];

const MedicalRecordForm = ({ records, setRecords, editingRecord, setEditingRecord }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    patientName: '',
    dob: '',
    gender: '',
    medicalHistory: [],
    reasonForVisit: '',
  });

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        patientName: editingRecord.patientName,
        dob: editingRecord.dob ? editingRecord.dob.substring(0,10) : '',
        gender: editingRecord.gender,
        medicalHistory: editingRecord.medicalHistory || [],
        reasonForVisit: editingRecord.reasonForVisit,
      });
    } else {
      setFormData({ patientName: '', dob: '', gender: '', medicalHistory: [], reasonForVisit: '' });
    }
  }, [editingRecord]);

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, medicalHistory: [...formData.medicalHistory, value] });
    } else {
      setFormData({ ...formData, medicalHistory: formData.medicalHistory.filter((item) => item !== value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.dob || !formData.gender) {
      alert('Patient name, DOB, and gender are required.');
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
      setFormData({ patientName: '', dob: '', gender: '', medicalHistory: [], reasonForVisit: '' });
      alert('Record saved successfully.');
    } catch (error) {
      alert('Failed to save record.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-pink-50 p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4 text-pink-700">Patient Information</h1>
      <input
        type="text"
        placeholder="Patient Name"
        value={formData.patientName}
        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
        className="w-full mb-4 p-2 border border-pink-300 rounded"
      />
      <input
        type="date"
        value={formData.dob}
        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        className="w-full mb-4 p-2 border border-pink-300 rounded"
      />
            <div className="mb-4">
        <span className="mr-4 text-pink-700">Gender:</span>
        {['Male', 'Female', 'Other'].map((g) => (
          <label key={g} className="mr-4">
            <input
              type="radio"
              name="gender"
              value={g}
              checked={formData.gender === g}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="mr-1"
            />
            {g}
          </label>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-2 text-pink-700">Medical History</h2>
      <div className="mb-4 grid grid-cols-2 gap-2">
        {historyOptions.map((opt) => (
          <label key={opt} className="flex items-center">
            <input
              type="checkbox"
              value={opt}
              checked={formData.medicalHistory.includes(opt)}
              onChange={handleCheckbox}
              className="mr-2"
            />
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </label>
        ))}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-pink-700">Reason for visit</h3>
      <textarea
        placeholder="Reason for visit"
        value={formData.reasonForVisit}
        onChange={(e) => setFormData({ ...formData, reasonForVisit: e.target.value })}
        className="w-full mb-4 p-2 border border-pink-300 rounded"
      />
      <button type="submit" className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700">
        {editingRecord ? 'Update Record' : 'Add Record'}
      </button>
    </form>
  );
};

export default MedicalRecordForm;