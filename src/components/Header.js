import React from 'react'
import './Header.css'

export default function Header({ resources, startGame, openBuildModal, eat }) {
  return (
    <div className="tablo-container">
      <div className='button' onClick={startGame}><img className='buttonImage' src='img/buttons/replay.png' alt="" /></div>
      <div className='tablo'>
        <div className='energy-block'>
          <img className='energy-image' src='img/flash.png' alt="" />
          <p className='energy-text'>{resources.energy}</p>
        </div>

        <table>
          <tbody>
            <tr>
              <td><img src='img/resources/seeds.png' alt='' /></td>
              <td>{resources.seeds}</td>
            </tr>
            <tr>
              <td><img src='img/resources/wheat.png' alt='' /></td>
              <td>{resources.wheat}</td>
            </tr>
          </tbody>
        </table>

        <table>
          <tbody>
            <tr>
              <td><img src='img/resources/wood.png' alt='' /></td>
              <td>{resources.wood}</td>
            </tr>
            <tr>
              <td><img src='img/resources/stone.png' alt='' /></td>
              <td>{resources.stone}</td>
            </tr>
          </tbody>
        </table>
        
      </div>
      <div className='button' onClick={openBuildModal}><img className='buttonImage' src='img/buttons/tools.png' alt="" /></div>
      <div className='button' onClick={openBuildModal}><img className='buttonImage' src='img/buttons/build.png' alt="" /></div>
      <div className='button' onClick={eat}><img className='buttonImage' src='img/buttons/eat.png' alt="" /></div>
    </div>
  )
}