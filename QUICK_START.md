# Quick Start Guide - Portfolio Full Stack Application

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (v7.0 or higher)
- npm or yarn

## Initial Setup (One-time)

### 1. Clone and Navigate
```bash
cd /workspaces/COMP229Lab2
```

### 2. Install Dependencies

#### Backend
```bash
npm install
```

#### Frontend
```bash
cd client
npm install
cd ..
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# The .env file is pre-configured for local development:
# - PORT=5000
# - MONGODB_URI=mongodb://127.0.0.1:27017/Portfolio
```

## Running the Application

### Start MongoDB (if not already running)
```bash
# Create data directory
mkdir -p ~/data/db

# Start MongoDB
mongod --dbpath ~/data/db --bind_ip 127.0.0.1 --port 27017 &
```

### Start Backend Server
```bash
# From project root
npm start

# Expected output:
# MongoDB connected: 127.0.0.1/Portfolio
# Server listening on port 5000
```

### Start Frontend Development Server
```bash
# Open new terminal
cd client
npm run dev

# Expected output:
# VITE v5.4.21  ready in 359 ms
# ➜  Local:   http://localhost:3000/
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Root**: http://localhost:5000/

## Testing the Application

### Manual Testing via Frontend
1. Open http://localhost:3000 in your browser
2. Navigate to any resource (Users, Projects, Services, Contacts)
3. Click "Add {resource}" to create new items
4. Click "Edit" to modify existing items
5. Click "Delete" to remove items
6. Click "Delete All" to clear all items

### API Testing via cURL

#### Test Root Endpoint
```bash
curl http://localhost:5000/
# Expected: {"message":"Welcome to my portfolio application"}
```

#### Test Users API
```bash
# List all users
curl http://localhost:5000/api/users

# Create a user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"firstname":"John","lastname":"Doe","email":"john@example.com","password":"password123"}'

# Update a user (replace {id} with actual ID)
curl -X PUT http://localhost:5000/api/users/{id} \
  -H "Content-Type: application/json" \
  -d '{"firstname":"John","lastname":"Updated","email":"john@example.com","password":"password123"}'

# Delete a user
curl -X DELETE http://localhost:5000/api/users/{id}
```

#### Test Projects API
```bash
# Create a project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"My Project","completion":"2025-12-31","description":"Project description"}'
```

#### Test Services API
```bash
# Create a service
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{"title":"Web Development","description":"Building web applications"}'
```

#### Test Contacts API
```bash
# Create a contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"firstname":"Jane","lastname":"Smith","email":"jane@example.com"}'
```

## Stopping the Application

### Stop Frontend
```bash
# In the frontend terminal, press Ctrl+C
```

### Stop Backend
```bash
# In the backend terminal, press Ctrl+C
```

### Stop MongoDB
```bash
# Find MongoDB process
pgrep mongod

# Kill the process
kill $(pgrep mongod)
```

## Troubleshooting

### Port Already in Use
```bash
# If port 5000 is in use
lsof -ti:5000 | xargs kill -9

# If port 3000 is in use
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
pgrep mongod

# If not running, start it
mongod --dbpath ~/data/db --bind_ip 127.0.0.1 --port 27017 &
```

### Cannot Find Module Error
```bash
# Reinstall backend dependencies
rm -rf node_modules package-lock.json
npm install

# Reinstall frontend dependencies
cd client
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
Make sure the backend is running before starting the frontend. The Vite proxy is configured to forward `/api` requests to `http://localhost:5000`.

## Development Workflow

### Backend Development
```bash
# Use nodemon for auto-reload
npm run dev
```

### Frontend Development
```bash
# Vite automatically hot-reloads
cd client
npm run dev
```

### Building for Production
```bash
# Build frontend
cd client
npm run build

# The build files will be in client/dist/
```

## Project Structure Overview

```
COMP229Lab2/
├── server.js              # Backend entry point
├── app.js                 # Express configuration
├── .env                   # Environment variables
├── package.json           # Backend dependencies
├── controllers/           # Request handlers
├── models/               # Mongoose schemas
├── routes/               # API endpoints
├── middlewares/          # Error handling
└── client/
    ├── src/
    │   ├── App.jsx       # Main React component
    │   ├── main.jsx      # React entry point
    │   ├── api.js        # API integration
    │   ├── styles.css    # Styling
    │   └── pages/        # React components
    ├── package.json      # Frontend dependencies
    └── vite.config.js    # Vite configuration
```

## Available Resources

### Backend APIs
- `/api/users` - User management
- `/api/projects` - Project management
- `/api/services` - Service management
- `/api/contacts` - Contact management

### Frontend Pages
- `/users` - Users management page
- `/projects` - Projects management page
- `/services` - Services management page
- `/contacts` - Contacts management page

## Features

✅ Full CRUD operations for all resources
✅ Form validation
✅ Error handling
✅ Success/error notifications
✅ Loading states
✅ Confirmation dialogs
✅ Responsive design
✅ Auto-dismiss messages
✅ Empty state handling
✅ Database persistence

## Support

For issues or questions, please check:
1. Ensure all dependencies are installed
2. Verify MongoDB is running
3. Check that ports 3000 and 5000 are available
4. Review the TEST_RESULTS.md for detailed testing information

---

**Application Status**: ✅ Fully Functional
**Last Tested**: November 22, 2025
