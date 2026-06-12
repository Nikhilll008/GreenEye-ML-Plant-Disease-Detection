// src/pages/ProductsPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data passed from PredictionResult
  const { diseaseName = 'Unknown Disease', plantName = 'Tomato', fertilizers = [] } = location.state || {};

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Back to Results
      </button>
      
      <h1>🛒 Recommended Products for {diseaseName}</h1>
      <p>Plant: {plantName}</p>
      
      {fertilizers.length > 0 ? (
        <div>
          <h3>Products Found: {fertilizers.length}</h3>
          <ul>
            {fertilizers.map((product, index) => (
              <li key={index} style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
                <strong>{product}</strong>
                <div style={{ marginTop: '10px' }}>
                  <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent(product + ' fertilizer')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginRight: '10px', color: '#4285F4' }}
                  >
                    🔍 Search on Google
                  </a>
                  <a 
                    href={`https://www.amazon.com/s?k=${encodeURIComponent(product)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#FF9900' }}
                  >
                    🛒 Buy on Amazon
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No products recommended. Please go back and try again.</p>
      )}
    </div>
  );
};

export default ProductsPage;