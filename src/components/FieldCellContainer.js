import React, { useState, useEffect } from 'react'
import ContextMenu from '../interfaceItems/ContextMenu'
import FieldCell from './FieldCell'
import './FieldCellContainer.css'

export default function FieldCellContainer({ cell, actions, building, highlight, build }) {
  const [showHover, setShowHover] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const [starting, setStarting] = useState(false)
  const [continuing, setContinuing] = useState(false)

  const [timer, setTimer] = useState({})

  useEffect(() => {
    const clickHandler = () => {
      if (showMenu) {
        setShowMenu(false)
      }
    }
    window.addEventListener('click', clickHandler)
    return () => window.removeEventListener('click', clickHandler)
  }, [showMenu])

  const contextMenuHandler = option => {
    switch (option) {
      case 'Вспахать':
        actions.plow(cell)
        break
      case 'Отменить':
        actions.cancel(cell)
        break
      case 'Собрать':
        actions.collect(cell)
        break
      case 'Расширить':
        actions.build(cell)
        break
      case 'Уничтожить':
        actions.ruin(cell)
        break
      case 'Посадить':
        actions.plant(cell)
        break
      case 'Скосить':
        actions.mow(cell)
        break
      case 'Разломать':
        actions.crack(cell)
        break
      case 'Срубить':
        actions.cutDown(cell)
        break
      default:
        break
    }
    setShowHover(false)
  }

  const mouseDownHandler = () => {
    if (cell.type === 'grass') {
      setStarting(true)
      setTimeout(() => {
        setStarting(false)
        actions.mow(cell)
      }, 500)
    } else if (cell.type === 'tree') {
      setStarting(true)
      const newTimer = {}
      newTimer.starting = setTimeout(() => {
        setStarting(false)
        setContinuing(true)
        newTimer.continuing = setTimeout(() => {
          actions.cutDown(cell)
          setContinuing(false)
        }, 1000)
      }, 1000)
      setTimer(newTimer)
    } else if (cell.type === 'stone') {
      setStarting(true)
      const newTimer = {}
      newTimer.starting = setTimeout(() => {
        setStarting(false)
        setContinuing(true)
        newTimer.continuing = setTimeout(() => {
          actions.crack(cell)
          setContinuing(false)
        }, 1000)
      }, 1000)
      setTimer(newTimer)
    } else {
      if (building) {
        build(cell)
      } else {
        setShowMenu(true)
      }
    }
  }

  const mouseUpHandler = () => {
    setShowMenu(false)
    const newTimer = timer
    clearTimeout(newTimer.starting)
    clearTimeout(newTimer.continuing)
    setTimer(newTimer)
    setStarting(false)
    setContinuing(false)
  }
 
  return (
    <div className='field-cell-container'
      onMouseEnter={() => {
        if (building) {
          highlight(cell)
        } else {
          setShowHover(true)
        }
      }}
      onMouseLeave={() => {
        if (building) {
          highlight()
        } else {
          setShowHover(false)
        }
      }}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
    >
      <FieldCell type={cell.type} starting={starting} continuing={continuing} />
      {showHover && <div className='hover'></div>}
      {(cell.highlighted && cell.type === 'empty') && <div className='hover blue-hover'></div>}
      {(cell.highlighted && cell.type !== 'empty') && <div className='hover red-hover'></div>}
      {showMenu && <ContextMenu options={cell.options} contextMenuHandler={contextMenuHandler}  />}
    </div>
  )
}