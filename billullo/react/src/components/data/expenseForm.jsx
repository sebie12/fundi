import React, { useState, useEffect } from "react";
import { DataService } from '../../services/dataService'
import { UserService } from '../../services/userService'
import './expenseForm.css'

export default function ExpenseForm() {
  const dataService = new DataService()
  const userService = new UserService()
  
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    dateIncurred: '',
    isMonthly: false,
    walletId: '',
    categoryId: ''
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
      [name]: type === 'checkbox' ? checked : value
    }));
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, responseCode: null, createdExpense: null });
    
    try {
      const response = await dataService.createExpense(
        formData.title,
        formData.amount,
        formData.dateIncurred,
        formData.isMonthly,
        formData.walletId,
        formData.categoryId
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
          dateIncurred: '', 
          isMonthly: false, 
          walletId: '', 
          categoryId: '' 
        });
      } else {
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
    <div className="expense-form-container">
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
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
        
        <div className="form-row">
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
        
        <div className="form-row">
          <label className="form-label">Date incurred</label>
          <input
            type="date"
            value={formData.dateIncurred}
            name="dateIncurred"
            onChange={handleInputChange}
            required
            disabled={status.loading}
            className="form-date"
          />
        </div>
        
        <div className="form-row">
          <label className="form-label">IsMonthly</label>
          <input
            type="checkbox"
            checked={formData.isMonthly}
            name="isMonthly"
            onChange={handleInputChange}
            disabled={status.loading}
            className="form-checkbox"
          />
        </div>
        
        <div className="form-row">
          <label className="form-label">Wallet</label>
          <select
            value={formData.walletId}
            name="walletId"
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
        
        <div className="form-row">
          <label className="form-label">Category</label>
          <select
            value={formData.categoryId}
            name="categoryId"
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
        
        <div className="form-actions">
          <button type="submit" disabled={status.loading} className="submit-button">
            {status.loading ? 'Loading...' : 'Post'}
          </button>
        </div>
      </form>
      
      {/* Response Messages */}
      {status.loading && (
        <p className="message loading-message">Creating expense...</p>
      )}
      
      {status.responseCode === 201 && status.createdExpense && (
        <div className="message success-message">
          <p className="message-title">✓ Expense created successfully!</p>
          <p>Title: {status.createdExpense.title}</p>
          <p>Amount: ${status.createdExpense.amount}</p>
          <p>Date: {status.createdExpense.dateIncurred}</p>
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