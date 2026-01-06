# Community Information Registry

A full-stack web application for community data registration with a warm, culturally respectful design inspired by agriculture and rural life.

## 🌟 Features

- **Beautiful UI**: Warm, colorful design with earthy tones and smooth animations
- **Responsive Design**: Mobile-first, works perfectly on all devices
- **Secure Data Storage**: MongoDB Atlas integration with input validation
- **Admin Dashboard**: Private admin panel with authentication
- **CSV Export**: Download all community data as CSV for Excel/Google Sheets
- **Rate Limiting**: Protection against spam submissions
- **Privacy Focused**: Data used only for internal community planning

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas Account** (free tier available) - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for version control)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd community-registry
npm install
```

### 2. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or log in
3. Create a new cluster (free tier is sufficient)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### 3. Configure Environment Variables

1. Open the `.env` file in the project root
2. Replace the placeholder values:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/community-registry?retryWrites=true&w=majority

# Admin Credentials (CHANGE THESE!)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Important**: 
- Replace `username`, `password`, and `cluster` in the MongoDB URI with your actual credentials
- **Change the admin username and password** to something secure
- Never commit the `.env` file to version control

### 4. Run the Application

```bash
npm start
```

The application will start on `http://localhost:3000`

## 📁 Project Structure

```
community-registry/
├── public/                 # Frontend files
│   ├── index.html         # Main HTML file
│   ├── styles.css         # Styling with design system
│   └── script.js          # Client-side JavaScript
├── server/                # Backend files
│   ├── server.js          # Express server & API routes
│   └── models/
│       └── CommunityMember.js  # MongoDB schema
├── config/
│   └── database.js        # Database connection
├── .env                   # Environment variables (DO NOT COMMIT)
├── .env.example           # Environment template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies & scripts
└── README.md             # This file
```

## 🎨 Design Features

### Color Palette
- **Primary Green**: Olive green (#6B8E23) - representing fields
- **Secondary Brown**: Soft brown (#D4A574) - representing earth
- **Accent Yellow**: Golden yellow (#F4C430) - representing sunrise
- **Sky Blue**: (#87CEEB) - representing sky

### Typography
- **Headings**: Poppins (Google Fonts)
- **Body**: Inter (Google Fonts)

### Animations
- Smooth gradient backgrounds
- Floating elements
- Hover effects on cards and buttons
- Form field focus animations

## 🔐 Admin Access

### Accessing Admin Panel

1. **Keyboard Shortcut**: Press `Ctrl + Shift + A` to reveal the admin button
2. Click the admin button (🔐) in the bottom-right corner
3. Log in with your admin credentials (set in `.env`)

### Admin Features

- **View Statistics**: See total members and occupation breakdown
- **Download CSV**: Export all data to CSV format
- **Secure Access**: Simple authentication system

### CSV Export Format

The exported CSV includes:
- Full Name
- Gender
- Age
- Mobile Number
- Village/City
- District
- State
- Occupation
- Notes
- Submitted At (timestamp)

## 🌐 Deployment

### Deploy to Render

1. Create account at [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables from your `.env` file
6. Click "Create Web Service"

### Deploy to Railway

1. Create account at [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables
5. Railway will auto-deploy

### Deploy to Vercel (Frontend + Serverless)

1. Create account at [Vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Run: `vercel`
4. Follow prompts and add environment variables

**Note**: For all deployments, make sure to:
- Set `NODE_ENV=production`
- Add all environment variables from `.env`
- Update MongoDB Atlas to allow connections from deployment IP

## 🔒 Security Features

- **Input Sanitization**: All user inputs are sanitized
- **Rate Limiting**: Max 5 submissions per 15 minutes per IP
- **Mobile Validation**: 10-digit format enforcement
- **Age Validation**: Range 0-150
- **Admin Authentication**: Password-protected admin access
- **CORS Enabled**: Cross-origin resource sharing configured
- **Environment Variables**: Sensitive data stored securely

## 📱 Mobile Responsiveness

The application is fully responsive and tested on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🛠️ Development

### Running in Development Mode

```bash
npm run dev
```

### Testing the Application

1. **Test Form Submission**:
   - Fill out the registration form
   - Submit and verify success message
   - Check MongoDB Atlas to confirm data is stored

2. **Test Admin Panel**:
   - Press `Ctrl + Shift + A`
   - Log in with admin credentials
   - View statistics
   - Download CSV and verify data

3. **Test Validation**:
   - Try submitting with invalid mobile number
   - Try submitting with invalid age
   - Try submitting with missing required fields

## 🐛 Troubleshooting

### MongoDB Connection Error

**Problem**: "Error connecting to MongoDB"

**Solutions**:
1. Check your MongoDB URI in `.env`
2. Ensure your IP is whitelisted in MongoDB Atlas (Network Access)
3. Verify username and password are correct
4. Check if cluster is active

### Port Already in Use

**Problem**: "Port 3000 is already in use"

**Solutions**:
1. Change `PORT` in `.env` to another port (e.g., 3001)
2. Or kill the process using port 3000:
   ```bash
   # On Mac/Linux
   lsof -ti:3000 | xargs kill -9
   
   # On Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

### Form Not Submitting

**Problem**: Form submission fails

**Solutions**:
1. Check browser console for errors
2. Verify server is running
3. Check network tab in browser DevTools
4. Ensure MongoDB is connected

### Admin Login Not Working

**Problem**: Invalid credentials error

**Solutions**:
1. Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`
2. Restart the server after changing `.env`
3. Check for typos in credentials

## 📊 Database Schema

```javascript
{
  fullName: String (required),
  gender: String (required, enum: ['Male', 'Female', 'Other']),
  age: Number (required, min: 0, max: 150),
  mobileNumber: String (required, 10 digits),
  village: String (required),
  district: String (required),
  state: String (required),
  occupation: String (required, enum: ['Farming', 'Labor', 'Business', 'Student', 'Service', 'Other']),
  notes: String (optional),
  submittedAt: Date (auto-generated),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🤝 Contributing

This is a community project. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License - Free to use for community purposes

## 🙏 Acknowledgments

- Design inspired by agricultural landscapes and rural community values
- Built with care for community unity and cultural respect
- Icons: Unicode emoji characters
- Fonts: Google Fonts (Inter, Poppins)

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review MongoDB Atlas documentation
3. Check Node.js and Express documentation

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Community registration form
- Admin dashboard
- CSV export functionality
- MongoDB integration
- Responsive design
- Rate limiting
- Input validation

---

**Built with ❤️ for community unity 🌾**
