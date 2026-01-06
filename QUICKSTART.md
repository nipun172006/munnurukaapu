# 🚀 QUICK START GUIDE

## Get Started in 5 Minutes!

### Step 1: Install Dependencies (1 minute)
```bash
npm install
```

### Step 2: Set Up MongoDB Atlas (2 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create an account
3. Create a free cluster (M0 Sandbox)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Step 3: Configure Environment (1 minute)

Open `.env` file and update:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/community-registry?retryWrites=true&w=majority
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123
```

**Important**: Replace with your actual MongoDB credentials!

### Step 4: Start the Application (30 seconds)

```bash
npm start
```

### Step 5: Open in Browser (30 seconds)

Go to: http://localhost:3000

---

## 🎯 Quick Test

### Test the Form
1. Scroll to "Community Registration" section
2. Fill in all required fields
3. Click "Submit Registration"
4. You should see a success message! ✅

### Test Admin Panel
1. Press `Ctrl + Shift + A` on the webpage
2. Click the 🔐 button in bottom-right
3. Login with your admin credentials
4. Click "Download Data (CSV)" to export

---

## 🐛 Common Issues

### "Cannot connect to MongoDB"
- Check your MongoDB URI in `.env`
- Make sure you replaced `YOUR_USERNAME` and `YOUR_PASSWORD`
- Verify your IP is whitelisted in MongoDB Atlas:
  - Go to "Network Access" → "Add IP Address" → "Allow Access from Anywhere"

### "Port 3000 already in use"
- Change `PORT=3001` in `.env`
- Or kill the process: `lsof -ti:3000 | xargs kill -9`

### "Module not found"
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`

---

## 📱 What's Next?

✅ **Working locally?** Great! Now you can:
- Customize the design in `public/styles.css`
- Modify form fields in `public/index.html`
- Add more features in `server/server.js`

✅ **Ready to deploy?** Check out `DEPLOYMENT.md` for:
- Render.com (recommended, free)
- Railway.app
- Vercel
- Heroku

✅ **Need help?** See `README.md` for:
- Detailed documentation
- Troubleshooting guide
- Security best practices
- API documentation

---

## 🎨 Customization Tips

### Change Colors
Edit `public/styles.css` - look for the `:root` section:
```css
:root {
  --color-primary: #6B8E23;  /* Change this! */
  --color-accent: #F4C430;   /* And this! */
}
```

### Add Form Fields
1. Edit `public/index.html` - add new form field
2. Edit `server/models/CommunityMember.js` - add to schema
3. Edit `server/server.js` - update CSV export headers

### Change Admin Credentials
Update `.env` file:
```env
ADMIN_USERNAME=newusername
ADMIN_PASSWORD=newsecurepassword
```
Then restart the server.

---

## 📊 Project Structure

```
community-registry/
├── public/              ← Frontend (HTML, CSS, JS)
├── server/              ← Backend (Express, API)
├── config/              ← Database connection
├── .env                 ← Your secrets (don't commit!)
├── README.md            ← Full documentation
├── DEPLOYMENT.md        ← Deployment guide
└── package.json         ← Dependencies
```

---

## 🎉 You're All Set!

Your community registry is now running! 

**Local URL**: http://localhost:3000

**Admin Access**: Press `Ctrl + Shift + A`

**Need Help?**: Check README.md or DEPLOYMENT.md

---

Built with ❤️ for community unity 🌾
