#!/bin/bash

# Community Registry - Quick Setup Script
# This script helps you set up the application quickly

echo "🌾 Community Information Registry - Setup Script"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "================================================"
echo "🎉 Setup Complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Set up MongoDB Atlas:"
echo "   - Go to https://www.mongodb.com/cloud/atlas"
echo "   - Create a free cluster"
echo "   - Get your connection string"
echo ""
echo "2. Configure environment variables:"
echo "   - Open .env file"
echo "   - Add your MongoDB connection string"
echo "   - Set admin username and password"
echo ""
echo "3. Start the application:"
echo "   npm start"
echo ""
echo "4. Open your browser:"
echo "   http://localhost:3000"
echo ""
echo "5. Access admin panel:"
echo "   Press Ctrl+Shift+A on the website"
echo ""
echo "📖 For detailed instructions, see README.md"
echo "🚀 For deployment guide, see DEPLOYMENT.md"
echo ""
echo "Built with ❤️ for community unity 🌾"
