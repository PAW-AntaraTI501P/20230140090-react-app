import React, { useState, useEffect, useCallback } from "react";
import DataTable from 'react-data-table-component';
import { PageContainer, Header, Button, StyledInput, StyledModal, Overlay, ButtonWrapper, SmallButton } from '../../components/StyledComponents';

StyledModal.setAppElement('#root');

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [taskText, setTaskText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTodos = useCallback(() => {
    setLoading(true);
    
    // --- PERBAIKAN OTENTIKASI 1 ---
    const token = localStorage.getItem('token');
    
    fetch("/api/todos", {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) {
            if(response.status === 401) window.location.href = '/login';
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data.todos || data); 
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setTodos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const method = currentTodo ? "PUT" : "POST";
    const url = currentTodo ? `/api/todos/${currentTodo.id}` : "/api/todos";
    
    // --- PERBAIKAN OTENTIKASI 2 ---
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(url, {
        method: method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ task: taskText }),
      });
      if (!response.ok) throw new Error("Gagal menyimpan data.");
      
      fetchTodos();
      closeModal();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      
      // --- PERBAIKAN OTENTIKASI 3 ---
      const token = localStorage.getItem('token');

      try {
        await fetch(`/api/todos/${id}`, { 
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        fetchTodos();
      } catch (err) {
        console.error("Error deleting todo:", err);
      }
    }
  };

  const openModalForAdd = () => {
    setCurrentTodo(null);
    setTaskText('');
    setModalIsOpen(true);
  };

  const openModalForEdit = (todo) => {
    setCurrentTodo(todo);
    setTaskText(todo.task);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const columns = [
    { name: 'Tugas', selector: row => row.task, sortable: true, style: { fontSize: '1rem' } },
    {
      name: 'Aksi',
      cell: row => (
        <ButtonWrapper>
          <SmallButton className="info" onClick={() => openModalForEdit(row)}>Update</SmallButton>
          <SmallButton className="danger" onClick={() => handleDeleteTodo(row.id)}>Hapus</SmallButton>
        </ButtonWrapper>
      ),
      width: '180px',
    },
  ];

  const filteredTodos = todos.filter(todo =>
    (todo.task || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <PageContainer>Error: {error}</PageContainer>;
  }

  return (
    <PageContainer>
      <Header>
        <h1>Aplikasi Todo List</h1>
        <Button className="primary" onClick={openModalForAdd}>Tambah Tugas Baru</Button>
      </Header>

      <StyledInput
        type="text"
        placeholder="Cari tugas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <DataTable
        columns={columns}
        data={filteredTodos}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        noDataComponent="Tidak ada tugas yang ditemukan. Silahkan tambahkan satu"
      />
      
      <StyledModal isOpen={modalIsOpen} onRequestClose={closeModal} style={Overlay}>
        <h2>{currentTodo ? 'Update Tugas' : 'Tambah Tugas Baru'}</h2>
        <form onSubmit={handleFormSubmit}>
          <StyledInput
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Tuliskan tugasmu..."
            autoFocus
          />
          <Button className="success" type="submit">Simpan</Button>
          <Button type="button" onClick={closeModal} style={{ marginLeft: '10px' }}>Batal</Button>
        </form>
      </StyledModal>
    </PageContainer>
  );
};

export default TodoPage;