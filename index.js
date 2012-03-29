var express = require("express"),
    stylus = require("stylus"),
    jade = require("jade"),
    mongoose = require('mongoose'),
    routers = {
      templates: require("./modules/routers/templates.R.js"),
      identification: require("./modules/routers/identification.R.js"),
      app: require("./modules/routers/app.R.js")
    },
    settings = require('./settings'),
    gzippo = require('gzippo');

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
  app.set('view engine', 'jade');
});

app.configure('development', function(){
//  app.use(gzippo.staticGzip(settings.paths.development.static));
  app.use(function(req, res, next){
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.setHeader("Expires", new Date(Date.now()).toUTCString());
    next();
  });
  app.use(express.static(settings.paths.development.static));
  app.set('views', settings.paths.development.views);
});

app.configure('production', function(){
  app.use(express.static(settings.paths.production.static));
  app.use(gzippo.staticGzip(settings.paths.production.static));
//  app.use(gzippo.compress());
  app.set('views', settings.paths.production.views);
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
