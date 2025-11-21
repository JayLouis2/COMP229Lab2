# Testing Guide - Portfolio Full Stack Application

## Pre-Testing Checklist

Before testing, ensure:
- [ ] MongoDB is running (local or Atlas)
- [ ] Backend dependencies installed (`npm install` in root)
- [ ] Frontend dependencies installed (`npm install` in client folder)
- [ ] Environment variables set in `.env` file
- [ ] Both servers are running

## Starting the Application

### Option 1: Quick Start
```powershell
.\start.ps1
```

### Option 2: Manual Start
```powershell
# Terminal 1 - Backend (from portfolio root)
npm start

# Terminal 2 - Frontend (from portfolio root)
cd client
npm run dev
```

Wait for both servers to start:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

## Testing Procedure

### 1. Test Users Module

#### Navigate to Users
1. Open browser to `http://localhost:3000`
2. Click "Users" in navigation

#### Test CREATE
1. Click "Add user" button
2. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@example.com
   - Password: password123
3. Click "Save"
4. ✅ Verify: User appears in the table

#### Test READ
1. ✅ Verify: Table displays all users
2. ✅ Verify: User data is correctly formatted

#### Test UPDATE
1. Click "Edit" on the John Doe entry
2. Modify fields:
   - First Name: Jonathan
3. Click "Save"
4. ✅ Verify: Updated data appears in table

#### Test DELETE (Single)
1. Click "Delete" on Jonathan Doe entry
2. Confirm deletion in dialog
3. ✅ Verify: User is removed from table

#### Test DELETE (All)
1. Add 2-3 more users
2. Click "Delete All" button
3. Confirm deletion in dialog
4. ✅ Verify: All users are removed

### 2. Test Projects Module

#### Navigate to Projects
1. Click "Projects" in navigation

#### Test CREATE
1. Click "Add project" button
2. Fill in the form:
   - Title: Portfolio Website
   - Completion Date: Select any date
   - Description: A modern portfolio website built with React and Express
3. Click "Save"
4. ✅ Verify: Project appears in the table

#### Test READ
1. ✅ Verify: Table displays project
2. ✅ Verify: Date is formatted correctly
3. ✅ Verify: Description is displayed

#### Test UPDATE
1. Click "Edit" on the project
2. Modify:
   - Title: Updated Portfolio Website
   - Description: Updated description text
3. Click "Save"
4. ✅ Verify: Changes appear in table

#### Test DELETE
1. Click "Delete" on the project
2. Confirm deletion
3. ✅ Verify: Project is removed

### 3. Test Services Module

#### Navigate to Services
1. Click "Services" in navigation

#### Test CREATE
1. Click "Add service" button
2. Fill in the form:
   - Title: Web Development
   - Description: Full-stack web development services using modern technologies
3. Click "Save"
4. ✅ Verify: Service appears in the table

#### Test CRUD Operations
1. Add 2-3 more services
2. Edit one service
3. Delete one service
4. ✅ Verify: All operations work correctly

### 4. Test Contacts Module

#### Navigate to Contacts
1. Click "Contacts" in navigation

#### Test CREATE
1. Click "Add contact" button
2. Fill in the form:
   - First Name: Jane
   - Last Name: Smith
   - Email: jane.smith@example.com
3. Click "Save"
4. ✅ Verify: Contact appears in the table

#### Test CRUD Operations
1. Add 2-3 more contacts
2. Edit one contact
3. Delete one contact
4. Test "Delete All"
5. ✅ Verify: All operations work correctly

## API Testing (Optional)

You can also test the API directly using curl or Postman:

### Test Users API
```powershell
# List all users
curl http://localhost:5000/api/users

# Create a user
curl -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -d '{\"firstname\":\"Test\",\"lastname\":\"User\",\"email\":\"test@example.com\",\"password\":\"pass123\"}'

# Get user by ID (replace ID)
curl http://localhost:5000/api/users/YOUR_USER_ID

# Update user (replace ID)
curl -X PUT http://localhost:5000/api/users/YOUR_USER_ID -H "Content-Type: application/json" -d '{\"firstname\":\"Updated\",\"lastname\":\"User\",\"email\":\"test@example.com\",\"password\":\"pass123\"}'

# Delete user (replace ID)
curl -X DELETE http://localhost:5000/api/users/YOUR_USER_ID
```

### Test Projects API
```powershell
# List all projects
curl http://localhost:5000/api/projects

# Create a project
curl -X POST http://localhost:5000/api/projects -H "Content-Type: application/json" -d '{\"title\":\"Test Project\",\"completion\":\"2024-12-31\",\"description\":\"Test description\"}'
```

### Test Services API
```powershell
# List all services
curl http://localhost:5000/api/services

# Create a service
curl -X POST http://localhost:5000/api/services -H "Content-Type: application/json" -d '{\"title\":\"Test Service\",\"description\":\"Test description\"}'
```

### Test Contacts API
```powershell
# List all contacts
curl http://localhost:5000/api/contacts

# Create a contact
curl -X POST http://localhost:5000/api/contacts -H "Content-Type: application/json" -d '{\"firstname\":\"Test\",\"lastname\":\"Contact\",\"email\":\"contact@example.com\"}'
```

## Error Testing

### Test Error Handling

1. **Test with backend stopped**
   - Stop the backend server
   - Try to add/edit/delete items in frontend
   - ✅ Verify: Error messages appear

2. **Test with invalid data**
   - Try to submit forms with empty required fields
   - ✅ Verify: Validation prevents submission

3. **Test with MongoDB stopped**
   - Stop MongoDB
   - Try to perform operations
   - ✅ Verify: Backend returns appropriate errors

## Common Issues and Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Ensure MongoDB is running: `mongod` or check service status
- Verify `MONGODB_URI` in `.env` file

### Issue: "Port 5000 already in use"
**Solution:**
- Change `PORT` in `.env` file
- Or stop the process using port 5000

### Issue: "Cannot GET /api/..."
**Solution:**
- Ensure backend is running
- Check vite proxy configuration in `client/vite.config.js`
- Verify API routes in `app.js`

### Issue: Frontend not loading
**Solution:**
- Ensure you ran `npm install` in client folder
- Check for console errors in browser DevTools
- Verify Vite dev server is running on port 3000

### Issue: CORS errors
**Solution:**
- Backend already has CORS enabled
- Use the Vite proxy (already configured)
- Don't access backend directly from browser

## Performance Testing

### Load Testing
1. Add 10+ records to each resource
2. ✅ Verify: Lists load quickly
3. ✅ Verify: No performance degradation

### Concurrent Operations
1. Open multiple browser tabs
2. Perform operations in different tabs
3. ✅ Verify: Data syncs when refreshing

## Browser Compatibility Testing

Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Edge
- [ ] Safari (if available)

## Responsive Design Testing

Test on different screen sizes:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

Use browser DevTools to toggle device emulation.

## Final Checklist

Before considering testing complete:
- [ ] All CRUD operations work for Users
- [ ] All CRUD operations work for Projects
- [ ] All CRUD operations work for Services
- [ ] All CRUD operations work for Contacts
- [ ] Error messages display correctly
- [ ] Loading states appear during operations
- [ ] Confirmation dialogs work for deletions
- [ ] Forms validate required fields
- [ ] Data persists in MongoDB
- [ ] Navigation between pages works
- [ ] UI is responsive on mobile
- [ ] No console errors in browser
- [ ] No errors in backend logs

## Success Criteria

✅ **Application is fully functional** if:
1. You can create, read, update, and delete records in all four modules
2. Data persists after page refresh
3. Error messages appear for failed operations
4. UI is responsive and user-friendly
5. No critical errors in console or logs

## Reporting Issues

If you encounter issues:
1. Check browser console (F12 → Console tab)
2. Check backend terminal for errors
3. Verify MongoDB connection
4. Review the SETUP.md file
5. Ensure all dependencies are installed
