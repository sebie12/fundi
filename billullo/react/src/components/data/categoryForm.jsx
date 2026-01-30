import React, { useState } from "react";
import { DataService } from '../../services/dataService'
import '../utils/form.css'

export default function CategoryForm() {
  const dataService = new DataService()
  
  const [formData, setFormData] = useState({
    name: '',
    priorityLevel: ''
  })
  
  const [status, setStatus] = useState({
    loading: false,
    responseCode: null,
    createdCategory: null
  })
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, responseCode: null, createdCategory: null });
    
    try {
      const response = await dataService.createCategory(
        formData.name,
        parseInt(formData.priorityLevel)
      )
      
      if (response.ok) {
        const category = await response.json();
        setStatus({ 
          loading: false, 
          responseCode: response.status,
          createdCategory: category
        });
        setFormData({ name: '', priorityLevel: '' });
      } else {
        setStatus({ 
          loading: false, 
          responseCode: response.status,
          createdCategory: null
        });
      }
    } catch (error) {
      console.error('Error creating category:', error);
      setStatus({ loading: false, responseCode: 500, createdCategory: null });
    }
  };
  
  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={formData.name}
            name="name"
            onChange={handleInputChange}
            placeholder="Category name"
            required
            disabled={status.loading}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Priority level (a number from 1 to 10)</label>
          <input
            type="number"
            value={formData.priorityLevel}
            name="priorityLevel"
            onChange={handleInputChange}
            placeholder="Priority level"
            required
            disabled={status.loading}
            className="form-input"
            min="1"
            max="10"
          />
        </div>
        
        <button type="submit" disabled={status.loading} className="submit-button">
          {status.loading ? 'Loading...' : 'Create'}
        </button>
      </form>
      
      {/* Response Messages */}
      {status.loading && (
        <p className="message loading-message">Creating category...</p>
      )}
      
      {status.responseCode === 201 && status.createdCategory && (
        <div className="message success-message">
          <p className="message-title">✓ Category created successfully!</p>
          <p>Name: {status.createdCategory.name}</p>
          <p>Priority Level: {status.createdCategory.priorityLevel}</p>
        </div>
      )}
      
      {status.responseCode === 400 && (
        <p className="message error-message">
          ✗ Invalid data. Please check your inputs.
        </p>
      )}
      
      {status.responseCode === 409 && (
        <p className="message error-message">
          ✗ A category with this name already exists.
        </p>
      )}
      
      {status.responseCode === 500 && (
        <p className="message error-message">
          ✗ Server error. Please try again later.
        </p>
      )}
      
      {status.responseCode && status.responseCode !== 201 && status.responseCode !== 400 && status.responseCode !== 409 && status.responseCode !== 500 && (
        <p className="message error-message">
          ✗ Error creating category (Status: {status.responseCode})
        </p>
      )}
    </div>
  )
}