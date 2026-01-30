import React, { useState } from 'react'
import {motion, AnimatePresence } from 'framer-motion';
import CategoryForm from '../components/data/categoryForm'
import ExpenseForm from '../components/data/expenseForm'
import './logPage.css'

export function LogPage() {
  const [screen, setScreen] = useState(0)
  const screens = {
    0: <ExpenseForm/>,
    1: <h2>Saving goal</h2>,
    2: <CategoryForm/>
  }
  return (
    <div className="log-outer-container">
      <h1>Log your spendings or earnings</h1>
      <div className='log-container'>
        <div className='navBar'>
          <button className={`navBarItem left ${screen == 0? 'selected':''}`} onClick={() => setScreen(0)}>Expense</button>
          <button className={`navBarItem ${screen == 1? 'selected':''}`} onClick={() => setScreen(1)}>Income</button>
          <button className={`navBarItem right ${screen == 2? 'selected':''}`} onClick={() => setScreen(2)}>Category</button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.1 }}
          >
          {screens[screen]}
          </motion.div>
      </AnimatePresence>
      </div>
    </div>
  )
}
