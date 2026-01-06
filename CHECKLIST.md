# ✅ Configuration Checklist

Before running the application, complete these steps:

## 📋 Pre-Launch Checklist

### 1. MongoDB Atlas Setup
- [ ] Created MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- [ ] Created a free M0 cluster
- [ ] Created database user with username and password
- [ ] Whitelisted IP address (0.0.0.0/0 for development)
- [ ] Copied connection string

### 2. Environment Configuration
- [ ] Opened `.env` file
- [ ] Replaced `MONGODB_URI` with your connection string
- [ ] Updated `ADMIN_USERNAME` to your preferred username
- [ ] Updated `ADMIN_PASSWORD` to a secure password (12+ characters)
- [ ] Saved the `.env` file

### 3. Dependencies Installation
- [ ] Ran `npm install` successfully
- [ ] No error messages during installation
- [ ] All packages installed (87 packages)

### 4. First Run Test
- [ ] Started server with `npm start`
- [ ] Server running on http://localhost:3000
- [ ] No MongoDB connection errors
- [ ] Opened http://localhost:3000 in browser
- [ ] Page loads correctly

### 5. Form Testing
- [ ] Filled out registration form with test data
- [ ] Submitted form successfully
- [ ] Saw success message
- [ ] Checked MongoDB Atlas - data appears in database

### 6. Admin Testing
- [ ] Pressed `Ctrl + Shift + A` on webpage
- [ ] Admin button (🔐) appeared in bottom-right
- [ ] Clicked admin button
- [ ] Admin panel opened
- [ ] Logged in with admin credentials
- [ ] Saw statistics
- [ ] Downloaded CSV file
- [ ] Opened CSV in Excel/Google Sheets - data is correct

---

## 🔧 Configuration Details

### MongoDB Connection String Format
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/community-registry?retryWrites=true&w=majority
```

**Replace**:
- `USERNAME` - Your MongoDB Atlas username
- `PASSWORD` - Your MongoDB Atlas password
- `CLUSTER` - Your cluster name (e.g., cluster0.abc123)

### Example .env File
```env
MONGODB_URI=mongodb+srv://myuser:mypass123@cluster0.xyz.mongodb.net/community-registry?retryWrites=true&w=majority
ADMIN_USERNAME=admin
ADMIN_PASSWORD=SecurePass123!
PORT=3000
NODE_ENV=development
```

---

## ⚠️ Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solutions**:
- [ ] Check MongoDB URI is correct in `.env`
- [ ] Verify username and password in connection string
- [ ] Ensure IP is whitelisted in MongoDB Atlas
- [ ] Check cluster is active (not paused)

### Issue: "Port 3000 already in use"
**Solutions**:
- [ ] Change `PORT=3001` in `.env`
- [ ] Or kill process: `lsof -ti:3000 | xargs kill -9`

### Issue: "Module not found"
**Solutions**:
- [ ] Run `npm install` again
- [ ] Delete `node_modules` and run `npm install`

### Issue: "Admin login not working"
**Solutions**:
- [ ] Check `.env` has correct credentials
- [ ] Restart server after changing `.env`
- [ ] Clear browser cache

---

## 🎯 Verification Steps

### Verify MongoDB Connection
1. Start server: `npm start`
2. Look for: `✅ MongoDB Connected: cluster0...`
3. If you see this, connection is successful!

### Verify Form Submission
1. Fill form with test data
2. Submit form
3. Check MongoDB Atlas:
   - Go to "Collections"
   - Look for `communitymembers` collection
   - Your data should appear there

### Verify CSV Export
1. Access admin panel
2. Login
3. Click "Download Data (CSV)"
4. Open downloaded file
5. Verify all columns and data are present

---

## 📊 Expected Results

### After Successful Setup
- ✅ Server starts without errors
- ✅ MongoDB connection confirmed
- ✅ Webpage loads at http://localhost:3000
- ✅ Form submission works
- ✅ Data appears in MongoDB
- ✅ Admin login works
- ✅ CSV download works

### What You Should See
```
🚀 Server running on http://localhost:3000
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```

---

## 🚀 Ready to Deploy?

Once all local tests pass:
- [ ] Read `DEPLOYMENT.md`
- [ ] Choose hosting platform (Render/Railway/Vercel)
- [ ] Set up environment variables on platform
- [ ] Deploy application
- [ ] Test in production
- [ ] Share with community!

---

## 📝 Notes

### Security Reminders
- ⚠️ Never commit `.env` to Git
- ⚠️ Use strong admin passwords
- ⚠️ Change default credentials before deployment
- ⚠️ Keep MongoDB credentials secure

### Performance Tips
- For production, upgrade to MongoDB M2 cluster
- Enable MongoDB Atlas backups
- Monitor rate limiting if traffic is high
- Consider CDN for static assets

---

## ✅ Final Checklist

Before going live:
- [ ] All tests passing locally
- [ ] MongoDB connection stable
- [ ] Admin credentials changed from defaults
- [ ] CSV export tested
- [ ] Mobile responsiveness verified
- [ ] Documentation reviewed
- [ ] Deployment platform chosen
- [ ] Environment variables configured on platform
- [ ] Production deployment tested
- [ ] Custom domain configured (optional)

---

## 🎉 You're Ready!

If all checkboxes are checked, your Community Information Registry is ready to use!

**Local Development**: http://localhost:3000
**Admin Access**: Press `Ctrl + Shift + A`

**Need Help?**
- Quick Start: `QUICKSTART.md`
- Full Docs: `README.md`
- Deployment: `DEPLOYMENT.md`
- Overview: `PROJECT_SUMMARY.md`

---

Built with ❤️ for community unity 🌾
