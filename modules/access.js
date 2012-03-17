var access = {},
    roles = require('./roles'),
    User = require('./models/user.M');

access.isRestrictedTo = function(role, options) {

  options || (options = {});

  return function(req, res, next) {

    if (req.session.user && req.session.user.authenticated) {

      if (req.session.user.role >= roles[role]) {
        next();
      } else {
        (options.redirect)
            ? res.redirect('/login', 302)
            : res.send({auth: 1}, 403);
      }

    } else {
      (options.redirect)
          ? res.redirect('/login', 302)
          : res.send({auth: 0}, 403);
    }
  }
}

module.exports = access;