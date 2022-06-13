import { useState } from 'react'
import Header from './components/Header'
import Gamefield from './components/GameField'
import Modal from './components/Modal'
import ErrorMessage from './components/ErrorMessage'
import { fieldHandler } from './utils'
import { fieldConfig } from './fieldConfig'
import './App.css'


function App() {
  const [fieldCells, setFieldCells] = useState([])
  const [resources, setResources] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState({ active: false, message: '' })
  const [building, setBuilding] = useState(false)

  const startGame = () => {
    const field = []
    for (let i = 0; i < fieldConfig.rows; i++) {
      const row = []
      for (let j = 0; j < fieldConfig.columns; j++) {
        const random = Math.floor(Math.random() * 14)
        let type
        let options
        switch (random) {
          case 0:
            type = 'tree'
            options = [{ name: 'Срубить', resources: [] }]
            break;
          case 1:
            type = 'stone'
            options = [{ name: 'Разломать', resources: [] }]
            break;
          case 2:
          case 3:
          case 4:
          case 5:
            type = 'grass'
            options = [{ name: 'Скосить', resources: [] }]
            break;
          default:
            type = 'empty'
            options = [
              {
                name: 'Вспахать',
                resources: []
              }
            ]
            break;
        }
        row.push({
          x: i,
          y: j,
          type,
          options,
          highlighted: false
        })
      }
      field.push(row)
    }
    setFieldCells(field)
    setResources({
      energy: 15,
      seeds: 5,
      wheat: 5,
      stone: 10,
      wood: 10
    })
  }

  const changeCellType = (cell, type) => {
    let field = Object.assign([], fieldCells)
    for (let i = 0; i < fieldConfig.rows; i++) {
      for (let j = 0; j < fieldConfig.columns; j++) {
        const fieldCell = field[i][j]
        if (fieldCell.x === cell.x && fieldCell.y === cell.y) {
          fieldCell.type = type
          switch (type) {
            case 'empty':
              fieldCell.options = [
                {
                  name: 'Вспахать',
                  resources: []
                }
              ]
              if (fieldHandler.isNextToCellWithType(fieldCells, cell, 'built')) {
                fieldCell.options.push({
                  name: 'Расширить',
                  resources: [
                    { name: 'stone', quantity: 1 },
                    { name: 'wood', quantity: 1 }
                  ]
                })
              }              
              break
            case 'plowed':
              fieldCell.options = [
                {
                  name: 'Посадить',
                  resources: [{ name: 'seeds', quantity: 1 }]
                },
                {
                  name: 'Уничтожить',
                  resources: []
                }
              ]
              break
            case 'built':
              fieldCell.options = [
                { name: 'Поставить', resources: [] },
                { name: 'Уничтожить', resources: [] }
              ]
              break
            case 'sown':
            case 'lightly-growing':
            case 'hard-growing':
              fieldCell.options = [{ name: 'Отменить', resources: [] }]
              break
            case 'grown':
              fieldCell.options = [{ name: 'Собрать', resources: [] }]
              break
            case 'grass':
              fieldCell.options = [{ name: 'Скосить', resources: [] }]
              break
            case 'stone':
              fieldCell.options = [{ name: 'Разломать', resources: [] }]
              break
            case 'tree':
              fieldCell.options = [{ name: 'Срубить', resources: [] }]
              break
            default:
              break
          }
          setFieldCells(field)
          return
        }
      }
    }
  }

  const throwError = message => {
    setError({ active: true, message })
    setTimeout(() => {
     setError({ active: false, message: '' })
    }, 1000) 
  }

  const actions = {
    plow: cell => {
      if (resources.energy < 1) {
        throwError('Недостаточно энергии')
        return
      }

      changeCellType(cell, 'plowed')
      setResources({...resources, energy: resources.energy - 1})
    },
    plant: cell => {
      if (resources.seeds === 0) {
        throwError('Недостаточно семян')
        return
      }

      changeCellType(cell, 'sown')
      setResources({...resources, seeds: resources.seeds - 1})
      
      cell.plantTimers = {}
      cell.plantTimers.timer1 = setTimeout(() => {
        changeCellType(cell, 'lightly-growing')
        cell.plantTimers.timer2 = setTimeout(() => {
          changeCellType(cell, 'hard-growing')
          cell.plantTimers.timer3 = setTimeout(() => {
            changeCellType(cell, 'grown')
          }, 2000);
        }, 2000);
      }, 2000);
    },
    collect: cell => {
      if (resources.energy < 1) {
        throwError('Недостаточно энергии')
        return
      }

      changeCellType(cell, 'plowed')
      setResources({
        ...resources,
        energy: resources.energy - 1,
        seeds: resources.seeds + 1 + Math.round(Math.random()),
        wheat: resources.wheat + 1
      })
    },
    cancel: cell => {
      clearTimeout(cell.plantTimers.timer1)
      clearTimeout(cell.plantTimers.timer2)
      clearTimeout(cell.plantTimers.timer3)
      delete cell.plantTimers

      changeCellType(cell, 'plowed')
      setResources({...resources, seeds: resources.seeds + 1})
    },
    ruin: cell => {
      if (resources.energy < 1) {
        throwError('Недостаточно энергии')
        return
      }

      changeCellType(cell, 'empty')
      setResources({...resources, energy: resources.energy - 1})
    },
    build: cell => {
      if (resources.energy < 1) {
        throwError('Недостаточно энергии')
        return
      }

      if (resources.wood < 1 || resources.stone < 1) {
        throwError('Недостаточно ресурсов')
        return
      }

      changeCellType(cell, 'built')
      setResources({
        ...resources,
        energy: resources.energy - 1,
        stone: resources.stone - 1,
        wood: resources.wood - 1
      })

      let field = Object.assign([], fieldCells)
      for (let i = 0; i < fieldConfig.rows; i++) {
        for (let j = 0; j < fieldConfig.columns; j++) {
          const fieldCell = field[i][j]
          if (fieldCell.x === cell.x && fieldCell.y === cell.y) {
            fieldCell.type = 'built'
          }
        }
      }
      for (let i = 0; i < fieldConfig.rows; i++) {
        for (let j = 0; j < fieldConfig.columns; j++) {
          const fieldCell = field[i][j]
          if (fieldCell.type === 'empty' &&
            fieldHandler.isAroudCellWithType(fieldCells, fieldCell, 'built')) {
            fieldCell.options = [
              {
                name: 'Вспахать',
                resources: []
              },
              {
              name: 'Расширить',
              resources: [
                { name: 'stone', quantity: 1 },
                { name: 'wood', quantity: 1 }
              ]
            }]
            console.log(fieldCell.options)
          }
        }
      }
    },
    mow: cell => {
      if (resources.energy < 1) {
        throwError('Недостаточно энергии')
        return
      }
      
      changeCellType(cell, 'empty')
      setResources({
        ...resources,
        energy: resources.energy - 1,
        seeds: resources.seeds + Math.round(Math.random())
      })
    },
    crack: cell => {
      if (resources.energy < 1) {
        throwError('Недостаточно энергии')
        return
      }

      changeCellType(cell, 'empty')
      setResources({
        ...resources,
        energy: resources.energy - 1,
        stone: resources.stone + 1
      })
    },
    cutDown: cell => {
      if (resources.energy < 1) {
        throwError('Недостаточно энергии')
        return
      }

      changeCellType(cell, 'empty')
      setResources({
        ...resources,
        energy: resources.energy - 1,
        wood: resources.wood + 1
      })
    }
  }

  const openBuildModal = () => {
    setShowModal(true)
  }

  const eat = () => {
    if (resources.wheat === 0) {
      throwError('Недостаточно еды')
      return
    }
    setResources({...resources, wheat: resources.wheat - 1, energy: resources.energy + 3})
  }

  const showBuildingSelectArea = () => {
    setBuilding(true)
  }

  const build = cell => {
    setBuilding(false)
    let field = Object.assign([], fieldCells)
    
    if (!fieldHandler.isAroundedByCellsWithType(fieldCells, cell, 'empty')) {
      throwError('Вы не можете строить здесь')
      for (let i = 0; i < fieldConfig.rows; i++) {
        for (let j = 0; j < fieldConfig.columns; j++) {
          const fieldCell = field[i][j]
          if (fieldCell.highlighted) {
            fieldCell.highlighted = false
          }
        }
      }
      return
    }
    
    for (let i = 0; i < fieldConfig.rows; i++) {
      for (let j = 0; j < fieldConfig.columns; j++) {
        const fieldCell = field[i][j]
        if (fieldCell.highlighted) {
          fieldCell.type = 'built'
          fieldCell.options = [
            {
              name: 'Поставить',
              resources: []
            }
          ]
          fieldCell.highlighted = false
        }
      }
    }
    
    for (let i = 0; i < fieldConfig.rows; i++) {
      for (let j = 0; j < fieldConfig.columns; j++) {
        const fieldCell = field[i][j]
        console.log('i: ', i, 'j: ', j)
        if (fieldCell.type === 'empty' &&
          fieldHandler.isNextToCellWithType(fieldCells, fieldCell, 'built')) {
          fieldCell.options = [
            {
              name: 'Вспахать',
              resources: []
            },
            {
              name: 'Расширить',
              resources: [
                { name: 'stone', quantity: 1 },
                { name: 'wood', quantity: 1 }
              ]
            }
          ]
        }
      }
    }
    
    setResources({
      ...resources,
      energy: resources.energy - 9,
      stone: resources.stone - 9,
      wood: resources.wood - 9
    })
    setFieldCells(field)
  }

  const buildingData = {
    header: 'Строительство',
    folderName: 'buildings',
    items: [
      {
        name: 'house',
        text: 'Дом',
        resources: {
          energy: 9,
          stone: 9,
          wood: 9
        },
        active: true,
        action: showBuildingSelectArea
      },
      { name: 'house', text: 'Банька', resources: [], active: false },
      { name: 'house', text: 'Сарай', resources: [], active: false },
      { name: 'house', text: 'Гараж', resources: [], active: false },
      { name: 'house', text: 'Вилла', resources: [], active: false }
    ]
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const highlight = cell => {
    let field = Object.assign([], fieldCells)
    for (let i = 0; i < fieldConfig.rows; i++) {
      for (let j = 0; j < fieldConfig.columns; j++) {
        const fieldCell = field[i][j]
        if (fieldHandler.isAround(fieldCell, cell)) {
          fieldCell.highlighted = true
        } else {
          fieldCell.highlighted = false
        }
      }
    }
    setFieldCells(field)
  }

  return (
    <div className="App">
        <Header
          resources={resources}
          startGame={startGame}
          openBuildModal={openBuildModal}
          eat={eat}
        />
        <Gamefield
          fieldCells={fieldCells}
          actions={actions}
          building={building}
          highlight={highlight}
          build={build}
        />
        {showModal && <Modal resources={resources} data={buildingData} throwError={throwError} close={closeModal} />}
        {error.active && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  )
}

export default App