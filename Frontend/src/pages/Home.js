/**
 * HOME PAGE - Main Application Interface
 * Combines ImageUpload and PredictionResult components
 */

import React, { useState, useEffect } from 'react';
import ImageUpload from '../components/ImageUpload';
import PredictionResult from '../components/PredictionResult';
import { checkHealth, getPredictionHistory } from '../services/api';
import './Home.css';

const Home = () => {
  // State variables
  const [predictionResult, setPredictionResult] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Check backend health on component mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const health = await checkHealth();
        setBackendStatus(health.status === 'healthy' ? 'connected' : 'error');
        
        // Load history if backend is healthy
        if (health.status === 'healthy') {
          const history = await getPredictionHistory();
          setPredictionHistory(history.history || []);
        }
      } catch (error) {
        setBackendStatus('error');
        console.error('Backend connection failed:', error);
      }
    };

    checkBackend();
    
    // Check every 30 seconds
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle new prediction
  const handleNewPrediction = (result) => {
    setPredictionResult(result);
    
    // Add to local history
    if (result && !result.error) {
      setPredictionHistory(prev => [
        {
          id: result.prediction_id,
          disease: result.model_prediction.disease_name,
          confidence: result.model_prediction.confidence_percentage,
          timestamp: new Date().toLocaleString(),
          image: result.image_name
        },
        ...prev.slice(0, 9) // Keep only last 10
      ]);
    }
  };

  // Clear results
  const handleClearResults = () => {
    setPredictionResult(null);
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>🌿 GreenEye - Plant Disease Detection</h1>
          <p className="tagline">AI-powered diagnosis and treatment for healthier plants</p>
          
          <div className="status-indicator">
            <div className={`status-dot ${backendStatus}`}></div>
            <span>
              Backend: {
                backendStatus === 'connected' ? 'Connected ✅' :
                backendStatus === 'checking' ? 'Checking...' : 'Disconnected ❌'
              }
            </span>
          </div>
        </div>
      </header>

      <div className="main-content">
        {/* Left Panel - Image Upload */}
        <div className="left-panel">
          <ImageUpload onPredictionComplete={handleNewPrediction} />
          
          {/* History Toggle */}
          <div className="history-section">
            <button 
              className="history-toggle"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? 'Hide History' : 'Show Recent Predictions'}
            </button>
            
            {showHistory && predictionHistory.length > 0 && (
              <div className="history-list">
                <h4>📜 Recent Predictions</h4>
                {predictionHistory.map(item => (
                  <div key={item.id} className="history-item">
                    <span className="history-disease">{item.disease}</span>
                    <span className="history-confidence">{item.confidence}</span>
                    <span className="history-time">{item.timestamp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="right-panel">
          <div className="results-header">
            <h2>🔍 Analysis Results</h2>
            {predictionResult && !predictionResult.error && (
              <button onClick={handleClearResults} className="clear-button">
                Clear Results
              </button>
            )}
          </div>
          
          {predictionResult ? (
            <PredictionResult result={predictionResult} />
          ) : (
            <div className="welcome-message">
              <div className="welcome-icon">👨‍🌾</div>
              <h3>Welcome to GreenEye!</h3>
              <p>Upload a photo of your tomato plant leaves to:</p>
              <ul>
                <li>🌿 Detect diseases early</li>
                <li>💊 Get treatment recommendations</li>
                <li>🧪 Find suitable fertilizers</li>
                <li>📊 Save plant health history</li>
              </ul>
              <div className="tips">
                <strong>Tips for best results:</strong>
                <p>• Take clear, well-lit photos of leaves</p>
                <p>• Focus on affected areas</p>
                <p>• Include both sides of leaves if possible</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>🌱 GreenEye - Final Year Project | Plant Disease Detection System</p>
        <p className="footer-note">
          This system detects common tomato diseases. For commercial farming, 
          consult with agricultural experts for confirmation.
        </p>
      </footer>
    </div>
  );
};

export default Home;