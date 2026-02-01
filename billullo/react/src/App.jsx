import { useEffect, useState } from 'react'
import { Navbar } from './components/navbar'
import { HomePage } from './Pages/homePage';
import { ProfilePage } from './Pages/profilePage';
import { LogPage } from './Pages/logPage';
import { UserService } from './services/userService';
import WalletWidget from './components/walletWidget';
import './App.css'

function App() {
  const [screen, setScreen] = useState(0)
  const [userId, setUserId] = useState(0)
  const [walletId, setWalletId] = useState(1)
  const [walletData, setWalletData] = useState(null)
  const userService = new UserService()
  
  const screens = {
    0: <HomePage />,
    1: <LogPage />,
    2: <h1>Consult</h1>,
    3: <h1>Goals</h1>,
    4: <ProfilePage />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getUserById(1);
        console.log("Response code:", response.status);
        if (response.ok) {
          const data = await response.json();
          setUserId(data.id);
          const responsew = await userService.getWalletsFromUser(data.id);
          const dataw = await responsew.json()
          setWalletData(dataw);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {
        screen == 0 ? (
         <div className='withSidebar'>
          <div className='mainbar'>
            <Navbar setScreen={setScreen} />
            {screens[screen]}
          </div>
          <div className='sidebar'>
            <h2>Wallets</h2>
            {walletData && walletData.map((wallet, index) => (
              <WalletWidget
                key={index}
                walletInfo={wallet}
                selectedWallet={walletId}
                changeSelectedWallet={(id) => {
                  setWalletId(id)
                }}
              />
            ))}
          </div>
        </div>
        ) : (
          <div className='withoutSidebar'>
            <Navbar setScreen={setScreen} />
            {screens[screen]}
          </div>
        )
      }
    </>
  )
}

export default App