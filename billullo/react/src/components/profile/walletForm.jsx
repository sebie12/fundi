import React, { useEffect, useState } from "react";
import { UserService } from "../../services/userService";
import "./walletForm.css";

export default function WalletForm({ setDone }) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    userId: '',
    coin: '' 
  });
  
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({
    loading: false,
    responseCode: null,
    createdWallet: null
  });
  
  const userService = new UserService();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getUsers();
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);
  
  useEffect(() => {
    if (status.responseCode === 201) {
      setDone(true)
    }
  }, [status.responseCode, setDone])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
   const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, responseCode: null, createdWallet: null });
    
    try {
      const response = await userService.createWallet(
        formData.name, 
        parseFloat(formData.amount),
        parseInt(formData.userId),
        formData.coin 
      );
      
      if (response.ok) {
        const wallet = await response.json();
        setStatus({ 
          loading: false, 
          responseCode: response.status, 
          createdWallet: wallet 
        });
        setFormData({ name: '', amount: '', userId: '', coin: '' });
      } else {
        setStatus({ 
          loading: false, 
          responseCode: response.status, 
          createdWallet: null 
        });
      }
    } catch (error) {
      console.error('Error creating wallet:', error);
      setStatus({ loading: false, responseCode: 500, createdWallet: null });
    }
  };
  
  const { loading, responseCode, createdWallet } = status;
  
  return (
    <div className="wallet-form-container">
      <form onSubmit={handleSubmit} className="wallet-form">
        <div className="form-group">
          <label className="form-label">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              maxLength={20}
              placeholder="Enter the name"
              required
              disabled={loading}
              className="form-input"
            />
          </label>
        </div>

        <div className="form-group">
          <select
              name="coin"
              value={formData.coin}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="form-input"
            >
              <option value="">Select a coin</option>
              <option value="$">USD</option>
              <option value="€">EUR</option>
              <option value="£">GBP</option>
            </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">
            Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              placeholder="Enter amount"
              required
              disabled={loading}
              className="form-input"
            />
          </label>
        </div>
        
        <div className="form-group">
          <label className="form-label">
            User:
            <select
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="form-input"
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </label>
        </div>
        
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Creating...' : 'Submit'}
        </button>
      </form>
      
      {loading && (
        <p className="message loading-message">Creating wallet...</p>
      )}
      
      {responseCode === 201 && createdWallet && (
        <div className="message success-message">
          <p className="message-title">✓ Wallet created successfully!</p>
          <p>Name: {createdWallet.name}</p>
          <p>Initial Balance: ${createdWallet.balance.toFixed(2)}</p>
        </div>
      )}
      
      {responseCode === 400 && (
        <p className="message error-message">
          ✗ Invalid data. Please check your inputs.
        </p>
      )}
      
      {responseCode === 409 && (
        <p className="message error-message">
          ✗ A wallet with this name already exists.
        </p>
      )}
      
      {responseCode === 500 && (
        <p className="message error-message">
          ✗ Server error. Please try again later.
        </p>
      )}
      
      {responseCode && responseCode !== 201 && responseCode !== 400 && responseCode !== 409 && responseCode !== 500 && (
        <p className="message error-message">
          ✗ Error creating wallet (Status: {responseCode})
        </p>
      )}
    </div>
  );
}