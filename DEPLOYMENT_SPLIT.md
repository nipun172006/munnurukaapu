# Split Deployment Guide: Frontend + Backend

This guide shows how to deploy your application with **separated frontend and backend** for better performance and scalability.

## 🏗️ Architecture Overview

- **Backend (API)**: Node.js + Express + MongoDB → **Render**
- **Frontend (Static Site)**: HTML + CSS + JS → **Vercel** or **Netlify**

---

## 📋 Prerequisites

1. **GitHub Account** (for connecting to deployment platforms)
2. **MongoDB Atlas Account** (free tier available)
3. **Render Account** (for backend)
4. **Vercel or Netlify Account** (for frontend)

---

## Part 1: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment

Your backend is already configured! Just verify these files exist:
- ✅ `server/server.js` - Main server file
- ✅ `package.json` - Dependencies
- ✅ `.env.example` - Environment variable template

### Step 2: Set Up MongoDB Atlas

1. **Create Free Cluster**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up and create a free M0 cluster
   - Choose a region close to your users

2. **Create Database User**
   - Database Access → Add New Database User
   - Username: `admin` (or your choice)
   - Password: Generate a strong password
   - Database User Privileges: Read and write to any database

3. **Whitelist All IPs** (for Render)
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allows access from anywhere)
   - Note: This is safe because you have authentication

4. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `community-registry`
   - Example: `mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/community-registry?retryWrites=true&w=majority`

### Step 3: Deploy to Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Or use "Deploy from Git URL"

3. **Configure Service**
   ```
   Name: community-registry-api
   Environment: Node
   Region: Choose closest to you
   Branch: main (or master)
   Root Directory: (leave blank)
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   ```
   MONGODB_URI = your_mongodb_atlas_connection_string
   ADMIN_USERNAME = your_admin_username
   ADMIN_PASSWORD = your_secure_password
   NODE_ENV = production
   PORT = 10000
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Your API will be live at: `https://community-registry-api.onrender.com`
   - **Save this URL!** You'll need it for the frontend

### Step 4: Test Backend API

Open these URLs in your browser to test:
- `https://your-app.onrender.com/api/health` - Should return "OK"
- `https://your-app.onrender.com/api/stats` - Should return member count

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Update Frontend API URL

Before deploying, update the frontend to use your Render backend URL.

1. **Open `public/script.js`**
2. **Find the API URL** (around line 1-5)
3. **Replace** `http://localhost:3000` with your Render URL:
   ```javascript
   const API_URL = 'https://community-registry-api.onrender.com';
   ```

### Step 2: Create `vercel.json` Configuration

Create a new file in the root directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

### Step 3: Deploy to Vercel

**Option A: Using Vercel Dashboard (Easiest)**

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure:
   ```
   Framework Preset: Other
   Root Directory: ./
   Build Command: (leave empty)
   Output Directory: public
   ```
6. Click "Deploy"
7. Your site will be live at: `https://your-project.vercel.app`

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? community-registry
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

---

## Part 3: Alternative - Deploy Frontend to Netlify

### Step 1: Update API URL (same as Vercel Step 1)

### Step 2: Create `netlify.toml` Configuration

Create a new file in the root directory:

```toml
[build]
  publish = "public"
  command = "echo 'No build needed'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 3: Deploy to Netlify

**Option A: Using Netlify Dashboard**

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose your GitHub repository
5. Configure:
   ```
   Build command: (leave empty)
   Publish directory: public
   ```
6. Click "Deploy site"
7. Your site will be live at: `https://your-site.netlify.app`

**Option B: Using Netlify CLI**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod --dir=public
```

---

## 🔧 Post-Deployment Configuration

### Update CORS Settings (Backend)

If you get CORS errors, update `server/server.js`:

```javascript
const corsOptions = {
    origin: [
        'https://your-frontend.vercel.app',  // Add your Vercel URL
        'https://your-frontend.netlify.app', // Or Netlify URL
        'http://localhost:3000'              // Keep for local development
    ],
    credentials: true
};
app.use(cors(corsOptions));
```

Then redeploy the backend on Render.

---

## ✅ Post-Deployment Checklist

- [ ] Backend API is accessible at Render URL
- [ ] MongoDB connection is working
- [ ] Frontend is deployed to Vercel/Netlify
- [ ] Frontend can communicate with backend API
- [ ] Test form submission
- [ ] Test admin login (Ctrl+Shift+A)
- [ ] Test CSV download
- [ ] Test on mobile devices
- [ ] Verify HTTPS is enabled on both
- [ ] Check responsive design on different devices

---

## 🎯 Custom Domain Setup (Optional)

### For Frontend (Vercel)
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `community.yourdomain.com`)
3. Update DNS records as instructed by Vercel

### For Frontend (Netlify)
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records as instructed by Netlify

### For Backend (Render)
1. Go to Settings → Custom Domain
2. Add your API subdomain (e.g., `api.yourdomain.com`)
3. Update DNS CNAME record

---

## 💰 Cost Breakdown

### Free Tier (Perfect for starting)
- **Render Backend**: Free (sleeps after 15 min inactivity)
- **Vercel Frontend**: Free (100GB bandwidth/month)
- **Netlify Frontend**: Free (100GB bandwidth/month)
- **MongoDB Atlas**: Free (512MB storage)
- **Total**: $0/month

### Paid Tier (For production traffic)
- **Render Backend**: $7/month (always on)
- **Vercel/Netlify**: Free tier usually sufficient
- **MongoDB Atlas**: $9/month (2GB storage)
- **Custom Domain**: $10-15/year
- **Total**: ~$16-20/month

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Check API_URL in `public/script.js`
- Verify CORS settings in backend
- Check browser console for errors
- Ensure backend is running (visit health endpoint)

### Backend "Application failed to respond"
- Check Render logs
- Verify MongoDB connection string
- Ensure environment variables are set
- Check if MongoDB Atlas IP whitelist includes 0.0.0.0/0

### Form submission fails
- Open browser DevTools → Network tab
- Check if API requests are reaching backend
- Verify backend logs on Render
- Check MongoDB connection

### Admin login not working
- Verify ADMIN_USERNAME and ADMIN_PASSWORD in Render
- Check browser console for errors
- Try clearing browser cache

---

## 📊 Monitoring

### Backend (Render)
- Dashboard → Logs (real-time)
- Dashboard → Metrics (CPU, memory)
- Set up email alerts for downtime

### Frontend (Vercel/Netlify)
- Analytics dashboard
- Function logs
- Bandwidth usage

### Database (MongoDB Atlas)
- Metrics → Monitor connections
- Performance Advisor
- Real-time performance panel

---

## 🚀 Quick Deploy Commands Summary

```bash
# 1. Update frontend API URL in public/script.js
# 2. Commit changes
git add .
git commit -m "Update API URL for production"
git push

# 3. Deploy backend (Render does this automatically on push)

# 4. Deploy frontend to Vercel
vercel --prod

# OR deploy to Netlify
netlify deploy --prod --dir=public
```

---

## 📚 Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

---

**🎉 Your app is now live with separated frontend and backend for optimal performance!**
