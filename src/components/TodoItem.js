// src/components/TodoItem.js

import React, { useState } from "react"; // DIUBAH: Impor useState

// DIUBAH: Terima props onUpdateTodo
const TodoItem = ({ todo, onToggleCompleted, onDeleteTodo, onUpdateTodo }) => {
  // BARU: State untuk mengelola mode edit dan teks yang diedit
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.task);

  // BARU: Fungsi untuk menangani penyimpanan
  const handleSave = () => {
    if (editText.trim()) {
      onUpdateTodo(todo.id, editText);
      setIsEditing(false);
    }
  };

  // BARU: Tampilan saat mode edit aktif
  if (isEditing) {
    return (
      <li
        style={{
          marginBottom: "10px",
          border: "1px solid white",
          padding: "10px",
          borderRadius: "8px",
          backgroundColor: "#2d3d3d",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{
              flexGrow: 1,
              padding: "8px",
              marginRight: "10px",
              borderRadius: "4px",
              border: "1px solid #61dafb",
            }}
          />
          <div style={{ display: "flex", gap: "5px" }}>
            <button
              onClick={handleSave}
              style={{
                padding: "5px 10px",
                borderRadius: "4px",
                backgroundColor: "lightgreen",
                color: "#282c34",
                border: "none",
                cursor: "pointer",
              }}
            >
              Simpan
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: "5px 10px",
                borderRadius: "4px",
                backgroundColor: "lightcoral",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Batal
            </button>
          </div>
        </div>
      </li>
    );
  }

  // Tampilan default (tidak dalam mode edit)
  return (
    <li
      style={{
        marginBottom: "10px",
        border: "1px solid white",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: todo.completed ? "#2d3d3d" : "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            margin: 0,
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.task}
        </h3>
        <div style={{ display: "flex", gap: "5px" }}>
          {/* BARU: Tombol untuk masuk ke mode edit */}
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: "#61dafb",
              color: "#282c34",
              border: "none",
              cursor: "pointer",
            }}
          >
            Update
          </button>
          <button
            onClick={() => onToggleCompleted(todo.id, todo.completed)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: todo.completed ? "salmon" : "lightgreen",
              color: "#282c34",
              border: "none",
              cursor: "pointer",
            }}
          >
            {todo.completed ? "Belum Selesai" : "Selesai"}
          </button>
          <button
            onClick={() => onDeleteTodo(todo.id)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: "tomato",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Hapus
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;