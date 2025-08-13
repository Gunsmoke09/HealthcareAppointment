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

  return (
    <div>
      {records.map((rec) => (
        <div key={rec._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <p className="font-bold">Date: {new Date(rec.visitDate).toLocaleDateString()}</p>
          <p>Diagnosis: {rec.diagnosis}</p>
          {rec.prescription && <p>Prescription: {rec.prescription}</p>}
          {rec.notes && <p>Notes: {rec.notes}</p>}
          <div className="mt-2">
            <button
              onClick={() => setEditingRecord(rec)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(rec._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicalRecordList;