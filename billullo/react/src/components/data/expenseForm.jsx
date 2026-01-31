import React, { useState, useEffect } from "react";
import { DataService } from '../../services/dataService'
import { UserService } from '../../services/userService'
//import './expenseForm.css'
import '../utils/form.css'

export default function ExpenseForm() {
  const dataService = new DataService()
  const userService = new UserService()
  
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: '',           // Changed from dateIncurred
    isMonthly: false,
    wallet: '',         // Changed from walletId
    category: ''        // Changed from categoryId
  })
  
  const [wallets, setWallets] = useState([])
  const [categories, setCategories] = useState([])
  
  const [status, setStatus] = useState({
    loading: false,
    responseCode: null,
    createdExpense: null
  })
  
  // Fetch wallets and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const walletsResponse = await userService.getWallets();
        const categoriesResponse = await dataService.getCategories();
        
        if (walletsResponse.ok) {
          const walletsData = await walletsResponse.json();
          setWallets(walletsData);
        }
        
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus({ loading: true, responseCode: null, createdExpense: null });
  
  try {
    const response = await dataService.createExpense(
      formData.title,
      parseFloat(formData.amount),
      formData.date,
      formData.type,
      parseInt(formData.wallet),
      parseInt(formData.category)
    )
    
    if (response.ok) {
      const expense = await response.json();
      setStatus({ 
        loading: false, 
        responseCode: response.status,
        createdExpense: expense
      });
      setFormData({ 
        title: '', 
        amount: '', 
        date: '',
        type: '', 
        wallet: '', 
        category: '' 
      });
    } else {
      const errorData = await response.json();
      console.error('Error details:', errorData);
      
      setStatus({ 
        loading: false, 
        responseCode: response.status,
        createdExpense: null
      });
    }
  } catch (error) {
    console.error('Error creating expense:', error);
    setStatus({ loading: false, responseCode: 500, createdExpense: null });
  }
};
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={formData.title}
            name="title"
            onChange={handleInputChange}
            placeholder="Expense title"
            required
            disabled={status.loading}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            value={formData.amount}
            name="amount"
            onChange={handleInputChange}
            placeholder="0.00"
            required
            disabled={status.loading}
            className="form-input"
            step="0.01"
            min="0"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Date incurred</label>
          <input
            type="date"
            value={formData.date}           
            name="date"                     
            onChange={handleInputChange}
            required
            disabled={status.loading}
            className="form-date"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Type of payment</label>
          <select
            value={formData.type}         
            name="type"                    
            onChange={handleInputChange}
            required
            disabled={status.loading}
            className="form-select"
          >
            <option value="one-time">One time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Wallet</label>
          <select
            value={formData.wallet}         
            name="wallet"
            onChange={handleInputChange}
            required
            disabled={status.loading}
            className="form-select"
          >
            <option value="">Select a wallet</option>
            {wallets.map(wallet => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            value={formData.category}       // Changed from categoryId
            name="category"                  // Changed from categoryId
            onChange={handleInputChange}
            required
            disabled={status.loading}
            className="form-select"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
          <button type="submit" disabled={status.loading} className="submit-button">
            {status.loading ? 'Loading...' : 'Create'}
          </button>
      </form>
      
      {status.loading && (
        <p className="message loading-message">Creating expense...</p>
      )}
      
      {status.responseCode === 201 && status.createdExpense && (
        <div className="message success-message">
          <p className="message-title">✓ Expense created successfully!</p>
          <p>Title: {status.createdExpense.title}</p>
          <p>Amount: ${status.createdExpense.amount}</p>
          <p>Date: {status.createdExpense.date}</p>  {/* Changed from dateIncurred */}
        </div>
      )}
      
      {status.responseCode === 400 && (
        <p className="message error-message">
          ✗ Invalid data. Please check your inputs.
        </p>
      )}
      
      {status.responseCode === 409 && (
        <p className="message error-message">
          ✗ This expense already exists.
        </p>
      )}
      
      {status.responseCode === 500 && (
        <p className="message error-message">
          ✗ Server error. Please try again later.
        </p>
      )}
      
      {status.responseCode && status.responseCode !== 201 && status.responseCode !== 400 && status.responseCode !== 409 && status.responseCode !== 500 && (
        <p className="message error-message">
          ✗ Error creating expense (Status: {status.responseCode})
        </p>
      )}
    </div>
  )
}