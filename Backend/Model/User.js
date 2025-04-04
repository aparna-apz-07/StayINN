

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UName: { type: String, required: true, trim: true },
    UEmail: { type: String, required: true, unique: true, trim: true },
    UPhone: { type: String, required: true, trim: true },
    UPassword: { type: String, required: true, minlength: 6 },
    userType: { type: String, enum: ['admin', 'user'], default: 'user' },
    isAdmin: { type: Boolean, default: false } 
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;



