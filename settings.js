//|----------|
//| SETTINGS |
//|----------|

var MongoStore = require('connect-mongo');

var settings = {}
settings.db = {
  db: 'sampleton',
  host: 'localhost'
};

settings.session = {
  secret: 'All work and no play makes Jack a dull boy',
  maxAge : new Date(Date.now() + 3600000),
  store: new MongoStore(settings.db)
};

var stylus = require("stylus"),
    nib = require("nib");

settings.stylus = {
  src:__dirname + '/templates',
  dest: __dirname + '/public',
  images: __dirname + '/public/images',
  compile: function (str, path) {
    return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib());
  }
};

settings.paths = {
  development: {
    static: __dirname + '/public',
    views: __dirname + '/templates'
  },
  production: {
    static: __dirname + '/public-build',
    views: __dirname + '/templates'
  }
}


module.exports = settings;