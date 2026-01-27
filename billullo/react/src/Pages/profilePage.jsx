import React, { useEffect } from "react";
import "./common.css";
import {UserService} from "../services/userService";
import ProfileInfo from "../components/profile/profileInfo";
import GeneralProfileSetUp from "../components/profile/generalProfileSetUp";

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
        setUserData(data);
        
        
        
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
            <GeneralProfileSetUp/>
          </div>
        )}
        
        {responseCode !== 0 && responseCode !== 200 && responseCode !== 404 && (
          <p>Error loading profile. (Status: {responseCode})</p>
        )}
      </div>
    </div>
  );
}