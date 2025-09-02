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
  
  // LANGKAH 2.A: Tambahkan state untuk search term
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTodos = useCallback(() => {
    setLoading(true);
    fetch("/api/todos")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setTodos(data.todos); 
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
    
    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
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
      try {
        await fetch(`/api/todos/${id}`, { method: "DELETE" });
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

  // LANGKAH 2.B: Tambahkan logika untuk memfilter data sebelum di-render
  const filteredTodos = todos.filter(todo =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase())
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

      {/* LANGKAH 2.C: Tambahkan input untuk search */}
      <StyledInput
        type="text"
        placeholder="Cari tugas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <DataTable
        columns={columns}
        // LANGKAH 2.D: Gunakan data yang sudah difilter
        data={filteredTodos}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
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