import React from 'react'
import './Interface.css'

const Button = ({ text, action })=> {
  return (
    <div className='button' onClick={action}>{text}</div>
  )
}

export default Button
