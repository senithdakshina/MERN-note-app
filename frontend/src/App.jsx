// FILE: frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import CreatePage from './Pages/CreatePage';
import NoteDetailPage from './Pages/NoteDetailPage';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <div className='relative h-full w-full'>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/note/:id' element={<NoteDetailPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
