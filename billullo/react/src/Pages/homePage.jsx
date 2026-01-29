import {    
    React, 
    useEffect,
    useState
    } from "react"
import './common.css'
import ExpenseForm from '../components/data/expenseForm'

export function HomePage() {
    const [profile, setProfile] = useState(null);
    return (
        <div className='body'>
            <ExpenseForm/>
        </div>
    )
}
