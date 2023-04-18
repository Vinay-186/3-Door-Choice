const passport = require('passport');

const middleware = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      // If user is authenticated with Passport
      return next();
    } else {
      req.flash("warning", "Please log in first.");
      res.redirect("/auth/login");
    }
  },

  isNotLoggedIn: (req, res, next) => {
    if (!req.isAuthenticated()) {
      // If user is not authenticated with Passport
      return next();
    } else {
      req.flash("warning", "Please log out to log in.");
      if (req.user.isAdmin) {
        return res.redirect('/admin/dashboard');
      } else {
        return res.redirect('/user/dashboard');
      }
    }
  },

  ensureAdmin: (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
      // If user is authenticated with Passport and is an admin
      return next();
    } else {
      req.flash('warning', 'You are not an admin!');
      return res.redirect('/admin/dashboard');
    }
  }
};

module.exports = middleware;