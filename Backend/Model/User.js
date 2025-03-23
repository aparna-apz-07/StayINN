// const mongoose = require('mongoose');

// // Schema Creation
// const userSchema = new mongoose.Schema({
//     UName: { type: String, required: true, trim: true },  // User's Name
//     UEmail: { type: String, required: true, unique: true, trim: true },  // Unique Email
//     UPhone: { type: String, required: true, trim: true },  // Store phone as String
//     UPassword: { type: String, required: true, minlength: 6 },  // Enforce Password Length
//     userType: { type: String, enum: ['admin', 'user'], default: 'user' }  // User Role
// });

// // Model Creation
// var UserModel = mongoose.model('user', userSchema);

// module.exports = UserModel;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UName: { type: String, required: true, trim: true },
    UEmail: { type: String, required: true, unique: true, trim: true },
    UPhone: { type: String, required: true, trim: true },
    UPassword: { type: String, required: true, minlength: 6 },
    userType: { type: String, enum: ['admin', 'user'], default: 'user' },
    isAdmin: { type: Boolean, default: false }  // ✅ Admin field added
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;



