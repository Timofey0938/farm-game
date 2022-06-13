import React from 'react'
import './ErrorMessage.css'

export default function ErrorMessage({ children }) {
  return (
    <div className='error'>{children}</div>
  )
}
