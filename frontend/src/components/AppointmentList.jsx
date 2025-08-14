import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const AppointmentList = ({ appointments, setAppointments, setEditingAppointment }) => {
  const { user } = useAuth();

  const handleDelete = async (appointmentId) => {
    try {
      await axiosInstance.delete(`/api/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAppointments(appointments.filter((appt) => appt._id !== appointmentId));
    } catch (error) {
      alert('Failed to delete appointment.');
    }
  };

  return (
    <div>
      {appointments.map((appt) => (
        <div key={appt._id} className="bg-pink-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">Doctor: {appt.doctor}</h2>
          <p>Patient: {appt.patientName}</p>
          <p>Reason: {appt.reason}</p>
          <p className="text-sm text-gray-500">Date: {new Date(appt.date).toLocaleDateString()}</p>
          <p className="text-sm">Status: {appt.status}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingAppointment(appt)}
              className="mr-2 bg-pink-400 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(appt._id)}
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

export default AppointmentList;