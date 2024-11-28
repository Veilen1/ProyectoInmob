import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Home</Link>
        <div>
          {user ? (
            <>
              <Link to="/me" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2">Profile</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2">Login</Link>
              <Link to="/register" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;