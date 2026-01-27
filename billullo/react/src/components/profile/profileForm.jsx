import React, { useState, useEffect } from "react"; // Added useEffect import
import { UserService } from "../../services/userService";
import "./profileForm.css";

function ProfileForm({ setDone }) { // Fixed: destructure props
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [responseCode, setResponseCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  
  const userService = new UserService();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseCode(null);
    
    try {
      const userData = {
        username: username,
        first_name: firstName,
        last_name: lastName
      };
      
      const response = await userService.createUser(userData);
      setResponseCode(response.status);
      
      if (response.ok) {
        const user = await response.json();
        setCreatedUser(user);
        // Clear form on success
        setUsername('');
        setFirstName('');
        setLastName('');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setResponseCode(500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (responseCode === 201) { 
      setDone(true)
    }
  }, [responseCode, setDone]) 
  
  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            disabled={loading}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">First name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            required
            disabled={loading}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Last name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            required
            disabled={loading}
            className="form-input"
          />
        </div>
        
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'loading...' : 'create'}
        </button>
      </form>
      
      {/* Response Messages */}
      {loading && (
        <p className="message loading-message">Creating user...</p>
      )}
      
      {responseCode === 201 && createdUser && (
        <div className="message success-message">
          <p className="message-title">✓ User created successfully!</p>
          <p>Username: {createdUser.username}</p>
          <p>Name: {createdUser.first_name} {createdUser.last_name}</p>
        </div>
      )}
      
      {responseCode === 400 && (
        <p className="message error-message">
          ✗ Invalid data. Please check your inputs.
        </p>
      )}
      
      {responseCode === 409 && (
        <p className="message error-message">
          ✗ A user with this username already exists.
        </p>
      )}
      
      {responseCode === 500 && (
        <p className="message error-message">
          ✗ Server error. Please try again later.
        </p>
      )}
      
      {responseCode && responseCode !== 201 && responseCode !== 400 && responseCode !== 409 && responseCode !== 500 && (
        <p className="message error-message">
          ✗ Error creating user (Status: {responseCode})
        </p>
      )}
    </div>
  );
}

export default ProfileForm;