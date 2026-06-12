// src/components/FertilizerCard.js
import React, { useState } from 'react';
import './FertilizerCard.css'; // Optional CSS

const FertilizerCard = ({ fertilizerName, diseaseName, plantName, index }) => {
  const [imageError, setImageError] = useState(false);
  
  // Create search queries for different platforms
  const searchQueries = {
    google: `${fertilizerName} for ${diseaseName} in ${plantName} agricultural product`,
    amazon: `${fertilizerName} agricultural fungicide pesticide`,
    flipkart: `${fertilizerName} plant medicine`,
    indiaMart: `${fertilizerName}`
  };

  // Function to open shopping site
  const openShoppingSite = (site) => {
    let url = '';
    const query = encodeURIComponent(searchQueries[site]);
    
    switch(site) {
      case 'google':
        url = `https://www.google.com/search?tbm=isch&q=${query}`;
        break;
      case 'amazon':
        url = `https://www.amazon.com/s?k=${query}`;
        break;
      case 'flipkart':
        url = `https://www.flipkart.com/search?q=${query}`;
        break;
      case 'indiaMart':
        url = `https://dir.indiamart.com/search.mp?ss=${query}`;
        break;
      default:
        url = `https://www.google.com/search?q=${query}`;
    }
    
    window.open(url, '_blank');
  };

  // Generate a placeholder image URL with text
  const getPlaceholderImage = () => {
    const colors = ['4CAF50', '2196F3', 'FF9800', '9C27B0'];
    const color = colors[index % colors.length];
    const text = encodeURIComponent(fertilizerName.substring(0, 15));
    return `https://via.placeholder.com/300x200/${color}/FFFFFF?text=${text}`;
  };

  return (
    <div className="fertilizer-card">
      {/* Product Image/Thumbnail */}
      <div className="product-image-container">
        <img 
          src={getPlaceholderImage()}
          alt={fertilizerName}
          className="product-thumbnail"
          onError={() => setImageError(true)}
        />
        <div className="product-label">
          <span className="product-number">#{index + 1}</span>
          <span className="product-type">Recommended</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title">{fertilizerName}</h3>
        <p className="product-description">
          Recommended for treating <strong>{diseaseName}</strong> in {plantName} plants.
        </p>
        
        {/* View Online Button */}
        <div className="view-online-section">
          <p className="section-title">🔍 View Online:</p>
          <div className="view-buttons">
            <button 
              onClick={() => openShoppingSite('google')}
              className="view-btn google-btn"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="btn-icon" />
              Google Images
            </button>
            <button 
              onClick={() => openShoppingSite('amazon')}
              className="view-btn amazon-btn"
            >
              <img src="https://www.amazon.com/favicon.ico" alt="Amazon" className="btn-icon" />
              Amazon
            </button>
          </div>
        </div>

        {/* Buy Online Links */}
        <div className="buy-online-section">
          <p className="section-title">🛒 Buy From:</p>
          <div className="buy-buttons">
            <button 
              onClick={() => openShoppingSite('flipkart')}
              className="buy-btn flipkart-btn"
            >
              Flipkart
            </button>
            <button 
              onClick={() => openShoppingSite('indiaMart')}
              className="buy-btn indiamart-btn"
            >
              IndiaMart
            </button>
            <button 
              onClick={() => openShoppingSite('amazon')}
              className="buy-btn amazon-btn"
            >
              Amazon
            </button>
          </div>
        </div>

        {/* Usage Tip */}
        <div className="usage-tip">
          <p>💡 <strong>Usage Tip:</strong> Follow manufacturer instructions. 
          Wear gloves while applying. Store in cool, dry place.</p>
        </div>
      </div>
    </div>
  );
};

export default FertilizerCard;