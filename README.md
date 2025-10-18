# Portfolio Backend

Simple Express/Mongoose backend for COMP229 portfolio assignment.

Prerequisites:
- Node.js (14+)
- MongoDB (local or Atlas)

Setup:
1. Install dependencies: npm install
2. Create a `.env` file with MONGO_URI (optional) and PORT.
   Example `.env` (see `.env.example`):

Try it:
1. Start server: npm run dev (requires nodemon) or npm start
2. Use Postman/Thunder Client to hit endpoints at http://localhost:3000/api/contacts, /api/projects, /api/services, /api/users

Notes:
- Password hashing and auth are intentionally omitted for the assignment scope.
