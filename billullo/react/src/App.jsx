import { useState } from 'react'
import { Navbar } from './components/navbar'

function App() {
  const [screen, setScreen] = useState(0);

  // Define your screens here
  const screens = {
    0: <h1>Welcome to Billullo</h1>,
    1: <h1>New Data</h1>,
    2: <h1>Profile</h1>,
    3: <h1>Consult</h1>
  };

  return (
    <>
      <Navbar setScreen={setScreen} />
      {screens[screen]}
    </>
  )
}

export default App