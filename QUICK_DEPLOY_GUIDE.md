# Quick Cloud Deployment Guide

## ⚠️ IMPORTANT: Deploying avoids 20% penalty!

---

## Option A: Deploy Frontend to Vercel (5 minutes)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy Frontend
```bash
cd /workspaces/COMP229Lab2/client
vercel login
vercel --prod
```

### Step 3: Set Environment Variable
After deployment, add environment variable:
- Go to Vercel dashboard → Your project → Settings → Environment Variables
- Add: `VITE_API_URL` = `YOUR_BACKEND_URL/api`
- Redeploy

**Alternative**: Deploy via Vercel Dashboard
1. Go to https://vercel.com
2. Import project from GitHub: `JayLouis2/COMP229Lab2`
3. Set root directory: `client`
4. Click Deploy

---

## Option B: Deploy Backend to Render (10 minutes)

### Step 1: Create MongoDB Atlas Database (Free)
```bash
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster (M0)
4. Create database user
5. Get connection string
```

### Step 2: Deploy to Render
```bash
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect repository: JayLouis2/COMP229Lab2
5. Configure:
   - Name: portfolio-backend
   - Environment: Node
   - Build Command: npm install
   - Start Command: npm start
   - Instance Type: Free
```

### Step 3: Add Environment Variables
```
MONGODB_URI = your_mongodb_atlas_connection_string
PORT = 5000
NODE_ENV = production
```

### Step 4: Deploy
Click "Create Web Service" and wait for deployment.

**Your backend URL**: `https://portfolio-backend-xxxx.onrender.com`

---

## Option C: Deploy Backend to Railway (5 minutes)

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Deploy
```bash
cd /workspaces/COMP229Lab2
railway login
railway init
railway add
railway up
```

### Step 3: Add MongoDB
```bash
railway add --plugin mongodb
```

### Step 4: Set Environment Variables
```bash
railway variables set MONGODB_URI=mongodb://...
railway variables set NODE_ENV=production
```

**Your backend URL**: Will be provided after deployment

---

## Option D: Deploy Frontend to Netlify (5 minutes)

### Step 1: Build Frontend
```bash
cd /workspaces/COMP229Lab2/client
npm run build
```

### Step 2: Deploy
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

### Step 3: Set Environment Variable
- Go to Netlify dashboard → Site settings → Environment variables
- Add: `VITE_API_URL` = `YOUR_BACKEND_URL/api`
- Trigger redeploy

---

## Quick Deployment Checklist

### For 100% Grade (No Penalty):
- [ ] Deploy backend to Render/Railway/Heroku
- [ ] Get MongoDB Atlas connection string
- [ ] Set backend environment variables
- [ ] Test backend API endpoints
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Set frontend environment variable (backend URL)
- [ ] Test frontend application
- [ ] Update SUBMISSION_DOCUMENT.md with URLs

### Time Required:
- **Backend deployment**: 10-15 minutes
- **Frontend deployment**: 5-10 minutes
- **Total**: ~20-25 minutes

### Cost:
- **All free tiers available!**
- MongoDB Atlas: Free M0 cluster
- Render: Free tier
- Vercel: Free tier
- Netlify: Free tier

---

## After Deployment

### Update SUBMISSION_DOCUMENT.md:
```markdown
#### 4. ✅ Live Frontend URL (Cloud Hosted)
https://your-app.vercel.app

#### 5. ✅ Live Backend URL (Cloud Hosted)
https://your-backend.onrender.com
```

### Test Your Deployed App:
1. Open frontend URL
2. Try creating a contact
3. Try editing a contact
4. Try deleting a contact
5. Verify all CRUD operations work

---

## Troubleshooting

### Frontend shows CORS error:
- Ensure backend has CORS enabled (already done)
- Check VITE_API_URL is correct
- Backend should allow your frontend domain

### Backend connection error:
- Verify MongoDB Atlas connection string
- Whitelist all IPs (0.0.0.0/0) in MongoDB Atlas
- Check environment variables are set correctly

### Frontend can't connect to backend:
- Ensure VITE_API_URL includes /api path
- Example: `https://backend.onrender.com/api`
- Rebuild frontend after changing env variables

---

## Recommended Deployment Order:

1. **First**: Deploy Backend to Render (get backend URL)
2. **Second**: Deploy Frontend to Vercel (set backend URL)
3. **Third**: Test everything works
4. **Fourth**: Update submission document with URLs

---

## Need Help?

### Resources:
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- Railway Docs: https://docs.railway.app/

### Common URLs Format:
- Render: `https://app-name.onrender.com`
- Vercel: `https://app-name.vercel.app`
- Railway: `https://app-name.up.railway.app`
- Netlify: `https://app-name.netlify.app`

---

**Remember**: Deploying takes only 20-25 minutes and saves you 20% penalty!
