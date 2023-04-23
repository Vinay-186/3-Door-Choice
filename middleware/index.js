const middleware = {
  loggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("warning", "Please log in first.");
      res.redirect("/auth/login");
    }
  },

  notLoggedIn: (req, res, next) => {
    if(req.isAuthenticated()){
      req.flash("warning", "Please log out first");
      if (req.user.isAdmin) {
        return res.redirect(`/${req.user.userName}/dashboard/true`);
      } else {
        return res.redirect(`/${req.user.userName}/dashboard`);
      }
    }
    return next();
  },

  ensureAdmin: (req, res, next) => {
    if(req.isUnauthenticated()) {
			req.session.returnTo = req.originalUrl;
			req.flash("warning", "Please log in first to continue");
			return res.redirect("/auth/login");
		}
		if(!req.user.isAdmin) {
			req.flash("warning", "This route is allowed for admin only!!");
			return res.redirect("back");
		}
		return next();
  }
};

module.exports = middleware;