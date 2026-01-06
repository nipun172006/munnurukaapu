/**
 * API Configuration
 * Update this file with your production backend URL after deploying to Render
 */

// For local development, use localhost
// For production, replace with your Render backend URL
const API_CONFIG = {
    // Development (local)
    development: 'http://localhost:3000',

    // Production (update this after deploying backend to Render)
    production: 'https://your-app-name.onrender.com'
};

// Automatically detect environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Export the appropriate API URL
const API_BASE_URL = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

// Make it available globally
window.API_BASE_URL = API_BASE_URL;

console.log('🌐 API Base URL:', API_BASE_URL);
