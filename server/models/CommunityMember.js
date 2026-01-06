const mongoose = require('mongoose');

/**
 * Community Member Schema
 * Stores information about community members for social and cultural initiatives
 */
const communityMemberSchema = new mongoose.Schema({
    surname: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 150
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: 'Mobile number must be 10 digits'
        }
    },
    gmailId: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Please enter a valid email address'
        }
    },
    aadharNumber: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{12}$/.test(v);
            },
            message: 'Aadhar number must be 12 digits'
        }
    },
    village: {
        type: String,
        required: true,
        trim: true
    },
    occupation: {
        type: String,
        required: true,
        enum: ['Farming', 'Labor', 'Business', 'Student', 'Service', 'Other']
    },
    notes: {
        type: String,
        trim: true,
        default: ''
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CommunityMember', communityMemberSchema);
