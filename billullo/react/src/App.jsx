import { useState } from 'react'
import { Navbar } from './components/navbar'
import { HomePage } from './Pages/homePage';
import { ProfilePage } from './Pages/profilePage';
import { LogPage } from './Pages/logPage';

function App() {
  const [screen, setScreen] = useState(0);
  const [username, SetUsername] = useState('');
  
  const screens = {
    0: <HomePage />,
    1: <LogPage />,
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