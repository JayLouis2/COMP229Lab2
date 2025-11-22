# Vercel Deployment Guide

## Prerequisites
1. Vercel account (sign up at https://vercel.com)
2. MongoDB Atlas account for production database (https://www.mongodb.com/cloud/atlas)
3. Vercel CLI installed (`npm install -g vercel`)

## Step 1: Set Up MongoDB Atlas (Production Database)

### Create MongoDB Atlas Cluster
1. Go to https://mongodb.com/cloud/atlas
2. Sign in or create an account
3. Create a new cluster (free tier is available)
4. Click "Connect" → "Connect your application"
5. Copy your connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/Portfolio?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual database password
7. Whitelist all IP addresses (0.0.0.0/0) for Vercel deployments

## Step 2: Deploy Backend to Vercel

### Login to Vercel
```bash
cd /workspaces/COMP229Lab2
vercel login
```

### Deploy Backend
```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? comp229lab2-backend (or your choice)
# - Directory? ./
# - Override settings? No
```

### Set Environment Variables
```bash
# Add MongoDB Atlas URI
vercel env add MONGODB_URI

# When prompted, paste your MongoDB Atlas connection string:
# mongodb+srv://username:password@cluster.mongodb.net/Portfolio?retryWrites=true&w=majority

# Select all environments (Production, Preview, Development)

# Add PORT (optional, Vercel sets this automatically)
vercel env add PORT
# Value: 5000

# Add NODE_ENV
vercel env add NODE_ENV
# Value: production
```

### Redeploy with Environment Variables
```bash
vercel --prod
```

### Note Your Backend URL
After deployment, you'll get a URL like:
```
https://comp229lab2-backend.vercel.app
```
**Save this URL - you'll need it for the frontend deployment!**

## Step 3: Update Frontend Configuration

### Update client/vercel.json
Edit `/workspaces/COMP229Lab2/client/vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend-url.vercel.app/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
Replace `your-backend-url.vercel.app` with your actual backend URL from Step 2.

### Update Frontend API Configuration (Optional)
Edit `client/src/api.js` to use environment variable:
```javascript
const baseUrl = import.meta.env.VITE_API_URL || 
                window.location.hostname === 'localhost' 
                ? '/api' 
                : 'https://your-backend-url.vercel.app/api'
```

## Step 4: Deploy Frontend to Vercel

### Navigate to Client Directory
```bash
cd /workspaces/COMP229Lab2/client
```

### Deploy Frontend
```bash
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? comp229lab2-frontend (or your choice)
# - Directory? ./
# - Override settings? No
# - Build Command? npm run build
# - Output Directory? dist
# - Development Command? npm run dev
```

### Deploy to Production
```bash
vercel --prod
```

### Note Your Frontend URL
After deployment, you'll get a URL like:
```
https://comp229lab2-frontend.vercel.app
```

## Step 5: Update Backend CORS

### Add Frontend URL to Backend Environment
```bash
cd /workspaces/COMP229Lab2

# Add FRONTEND_URL environment variable
vercel env add FRONTEND_URL

# Value: https://comp229lab2-frontend.vercel.app
# Select: Production
```

### Update app.js for CORS (if needed)
The current CORS configuration allows all origins. For production, you may want to restrict it:

```javascript
// In app.js
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

### Redeploy Backend
```bash
vercel --prod
```

## Quick Deploy Commands (After Initial Setup)

### Deploy Both (from project root)
```bash
# Backend
cd /workspaces/COMP229Lab2
vercel --prod

# Frontend
cd client
vercel --prod
```

## Troubleshooting

### Frontend can't connect to Backend
1. Verify backend URL in `client/vercel.json`
2. Check CORS settings in backend
3. Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
4. Check environment variables: `vercel env ls`

### Database Connection Fails
1. Verify MongoDB Atlas connection string is correct
2. Check IP whitelist in MongoDB Atlas (should include 0.0.0.0/0)
3. Verify database user has correct permissions
4. Check environment variables: `vercel env ls`

### Build Fails
```bash
# Check build locally first
cd client
npm run build

# If successful, try deploying again
vercel --prod
```

### View Logs
```bash
# Backend logs
vercel logs https://your-backend-url.vercel.app

# Frontend logs  
vercel logs https://your-frontend-url.vercel.app
```

## Environment Variables Summary

### Backend (.env for local, Vercel dashboard for production)
- `MONGODB_URI` - MongoDB Atlas connection string
- `PORT` - 5000 (Vercel sets this automatically)
- `NODE_ENV` - production
- `FRONTEND_URL` - Your frontend Vercel URL (optional, for CORS)

### Frontend
- `VITE_API_URL` - Your backend Vercel URL (optional, can use vercel.json rewrites)

## Alternative: Use Vercel Dashboard

You can also deploy using the Vercel Dashboard:
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Backend**: Root directory: `./`, Build command: `npm install`, Output: `./`
   - **Frontend**: Root directory: `./client`, Build command: `npm run build`, Output: `dist`
5. Add environment variables in Settings → Environment Variables

## Testing Production Deployment

### Test Backend
```bash
curl https://your-backend-url.vercel.app/
# Should return: {"message":"Welcome to my portfolio application"}

curl https://your-backend-url.vercel.app/api/users
# Should return: [] or array of users
```

### Test Frontend
1. Open https://your-frontend-url.vercel.app
2. Navigate through Users, Projects, Services, Contacts
3. Test CRUD operations
4. Check browser console for errors

## Important Notes

1. **MongoDB Atlas** is required for production (local MongoDB won't work on Vercel)
2. **Vercel Free Tier** has:
   - 100GB bandwidth/month
   - Serverless function execution limits
   - Should be sufficient for this portfolio project
3. **Environment Variables** must be set in Vercel dashboard or CLI
4. **Redeploy** after changing environment variables

## Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Vercel
- [ ] Backend environment variables set
- [ ] Backend URL working and returns welcome message
- [ ] Frontend `vercel.json` updated with backend URL
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL working and displays UI
- [ ] CRUD operations work from frontend
- [ ] Data persists in MongoDB Atlas

---

**Your deployed application URLs:**
- Frontend: `https://your-frontend-url.vercel.app`
- Backend: `https://your-backend-url.vercel.app`
