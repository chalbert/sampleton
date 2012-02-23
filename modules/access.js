var access = {},
    roles = require('./roles'),
    User = require('./models/user.M');

access.isRestrictedTo = function(role) {
  return function(req, res, next) {

    if (req.session.user && req.session.user.authenticated) {

      if (req.session.user.role >= roles[role]) {
        next();
      } else {
        next(new Error("Arg! You're not authorized to access this."));
      }

    } else {
      res.redirect('/login');
    }
  }
}

module.exports = access;