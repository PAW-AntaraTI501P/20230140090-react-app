// src/components/TodoList.js

import React from "react";
import TodoItem from "./TodoItem";

// DIUBAH: Terima props onUpdateTodo
const TodoList = ({ todos, onToggleCompleted, onDeleteTodo, onUpdateTodo }) => {
  if (todos.length === 0) {
    return <p>Tidak ada tugas yang ditemukan. Silakan tambahkan satu.</p>;
  }

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={onToggleCompleted}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo} // DIUBAH: Teruskan props ke TodoItem
        />
      ))}
    </ul>
  );
};

export default TodoList;