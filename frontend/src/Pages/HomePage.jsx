import React, { useEffect, useState } from 'react'
import NavBar from '../component/NavBar'
import RateLimitUi from '../component/RateLimitUi';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoteCard from '../component/NoteCard';
import NotesNotFound from '../component/NoteNotFound';

const HomePage = () => {
  const [isRateLimited,SetIsRateLimited] = useState(false);
  const[notes,setNotes] = useState([])
  const[loading,setLoading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async () => {
        try {
          const res = await axios.get("http://localhost:5001/api/notes")
          const data = res.data;
          console.log(res.data)//for testing purpose

          setNotes(res.data);
          SetIsRateLimited(false);
        } catch (error) {
          console.log("Error fetching notes!!")
          console.log(error)
          if(error.response?.status == 429) {
            SetIsRateLimited(true);
          }else{
            toast.error("Fail to load Notes")
          }
        }finally{
          setLoading(false);
        }
    };

    fetchNotes();
  },[])
  return (
    <div className='min-h-screen'>
      <NavBar></NavBar>
      {isRateLimited && <RateLimitUi></RateLimitUi>}
      <div className='max-w-7xl mx-auto p-4 mt-6'>

        {loading&&<div className='text-center text-primary py-10' >Loading Notes...</div>}
        {notes.length === 0 && !isRateLimited && <NotesNotFound></NotesNotFound>}

        {notes.length > 0 && !isRateLimited && (
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note =>(
             <NoteCard key={note._id} note={note} setNotes={setNotes}></NoteCard>
            ))}
          </div>
        )}

      </div>

    </div>
  )
}

export default HomePage
