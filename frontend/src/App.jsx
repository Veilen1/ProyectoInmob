import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PropertyList from './components/PropertyList';
import CreateProperty from './components/CreateProperty';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import './App.css'; // Importa el archivo CSS

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/properties" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/properties"
              element={
                <PrivateRoute>
                  <PropertyList />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-property"
              element={
                <PrivateRoute>
                  <CreateProperty />
                </PrivateRoute>
              }
            />
            <Route
              path="/me"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;