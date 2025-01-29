import React from 'react'
import "./App.css"
import Signup from "./pages/Signup"
import Dahboard from "./pages/Dashboard"
import {BrowserRouter, Routes,Route } from 'react-router-dom'
import { ToastContainer,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
 <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}  // Correctly passing Slide transition
      />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/dashboard' element={<Dahboard/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
