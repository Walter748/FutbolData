import { useNavigate } from "react-router-dom";
import React from "react";
import '../styles/logoutButon.css'

const LogoutButton = () => {

  const navigate = useNavigate()

  const cerraSecion = async () => {
    const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    if (response.ok) {
        navigate('/');

    } else {
        alert('Error al cerrar sesión');
    }
  };

  return (
    <button className="logout-button" onClick={cerraSecion}>Cerrar sesión</button>
  );
};

export default LogoutButton;

/* const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
  ); */