var path = require('path');

var templates = function(app) {

  app.get(/^\/templates\/([^.]+).html$/, function(req, res, next){
    var template = req.params[0] + '.jade',
        templatePath = app.set('views') + '/' + template;

    path.exists(templatePath, function(exists){
      if (!exists) {
        res.send("This template doesn't exist: " + template, 404);
      } else {
        res.render(template, {layout: false});
      }
    });

  });

};

module.exports = templates;