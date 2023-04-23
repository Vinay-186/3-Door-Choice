const mongoose = require('mongoose');

const userSch = new mongoose.Schema({
    userName : {
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
    },
    gameScore : {
        type : Array,
        default : [undefined,undefined,undefined]
    }
});

const User = mongoose.model('User', userSch);
module.exports = User;