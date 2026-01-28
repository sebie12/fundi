import React from 'react';
import './blurText.css'; // or wherever you put the .loading-blur CSS

export function BlurText({ value, isLoading, placeholder = "0000.00", className = "" }) {
  // If loading, we show the placeholder with the blur class
  // If loaded, we show the actual value without the blur class
  return (
    <span className={`${className} ${isLoading ? 'loading-blur' : ''}`}>
      {isLoading ? placeholder : value}
    </span>
  );
}