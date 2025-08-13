import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const MedicalRecordList = ({ records, setRecords, setEditingRecord }) => {
  const { user } = useAuth();

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await axiosInstance.delete(`/api/medical-records/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setRecords(records.filter((rec) => rec._id !== id));
    } catch (error) {
      alert('Failed to delete record.');
    }
  };