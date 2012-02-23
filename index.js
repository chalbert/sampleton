var express = require("express"),
    stylus = require("stylus"),
    mongoose = require('mongoose'),
    routers = {
      templates: require("./modules/routers/Templates.R.js"),
      identification: require("./modules/routers/Identification.R.js"),
      app: require("./modules/routers/App.R.js")
    },
    settings = require('./settings');

var app = module.exports = express.createServer();
var db = mongoose.connect(settings.db.host, settings.db.db);

//|---------------|
//| CONFIGURATION |
//|---------------|

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session(settings.session));
  app.use(stylus.middleware(settings.stylus));
  app.use(app.router);
  app.use(express.static(settings.paths.static));
  app.set('views', settings.paths.views);
  app.set('view engine', 'jade');
});

//|---------|
//| ROUTING |
//|---------|

// Easier for debugging, when node restarts
app.all('*', function(req, res, next) {
  req.connection.setTimeout(1500);
  next();
});

routers.templates(app);
routers.identification(app);
routers.app(app);

//|-----|
//| END |
//|-----|

app.listen(4000);
