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