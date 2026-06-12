// src/pages/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleAnalyze = () => {
    if (selectedImage) {
      // Navigate to results page
      navigate('/results');
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo}>🌿 GreenEye</h1>
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.heroSection}>
          <h2 style={styles.heroTitle}>Smart Crop Disease Detection</h2>
          <p style={styles.heroSubtitle}>
            Identify plant diseases with AI-powered image detection
          </p>
        </div>

        {/* Upload Section */}
        <div style={styles.uploadCard}>
          <div style={styles.uploadHeader}>
            <h3 style={styles.uploadTitle}>Upload Plant Image</h3>
            <p style={styles.uploadSubtitle}>
              Supports JPG, PNG • Max 5MB
            </p>
          </div>

          <div 
            style={styles.dropZone}
            onClick={() => document.getElementById('fileInput').click()}
          >
            {imagePreview ? (
              <div style={styles.previewContainer}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={styles.previewImage}
                />
                <button 
                  style={styles.changeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                    setImagePreview(null);
                  }}
                >
                  Change Image
                </button>
              </div>
            ) : (
              <>
                <div style={styles.uploadIcon}>📁</div>
                <p style={styles.dropText}>Drag & Drop Image</p>
                <p style={styles.orText}>or</p>
                <div style={styles.browseButton}>
                  click to browse
                </div>
              </>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
          </div>

          {/* Stats */}
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>99%</div>
              <div style={styles.statLabel}>Accuracy</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>60s</div>
              <div style={styles.statLabel}>Speed</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>50+</div>
              <div style={styles.statLabel}>Crops</div>
            </div>
          </div>

          {/* Action Button */}
          <button 
            style={selectedImage ? styles.analyzeButtonActive : styles.analyzeButton}
            onClick={handleAnalyze}
            disabled={!selectedImage}
          >
            {selectedImage ? '🌿 Analyze Image' : 'Select Image First'}
          </button>

          <p style={styles.uploadNote}>
            Upload plant images and get instant, accurate disease diagnosis with treatment recommendations
          </p>
        </div>

        {/* Start Button */}
        <button style={styles.startButton} onClick={() => navigate('/upload')}>
          Start Detection
        </button>
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    padding: '20px 40px',
    background: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  logo: {
    fontSize: '32px',
    color: '#4CAF50',
    margin: '0',
    fontWeight: '700'
  },
  mainContent: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '0 20px',
    textAlign: 'center'
  },
  heroSection: {
    marginBottom: '40px'
  },
  heroTitle: {
    fontSize: '42px',
    color: '#2E7D32',
    margin: '0 0 15px 0',
    fontWeight: '700',
    lineHeight: '1.2'
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#666',
    margin: '0'
  },
  uploadCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  uploadHeader: {
    marginBottom: '30px'
  },
  uploadTitle: {
    fontSize: '28px',
    color: '#333',
    margin: '0 0 10px 0',
    fontWeight: '600'
  },
  uploadSubtitle: {
    fontSize: '16px',
    color: '#666',
    margin: '0'
  },
  dropZone: {
    border: '3px dashed #81C784',
    borderRadius: '15px',
    padding: '60px 40px',
    marginBottom: '30px',
    cursor: 'pointer',
    transition: 'border-color 0.3s',
    background: '#f9fdf8'
  },
  uploadIcon: {
    fontSize: '48px',
    marginBottom: '20px',
    color: '#4CAF50'
  },
  dropText: {
    fontSize: '18px',
    color: '#333',
    margin: '0 0 10px 0',
    fontWeight: '500'
  },
  orText: {
    fontSize: '14px',
    color: '#999',
    margin: '10px 0'
  },
  browseButton: {
    display: 'inline-block',
    background: '#4CAF50',
    color: 'white',
    padding: '12px 30px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.3s'
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  },
  previewImage: {
    maxWidth: '300px',
    maxHeight: '200px',
    borderRadius: '10px',
    border: '2px solid #e0e0e0'
  },
  changeButton: {
    background: '#757575',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    margin: '30px 0'
  },
  statItem: {
    textAlign: 'center'
  },
  statValue: {
    fontSize: '36px',
    color: '#4CAF50',
    fontWeight: '700',
    marginBottom: '5px'
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500'
  },
  analyzeButton: {
    width: '100%',
    padding: '20px',
    background: '#e0e0e0',
    color: '#999',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'not-allowed',
    marginBottom: '20px'
  },
  analyzeButtonActive: {
    width: '100%',
    padding: '20px',
    background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'transform 0.3s'
  },
  uploadNote: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    maxWidth: '500px',
    margin: '0 auto'
  },
  startButton: {
    background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
    color: 'white',
    border: 'none',
    padding: '18px 50px',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(76, 175, 80, 0.3)',
    transition: 'transform 0.3s'
  }
};

export default Dashboard;