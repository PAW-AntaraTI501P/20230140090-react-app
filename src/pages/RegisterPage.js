import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// PERBAIKAN: Path yang benar dari 'src/pages/RegisterPage.js'
// adalah './Login/LoginPage.css'
import './Login/LoginPage.css'; 

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        name,
        email,
        password,
      });
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.msg || 'Registrasi gagal. Terjadi kesalahan.');
      } else if (error.request) {
        setErrorMsg('Tidak bisa terhubung ke server. Pastikan server berjalan.');
      } else {
        setErrorMsg('Terjadi kesalahan yang tidak diketahui.');
      }
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <p className="auth-link">
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

