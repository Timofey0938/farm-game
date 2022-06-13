import React from 'react'
import './Interface.css'

export default function ContextMenu({ options, contextMenuHandler }) {

  return (
    <div className='context-menu'>
      <ul>
        {options.map((option, index) => (
          <li onMouseUp={() => contextMenuHandler(option.name)} className="option" key={index}>
            <p>{option.name}</p>
            <div className='resources'>
              {option.resources.map((resource, index) => {
                console.log(resource)
                return <div className='resource' key={index}>
                  <div className='quantity'>{resource.quantity}</div>
                  <img src={`img/resources/${resource.name}.png`} alt="" />
                </div>
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}