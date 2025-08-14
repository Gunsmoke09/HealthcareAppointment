import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const AppointmentForm = ({ appointments, setAppointments, editingAppointment, setEditingAppointment }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ patientName: '', doctor: '', reason: '', date: '', status: 'scheduled' });

  useEffect(() => {
    if (editingAppointment) {
      setFormData({
        patientName: editingAppointment.patientName || '',
        doctor: editingAppointment.doctor,
        reason: editingAppointment.reason,
        date: editingAppointment.date,
        status: editingAppointment.status,
      });
    } else {
      setFormData({ patientName: '', doctor: '', reason: '', date: '', status: 'scheduled' });
    }
  }, [editingAppointment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAppointment) {
        const response = await axiosInstance.put(`/api/appointments/${editingAppointment._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAppointments(
          appointments.map((appt) => (appt._id === response.data._id ? response.data : appt))
        );
      } else {
        const response = await axiosInstance.post('/api/appointments', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAppointments([...appointments, response.data]);
      }
      setEditingAppointment(null);
      setFormData({ patientName: '', doctor: '', reason: '', date: '', status: 'scheduled' });
    } catch (error) {
      alert('Failed to save appointment.');
    }
  };

  return (
  <form onSubmit={handleSubmit} className="bg-pink-50 p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4 text-pink-700">{editingAppointment ? 'Edit Appointment' : 'Add Appointment'}</h1>
      <input
        type="text"
        placeholder="Patient"
        value={formData.patientName}
        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Doctor"
        value={formData.doctor}
        onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Reason"
        value={formData.reason}
        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
        className="w-full mb-4 p-2 border border-pink-300 rounded"
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        className="w-full mb-4 p-2 border border-pink-300 rounded"
      />
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        className="w-full mb-4 p-2 border border-pink-300 rounded"
      >