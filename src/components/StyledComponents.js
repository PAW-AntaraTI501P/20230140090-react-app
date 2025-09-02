import styled from 'styled-components';
import Modal from 'react-modal';

export const PageContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  h1 { color: #333; margin: 0; }
`;

export const Button = styled.button`
  padding: 10px 18px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s;
  &.primary { background-color: #007bff; &:hover { background-color: #0056b3; } }
  &.success { background-color: #28a745; &:hover { background-color: #1e7e34; } }
  &.danger { background-color: #dc3545; &:hover { background-color: #b02a37; } }
  &.info { background-color: #17a2b8; &:hover { background-color: #117a8b; } }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

export const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  outline: none;
`;

export const Overlay = {
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
};

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px; /* Memberi jarak antar tombol */
`;

export const SmallButton = styled(Button)`
  padding: 5px 10px;
  font-size: 0.875rem;
`;