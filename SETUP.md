# Portfolio Full Stack Application - Setup Guide

## Overview
This is a full-stack portfolio application with a React frontend and Express/MongoDB backend. It provides complete CRUD operations for Users, Projects, Services, and Contacts.

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn package manager

## Project Structure
```
portfolio/
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── pages/      # CRUD pages for each resource
│   │   ├── api.js      # API client functions
│   │   ├── App.jsx     # Main app component with routing
│   │   └── main.jsx    # Application entry point
│   └── vite.config.js  # Vite configuration with proxy
├── models/             # MongoDB models
├── controllers/        # Express controllers
├── routes/             # Express routes
├── server.js           # Server entry point
└── app.js              # Express app configuration
```

## Installation

### 1. Install Backend Dependencies
```bash
# From the project root directory
npm install
```

### 2. Install Frontend Dependencies
```bash
# Navigate to client directory
cd client
npm install
cd ..
```

## Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/Portfolio
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Portfolio?retryWrites=true&w=majority
```

## Running the Application

### Option 1: Run Backend and Frontend Separately (Development)

#### Terminal 1 - Start Backend Server:
```bash
# From project root
npm start
# or for development with auto-restart:
npm run dev
```
Backend will run on `http://localhost:5000`

#### Terminal 2 - Start Frontend Development Server:
```bash
# From project root
cd client
npm run dev
```
Frontend will run on `http://localhost:3000`

The Vite dev server automatically proxies API requests from `/api/*` to the backend server.

### Option 2: Production Build

1. Build the frontend:
```bash
cd client
npm run build
```

2. Serve the built frontend from the backend (you'll need to configure Express to serve static files)

## API Endpoints

All API endpoints are prefixed with `/api`:

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `DELETE /api/users` - Delete all users

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `DELETE /api/projects` - Delete all projects

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `DELETE /api/services` - Delete all services

### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get contact by ID
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact
- `DELETE /api/contacts` - Delete all contacts

## Features

### Frontend Features
- ✅ Full CRUD operations for all resources
- ✅ Add and Edit forms for Users, Projects, Services, and Contacts
- ✅ List views with data tables
- ✅ Delete individual items or all items
- ✅ Client-side routing with React Router
- ✅ Responsive design
- ✅ Error handling and loading states
- ✅ Modern UI with gradient headers and hover effects

### Backend Features
- ✅ RESTful API architecture
- ✅ MongoDB integration with Mongoose
- ✅ CRUD operations for all models
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Request logging with Morgan

## Data Models

### User
```javascript
{
  firstname: String (required),
  lastname: String (required),
  email: String (required, unique),
  password: String (required),
  created: Date (auto),
  updated: Date (auto)
}
```

### Project
```javascript
{
  title: String (required),
  completion: Date,
  description: String,
  created: Date (auto),
  updated: Date (auto)
}
```

### Service
```javascript
{
  title: String (required),
  description: String,
  created: Date (auto),
  updated: Date (auto)
}
```

### Contact
```javascript
{
  firstname: String (required),
  lastname: String (required),
  email: String (required),
  created: Date (auto),
  updated: Date (auto)
}
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check MongoDB service
- Verify MONGODB_URI in .env file
- Check network connectivity for MongoDB Atlas

### Port Conflicts
- If port 5000 or 3000 is in use, update the ports in:
  - `.env` for backend PORT
  - `client/vite.config.js` for frontend port and proxy target

### CORS Issues
- Backend already has CORS enabled
- Ensure proxy is configured in `client/vite.config.js`

### Module Not Found Errors
- Run `npm install` in both root and client directories
- Delete `node_modules` and `package-lock.json`, then reinstall

## Testing the Application

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Use the navigation to access different resources:
   - Users: Add/Edit/Delete user accounts
   - Projects: Manage portfolio projects
   - Services: Manage offered services
   - Contacts: Manage contact information

## Development Notes

- Frontend uses Vite for fast development and hot module replacement
- Backend uses Express with modular route/controller architecture
- All controllers use a generic CRUD template for consistency
- State management in frontend uses React hooks (useState, useEffect)
- API calls are centralized in `client/src/api.js`

## Production Deployment

For production deployment:
1. Set production environment variables
2. Build frontend: `cd client && npm run build`
3. Configure Express to serve static files from `client/dist`
4. Use a process manager like PM2 for the Node.js server
5. Use a reverse proxy like Nginx
6. Enable HTTPS with SSL certificates

## Assignment Requirements Checklist

✅ Forms to add and edit users, projects, services, and contacts  
✅ Pages to list users, projects, services, and contacts  
✅ Delete functionality for individual items and all items  
✅ Backend API integration with frontend  
✅ State management with React hooks  
✅ CRUD operations for all models  
✅ Working full-stack portfolio application

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running and accessible
4. Check that both backend and frontend servers are running
