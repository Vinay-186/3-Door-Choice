const mongoose = require('mongoose');

const userSch = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String, 
        required : true,
    },
    password : {
        type : String
    },
    isAdmin : {
        type : Boolean, 
        default : false,
    }
});

const User = mongoose.model('User', userSch);
module.exports = User;