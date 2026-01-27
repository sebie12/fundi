import React from 'react';
import './profileInfo.css';
export default function ProfileInfo({userData, walletData}) {
  return (
    <div className="structure">
        <h2>Profile Information</h2>
            <div className="row">
                <div className="walletInfo">
                    <h2>User</h2>
                    <div>
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>First Name:</strong> {userData.first_name}</p>
                        <p><strong>Last Name:</strong> {userData.last_name}</p>
                    </div>
                </div>
                <div className="profileDetails">
                    <h2>Wallet Information</h2>
                    <div>
                        <p><strong>Name: </strong> {walletData ? walletData.name : "No wallet found"}</p>
                        <p><strong>Wallet Balance:</strong> {walletData ? walletData.balance : "No wallet found"}</p>
                        <p><strong>All time expenses:</strong> {walletData ? walletData.alltimeExpenses : "No wallet found"}</p>
                    </div>
                </div>
            </div>
      </div>
  )
}