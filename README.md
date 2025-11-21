# Portfolio Full Stack Application

A complete full-stack portfolio application with React frontend and Express/MongoDB backend, featuring CRUD operations for Users, Projects, Services, and Contacts.

## 🚀 Quick Start

```powershell
# Install dependencies
npm install
cd client
npm install
cd ..

# Start both servers
.\start.ps1
```

Then open your browser to: **http://localhost:3000**

## 📋 Features

✅ Full CRUD operations for Users, Projects, Services, and Contacts  
✅ Modern React frontend with React Router  
✅ RESTful API backend with Express and MongoDB  
✅ Responsive UI design  
✅ Form validation and error handling  
✅ State management with React Hooks  

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Complete installation and setup guide
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - How to test all features
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical details and completion status

## 🛠️ Technology Stack

**Frontend:**
- React 18
- React Router DOM 6
- Vite (build tool)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- Morgan (logging)
- CORS

## 📡 API Endpoints

All endpoints follow RESTful conventions:

```
GET    /api/{resource}       - List all
GET    /api/{resource}/:id   - Get by ID
POST   /api/{resource}       - Create new
PUT    /api/{resource}/:id   - Update
DELETE /api/{resource}/:id   - Delete one
DELETE /api/{resource}       - Delete all
```

Resources: `users`, `projects`, `services`, `contacts`

## 🏃‍♂️ Running the Application

### Option 1: Quick Start Script
```powershell
.\start.ps1
```

### Option 2: Manual Start
```powershell
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

## 🔧 Configuration

Create/update `.env` file in root:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/Portfolio
```

## 📦 Project Structure

```
portfolio/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # CRUD pages
│   │   ├── api.js      # API client
│   │   └── App.jsx     # Main app
│   └── vite.config.js  # Vite config with proxy
├── models/             # MongoDB models
├── controllers/        # Express controllers
├── routes/             # API routes
├── server.js           # Server entry point
└── app.js              # Express app config
```

## ✅ Assignment Requirements

All requirements completed:

✅ Forms to add and edit users, projects, services, and contacts  
✅ Pages to list and delete users, projects, services, and contacts  
✅ Backend API integration  
✅ State management  
✅ Full CRUD operations  
✅ Working full-stack application  

## 🧪 Testing

```powershell
# Test API endpoints
npm run test-api

# Manual testing
# Follow TESTING_GUIDE.md for comprehensive testing
```

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Edge
- Safari

## 🐛 Troubleshooting

**MongoDB not connecting?**
- Ensure MongoDB is running
- Check MONGODB_URI in .env

**Port already in use?**
- Change PORT in .env
- Kill process using the port

**Frontend not loading?**
- Run `npm install` in client folder
- Check Vite dev server is running

## 👨‍💻 Development

```powershell
# Backend development (with auto-restart)
npm run dev

# Frontend development (with HMR)
cd client
npm run dev
```

## 📝 License

ISC

## 🔗 Repository

https://github.com/JayLouis2/COMP229Lab2

