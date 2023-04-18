const express = require("express");
const router = express.Router();
const User = require('../models/user.js');
const middleware = require('../middleware/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/auth/signup', middleware.notloggedin, (req,res) =>{
    res.render('auth/signup', {title : 'Sign Up'});
});

router.post('/auth/signup', middleware.notloggedin, async (req, res)=>{
    const {userName, email,passw1,passw2} = req.body;
    let err = [];
    if(!userName || !email || !passw1|| !passw2){
        err.push({msg : 'Please fill all the fields'});
    }
    if(passw1 != passw2){
        err.push({msg : 'Passwords does not math each other'});
    }
    if(passw1.length < 4){
        err.push({msg : 'Password is too short'});
    }
    if(err.length > 0){
        return res.render('auth/signup', {
            title : "Sign Up",
            err, userName, email, passw1, passw2
        })
    }
    try{
        const user = await User.findOne({email : email});
        if(user){
            err.push({msg : "Account already exists!"});
            return res.render('auth/signup', {
                title : 'Sign Up',
                err, userName, email, passw1, passw2
            });
        }
        const newUser = new User({userName, email, password : passw1});
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hash;
        await newUser.save();
        req.flash("success", "Registered Sucessfully, Please Re-login!");
        res.redirect('/auth/login');
    }catch(error){
        console.log(error);
        req.flash('error', "Some error occurred! Please try again");
        res.redirect('back');
    }
});

router.get('/auth/login', middleware.notloggedin, (req, res) =>{
    res.render('auth/login', {title : 'User Login'});
});

router.post('/auth/login', middleware.notloggedin, async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/auth/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/auth/login');
        }

        const payload = {
            id: user.id,
            email: user.email,
            userName: user.userName,
            isAdmin: user.isAdmin
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false
        });

        req.flash('success', 'Logged in successfully');
        res.redirect(`/${user.role}/dashboard`);
    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong. Please try again');
        res.redirect('/auth/login');
    }
});

router.get('/auth/logout', (req, res) => {
    res.clearCookie('jwt');
    req.flash
    ('success', 'Logged out successfully');
    res.redirect('/auth/login');
    });
    
    // Protected route
    router.get('/dashboard', middleware.isLoggedIn, (req, res) => {
    // Access authenticated user data from req.user
    const user = req.user;
    res.render('dashboard', { title: 'Dashboard', user });
    });
    
module.exports = router;