// src/components/TodoItem.js

import React, { useState } from "react";

const TodoItem = ({ todo, onToggleCompleted, onDeleteTodo, onUpdateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedText.trim() !== "") {
      onUpdateTodo(todo.id, editedText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedText(todo.task);
    setIsEditing(false);
  };

  return (
    <li
      style={{
        marginBottom: "10px",
        border: "1px solid white",
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: todo.completed ? "#d4edda" : "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        alignItems:  "8px",
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
        {isEditing ? (
          // Jika dalam mode edit, tampilkan input field
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            style={{
              flex: 1,
              marginRight: "10px",
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        ) : (
          // Jika tidak, tampilkan teks tugas
          <h3
            style={{
              margin: 0,
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.task}
          </h3>
        )}

        <div style={{ display: "flex", gap: "5px" }}>
          {isEditing ? (
            // Tombol saat mode edit
            <>
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
                onClick={handleCancel}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  backgroundColor: "salmon",
                  color: "#282c34",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Batal
              </button>
            </>
          ) : (
            // Tombol saat tampilan normal
            <>
              <button
                onClick={handleEdit}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  backgroundColor: "#61dafb",
                  color: "#282c34",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Edit
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
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default TodoItem;