# 🚀 Quick Deployment Checklist

Follow these steps to deploy your Community Registry application.

## ✅ Pre-Deployment Checklist

- [ ] MongoDB Atlas account created
- [ ] GitHub repository created and code pushed
- [ ] Render account created
- [ ] Vercel or Netlify account created

---

## 📝 Step-by-Step Deployment

### 1️⃣ Deploy Backend to Render (10 minutes)

1. **Set up MongoDB Atlas**
   - Create free cluster at https://www.mongodb.com/cloud/atlas
   - Create database user (save username & password)
   - Whitelist all IPs: `0.0.0.0/0`
   - Get connection string

2. **Deploy to Render**
   - Go to https://render.com
   - New + → Web Service
   - Connect your GitHub repo
   - Configure:
     ```
     Name: community-registry-api
     Environment: Node
     Build Command: npm install
     Start Command: npm start
     ```
   - Add Environment Variables:
     ```
     MONGODB_URI = your_mongodb_connection_string
     ADMIN_USERNAME = admin
     ADMIN_PASSWORD = your_secure_password
     NODE_ENV = production
     PORT = 10000
     ```
   - Click "Create Web Service"
   - **SAVE YOUR RENDER URL**: `https://community-registry-api.onrender.com`

3. **Test Backend**
   - Visit: `https://your-app.onrender.com/api/health`
   - Should see: "OK"

---

### 2️⃣ Update Frontend Configuration (2 minutes)

1. **Update API URL in `public/config.js`**
   ```javascript
   production: 'https://your-app-name.onrender.com'  // Replace with your Render URL
   ```

2. **Commit and push changes**
   ```bash
   git add public/config.js
   git commit -m "Update production API URL"
   git push
   ```

---

### 3️⃣ Deploy Frontend to Vercel (5 minutes)

**Option A: Vercel Dashboard (Recommended)**
1. Go to https://vercel.com
2. Sign up with GitHub
3. New Project → Import your repository
4. Configure:
   ```
   Framework Preset: Other
   Root Directory: ./
   Output Directory: public
   ```
5. Deploy!
6. Your site: `https://your-project.vercel.app`

**Option B: Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

### 3️⃣ Alternative: Deploy Frontend to Netlify (5 minutes)

**Option A: Netlify Dashboard**
1. Go to https://netlify.com
2. Sign up with GitHub
3. Add new site → Import from Git
4. Configure:
   ```
   Build command: (leave empty)
   Publish directory: public
   ```
5. Deploy!
6. Your site: `https://your-site.netlify.app`

**Option B: Netlify CLI**
```bash
npm i -g netlify-cli
netlify login
netlify init
netlify deploy --prod --dir=public
```

---

## 🧪 Post-Deployment Testing

- [ ] Visit your frontend URL
- [ ] Test form submission
- [ ] Press Ctrl+Shift+A to reveal admin button
- [ ] Test admin login
- [ ] View members table
- [ ] Download CSV export
- [ ] Test on mobile device
- [ ] Check responsive design

---

## 🔧 Troubleshooting

### Frontend can't connect to backend
1. Check `public/config.js` has correct Render URL
2. Open browser console (F12) → Check for errors
3. Verify backend is running: visit `/api/health` endpoint

### Backend not responding
1. Check Render logs
2. Verify MongoDB connection string
3. Ensure environment variables are set correctly

### Admin login fails
1. Verify ADMIN_USERNAME and ADMIN_PASSWORD in Render
2. Check browser console for errors

---

## 📊 Your Deployment URLs

After deployment, save these URLs:

```
Backend API: https://________________.onrender.com
Frontend:    https://________________.vercel.app
             (or https://________________.netlify.app)
```

---

## 💰 Cost Summary

- ✅ **Render Backend**: FREE (sleeps after 15 min inactivity)
- ✅ **Vercel/Netlify Frontend**: FREE
- ✅ **MongoDB Atlas**: FREE (512MB)
- ✅ **Total**: $0/month

---

## 📚 Full Documentation

For detailed instructions, see:
- `DEPLOYMENT_SPLIT.md` - Complete split deployment guide
- `DEPLOYMENT.md` - Alternative deployment options
- `README.md` - Project overview and local setup

---

**🎉 Congratulations! Your app is now live!**
