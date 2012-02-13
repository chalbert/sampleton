var access = {},
    roles = require('./roles');

access.isRestrictedTo = function(role) {
  return function(req, res, next) {

    if (!req.authenticated) {
      req.flash("error", "You'll need to log-in to access that.");
      res.redirect('/login');

    } else if (roles[req.authenticated.role] < roles[role]) {
      next(new Error("Arg! You're not authorized to access this."));
    } else {
      next();
    }

  }
}

module.exports = access;