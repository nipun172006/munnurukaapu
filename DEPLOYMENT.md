# Deployment Guide for Community Information Registry

## Quick Deployment Options

### Option 1: Render.com (Recommended)

**Steps:**

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Or use "Deploy from Git URL"

3. **Configure Service**
   ```
   Name: community-registry
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   - Click "Environment" tab
   - Add these variables:
     ```
     MONGODB_URI=your_mongodb_atlas_uri
     ADMIN_USERNAME=your_admin_username
     ADMIN_PASSWORD=your_secure_password
     NODE_ENV=production
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Your app will be live at: `https://your-app-name.onrender.com`

**Free Tier**: Yes (with some limitations)

---

### Option 2: Railway.app

**Steps:**

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Environment Variables**
   - Click on your service
   - Go to "Variables" tab
   - Add all variables from `.env`

4. **Deploy**
   - Railway auto-deploys on push
   - Get your URL from the deployment

**Free Tier**: $5 credit per month

---

### Option 3: Vercel (Serverless)

**Note**: Requires some code modifications for serverless functions

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   - Go to Vercel dashboard
   - Select your project
   - Settings → Environment Variables
   - Add all variables from `.env`

**Free Tier**: Yes (generous limits)

---

### Option 4: Heroku

**Steps:**

1. **Install Heroku CLI**
   ```bash
   # Mac
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   cd community-registry
   heroku create your-app-name
   ```

4. **Add Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_uri"
   heroku config:set ADMIN_USERNAME="your_username"
   heroku config:set ADMIN_PASSWORD="your_password"
   heroku config:set NODE_ENV="production"
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

**Free Tier**: Limited (requires credit card)

---

## MongoDB Atlas Setup for Production

1. **Whitelist Deployment IP**
   - Go to MongoDB Atlas
   - Network Access → Add IP Address
   - For Render/Railway: Add `0.0.0.0/0` (allow all)
   - For specific IPs: Add deployment server IP

2. **Create Database User**
   - Database Access → Add New Database User
   - Set username and password
   - Grant "Read and write to any database" permission

3. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `community-registry`

---

## Post-Deployment Checklist

- [ ] Test form submission
- [ ] Test admin login
- [ ] Test CSV download
- [ ] Verify MongoDB connection
- [ ] Test on mobile devices
- [ ] Check HTTPS is enabled
- [ ] Verify environment variables are set
- [ ] Test rate limiting
- [ ] Check error handling

---

## Custom Domain Setup

### Render
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

### Railway
1. Settings → Domains
2. Add custom domain
3. Update DNS CNAME record

### Vercel
1. Project Settings → Domains
2. Add domain
3. Configure DNS

---

## Monitoring & Maintenance

### Check Logs
- **Render**: Dashboard → Logs tab
- **Railway**: Project → Deployments → View Logs
- **Vercel**: Project → Deployments → Function Logs

### Database Monitoring
- MongoDB Atlas → Metrics
- Check connection count
- Monitor storage usage
- Review slow queries

### Backup Data
- Regularly download CSV exports
- MongoDB Atlas automatic backups (paid plans)
- Manual exports via admin panel

---

## Security Recommendations

1. **Change Default Credentials**
   - Update `ADMIN_USERNAME` and `ADMIN_PASSWORD`
   - Use strong passwords (12+ characters)

2. **Environment Variables**
   - Never commit `.env` to Git
   - Use deployment platform's environment variable system

3. **MongoDB Security**
   - Use strong database passwords
   - Limit IP whitelist when possible
   - Enable MongoDB Atlas encryption

4. **HTTPS**
   - All platforms provide free SSL
   - Ensure HTTPS is enforced

5. **Rate Limiting**
   - Already implemented (5 requests per 15 min)
   - Adjust in `server/server.js` if needed

---

## Scaling Considerations

### For High Traffic

1. **Upgrade Hosting Plan**
   - Render: Upgrade to paid plan
   - Railway: Add more resources
   - Vercel: Serverless auto-scales

2. **Database Optimization**
   - Add indexes to frequently queried fields
   - Upgrade MongoDB Atlas tier
   - Enable connection pooling

3. **Caching**
   - Implement Redis for session storage
   - Cache static assets with CDN

4. **Load Balancing**
   - Use platform's built-in load balancing
   - Consider multiple instances

---

## Troubleshooting Deployment

### Build Fails
- Check Node.js version compatibility
- Verify all dependencies in `package.json`
- Check build logs for errors

### App Crashes on Start
- Verify `MONGODB_URI` is correct
- Check environment variables are set
- Review application logs

### Database Connection Fails
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

### Admin Login Not Working
- Verify environment variables are set correctly
- Check for typos in credentials
- Restart the application

---

## Cost Estimates

### Free Tier Options
- **Render**: Free (with sleep after inactivity)
- **Railway**: $5/month credit (then pay-as-you-go)
- **Vercel**: Free (generous limits)
- **MongoDB Atlas**: Free (512MB storage)

### Paid Recommendations (for production)
- **Hosting**: $7-25/month
- **MongoDB Atlas**: $9/month (M2 cluster)
- **Domain**: $10-15/year
- **Total**: ~$20-40/month

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Express.js**: https://expressjs.com
- **Mongoose**: https://mongoosejs.com

---

**Need Help?** Check the main README.md for troubleshooting tips!
