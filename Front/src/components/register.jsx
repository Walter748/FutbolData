import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/register.css'

const Register = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuario, setUsuario] = useState('');
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gmail, usuario, password }), 
      });
      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        navigate('/');
      }

    } catch (error) {
      alert('Error registrando usuario: ' + error.message);
    }

  };

  return (
    <div className='register-container'>
    <form onSubmit={handleRegister} className="register-form">
      <h2>Registro</h2>
      <input
        type="email"
        placeholder="Email"
        value={gmail}
        onChange={(e) => setGmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Registrar</button>
      <p className="loginr-text">¿Ya tenes una cuenta? <Link className='link' to='/'>Presiona aquí</Link></p>
    </form>
  </div>);
};

export default Register;