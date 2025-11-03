import React, { useEffect, useState } from 'react'
import NavBar from '../component/NavBar'
import RateLimitUi from '../component/RateLimitUi';
import axios from 'axios';

const HomePage = () => {
  const [isRateLimited,IsSetRateLimited] = useState(true);
  const[notes,setNotes] = useState([])
  const[loading,setLoading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async () => {
        try {
          const res = await axios.get("http://localhost:5001/api/notes")
          const data = res.data;
          console.log(res.data)//for testing purpose

          setNotes(res.data);
        } catch (error) {
          console.log("Error fetching notes!!")
        }
    };

    fetchNotes();
  },[])
  return (
    <div className='min-h-screen'>
      <NavBar></NavBar>
      {isRateLimited && <RateLimitUi></RateLimitUi>}
    </div>
  )
}

export default HomePage
