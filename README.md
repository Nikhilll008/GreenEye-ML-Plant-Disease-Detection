# GreenEyee
GreenEye – Plant Disease Detection System
*Project Overview
GreenEye – Plant Disease Detection System
📌 Project Overview

GreenEye is a web-based application that helps detect diseases in plant leaves using Machine Learning techniques.

*Current Implementation: Tomato leaf diseases are used as the initial dataset, Future Scope: More plant species will be added in later versions The user uploads a leaf image, and the system predicts whether the plant is healthy or affected by a disease, along with basic treatment suggestions.

This project is developed as a college-level academic project to demonstrate the practical use of Machine Learning, Flask backend, and React frontend.

🎯 Objectives

To identify plant diseases from leaf images

To provide quick and simple treatment guidance

To build a complete full-stack ML project

To help farmers and students with an easy-to-use tool

🛠️ Technologies Used

Frontend: ReactJS, HTML, CSS

Backend: Python, Flask

Machine Learning: SVM (Support Vector Machine)

Image Processing: OpenCV

Dataset: PlantVillage (Tomato leaves)

🌱 Diseases Detected (Current Version)

Early Blight (Tomato)

Late Blight (Tomato)

Bacterial Spot (Tomato)

Healthy Leaf (Tomato)

Tomato plants are used only for the initial implementation. The system design supports adding more plant types in future updates.

⚙️ How the System Works

User uploads a tomato leaf image

Image is sent to the Flask backend

ML model analyzes the image

Disease name and confidence score are generated

Treatment suggestions are shown on the website

🚀 How to Run the Project
Backend Setup
cd backend
pip install -r requirements.txt
python app.py

Backend runs at: http://localhost:5000

Frontend Setup
cd frontend
npm install
npm start

Frontend runs at: http://localhost:3000

📊 Accuracy

Model Accuracy: 88.5% on test dataset

📁 Project Structure
GreenEye/
├── frontend/   # React user interface
├── backend/    # Flask server and ML model
├── samples/    # Sample leaf images
└── README.md
✅ Conclusion

GreenEye shows how Machine Learning techniques can be used in agriculture to detect plant diseases quickly and accurately. 
