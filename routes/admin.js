const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index.js");
const User = require("../models/user.js");

router.get("/admin/dashboard", middleware.ensureAdmin, async (req,res) => {
	res.render("admin/dashboard", {
		title: "Dashboard",
	});
});
module.exports = router;