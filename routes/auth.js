const express = require("express");
const router = express.Router();
const User = require('../models/user.js');
const middleware = require('../middleware/index.js');
const bcrypt = require('bcryptjs');
const passport = require('passport');
router.get('/auth/signup', middleware.notLoggedIn, (req,res) =>{
    res.render('auth/signup', {title : 'Sign Up'});
});

router.post('/auth/signup', middleware.notLoggedIn, async (req, res)=>{
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

router.get('/auth/login', middleware.notLoggedIn, (req, res) =>{
    res.render('auth/login', {title : 'User Login'});
});

router.post("/auth/login", middleware.notLoggedIn,
	passport.authenticate('local', {
		failureRedirect: "/auth/login",
		failureFlash: true,
		successFlash: true
	}), (req,res) => {
        if(req.user.isAdmin){
            res.redirect(req.session.returnTo || `/admin/dashboard`);
        }
        else res.redirect(req.session.returnTo || `/${req.user.userName}/dashboard`);
	}
);

    router.get('/auth/logout', (req, res) => {
        req.logout((err) => {
          if (err) {
            console.error(err);
          }
          req.flash('success', 'Logged out successfully');
          res.redirect('/auth/login');
        });
      });
      
module.exports = router;