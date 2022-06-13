import React from 'react'
import './FieldCell.css'

function FieldCell({ type, starting, continuing }) {
  return (
    <div className='field-cell'>
      {!(starting || continuing) && <img className='cellImage' src={`img/cells/${type}.png`} alt="" />}
      {starting && <img className='cellImage' src={`img/cells/starting-${type}.png`} alt="" />}
      {continuing && <img className='cellImage' src={`img/cells/continuing-${type}.png`} alt="" />}
    </div>
  )
}

export default FieldCell