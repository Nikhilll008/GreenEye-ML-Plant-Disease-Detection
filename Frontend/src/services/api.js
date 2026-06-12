/**
 * API SERVICE FOR GREENEYE
 * Handles all communication with backend Flask server
 * Provides clean, reusable functions for components
 */

import axios from 'axios';

// Base URL for Flask backend
const API_BASE_URL = 'http://127.0.0.1:5000';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for image processing
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Predict disease from uploaded image
 * @param {File} imageFile - Image file from input
 * @returns {Object} Prediction results with treatment info
 */
export const predictDisease = async (imageFile) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('image', imageFile);
    
    console.log('📤 Uploading image for prediction...');
    
    // Send POST request to /predict endpoint
    const response = await api.post('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    
    console.log('✅ Prediction received:', response.data.model_prediction.disease_name);
    return response.data;
    
  } catch (error) {
    console.error('❌ Prediction error:', error);
    
    // Return user-friendly error
    return {
      error: true,
      message: error.response?.data?.error || 'Failed to analyze image. Please try again.',
      details: error.message
    };
  }
};

/**
 * Get prediction history from server
 * @returns {Array} List of previous predictions
 */
export const getPredictionHistory = async () => {
  try {
    const response = await api.get('/history');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching history:', error);
    return { history: [] };
  }
};

/**
 * Get all disease information
 * @returns {Object} Complete disease database
 */
export const getAllDiseases = async () => {
  try {
    const response = await api.get('/diseases');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching diseases:', error);
    return {};
  }
};

/**
 * Check backend health status
 * @returns {Object} Health status information
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('❌ Backend not responding:', error);
    return { status: 'unhealthy', model_loaded: false };
  }
};

export default api;