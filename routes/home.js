const express = require("express");
const middleware = require('../middleware/index');
const router = express.Router();
router.get("/", middleware.notLoggedIn,(req,res) => {
	res.render("home/welcome");
});
module.exports = router;