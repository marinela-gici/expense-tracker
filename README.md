# Expense Tracker App

This is a **Vite + React + Node.js** full-stack application designed to manage expenses, categories, and budgets efficiently. The backend handles data storage, email alerts via **SMTP**, and budget logic, while the frontend provides a fast and responsive UI powered by **Vite** and **React**.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Email Service Setup](#email-service-setup)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Decisions Made](#decisions-made)
- [Time Spent](#time-spent)
- [Challenges](#challenges)

---

## Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) (version 18.x.x or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for dependency management
- [MongoDB](https://www.mongodb.com/) (Atlas or local instance)

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
```bash
   git clone https://github.com/marinela-gici/expense-tracker
   cd expense-tracker
```

2. **Install dependencies:**
```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
```

---

## Environment Variables

### Frontend (.env)

Create a `.env` file in the `frontend` directory with the following variables:
```env
VITE_API_URL=http://localhost:5000/api
VITE_BUDGET_LIMIT=1000
```

### Backend (.env)

Create a `.env` file in the `backend` directory with the following variables:
```env
MONGO_URI=mongodb_atlas_connection_string
PORT=5000
BUDGET_LIMIT=1000
SMTP_HOST=mail.example.com
SMTP_PORT=465
SMTP_USER=info@example.com
SMTP_PASS=password
ALERT_EMAIL=alert@example.com
```

**Important:** Replace the placeholder values with your actual credentials:
- `MONGO_URI`: Your MongoDB Atlas connection string or local MongoDB URI
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: Your email service provider credentials
- `ALERT_EMAIL`: Email address where budget alerts should be sent

---

## Running the Project

### Development Mode

1. **Start the backend server:**
```bash
   cd backend
   npm run dev
```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server:**
```bash
   cd frontend
   npm run dev
```
   The frontend will run on `http://localhost:5173` (default Vite port)

### Production Mode

1. **Build the frontend:**
```bash
   cd frontend
   npm run build
```

2. **Start the backend:**
```bash
   cd backend
   npm start
```

---

## Email Service Setup

The application uses **Nodemailer** to send budget alert emails via SMTP. To set up email notifications:

1. **Choose an SMTP provider** (Gmail, SendGrid, Mailgun, etc.)
2. **Configure SMTP credentials** in the backend `.env` file
3. **For Gmail:** You may need to enable "Less secure app access" or use an App Password
4. **Test the configuration** by triggering a budget alert

---

## Project Structure
```
expense-tracker/
├── frontend/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
└── README.md
```

---

## Technologies Used

### Frontend
- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool and dev server
- **Axios 1.12.2** - HTTP client for API requests
- **ESLint** - Code linting

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB 6.20.0** - Database driver
- **Mongoose 8.19.2** - ODM for MongoDB
- **Nodemailer 7.0.10** - Email sending service
- **CORS 2.8.5** - Cross-origin resource sharing
- **Dotenv 17.2.3** - Environment variable management
- **Nodemon 3.1.10** - Development auto-reload

---

## Decisions Made

- Implemented budget alerts using Nodemailer for real-time notifications
- Used Vite for faster development experience compared to traditional bundlers

---

## Time Spent

- Total: 4.5 hours

---

## Challenges

- 

---
