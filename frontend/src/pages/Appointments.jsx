import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentList from '../components/AppointmentList';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get('/api/appointments', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAppointments(response.data);
      } catch (error) {
        alert('Failed to fetch appointments.');
      }
    };

    fetchAppointments();
  }, [user]);

  // Redirect unauthenticated users to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto p-6">
      <AppointmentForm
        appointments={appointments}
        setAppointments={setAppointments}
        editingAppointment={editingAppointment}
        setEditingAppointment={setEditingAppointment}
      />
      <AppointmentList
        appointments={appointments}
        setAppointments={setAppointments}
        setEditingAppointment={setEditingAppointment}
      />
    </div>
  );
};

export default Appointments;