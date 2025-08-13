import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Appointments from './pages/Appointments';
import MedicalRecords from './pages/MedicalRecords';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
      </Routes>
    </Router>
  );
}

export default App;