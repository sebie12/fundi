import {    
    React, 
    useEffect,
    useState
    } from "react"
import './common.css'

export function HomePage() {
    const [profile, setProfile] = useState(null);
    return (
        <div className='body'>
            <h1>Welcome to Billullo</h1>
        </div>
    )
}
