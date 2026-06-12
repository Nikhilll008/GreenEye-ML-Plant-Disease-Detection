// src/components/Sidebar.js
import React from 'react';
// import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">🌿 GreenEye</h1>
        <p className="sidebar-tagline">AI-Powered Tool</p>
      </div>
      
      <div className="sidebar-menu">
        <button 
          className={`menu-item ${activeTab === 'detect' ? 'active' : ''}`}
          onClick={() => setActiveTab('detect')}
        >
          <span className="menu-icon">🔍</span>
          <span className="menu-text">Detect Disease</span>
        </button>
        
        <button 
          className={`menu-item ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          <span className="menu-icon">📊</span>
          <span className="menu-text">Analysis Results</span>
        </button>
        
        <button 
          className={`menu-item ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <span className="menu-icon">📅</span>
          <span className="menu-text">History</span>
        </button>
        
        <button 
          className={`menu-item ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <span className="menu-icon">🛒</span>
          <span className="menu-text">Products Store</span>
        </button>
        
        <button 
          className={`menu-item ${activeTab === 'help' ? 'active' : ''}`}
          onClick={() => setActiveTab('help')}
        >
          <span className="menu-icon">❓</span>
          <span className="menu-text">Help & Support</span>
        </button>
      </div>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">👨‍🌾</div>
          <div className="user-info">
            <h4>Farmer User</h4>
            <p>Premium Account</p>
          </div>
        </div>
        <button className="logout-btn">
          <span className="logout-icon">🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;