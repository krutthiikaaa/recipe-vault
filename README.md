# 🍽️ Recipe Vault

Recipe Vault is a full-stack recipe management platform that allows users to discover, create, save, and manage recipes through a modern and user-friendly interface. The application is built using the MERN stack and provides secure user authentication along with persistent cloud-based data storage.

## 🚀 Live Demo

Frontend: https://recipe-vault-snowy-beta.vercel.app

Backend: https://recipe-vault-backend-zpqc.onrender.com

---

## 📖 Project Overview

Recipe Vault provides a centralized platform where users can:

* Create and manage accounts
* Browse a collection of recipes
* View detailed recipe information
* Add custom recipes
* Save favorite recipes
* Store and retrieve data using MongoDB Atlas
* Access recipes from any device through cloud deployment

---

## ✨ Features

### 🔐 User Authentication

* User Signup
* User Login
* Persistent Authentication
* Secure User Data Storage

### 🍳 Recipe Management

* Add New Recipes
* View Recipe Details
* Edit Existing Recipes
* Delete Recipes
* Browse All Recipes

### ❤️ Favorites System

* Save Favorite Recipes
* Remove Favorites
* Quick Access to Saved Recipes

### ☁️ Cloud Database Integration

* MongoDB Atlas Integration
* Persistent Recipe Storage
* Persistent User Storage

### 🌐 Deployment

* Frontend deployed on Vercel
* Backend deployed on Render
* Database hosted on MongoDB Atlas

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Context API
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Vercel
* Render

---

## 📂 Project Structure

recipe-vault/
│
├── backend/
│ ├── models/
│ │ ├── Recipe.js
│ │ └── User.js
│ ├── server.js
│ └── package.json
│
├── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── data/
│ └── styles/
│
├── public/
├── package.json
└── vite.config.js

---

## 🔄 Application Workflow

1. User registers through the Signup page.
2. User information is stored in MongoDB Atlas.
3. User logs into the application.
4. Users can browse recipes available in the platform.
5. New recipes can be created through the Add Recipe page.
6. The frontend sends requests to the Express backend.
7. The backend processes requests and stores data in MongoDB Atlas.
8. Stored recipes are retrieved and displayed dynamically in the application.

---

## 📸 Key Functionalities

* User Registration & Login
* Recipe Creation
* Recipe Viewing
* Favorites Management
* MongoDB Atlas Integration
* Cloud Deployment

---

## 🔮 Future Enhancements

* Recipe Ownership Tracking
* Advanced Search and Filtering
* Recipe Categories & Tags
* User Profile Customization
* Recipe Ratings and Reviews
* Image Upload Support

---

## 👨‍💻 Team

Developed as part of a full-stack web development project using the MERN stack.

---

## 📄 License

This project is intended for educational and learning purposes.
