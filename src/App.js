import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Home/HomePage";
import TodoPage from "./pages/Todo/TodoPage";
import LoginPage from "./pages/Login/LoginPage";

// Components
import ProtectedRoute from "./components/ProtectedRoute"; // <-- 1. Impor ProtectedRoute

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute publik yang bisa diakses siapa saja */}
        <Route path="/login" element={<LoginPage />} />

        {/* --- Rute yang Dilindungi --- */}
        {/* 2. Gunakan ProtectedRoute untuk membungkus rute privat */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/todos" element={<TodoPage />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
