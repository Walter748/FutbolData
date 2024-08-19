import React, { useState } from 'react';
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ gmail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login Response Data:', data);
        
        if (data.token) {
          Cookies.set('token', data.token, { expires: 1 });
          navigate('/home');
        } else {
          alert('Token no recibido en la respuesta');
        }
      } else {
        alert('Error al iniciar sesión: ' + response.statusText);
      }
    } catch (error) {
      alert('Error iniciando sesión: ' + error.message);
    }
  };  

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Inicio de Sesión</h2>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" type="submit">Iniciar Sesión</button> 
          <p className="register-text">¿Todavía no tienes una cuenta?  <Link className='link' to='/register'>Presiona aquí</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;