import React from 'react'
import { APP_NAME } from '../assets/constants'
import logo from '../assets/logo.svg';
import './navbar.css'
export function Navbar({ setScreen }) { 
  return (
    <div className="navbar">
        <div className='logoContainer'>
            <img src={logo} alt="Logo" id='logoImage' />
            <a onClick={() => setScreen(0)} className='logoText'>{APP_NAME}</a>
        </div>
      <div className="tabs">
        <a onClick={() => setScreen(1)} >New data</a>
        <a onClick={() => setScreen(2)}>Profile</a>
        <a onClick={() => setScreen(3)}>Consult</a>
      </div>
    </div>
  )
}