const mongoose = require('mongoose');

/**
 * Database Connection Configuration
 * Connects to MongoDB Atlas using environment variables
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        console.error('💡 Make sure to configure your MongoDB URI in the .env file');
        console.error('⚠️  Server will continue running, but database operations will fail');
        return false;
    }
};

// Handle connection errors after initial connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
});

module.exports = connectDB;
