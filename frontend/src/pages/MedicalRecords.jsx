import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import MedicalRecordForm from '../components/MedicalRecordForm';
import MedicalRecordList from '../components/MedicalRecordList';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const MedicalRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchReason, setSearchReason] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchRecords = async () => {
      try {
        const response = await axiosInstance.get('/api/medical-records', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRecords(response.data);
      } catch (error) {
        alert('Failed to fetch records.');
      }
    };
    fetchRecords();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const filteredRecords = records.filter((rec) => {
    const matchesName = searchName
      ? rec.patientName.toLowerCase().includes(searchName.toLowerCase())
      : true;
    const matchesReason = searchReason
      ? rec.reasonForVisit.toLowerCase().includes(searchReason.toLowerCase())
      : true;
    return matchesName && matchesReason;
  });

  return (
    <div className="container mx-auto p-6">
      <MedicalRecordForm
        records={records}
        setRecords={setRecords}
        editingRecord={editingRecord}
        setEditingRecord={setEditingRecord}
      />
      <div className="bg-pink-50 p-4 shadow-md rounded mb-6 flex flex-col md:flex-row md:items-center">
        <input
          type="text"
          placeholder="Search Patient"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="mb-4 md:mb-0 md:mr-4 p-2 border border-pink-300 rounded"
        />
        <input
          type="text"
          placeholder="Search Reason"
          value={searchReason}
          onChange={(e) => setSearchReason(e.target.value)}
          className="p-2 border border-pink-300 rounded"
        />
      </div>
      <MedicalRecordList
        records={filteredRecords}
        setRecords={setRecords}
        setEditingRecord={setEditingRecord}
      />
    </div>
  );
};

export default MedicalRecords;
