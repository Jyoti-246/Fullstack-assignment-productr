# 📦 Full Stack Product Management App

![MERN](https://img.shields.io/badge/MERN-Stack-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-brightgreen)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

A full-stack MERN application for managing products with features like create, update, delete, search, and publish/unpublish functionality.

---

## 🚀 Features

- ➕ Add new products
- ✏️ Edit products
- ❌ Delete products
- 🔍 Search products
- 📢 Publish / Unpublish products
- 🪟 Modal-based UI
- 🔗 React Router navigation
- 🗄️ MongoDB database integration

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Tailwind CSS
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- cors

---

## 📁 Project Structure

project-root/
│
├── client/
│ ├── src/
│ └── package.json
│
├── server/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── server.js
│ └── package.json
│
└── README.md

## ⚙️ Setup Instructions

---

## ▶️ Backend Setup

### 1. Go to backend folder

```bash
cd server
```

- npm install
- Create .env file inside backend
- npm run dev
- Backend runs at: http://localhost:5000

## ▶️ Client Setup

### 1. Go to Client folder

```bash
cd Client
```

- npm install
- npm run dev
- Frontend runs at: http://localhost:5173

## ▶️ API Endpoints

- Base URL: http://localhost:5000/products

Routes:

- GET /products → Get all products
- POST /products → Create product
- PUT /products/:id → Update product
- DELETE /products/:id → Delete product
