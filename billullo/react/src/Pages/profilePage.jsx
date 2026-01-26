import React, { useEffect } from "react";
import "./common.css";
import {UserService} from "../services/userService";
import ProfileInfo from "../components/profileInfo";

export function ProfilePage() {
  const userService = new UserService();
  const [userData, setUserData] = React.useState(null);
  const [walletData, setWalletData] = React.useState(null);
  const [responseCode, setResponseCode] = React.useState(0);
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await userService.getUsers();
      setResponseCode(response.status);
      
      if (response.ok) {
        const data = await response.json();
        setUserData(data[0]);
        
        // Fetch wallet right after getting user data
        if (data[0]?.wallet) {
          const walletResponse = await userService.getWalletById(data[0].wallet);
          if (walletResponse.ok) {
            const walletData = await walletResponse.json();
            setWalletData(walletData);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setResponseCode(500);
    }
  }
  
  fetchData();
}, []);
  
  return (
    <div className="body">
      <div>
        {responseCode === 0 && (
          <p>Loading...</p>
        )}
        
        {responseCode === 200 && userData && (
          <ProfileInfo userData={userData} walletData={walletData} />
        )}
        
        {responseCode === 404 && (
          <div>
            <h2>Set up your profile!</h2>
            <p>User not found.</p>
          </div>
        )}
        
        {responseCode !== 0 && responseCode !== 200 && responseCode !== 404 && (
          <p>Error loading profile. (Status: {responseCode})</p>
        )}
      </div>
    </div>
  );
}