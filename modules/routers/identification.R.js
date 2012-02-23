var access = require("../access.js"),
    User = require("../models/user.model.js");

var identification = function(app) {

  //|-------|
  //| LOGIN |
  //|-------|

  app.post('/login', function(req, res, next){

    if (req.body.email && req.body.password) {
      return User.findOne({email: req.body.email, password: req.body.password}, ['name', 'role'], function(err, user) {
        if (!user) {
          req.formError = {
            message: "Bummer! This email &amp; password don't match an account."
          };
          return next();

        } else {

          req.session.user = {
            authenticated: true,
            _id: user._id,
            name: user.name,
            role: user.role
          }
          req.session.save(function(err){
            return res.redirect('/');
          });
        }
      });
    } else if (req.body.email || req.body.password) {
      req.formError = {
        message: "Please enter your email and password."
      };
      return next();
    } else {
      res.redirect('/register');
    }
  });

  app.all('/login', function(req, res){

    if (req.session.user && req.session.user.authenticated) {
      return res.redirect('/');
    }

    res.render('site/login', {
      $title: "Sampling made simple ~ Sampleton",
      $style: 'site',
      $js: 'js/site',
      $email: req.body.email,
      $formError: req.formError
    });
  });

  app.all('/logout', function(req, res){
    req.session.user = null;
    req.session.save(function(err){
      return res.redirect('/login');
    });
  });

  app.post('/register', function(req, res, next){

    if (!req.body.name || !req.body.email || !req.body.password) {
      // missing field
      req.formError = {
        'message': 'Please fill all fields.'
      }
      return next();
    }

    return User.findOne({email: req.body.email}, function(err, user) {
      if (!user) {
        var user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        user.save(function(err) {
          if (!err) {

            console.log("account created");

            User.findOne({email: req.body.email}, function(err, user) {
              req.session.user = {
                authenticated: true,
                _id: user._id,
                name: user.name,
                role: user.role
              }

              req.session.save(function(err){
                return res.redirect('/');
              });

            });

          }
        });

      } else {
        req.formError = {
          message: "Hum... This email is already used."
        }
      }
    });
  });

  app.all('/register', function(req, res){
    res.render('site/register', {
      $title: "Sampling made simple ~ Sampleton",
      $style: 'site',
      $js: 'js/site',
      $name: req.body.name,
      $email: req.body.email,
      $password: req.body.password,
      $formError: req.formError
    });
  });

}

module.exports = identification;