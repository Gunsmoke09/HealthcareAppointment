import React from "react";
import BookingForm from "../components/BookingForm";

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      <div className="max-w-lg w-full bg-white p-8 shadow-2xl rounded-lg">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Book an Appointment
        </h1>
        <BookingForm />
      </div>
    </div>
  );
}
