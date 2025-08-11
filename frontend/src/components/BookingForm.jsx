import React, { useEffect, useState } from 'react';

export default function BookingForm() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); // or wherever you store JWT
    fetch('/api/doctors', { headers: { Authorization: 'Bearer ' + token }})
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(() => setDoctors([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // must be logged in

    const body = { doctorId, date, time };
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      setMessage('Appointment requested!');
      setDoctorId(''); setDate(''); setTime('');
    } else {
      const err = await res.json();
      setMessage('Error: ' + (err.message || 'Could not book'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book an Appointment</h2>

      <label>Doctor</label>
      <select value={doctorId} onChange={e => setDoctorId(e.target.value)} required>
        <option value="">Select a doctor</option>
        {doctors.map(d => (
          <option key={d._id} value={d._id}>
            {d.name || d.email} {/* adjust to your User fields */}
          </option>
        ))}
      </select>

      <label>Date</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />

      <label>Time</label>
      <input type="time" value={time} onChange={e => setTime(e.target.value)} required />

      <button type="submit">Book</button>
      <div>{message}</div>
    </form>
  );
}
