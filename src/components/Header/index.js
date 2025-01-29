import React, { useEffect } from 'react'
import "./style.css"
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Index = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      navigate('/dashboard')
    }

  },[user,loading])
  function logout(){
   try {
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success('User Logged out!')
      navigate('/')
    }).catch((error) => {
      // An error happened.
      toast.error(error.message)
    });
   } catch (error) {
      toast.error(error.message)    
   }
  }
  return (
    <div className='nav'>
       <p className='head-text'>Financly</p>
       {
        user && (<p className='head-text link' onClick={logout}>LogOut</p>)
       }
       
    </div>
  )
}

export default Index
