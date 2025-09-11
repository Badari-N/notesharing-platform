# 📘 Notes Sharing Platform usinG Firebase


A full-stack notes sharing application built with **React**, **Express**, and **Firebase**.  
Users can register, log in, upload files, and share notes securely. File handling is managed using **Multer**, storage is done in **Firebase Storage**, and **CORS** ensures safe communication between frontend and backend.  

---

## 🚀 Features
- 🔑 User authentication with Firebase  
- 📂 File upload & storage using Firebase Storage  
- ⚡ Express backend with Multer for file handling  
- 🌍 CORS-enabled secure communication  
- 🎨 React frontend with a neat UI  

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```
### 2. Install dependencies
- Backend
```bash
cd backend
npm install express firebase multer cors
```
- Frontend
```bash
cd frontend
npm install react react-dom firebase
```
## Firebase Setup
### 1. Create a Firebase Project

- Go to Firebase Console

  - Click Add Project → choose a name → finish setup

### 2. Enable Authentication

  - Go to Build > Authentication

      - Enable Email/Password authentication

### 3. Enable Firebase Storage

  - Go to Build > Storage

      - Create a storage bucket (default works fine)


### 4. Download serviceAccountKey.json

  - Navigate to Project Settings > Service Accounts

     - Click Generate new private key → download JSON file

     - Place it inside your backend/ folder

- ⚠️ Add it to .gitignore so it doesn’t get pushed to GitHub

### 5. Configure Firebase in Frontend

- In Project Settings > General > Your apps, select Web app

    - Copy the config object
## Running Locally
### Backend
```bash
cd backend
node server.js
```
### Frontend
```bash
cd frontend
npm start
```
