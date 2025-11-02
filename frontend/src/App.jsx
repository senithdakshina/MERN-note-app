import React from 'react'
import { Route, Router, Routes } from 'react-router'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import NoteDetailPage from './Pages/NoteDetailPage'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <button onClick={() =>toast.success("ok!!!!")} className="text-red-500 p-4 bg-pink-300"></button>
      <h1 className="text-3xl font-bold text-blue-600">Tailwind is working!</h1>

      <Routes>

        <Route path='/' element = {<HomePage />} />
        <Route path='/create' element={<CreatePage/>}></Route>
        <Route path='/note/:id' element={<NoteDetailPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
