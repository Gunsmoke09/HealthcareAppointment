import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-pink-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Medical Appointment and Records Manager</Link>
      <div>
        {user ? (
          <>
            <Link to="/appointments" className="mr-4">Appointments</Link>
            <Link to="/medical-records" className="mr-4">Medical Records</Link>
            <Link to="/profile" className="mr-4">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-pink-500 px-4 py-2 rounded hover:bg-pink-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link
              to="/register"
              className="bg-pink-500 px-4 py-2 rounded hover:bg-pink-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
