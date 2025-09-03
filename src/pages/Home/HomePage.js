import React, { useState, useEffect } from 'react';
// Hapus 'useNavigate' karena tidak lagi digunakan
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styling untuk HomePage
const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2c3e50;
  color: #ecf0f1;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  color: #bdc3c7;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column; /* Mengubah tombol menjadi vertikal */
  gap: 1rem;
  align-items: center;
`;

const ActionButton = styled(Link)`
  padding: 12px 25px;
  font-size: 1.1rem;
  color: #2c3e50;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
  min-width: 200px; /* Menyamakan lebar tombol */
  &:hover { background-color: #2980b9; }
`;

const LogoutButton = styled.button`
  padding: 12px 25px;
  font-size: 1.1rem;
  color: white;
  background-color: #e74c3c;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  min-width: 200px; /* Menyamakan lebar tombol */
  &:hover { background-color: #c0392b; }
`;

const HomePage = () => {
  const [user, setUser] = useState(null);
  // Hapus deklarasi 'navigate' yang tidak terpakai
  // const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userData && token) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    // Hapus data dari localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Reset state agar UI berubah ke kondisi "logged out"
    setUser(null); 
    // Tetap di halaman ini, tidak perlu navigate
  };

  return (
    <WelcomeContainer>
      <Title>Selamat Datang di Aplikasi Todo List</Title>
      
      {/* Tampilkan pesan sapaan sesuai kondisi login */}
      {user ? (
        <Subtitle>Selamat Datang, {user.name || user.email}!</Subtitle>
      ) : (
        <Subtitle>Kelola semua tugas Anda dengan mudah dan efisien.</Subtitle>
      )}
      
      <ButtonGroup>
        {/* Tombol ini selalu muncul, tetapi ProtectedRoute akan mencegah akses jika belum login */}
        <ActionButton to="/todos">Lihat Daftar Todo</ActionButton>
        
        {/* Tampilkan tombol sesuai kondisi login */}
        {user ? (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        ) : (
          <>
            <ActionButton as={Link} to="/register">Register</ActionButton>
            <ActionButton as={Link} to="/login">Login</ActionButton>
          </>
        )}
      </ButtonGroup>
    </WelcomeContainer>
  );
};

export default HomePage;

