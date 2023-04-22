const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index.js");
const User = require("../models/user.js");

router.get("/:id/dashboard", middleware.loggedIn, (req,res) => {
	res.render("user/dashboard", {
		title: "Dashboard",
	});
});
router.get("/:id/profile", middleware.loggedIn, async (req, res) =>{
	res.render("user/profile", {
		title : 'Profile', 
	});
} )
module.exports = router;