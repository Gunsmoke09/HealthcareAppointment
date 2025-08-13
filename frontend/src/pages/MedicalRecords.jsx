import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import MedicalRecordForm from '../components/MedicalRecordForm';
import MedicalRecordList from '../components/MedicalRecordList';
import { useAuth } from '../context/AuthContext';

const MedicalRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [searchDiagnosis, setSearchDiagnosis] = useState('');

  useEffect(() => {
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

  const filteredRecords = records.filter((rec) => {
    const matchesDate = searchDate ? rec.visitDate.startsWith(searchDate) : true;
    const matchesDiagnosis = searchDiagnosis
      ? rec.diagnosis.toLowerCase().includes(searchDiagnosis.toLowerCase())
      : true;
    return matchesDate && matchesDiagnosis;
  });

  return (
    <div className="container mx-auto p-6">
      <MedicalRecordForm
        records={records}
        setRecords={setRecords}
        editingRecord={editingRecord}
        setEditingRecord={setEditingRecord}
      />
            <div className="bg-white p-4 shadow-md rounded mb-6 flex flex-col md:flex-row md:items-center">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="mb-4 md:mb-0 md:mr-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Search Diagnosis"
          value={searchDiagnosis}
          onChange={(e) => setSearchDiagnosis(e.target.value)}
          className="p-2 border rounded"
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