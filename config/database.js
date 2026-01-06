const mongoose = require('mongoose');

/**
 * Database Connection Configuration
 * Connects to MongoDB Atlas using environment variables
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        console.error('💡 Make sure to configure your MongoDB URI in the .env file');
        process.exit(1);
    }
};

module.exports = connectDB;
