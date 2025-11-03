import React from 'react'
import { Route, Router, Routes } from 'react-router'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import NoteDetailPage from './Pages/NoteDetailPage'
// import toast from 'react-hot-toast'

const App = () => {
  return (
    <div data-theme = "aqua">
      <div className="p-10 bg-blue-500 text-white text-3xl">
  Tailwind is working 🎉
  <button className="btn btn-outline">button</button>
</div>


      <Routes>

        <Route path='/' element = {<HomePage />} />
        <Route path='/create' element={<CreatePage/>}></Route>
        <Route path='/note/:id' element={<NoteDetailPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
