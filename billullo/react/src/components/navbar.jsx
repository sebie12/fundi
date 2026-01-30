import React from 'react'
import { APP_NAME } from '../assets/constants'
import logo from '../assets/logo.svg';
import './navbar.css'
import ProfileFrame from './ui/profileFrame';
export function Navbar({ setScreen }) { 
  return (
    <div className="navbar">
        <div className='logoContainer'>
            <img src={logo} alt="Logo" id='logoImage' />
            <a onClick={() => setScreen(0)} className='logoText'>{APP_NAME}</a>
        </div>
      <div className="tabs">
        <a onClick={() => setScreen(1)} >Log Activity</a>
        <a onClick={() => setScreen(2)}>Consult</a>
        <a onClick={() => setScreen(3)}>Goals</a>
      </div>
      <a onClick={() => setScreen(4)}><ProfileFrame /></a>
    </div>
  )
}