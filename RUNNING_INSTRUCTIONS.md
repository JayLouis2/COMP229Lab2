# Portfolio Application - Running Instructions

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or Docker)
- npm or yarn

## Quick Start Guide

### Option 1: Using Docker for MongoDB (Recommended)

1. **Start MongoDB Container**
   ```bash
   docker run -d --name mongodb -p 27017:27017 mongo:latest
   ```

2. **Install Backend Dependencies**
   ```bash
   npm install
   ```

3. **Create .env File**
   ```bash
   cp .env.example .env
   # Or create .env with:
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://127.0.0.1:27017/Portfolio
   ```

4. **Start Backend Server**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```
   Backend will run on http://localhost:5000

5. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

6. **Start Frontend Development Server**
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:3000

7. **Open Browser**
   Navigate to http://localhost:3000

### Option 2: Using MongoDB Atlas (Cloud)

1. **Get MongoDB Atlas Connection String**
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create a cluster
   - Get connection string

2. **Update .env File**
   ```bash
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Portfolio?retryWrites=true&w=majority
   ```

3. **Follow Steps 2, 4, 5, 6, 7 from Option 1**

## Features Implemented

### 1. Forms and Pages ✓
- **Add Forms**: Create new users, projects, services, and contacts
- **Edit Forms**: Update existing records with pre-filled data
- **List Pages**: Display all records in tables
- **Delete Functionality**: Remove individual items or all items at once

### 2. React and State Management ✓
- **useState**: Used for managing form state, items list, loading states, errors, and success messages
- **useEffect**: Used for fetching data on component mount and clearing messages
- **Controlled Components**: All form inputs are controlled with onChange handlers
- **Reusable Component**: CrudPage component handles all CRUD operations for different resources

### 3. API Integration ✓
- **Backend APIs**: All CRUD operations consume RESTful APIs
- **Create (POST)**: `/api/{resource}`
- **Read All (GET)**: `/api/{resource}`
- **Read One (GET)**: `/api/{resource}/:id`
- **Update (PUT)**: `/api/{resource}/:id`
- **Delete One (DELETE)**: `/api/{resource}/:id`
- **Delete All (DELETE)**: `/api/{resource}`
- **Database Storage**: All data is stored in MongoDB via backend
- **Database Retrieval**: All data is fetched from MongoDB via backend

### 4. Quality Assurance ✓
- **Error Handling**: Try-catch blocks on all API calls
- **Loading States**: UI feedback during operations
- **Validation**: Email format validation, required fields
- **User Feedback**: Success and error messages
- **Confirmation Dialogs**: Prevents accidental deletions
- **No Crashes**: Application handles all error scenarios gracefully

### 5. Version Control ✓
- Code pushed to GitHub repository
- All changes committed and tracked

## Application Structure

### Backend (Port 5000)
```
/workspaces/COMP229Lab2/
├── server.js              # Server entry point
├── app.js                 # Express app configuration
├── models/                # Mongoose schemas
│   ├── contact.model.js
│   ├── project.model.js
│   ├── service.model.js
│   └── user.model.js
├── controllers/           # Business logic
│   └── template.js        # Generic CRUD controller
├── routes/                # API routes
│   ├── contacts.routes.js
│   ├── projects.routes.js
│   ├── services.routes.js
│   └── users.routes.js
└── middlewares/           # Error handling
    └── errorHandler.js
```

### Frontend (Port 3000)
```
/workspaces/COMP229Lab2/client/
├── src/
│   ├── App.jsx           # Main app with routing
│   ├── main.jsx          # React entry point
│   ├── api.js            # API service layer
│   ├── styles.css        # Global styles
│   └── pages/
│       ├── CrudPage.jsx  # Reusable CRUD component
│       ├── Users.jsx     # Users page
│       ├── Projects.jsx  # Projects page
│       ├── Services.jsx  # Services page
│       └── Contacts.jsx  # Contacts page
└── vite.config.js        # Vite configuration with proxy
```

## Testing the Application

### Manual Testing Steps

1. **Navigate to Users Page**
   - Click "Users" in navigation
   - Add a new user with firstname, lastname, email, password
   - Edit the user
   - Delete the user

2. **Navigate to Projects Page**
   - Click "Projects" in navigation
   - Add a new project with title, completion date, description
   - Edit the project
   - Delete the project

3. **Navigate to Services Page**
   - Click "Services" in navigation
   - Add a new service with title and description
   - Edit the service
   - Delete the service

4. **Navigate to Contacts Page**
   - Click "Contacts" in navigation
   - Add a new contact with firstname, lastname, email
   - Edit the contact
   - Delete the contact

### API Testing (Optional)

Test backend directly:
```bash
# Create a contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"firstname":"John","lastname":"Doe","email":"john@example.com"}'

# Get all contacts
curl http://localhost:5000/api/contacts

# Update a contact (replace {id} with actual ID)
curl -X PUT http://localhost:5000/api/contacts/{id} \
  -H "Content-Type: application/json" \
  -d '{"firstname":"Jane","lastname":"Doe","email":"jane@example.com"}'

# Delete a contact (replace {id} with actual ID)
curl -X DELETE http://localhost:5000/api/contacts/{id}
```

## Troubleshooting

### Backend won't start
- Check if MongoDB is running: `docker ps | grep mongodb`
- Verify .env file exists with correct MONGODB_URI
- Check port 5000 is not in use: `lsof -i :5000`

### Frontend won't start
- Ensure backend is running first
- Check port 3000 is not in use: `lsof -i :3000`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### API calls failing
- Verify backend is running on port 5000
- Check browser console for errors
- Verify proxy configuration in vite.config.js

### Database connection errors
- Ensure MongoDB container is running: `docker start mongodb`
- Verify MONGODB_URI in .env file
- Check MongoDB logs: `docker logs mongodb`

## Stopping the Application

1. **Stop Frontend**: Press `Ctrl+C` in the terminal running `npm run dev`
2. **Stop Backend**: Press `Ctrl+C` in the terminal running `npm start`
3. **Stop MongoDB**: `docker stop mongodb`

## Production Deployment Notes

### Backend
- Set `NODE_ENV=production` in .env
- Use MongoDB Atlas for database
- Deploy to platforms like Render, Railway, or Heroku

### Frontend
- Build for production: `cd client && npm run build`
- Deploy to Vercel, Netlify, or similar
- Update VITE_API_URL environment variable to point to production backend

## Assignment Requirements Checklist

- ✅ Forms to add and edit users, projects, services, contacts
- ✅ Pages to list and delete users, projects, services, contacts
- ✅ React forms with useState/useReducer state management
- ✅ All CRUD operations consume backend APIs
- ✅ All data stored in database through backend
- ✅ All data retrieved from database through backend
- ✅ Error-free application that doesn't crash
- ✅ Code pushed to GitHub

## Support

For issues or questions:
1. Check this README for troubleshooting steps
2. Review error messages in browser console
3. Check backend logs in terminal
4. Verify MongoDB is running and accessible
