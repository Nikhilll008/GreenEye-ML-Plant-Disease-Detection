from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import cv2
import numpy as np
import os
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (frontend-backend communication)

# ==================== MODEL LOADING ====================
MODEL_PATH = "model.pkl"
try:
    model = pickle.load(open(MODEL_PATH, "rb"))
    print("✅ ML Model loaded successfully!")
except:
    print("❌ Error: Could not load model.pkl")
    print("💡 Run train_model.py first to create the model")
    model = None

# ==================== DISEASE DATABASE ====================
try:
    with open("disease_database.json", "r") as f:
        disease_db = json.load(f)
    print("✅ Disease database loaded successfully!")
except:
    print("❌ Error loading disease database")
    disease_db = {}

# ==================== CLASS MAPPING ====================
# Map model class numbers to actual disease names
CLASS_MAPPING = {
    0: "bacterial_spot",    # Model's class 0 = bacterial_spot
    1: "early_blight",      # Model's class 1 = early_blight  
    2: "healthy",           # Model's class 2 = healthy
    3: "late_blight"        # Model's class 3 = late_blight
}

# ==================== IMAGE PROCESSING ====================
def preprocess_image(image_path):
    """
    Convert image to features for ML model
    Steps:
    1. Read image using OpenCV
    2. Resize to 224x224 pixels (standard for ML models)
    3. Normalize pixel values (0 to 1)
    4. Flatten to 1D array (required by SVM)
    """
    # Read image
    img = cv2.imread(image_path)
    if img is None:
        return None
    
    # Resize for consistency
    img = cv2.resize(img, (224, 224))
    
    # Convert BGR to RGB (OpenCV uses BGR by default)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Normalize pixel values (0-255 -> 0-1)
    img = img / 255.0
    
    # Flatten to 1D array (224*224*3 = 150,528 features)
    img_flat = img.reshape(1, -1)
    
    return img_flat

# ==================== PREDICTION HISTORY ====================
prediction_history = []

# ==================== API ROUTES ====================
@app.route("/")
def home():
    """Home route - API information"""
    return jsonify({
        "message": "🌿 GreenEye Plant Disease Detection API",
        "status": "active",
        "endpoints": {
            "POST /predict": "Upload image for disease prediction",
            "GET /history": "Get prediction history",
            "GET /diseases": "Get all disease information"
        },
        "supported_diseases": list(disease_db.keys())
    })

@app.route("/predict", methods=["POST"])
def predict():
    """
    Main prediction endpoint
    Expected: Image file in form-data with key 'image'
    Returns: Disease prediction with treatment recommendations
    """
    # Check if model is loaded
    if model is None:
        return jsonify({
            "error": "Model not loaded",
            "solution": "Train model first using train_model.py"
        }), 500
    
    # Check if image was uploaded
    if "image" not in request.files:
        return jsonify({
            "error": "No image file received",
            "help": "Send image with form-data key 'image'"
        }), 400
    
    # Save uploaded image
    image_file = request.files["image"]
    
    # Create uploads directory if it doesn't exist
    os.makedirs("uploads", exist_ok=True)
    
    # Generate unique filename with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"tomato_{timestamp}_{image_file.filename}"
    image_path = os.path.join("uploads", filename)
    
    # Save the file
    image_file.save(image_path)
    
    try:
        # Step 1: Preprocess image
        processed_img = preprocess_image(image_path)
        if processed_img is None:
            return jsonify({"error": "Could not process image"}), 400
        
        # Step 2: Make prediction
        prediction_class = model.predict(processed_img)[0]  # Get class number
        confidence_scores = model.predict_proba(processed_img)[0]  # Get probabilities
        confidence = np.max(confidence_scores)  # Highest probability
        
        # Step 3: Get disease name from mapping
        disease_key = CLASS_MAPPING.get(prediction_class, "unknown")
        
        # Step 4: Get treatment info from database
        disease_info = disease_db.get(disease_key, {})
        
        # Step 5: Format response
        result = {
            "status": "success",
            "prediction_id": timestamp,
            "image_name": filename,
            "upload_time": datetime.now().isoformat(),
            
            # Model prediction
            "model_prediction": {
                "class_id": int(prediction_class),
                "disease_key": disease_key,
                "disease_name": disease_info.get("disease_name", "Unknown"),
                "plant_name": disease_info.get("plant_name", "Tomato"),
                "confidence_score": float(confidence),
                "confidence_percentage": f"{(confidence * 100):.2f}%",
                "all_probabilities": {
                    CLASS_MAPPING[i]: float(confidence_scores[i]) 
                    for i in range(len(CLASS_MAPPING))
                }
            },
            
            # Disease information
            "disease_info": {
                "scientific_name": disease_info.get("scientific_name", ""),
                "symptoms": disease_info.get("symptoms", ""),
                "severity": "High" if disease_key != "healthy" else "None",
                "risk_level": "Immediate action needed" if disease_key != "healthy" else "Low risk"
            },
            
            # Treatment recommendations
            "treatment": {
                "steps": disease_info.get("treatment", disease_info.get("care_tips", [])),
                "fertilizers": disease_info.get("fertilizers", []),
                "fertilizer_images": disease_info.get("fertilizer_images", []),
                "prevention": disease_info.get("prevention", "")
            },
            
            # Additional info
            "next_steps": [
                f"Apply treatment within 24 hours" if disease_key != "healthy" else "Continue regular care",
                "Monitor plant daily for improvement",
                "Take preventive measures for surrounding plants"
            ]
        }
        
        # Save to history
        prediction_history.append({
            "id": timestamp,
            "disease": disease_info.get("disease_name", "Unknown"),
            "confidence": float(confidence),
            "timestamp": datetime.now().isoformat(),
            "image": filename
        })
        
        return jsonify(result)
        
    except Exception as e:
        # Error handling
        return jsonify({
            "error": "Prediction failed",
            "details": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

@app.route("/history", methods=["GET"])
def get_history():
    """Get prediction history"""
    return jsonify({
        "total_predictions": len(prediction_history),
        "history": prediction_history[-10:]  # Last 10 predictions
    })

@app.route("/diseases", methods=["GET"])
def get_diseases():
    """Get information about all diseases"""
    return jsonify(disease_db)

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint for monitoring"""
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
        "database_loaded": len(disease_db) > 0,
        "timestamp": datetime.now().isoformat()
    })

# ==================== MAIN EXECUTION ====================
if __name__ == "__main__":
    print("\n" + "="*50)
    print("🌿 GREENEYE - Plant Disease Detection System")
    print("="*50)
    print(f"📁 Model loaded: {model is not None}")
    print(f"📚 Diseases in database: {len(disease_db)}")
    print(f"🚀 Server starting on http://127.0.0.1:5000")
    print("="*50 + "\n")
    
    # Run Flask server
    app.run(debug=True, host="0.0.0.0", port=5000)