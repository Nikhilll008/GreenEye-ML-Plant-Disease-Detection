// src/components/Header.js
import React from 'react';
// import './Header.css';

const Header = ({ onNewDetection }) => {
  return (
    <div className="header">
      <div className="header-left">
        <h2>Dashboard</h2>
        <p>Welcome back! Ready for another analysis?</p>
      </div>
      
      <div className="header-right">
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value">99%</div>
            <div className="stat-label">Accuracy</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">60s</div>
            <div className="stat-label">Speed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">50+</div>
            <div className="stat-label">Crops</div>
          </div>
        </div>
        
        <button 
          className="new-detection-btn"
          onClick={onNewDetection}
        >
          <span className="btn-icon">➕</span>
          New Detection
        </button>
      </div>
    </div>
  );
};

export default Header;