import React from 'react'
import "./style.css"
const Button = ({text,blue,onClick,disable,style}) => {
  return (
    // <div className={blue?'btn blue-btn':'btn'} onClick={onClick} disable={disable} style={style}>
    //   {text}
    // </div>
    <div
    className={`${blue ? 'btn blue-btn' : 'btn'} ${disable ? 'btn-disabled' : ''}`} 
    onClick={!disable ? onClick : undefined} 
    style={style}
  >
    {text}
  </div>

  )
}

export default Button
