const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Create Schema
const UserSchema = new Schema({ 
    uName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    regDate: {
        type: Date,
        default: Date.now
    }
     
});

module.exports = User = mongoose.model('user', UserSchema);