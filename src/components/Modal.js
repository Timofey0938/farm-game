import React, {useEffect} from 'react'
import './Modal.css'

export default function Modal({ resources, data, throwError, close }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return ()=> document.body.style.overflow = 'unset'
  }, [])

  const choiceHandler = item => {
    if (!item.active) {
      throwError('Здание не открыто')
      return
    }

    if (resources.energy < item.resources.energy) {
      throwError('Недостаточно энергии')
      return
    }

    if (resources.stone < item.resources.stone || resources.wood < item.resources.wood) {
      throwError('Недостаточно ресурсов')
      return
    }

    item.action()
    close()
  }

  const clickHandler = event => {
    if (event.target.classList[0] === 'background') {
      close()
    }
  }

  return (
    <div className='background' onClick={event => clickHandler(event)}>
      <div className="window">
        <h1>{data.header}</h1>
        <div className='item-list'>
          {data.items.map((item, index) => (
            <div className='item-container' key={index}>
              <div
                className={item.active ? 'item item_active' : 'item item_inactive'}
                onClick={() => choiceHandler(item)}
              >
                <img src={`img/${data.folderName}/${item.name}.png`} alt="" />
                <div className="info">
                  <div className='text'>{item.text}</div>
                  <div className='resources'>
                    {item.resources.stone > 0 && <div className='resource'>
                      <div className='quantity'>{item.resources.stone}</div>
                      <img src={`img/resources/stone.png`} alt="" />
                    </div>}
                    {item.resources.wood > 0 && <div className='resource'>
                      <div className='quantity'>{item.resources.wood}</div>
                      <img src={`img/resources/wood.png`} alt="" />
                    </div>}
                  </div>
                </div>
              </div>
              {!item.active && <img className='locked' src={`img/locked.png`} alt="" />}
            </div>
            
          ))}
        </div>
      </div>
    </div>
  )
}