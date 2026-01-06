const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('../config/database');
const CommunityMember = require('./models/CommunityMember');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Rate limiting for form submissions (prevent spam)
const formLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many submissions from this IP, please try again later.'
});

/**
 * Route: Submit Community Member Data
 * POST /api/submit
 * Rate limited to prevent spam
 */
app.post('/api/submit', formLimiter, async (req, res) => {
    try {
        const {
            surname,
            name,
            gender,
            age,
            mobileNumber,
            gmailId,
            aadharNumber,
            village,
            occupation,
            notes
        } = req.body;

        // Input sanitization (basic)
        const sanitizedData = {
            surname: surname?.trim(),
            name: name?.trim(),
            gender,
            age: parseInt(age),
            mobileNumber: mobileNumber?.trim().replace(/\D/g, ''), // Remove non-digits
            gmailId: gmailId?.trim().toLowerCase(),
            aadharNumber: aadharNumber?.trim().replace(/\D/g, ''), // Remove non-digits
            village: village?.trim(),
            occupation,
            notes: notes?.trim() || ''
        };

        // Create new community member record
        const newMember = new CommunityMember(sanitizedData);
        await newMember.save();

        res.status(201).json({
            success: true,
            message: 'Registration successful! Thank you for your submission.',
            data: {
                id: newMember._id,
                submittedAt: newMember.submittedAt
            }
        });
    } catch (error) {
        console.error('Submission error:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

/**
 * Route: Admin Authentication
 * POST /api/admin/login
 * Simple authentication for admin access
 */
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Simple admin credentials (in production, use proper authentication)
        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            res.json({
                success: true,
                message: 'Login successful',
                token: 'admin-authenticated' // In production, use JWT
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

/**
 * Route: Get All Members (Admin)
 * GET /api/admin/members
 * Fetch all registered members for admin dashboard
 */
app.get('/api/admin/members', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader !== 'Bearer admin-authenticated') {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        // Fetch all members sorted by most recent first
        const members = await CommunityMember.find()
            .sort({ submittedAt: -1 })
            .lean();

        res.json({
            success: true,
            data: members
        });
    } catch (error) {
        console.error('Fetch members error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching members'
        });
    }
});

/**
 * Route: Export Data as CSV
 * GET /api/admin/export
 * Admin-only route to download all data as CSV
 */
app.get('/api/admin/export', async (req, res) => {
    try {
        // Simple authentication check (in production, use proper middleware)
        const authHeader = req.headers.authorization;
        if (authHeader !== 'Bearer admin-authenticated') {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        // Fetch all community members
        const members = await CommunityMember.find().sort({ submittedAt: -1 });

        // Generate CSV content
        const csvHeaders = [
            'Surname',
            'Name',
            'Gender',
            'Age',
            'Mobile Number',
            'Gmail ID',
            'Aadhar Number',
            'Village/City',
            'Occupation',
            'Notes',
            'Submitted At'
        ];

        const csvRows = members.map(member => [
            `"${member.surname}"`,
            `"${member.name}"`,
            `"${member.gender}"`,
            member.age,
            `"${member.mobileNumber}"`,
            `"${member.gmailId}"`,
            `"${member.aadharNumber}"`,
            `"${member.village}"`,
            `"${member.occupation}"`,
            `"${member.notes || ''}"`,
            `"${new Date(member.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}"`
        ].join(','));

        const csvContent = [csvHeaders.join(','), ...csvRows].join('\n');

        // Set headers for file download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=community-data-${Date.now()}.csv`);
        res.send(csvContent);
    } catch (error) {
        console.error('Export error:', error);
        res.status(500).json({
            success: false,
            message: 'Error exporting data'
        });
    }
});

/**
 * Route: Get Statistics (Admin)
 * GET /api/admin/stats
 */
app.get('/api/admin/stats', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader !== 'Bearer admin-authenticated') {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const totalMembers = await CommunityMember.countDocuments();
        const occupationStats = await CommunityMember.aggregate([
            { $group: { _id: '$occupation', count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                totalMembers,
                occupationStats
            }
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
