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
// This component displays a list of medical records with options to edit or delete each record.
  return (
    <div>
      {records.map((rec) => (        
        <div key={rec._id} className="bg-pink-100 p-4 mb-4 rounded shadow">
          <p className="font-bold">Patient: {rec.patientName}</p>
          <p>DOB: {new Date(rec.dob).toLocaleDateString()}</p>
          <p>Gender: {rec.gender}</p>
          {rec.medicalHistory && rec.medicalHistory.length > 0 && (
            <p>History: {rec.medicalHistory.join(', ')}</p>
          )}
          <p>Reason: {rec.reasonForVisit}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingRecord(rec)}
              className="mr-2 bg-pink-400 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(rec._id)}
              className="bg-pink-600 text-white px-4 py-2 rounded"
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