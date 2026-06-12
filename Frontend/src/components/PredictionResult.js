// src/components/PredictionResult.js
import React from 'react';
import './PredictionResult.css';
import { useNavigate } from 'react-router-dom';


const PredictionResult = ({ result }) => {
  // 1. Safety check - if no result, show nothing
  if (!result || result.error) {
    return (
      <div className="no-result">
        {result?.error ? (
          <div className="error-container">
            <h3>❌ Error</h3>
            <p>{result.message}</p>
          </div>
        ) : (
          <p>Upload an image to get started</p>
        )}
      </div>
    );
  }

  // 2. Initialize navigation hook
  const navigate = useNavigate();

  // 3. Function to go to products page
  const navigateToProductsPage = () => {
    navigate('/products', {
      state: {
        diseaseName: result.model_prediction.disease_name,
        plantName: result.model_prediction.plant_name,
        fertilizers: result.treatment.fertilizers || []
      }
    });
  };

  // 4. Extract data for easy use
  const { model_prediction, disease_info, treatment } = result;
  const isHealthy = model_prediction.disease_key === 'healthy';

  // 5. Render the component
  return (
    <div className="prediction-result">
      
      {/* HEADER - Prediction Summary */}
      <div className={`prediction-header ${isHealthy ? 'healthy' : 'diseased'}`}>
        <div className="status-badge">
          {isHealthy ? '✅ HEALTHY' : '⚠️ DISEASE DETECTED'}
        </div>
        <h2>{model_prediction.disease_name}</h2>
        <p className="plant-name">🌱 {model_prediction.plant_name}</p>
      </div>

      {/* PREDICTION CONFIDENCE */}
      <div className="confidence-section">
        <h3>🔬 Prediction Confidence</h3>
        <div className="confidence-meter">
          <div 
            className="confidence-fill"
            style={{ width: `${model_prediction.confidence_percentage}` }}
          >
            <span>{model_prediction.confidence_percentage}</span>
          </div>
        </div>
        <p className="confidence-text">
          The model is {model_prediction.confidence_percentage} confident.
        </p>
      </div>

      {/* DISEASE INFORMATION */}
      <div className="disease-info-section">
        <h3>📋 Disease Information</h3>
        
        {disease_info.symptoms && (
          <div className="info-item">
            <strong>Symptoms:</strong> {disease_info.symptoms}
          </div>
        )}
        
        <div className="info-grid">
          <div className="info-card">
            <div className="info-label">Severity</div>
            <div className={`info-value ${disease_info.severity === 'High' ? 'high' : 'low'}`}>
              {disease_info.severity}
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-label">Risk Level</div>
            <div className="info-value">{disease_info.risk_level}</div>
          </div>
        </div>
      </div>

      {/* TREATMENT RECOMMENDATIONS */}
      <div className="treatment-section">
        <h3>🛠️ {isHealthy ? 'Care Recommendations' : 'Treatment Plan'}</h3>
        
        <div className="steps-container">
          {treatment.steps && treatment.steps.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-number">{index + 1}</div>
              <div className="step-text">{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS SECTION - WITH VIEW BUTTON */}
      {treatment.fertilizers && treatment.fertilizers.length > 0 && (
        <div className="products-section">
          <h3>🧪 Recommended Products ({treatment.fertilizers.length})</h3>
          
          <div className="products-preview">
            <div className="preview-list">
              {treatment.fertilizers.slice(0, 3).map((fertilizer, index) => (
                <div key={index} className="preview-item">
                  <span className="preview-number">{index + 1}</span>
                  <span className="preview-name">{fertilizer}</span>
                </div>
              ))}
              {treatment.fertilizers.length > 3 && (
                <div className="preview-item">
                  <span className="preview-number">+{treatment.fertilizers.length - 3}</span>
                  <span className="preview-name">more products</span>
                </div>
              )}
            </div>
            
            {/* VIEW PRODUCTS BUTTON */}
            <button 
              className="view-products-btn"
              onClick={navigateToProductsPage}
            >
              <span className="btn-icon">🛍️</span>
              <span className="btn-text">View All Products</span>
              <span className="btn-arrow">→</span>
            </button>
            
            <p className="preview-note">
              Click to see product images, prices, and buying options
            </p>
          </div>
        </div>
      )}

      {/* NEXT STEPS */}
      <div className="next-steps-section">
        <h3>📅 Next Steps</h3>
        <ul className="next-steps-list">
          <li>Apply treatment within 24 hours</li>
          <li>Monitor plant daily for improvement</li>
          <li>Take preventive measures</li>
        </ul>
      </div>

    </div>
  );
};

export default PredictionResult;