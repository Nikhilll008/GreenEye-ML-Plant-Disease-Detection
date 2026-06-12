/**
 * IMAGE UPLOAD COMPONENT
 * Allows users to upload tomato leaf images
 * Shows preview and upload status
 */

import React, { useState } from 'react';
import { predictDisease } from '../services/api';
import './imageUpload.css'; // Optional CSS for styling

const ImageUpload = ({ onPredictionComplete }) => {
  // State variables
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  /**
   * Handle file selection
   */
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image (JPEG, PNG, WebP)');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    // Clear previous error
    setError('');
    
    // Store selected file
    setSelectedImage(file);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    
    // Reset upload progress
    setUploadProgress(0);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }
    
    // Reset states
    setError('');
    setIsLoading(true);
    
    // Simulate upload progress (optional)
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
    
    try {
      // Call API for prediction
      const predictionResult = await predictDisease(selectedImage);
      
      // Complete progress
      setUploadProgress(100);
      clearInterval(progressInterval);
      
      // Check for errors in response
      if (predictionResult.error) {
        setError(predictionResult.message || 'Prediction failed');
      } else {
        // Pass result to parent component
        if (onPredictionComplete) {
          onPredictionComplete(predictionResult);
        }
      }
      
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  /**
   * Reset form
   */
  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setError('');
    setUploadProgress(0);
    // Revoke object URL to prevent memory leak
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  return (
    <div className="image-upload-container">
      <h2>📤 Upload Tomato Leaf Image</h2>
      
      <div className="upload-instructions">
        <p>For best results:</p>
        <ul>
          <li>Use clear, close-up photos of leaves</li>
          <li>Ensure good lighting</li>
          <li>Focus on affected areas</li>
          <li>Supported formats: JPG, PNG, WebP</li>
          <li>Max file size: 5MB</li>
        </ul>
      </div>

      {/* File input */}
      <div className="file-input-area">
        <label className="file-input-label">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            disabled={isLoading}
            className="file-input"
          />
          <div className="file-input-button">
            {selectedImage ? 'Change Image' : 'Choose Image'}
          </div>
        </label>
        
        {selectedImage && (
          <div className="file-info">
            <span>📁 {selectedImage.name}</span>
            <span>📏 {(selectedImage.size / 1024).toFixed(2)} KB</span>
          </div>
        )}
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="image-preview">
          <h4>Image Preview:</h4>
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="preview-image"
          />
        </div>
      )}

      {/* Upload Progress */}
      {isLoading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p>Analyzing image... {uploadProgress}%</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          onClick={handleSubmit}
          disabled={!selectedImage || isLoading}
          className="submit-button"
        >
          {isLoading ? '🔍 Analyzing...' : '🌿 Detect Disease'}
        </button>
        
        <button
          onClick={handleReset}
          className="reset-button"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;