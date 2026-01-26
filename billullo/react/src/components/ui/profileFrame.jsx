
import React from 'react'
import './profileFrame.css'
import defaultProfileImage from '../../assets/defaultProfileFrame.svg'

export default function ProfileFrame() {
    return (
        <img src={defaultProfileImage} alt="Profile Frame" id="profile" />
    )
}