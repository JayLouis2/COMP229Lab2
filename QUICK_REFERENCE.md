# Portfolio Full Stack Application - Quick Reference

## 🎯 What You Have

A complete full-stack portfolio application with:
- **4 Resource Modules**: Users, Projects, Services, Contacts
- **Full CRUD**: Create, Read, Update, Delete for all modules
- **Modern UI**: Responsive design with gradient styling
- **API Integration**: React frontend connected to Express backend
- **State Management**: React Hooks for component state
- **Data Persistence**: MongoDB database storage

## 🚀 Start Application (3 Steps)

### Step 1: Ensure MongoDB is Running
```powershell
# Check if MongoDB is running
mongod --version

# Start MongoDB (if needed)
# Windows: Check MongoDB Compass or run 'mongod'
# Or use MongoDB Atlas connection string in .env
```

### Step 2: Start the Application
```powershell
# From portfolio directory
.\start.ps1
```

### Step 3: Open Browser
Navigate to: **http://localhost:3000**

## 📊 Application Structure

```
Frontend (Port 3000)          Backend (Port 5000)         Database
┌──────────────────┐         ┌─────────────────┐        ┌──────────┐
│                  │         │                 │        │          │
│  React App       │─────────▶  Express API    │────────▶ MongoDB  │
│  - Users Page    │◀─────────  /api/users     │◀────────          │
│  - Projects Page │   HTTP    /api/projects   │  CRUD   │          │
│  - Services Page │  Requests /api/services   │         │          │
│  - Contacts Page │           /api/contacts   │         │          │
│                  │         │                 │        │          │
└──────────────────┘         └─────────────────┘        └──────────┘
```

## 🎨 Features Showcase

### Users Module
**Fields**: First Name, Last Name, Email, Password

**Actions**:
- ➕ Add new users
- ✏️ Edit existing users
- 🗑️ Delete individual users
- 🗑️ Delete all users

### Projects Module
**Fields**: Title, Completion Date, Description (textarea)

**Actions**:
- ➕ Add new projects
- ✏️ Edit project details
- 🗑️ Delete individual projects
- 🗑️ Delete all projects

### Services Module
**Fields**: Title, Description (textarea)

**Actions**:
- ➕ Add new services
- ✏️ Edit service details
- 🗑️ Delete individual services
- 🗑️ Delete all services

### Contacts Module
**Fields**: First Name, Last Name, Email

**Actions**:
- ➕ Add new contacts
- ✏️ Edit contact information
- 🗑️ Delete individual contacts
- 🗑️ Delete all contacts

## 🔌 API Quick Reference

### Base URL
```
http://localhost:5000/api
```

### Endpoints Pattern
All resources follow the same pattern:

```javascript
// Get all items
GET /api/{resource}

// Get single item
GET /api/{resource}/:id

// Create new item
POST /api/{resource}
Body: { ...data }

// Update item
PUT /api/{resource}/:id
Body: { ...data }

// Delete single item
DELETE /api/{resource}/:id

// Delete all items
DELETE /api/{resource}
```

**Resources**: `users`, `projects`, `services`, `contacts`

## 💻 File Locations

### Frontend Files
```
client/
├── src/
│   ├── App.jsx              # Main app with navigation
│   ├── main.jsx             # Entry point
│   ├── api.js               # API client functions
│   ├── styles.css           # Styling
│   └── pages/
│       ├── CrudPage.jsx     # Reusable CRUD component
│       ├── Users.jsx        # Users configuration
│       ├── Projects.jsx     # Projects configuration
│       ├── Services.jsx     # Services configuration
│       └── Contacts.jsx     # Contacts configuration
└── vite.config.js           # Proxy configuration
```

### Backend Files
```
portfolio/
├── server.js                # Server entry point
├── app.js                   # Express app configuration
├── models/
│   ├── user.model.js
│   ├── project.model.js
│   ├── service.model.js
│   └── contact.model.js
├── controllers/
│   ├── template.js          # Generic CRUD controller
│   └── [resource].controller.js
└── routes/
    └── [resource].routes.js
```

## 🎯 Key Concepts

### State Management
```javascript
// Component state with React Hooks
const [items, setItems] = useState([])      // Store list of items
const [loading, setLoading] = useState(false) // Loading indicator
const [error, setError] = useState(null)    // Error messages
const [editing, setEditing] = useState(null) // Track edit mode
const [form, setForm] = useState({})        // Form data
```

### API Calls
```javascript
// All API functions in client/src/api.js
import * as api from '../api'

api.list(resource)              // Get all items
api.getById(resource, id)       // Get one item
api.create(resource, data)      // Create item
api.update(resource, id, data)  // Update item
api.remove(resource, id)        // Delete one item
api.removeAll(resource)         // Delete all items
```

### Reusable Component
```javascript
// One component handles all CRUD operations
<CrudPage 
  resource="users"              // API endpoint
  fields={[                     // Form configuration
    { name: 'firstname', label: 'First Name' },
    { name: 'email', label: 'Email', type: 'email' }
  ]} 
/>
```

## 🛠️ Common Tasks

### Add a New Field to a Model

1. **Update Backend Model** (`models/[resource].model.js`)
```javascript
const Schema = new mongoose.Schema({
  // existing fields...
  newField: { type: String, required: false }
})
```

2. **Update Frontend Page** (`client/src/pages/[Resource].jsx`)
```javascript
const fields = [
  // existing fields...
  { name: 'newField', label: 'New Field' }
]
```

3. Restart servers

### Change Database
Update `.env` file:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/NewDatabaseName
```

### Change Ports
Update `.env` for backend:
```env
PORT=8000
```

Update `client/vite.config.js` for frontend:
```javascript
server: {
  port: 4000,
  proxy: {
    '/api': {
      target: 'http://localhost:8000'  // Match backend port
    }
  }
}
```

## 📱 User Interface

### Navigation Bar
```
Portfolio Admin
[Users] [Projects] [Services] [Contacts]
```

### Page Layout
```
┌─────────────────────────────────────┐
│ [Add {resource}]  [Delete All]      │
├─────────────────────────────────────┤
│ Table with data                     │
│ ┌──────┬──────┬──────┬─────────┐  │
│ │ Name │ Data │ ...  │ Actions │  │
│ ├──────┼──────┼──────┼─────────┤  │
│ │ John │ Doe  │ ...  │ [E] [D] │  │
│ └──────┴──────┴──────┴─────────┘  │
├─────────────────────────────────────┤
│ Add/Edit Form                       │
│ ┌─────────────────────────────────┐│
│ │ Title: [___________]             ││
│ │ Description: [___________]       ││
│ │ [Save] [Cancel]                  ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

## ✅ Pre-Submission Checklist

Before submitting your assignment:

- [ ] MongoDB is running and connected
- [ ] Both frontend and backend start without errors
- [ ] Can create users/projects/services/contacts
- [ ] Can edit existing items
- [ ] Can delete individual items
- [ ] Can delete all items
- [ ] Forms validate required fields
- [ ] Error messages display properly
- [ ] UI is responsive (test on mobile view)
- [ ] All navigation links work
- [ ] Data persists after page refresh
- [ ] No console errors in browser
- [ ] All four modules are functional

## 🎓 Assignment Requirements Status

✅ **Forms to add and edit** - All 4 modules have add/edit forms  
✅ **Pages to list** - All 4 modules have list pages with tables  
✅ **Delete functionality** - Single and bulk delete for all modules  
✅ **Backend integration** - All APIs connected via axios-like client  
✅ **State management** - React hooks (useState, useEffect)  
✅ **CRUD operations** - Full Create, Read, Update, Delete for all  
✅ **Working application** - Complete full-stack app ready to demo  

## 📞 Need Help?

1. **Check Documentation**:
   - `README.md` - Overview
   - `SETUP.md` - Detailed setup
   - `TESTING_GUIDE.md` - Testing procedures
   - `IMPLEMENTATION_SUMMARY.md` - Technical details

2. **Common Issues**:
   - MongoDB not running → Start MongoDB service
   - Port in use → Change ports in config files
   - Dependencies missing → Run `npm install`
   - Frontend not loading → Check Vite dev server

3. **Verify Setup**:
```powershell
# Run setup check
cd "portfolio"
.\start.ps1
```

## 🎉 Success Indicators

Your application is working correctly if you can:

1. ✅ Navigate between all four modules
2. ✅ Add new records in each module
3. ✅ See records appear in tables immediately
4. ✅ Edit records and see changes saved
5. ✅ Delete records and see them removed
6. ✅ Refresh page and data persists
7. ✅ See proper error messages on failures
8. ✅ Use the app on mobile screen sizes

**Congratulations! You have a fully functional full-stack portfolio application! 🚀**
