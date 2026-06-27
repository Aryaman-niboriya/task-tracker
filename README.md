# TaskFlow — Task Tracker

A **production-ready** Task Tracker application built with the MERN Stack as part of the COLL-EDGE CONNECT Full Stack Developer Intern assignment.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | [task-tracker.vercel.app](#) |
| **Backend API** | [task-tracker-api.onrender.com/api/tasks](#) |

---

## ✨ Features

### Mandatory
- ✅ **Full CRUD** — Create, Read, Update, Delete tasks
- ✅ **Form Validation** — Client-side (real-time) + Server-side validation
- ✅ **REST API** — Clean Express.js API with proper HTTP status codes
- ✅ **MongoDB Integration** — Mongoose schema with indexing
- ✅ **Responsive UI** — Mobile-first design, works on all screen sizes
- ✅ **Dynamic Updates** — No page refresh, all updates via Axios + React state
- ✅ **Deployed** — Frontend on Vercel, Backend on Render

### Bonus Features
- 🔍 **Search** — Search tasks by title, description, or tags
- 🔽 **Filtering** — Filter by status (todo / in-progress / completed) and priority (low / medium / high)
- 🔃 **Sorting** — Sort by date created, last updated, due date, or title (asc/desc)
- 🔔 **Toast Notifications** — Animated success/error/warning feedback for every action
- 📊 **Dashboard Stats** — Live stats: total, completed, in-progress, todo, overdue counts
- 📈 **Progress Bar** — Visual completion percentage
- ⚡ **Quick Status Toggle** — One-click status change from card
- 📅 **Due Dates** — With overdue visual indicators
- 🏷️ **Tags** — Comma-separated tag system
- 🧩 **Reusable Components** — Button, Modal, Badge, Toast, EmptyState, Loader, ConfirmDialog
- 🪝 **Custom Hook** — `useTasks` hook for clean data fetching / mutations
- 🌙 **Dark Mode** — Glassmorphism dark theme with gradient accents
- 🎨 **Animations** — Framer Motion for smooth entrance animations and modal transitions
- 🔐 **Environment Variables** — `.env` files for both frontend and backend

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Vanilla CSS (CSS Custom Properties) |
| Animations | Framer Motion |
| HTTP Client | Axios |
| Icons | React Icons |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Validation | express-validator (server) + custom (client) |
| Deployment | Vercel (FE) + Render (BE) + MongoDB Atlas |

---

## 📁 Project Structure

```
task-tracker/
├── backend/
│   ├── config/db.js            # MongoDB connection
│   ├── controllers/
│   │   └── taskController.js   # CRUD + Stats logic
│   ├── middleware/
│   │   └── validation.js       # express-validator middleware
│   ├── models/
│   │   └── Task.js             # Mongoose schema
│   ├── routes/
│   │   └── taskRoutes.js       # API routes
│   ├── .env.example
│   └── server.js               # Express entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Dashboard/StatsCards.jsx
        │   ├── Layout/Sidebar.jsx
        │   ├── Layout/Header.jsx
        │   ├── Tasks/TaskCard.jsx
        │   ├── Tasks/TaskForm.jsx
        │   ├── Tasks/TaskList.jsx
        │   ├── Tasks/TaskFilters.jsx
        │   └── UI/  (Button, Modal, Toast, Badge, Loader, EmptyState, ConfirmDialog)
        ├── hooks/useTasks.js    # Custom React hook
        ├── services/api.js      # Axios service layer
        ├── utils/constants.js   # App-wide constants
        ├── index.css            # Design system + all styles
        └── App.jsx              # Root component
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/task-tracker.git
cd task-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your MongoDB URI

npm run dev   # Starts on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# .env already has VITE_API_URL=http://localhost:5000/api

npm run dev   # Starts on http://localhost:5173
```

---

## 📡 API Reference

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Get all tasks (supports ?status, ?priority, ?search, ?sortBy, ?sortOrder) |
| `GET` | `/tasks/stats` | Get dashboard statistics |
| `GET` | `/tasks/:id` | Get single task |
| `POST` | `/tasks` | Create new task |
| `PUT` | `/tasks/:id` | Update task |
| `DELETE` | `/tasks/:id` | Delete task |

### Task Schema
```json
{
  "title": "String (required, 3-100 chars)",
  "description": "String (optional, max 500 chars)",
  "status": "todo | in-progress | completed",
  "priority": "low | medium | high",
  "dueDate": "ISO Date string (optional)",
  "tags": ["array", "of", "strings"]
}
```

### Example Request
```bash
# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build MERN Task Tracker",
    "description": "Complete the assignment for COLL-EDGE CONNECT",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2026-06-28",
    "tags": ["internship", "assignment"]
  }'
```

---

## 🌍 Deployment

### Backend (Render)
1. Create a new Web Service on [render.com](https://render.com)
2. Connect your GitHub repo
3. Set:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
4. Add environment variables: `MONGO_URI`, `PORT=10000`, `NODE_ENV=production`

### Frontend (Vercel)
1. Import project to [vercel.com](https://vercel.com)
2. Set:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add environment variable: `VITE_API_URL=https://your-render-url.onrender.com/api`

---

## 👤 Author

Built with ❤️ as a technical assignment for **COLL-EDGE CONNECT** Full Stack Developer Intern position.

---

*© 2026 TaskFlow. MERN Stack Task Tracker.*
