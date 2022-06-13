import React from 'react'
import FieldCellContainer from './FieldCellContainer'
import './GameField.css'

const Gamefield = ({ fieldCells, actions, building, highlight, build }) => {
  return (
    <div className='game-field'>
      {fieldCells.map((row, index) => (
          <div className="row" key={index}>
            {row.map((cell, index) => {
              return <FieldCellContainer
                cell={cell}
                actions={actions}
                building={building}
                highlight={highlight}
                build={build}
                key={index}
              />
            })}
          </div>
        ))}
    </div>
  )
}

export default Gamefield
