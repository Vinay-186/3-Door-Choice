const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index.js");
const User = require("../models/user.js");

router.get("/:admin/dashboard/true", middleware.ensureAdmin, async (req,res) => {
	const users = await User.find({isAdmin : false});  
	res.render("admin/dashboard", {
		title: "Dashboard",
		users : users,
	});
});
router.get("/:id/profile/true", middleware.loggedIn, (req, res) =>{
	res.render("admin/profile", {
		title : 'Profile', 
	});
} )
module.exports = router;