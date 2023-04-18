const jwt = require('jsonwebtoken');

const middleware = {
  loggedin: (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
      req.flash("Warning", "Login first to continue");
      return res.redirect('/auth/login');
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      return next();
    } catch (err) {
      // Handle JWT verification error
      req.flash("Warning", "Invalid token");
      return res.redirect('/auth/login');
    }
  },

  notloggedin: (req, res, next) => {
    if (req.user) {
      req.flash('Warning', 'Please logout to login');
      if (req.user.isAdmin) {
        return res.redirect('/admin/dashboard');
      } else {
        return res.redirect('/user/dashboard');
      }
    }
    return next();
  },

  ensureAdmin: (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
      req.flash("Warning", "Login first to continue");
      return res.redirect('/auth/login');
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      if (!req.user.isAdmin) {
        req.flash('Warning', 'You are not the Admin!');
        return res.redirect('/admin/dashboard'); // Redirect to a default URL or display an error message
      }
      return next();
    } catch (err) {
      // Handle JWT verification error
      req.flash("Warning", "Invalid token");
      return res.redirect('/auth/login');
    }
  }
};
module.exports = middleware;