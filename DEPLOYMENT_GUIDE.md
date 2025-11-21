# Cloud Deployment Guide - Portfolio Full Stack Application

This guide provides step-by-step instructions for deploying your Portfolio Application to cloud providers.

## Overview

You'll need to deploy two separate applications:
1. **Backend API** (Express + MongoDB)
2. **Frontend** (React SPA)

## Recommended Cloud Providers

### Backend Options:
- **Render** (Free tier available, recommended)
- **Railway** (Free tier available)
- **Heroku** (Paid)
- **Vercel** (With serverless functions)

### Frontend Options:
- **Vercel** (Free tier, recommended)
- **Netlify** (Free tier)
- **GitHub Pages** (Free, static only)
- **Render** (Free tier)

### Database Options:
- **MongoDB Atlas** (Free tier, recommended)
- **Railway MongoDB** (Integrated)

---

## Part 1: Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create a new cluster (Free M0 cluster)
4. Wait for cluster to be created (2-3 minutes)

### Step 2: Configure Database Access
1. Click "Database Access" in left menu
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `portfoliouser`
5. Password: Generate secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 3: Configure Network Access
1. Click "Network Access" in left menu
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 4: Get Connection String
1. Click "Database" in left menu
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `Portfolio`

Example:
```
mongodb+srv://portfoliouser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/Portfolio?retryWrites=true&w=majority
```

**Save this connection string** - you'll need it for backend deployment!

---

## Part 2: Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment

1. **Update `.env.example` file** in project root:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string_here
NODE_ENV=production
```

2. **Create `render.yaml`** in project root:
```yaml
services:
  - type: web
    name: portfolio-backend
    env: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: MONGODB_URI
        sync: false
      - key: NODE_ENV
        value: production
```

3. **Ensure `package.json` has correct scripts**:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

4. **Update CORS in `app.js`** (if needed):
```javascript
// Allow all origins in production (or specify your frontend URL)
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

### Step 2: Deploy to Render

1. Go to https://render.com
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Select your portfolio repository
6. Configure:
   - **Name**: `portfolio-backend` (or your choice)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

7. Add Environment Variables:
   - Click "Advanced" → "Add Environment Variable"
   - `MONGODB_URI`: Paste your MongoDB Atlas connection string
   - `NODE_ENV`: `production`

8. Click "Create Web Service"
9. Wait for deployment (5-10 minutes)
10. **Save your backend URL**: `https://portfolio-backend-xxxx.onrender.com`

### Step 3: Test Backend
```bash
# Test the API
curl https://portfolio-backend-xxxx.onrender.com/
curl https://portfolio-backend-xxxx.onrender.com/api/users
```

---

## Part 3: Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Deployment

1. **Update API base URL** in `client/src/api.js`:
```javascript
// Get API URL from environment or use production backend
const baseUrl = import.meta.env.VITE_API_URL || '/api'

async function request(url, options = {}){
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.status !== 204 ? res.json() : null
}

export const list = (resource) => request(`${baseUrl}/${resource}`)
export const getById = (resource, id) => request(`${baseUrl}/${resource}/${id}`)
export const create = (resource, data) => request(`${baseUrl}/${resource}`, { method: 'POST', body: JSON.stringify(data) })
export const update = (resource, id, data) => request(`${baseUrl}/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const remove = (resource, id) => request(`${baseUrl}/${resource}/${id}`, { method: 'DELETE' })
export const removeAll = (resource) => request(`${baseUrl}/${resource}`, { method: 'DELETE' })
```

2. **Create `vercel.json`** in `client/` folder:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

3. **Create `.env.production`** in `client/` folder:
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to client folder:
```bash
cd client
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy:
```bash
vercel --prod
```

5. Set environment variable:
```bash
vercel env add VITE_API_URL production
# Enter: https://your-backend-url.onrender.com/api
```

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Add Environment Variables:
   - Click "Environment Variables"
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com/api`
   - Environment: Production

7. Click "Deploy"
8. Wait for deployment (2-5 minutes)
9. **Save your frontend URL**: `https://portfolio-frontend-xxxx.vercel.app`

### Step 3: Test Frontend
1. Visit your Vercel URL
2. Test all CRUD operations
3. Check browser console for errors

---

## Part 4: Alternative Deployment Options

### Option 1: Deploy Both on Render

#### Frontend on Render:
1. Create new "Static Site" on Render
2. Root Directory: `client`
3. Build Command: `npm install && npm run build`
4. Publish Directory: `client/dist`
5. Add environment variable: `VITE_API_URL`

### Option 2: Deploy on Netlify

#### Frontend on Netlify:
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub repository
4. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
5. Environment variables:
   - `VITE_API_URL`: Your backend URL + `/api`
6. Deploy

### Option 3: Railway (All-in-One)

1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Add MongoDB service
4. Add Node.js service (backend)
5. Add Static Site service (frontend)
6. Configure environment variables for each service

---

## Part 5: Post-Deployment Configuration

### Update Backend CORS

After deploying frontend, update backend to allow your frontend domain:

In `app.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

Redeploy backend after changes.

### Test Complete Integration

1. Visit frontend URL
2. Test each module:
   - ✅ Users CRUD operations
   - ✅ Projects CRUD operations
   - ✅ Services CRUD operations
   - ✅ Contacts CRUD operations
3. Check Network tab in browser DevTools
4. Verify API calls go to backend URL
5. Verify data persists in MongoDB Atlas

---

## Part 6: Submission Checklist

### For Assignment Submission:

✅ **GitHub Repositories**:
- Frontend repo pushed to GitHub
- Backend repo pushed to GitHub
- All files committed
- README with deployment URLs

✅ **Live URLs**:
- Backend API live and accessible
- Frontend app live and accessible
- Both URLs tested and working

✅ **ZIP Files**:
1. `frontend-portfolio.zip`:
   - Entire `client/` folder
   - Include `package.json`, `vite.config.js`
   - Include all source files

2. `backend-portfolio.zip`:
   - Root folder files (`server.js`, `app.js`, etc.)
   - Include `models/`, `controllers/`, `routes/`
   - Include `package.json`
   - Include `.env.example` (NOT `.env`)

### Creating ZIP Files:

**Windows PowerShell:**
```powershell
# Backend ZIP
Compress-Archive -Path ".\portfolio\*" -DestinationPath ".\backend-portfolio.zip" -Force

# Frontend ZIP (client folder only)
Compress-Archive -Path ".\portfolio\client\*" -DestinationPath ".\frontend-portfolio.zip" -Force
```

---

## Troubleshooting

### Backend Issues

**Problem**: Cannot connect to MongoDB
- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Verify connection string is correct
- Check database user credentials

**Problem**: Backend not starting
- Check Render logs
- Verify `package.json` start script
- Check environment variables

**Problem**: 502 Bad Gateway
- Backend might be sleeping (Render free tier)
- Wait 30 seconds and refresh
- Check backend logs for errors

### Frontend Issues

**Problem**: API calls failing
- Check `VITE_API_URL` environment variable
- Verify backend CORS settings
- Check backend is running
- Use browser DevTools Network tab

**Problem**: 404 on routes
- Check `vercel.json` or `_redirects` file
- Ensure rewrites are configured
- React Router needs SPA fallback

**Problem**: Environment variables not working
- Ensure variables start with `VITE_`
- Rebuild after adding environment variables
- Check production vs development environment

### CORS Issues

**Problem**: CORS errors in browser
- Update backend `app.js` CORS configuration
- Add frontend domain to allowed origins
- Redeploy backend

---

## Free Tier Limitations

### Render (Backend):
- Spins down after 15 minutes of inactivity
- First request after sleep takes 30+ seconds
- 750 hours/month free

### Vercel (Frontend):
- 100GB bandwidth/month
- Unlimited builds and deployments
- Custom domains supported

### MongoDB Atlas:
- 512MB storage
- Shared cluster
- Sufficient for development/demo

---

## Alternative: Single Repository Deployment

If you want to keep frontend and backend in one repository:

1. Create `package.json` in root with:
```json
{
  "scripts": {
    "install-all": "npm install && cd client && npm install",
    "build": "cd client && npm run build",
    "start": "node server.js"
  }
}
```

2. Configure backend to serve frontend build:
```javascript
// In app.js, after routes
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
  });
}
```

3. Deploy entire project to Render as web service

---

## Custom Domain (Optional)

### Add Custom Domain to Vercel:
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Add Custom Domain to Render:
1. Render Dashboard → Your Service → Settings → Custom Domains
2. Add your domain
3. Update DNS records as instructed

---

## Monitoring and Maintenance

### Check Deployment Health:
- **Render**: Check logs in dashboard
- **Vercel**: Check deployments and analytics
- **MongoDB Atlas**: Monitor database metrics

### Update Application:
1. Push changes to GitHub
2. Automatic deployment triggers (if configured)
3. Or manually redeploy from dashboard

---

## Summary of URLs Needed for Submission

After deployment, you should have:

1. **Backend GitHub URL**: `https://github.com/YourUsername/portfolio-backend`
2. **Frontend GitHub URL**: `https://github.com/YourUsername/portfolio-frontend`
3. **Backend Live URL**: `https://portfolio-backend-xxxx.onrender.com`
4. **Frontend Live URL**: `https://portfolio-frontend-xxxx.vercel.app`
5. **Backend ZIP**: `backend-portfolio.zip`
6. **Frontend ZIP**: `frontend-portfolio.zip`

**Remember**: Missing live deployment links incur 10% penalty each (20% total if both missing).

Good luck with your deployment! 🚀
