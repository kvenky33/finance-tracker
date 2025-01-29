import React from 'react'
import './style.css'
const index = ({label,placeholder,state,setState,type}) => {
  return (
    <div className='input-wrapper'>
      <p className='label-text'>{label}</p>
      <input className='custom-input' type={type} value={state} onChange={(e)=>setState(e.target.value)} placeholder={placeholder}/>   
    </div>
  )
}
export default index
