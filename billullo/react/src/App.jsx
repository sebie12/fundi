import { useState } from 'react'
import { Navbar } from './components/navbar'
import { HomePage } from './Pages/homePage';
import { ProfilePage } from './Pages/profilePage';

function App() {
  const [screen, setScreen] = useState(0);

  // Define your screens here
  const screens = {
    0: <HomePage />,
    1: <h1>Log Activity</h1>,
    2: <h1>Consult</h1>,
    3: <ProfilePage />,
  };

  return (
    <>
      <Navbar setScreen={setScreen} />
      {screens[screen]}
    </>
  )
}

export default App