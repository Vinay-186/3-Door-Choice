const express = require("express");
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const path = require('path');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const homeRoutes = require("./routes/home.js");
const adminRoutes = require("./routes/admin.js");
const userRoutes = require("./routes/user.js");
require('dotenv').config();
require('./config/dbConnection')();
require('./config/passport')(passport);
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use("/assets", express.static(__dirname + "/assets"));
app.set('views', path.join(__dirname , '/views'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
	secret: "secret",
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.warning = req.flash("warning");
	next();
});
const port = 3000;
app.use(homeRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use((req, res) =>{
    res.status(404).render('404Page', {title : 'Page Not Found!!'});
})
app.listen(port,console.log(`Server is running at http://localhost:${port}`));