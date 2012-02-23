var access = require("../access.js"),
    User = require("../models/user.M");
    Project = require("../models/project.M");
    Item = require("../models/item.M");

var sampleton = function(app) {

  app.get('/', access.isRestrictedTo('user'), function(req, res){
    res.render('app/index', {
      $title: "Sampling made simple ~ Sampleton",
      $style: 'app',
      $js: 'js/app',
      $name: req.session.user.name
    });
  });

  //|-----|
  //| API |
  //|-----|

  app.param('projectId', access.isRestrictedTo('user'), function(req, res, next, id){
    Project.findById(id, function(err, project){

      project.items.find = function(query, one){
        var result = ['yep'];
        itemLoop: for  (var i = 0, l = project.items.length; i < l; i++) {
          for (var property in query) {
            if (query[property] != project.items[i].get(property)) {
              continue itemLoop;
            }
          }
          if (one) return project.items[i]
          result.push(project.items[i]);
        }
        return result;
      }

      project.items.findOne = function(query){
        return project.items.find.call(this, query, true);
      }

      req.project = project;
      next();
    });
  });

  //|--------------|
  //| PROJECT LIST |
  //|--------------|

  app.get('/api/projects', access.isRestrictedTo('user'), function(req, res, next){

    Project.find({owner: req.session.user._id}, ['title', 'created_at', 'order'], function(err, projects){
      res.send(projects);
    });

  });

  app.post('/api/projects', access.isRestrictedTo('user'), function(req, res, next){

    var project = new Project({
      owner: req.session.user._id,
      title: req.body.title
    });

    project.save(function(err){
      if (!err) {
        console.log("updated");
        res.send(project);
      }
    });

  });

  app.get('/api/projects/:projectId', access.isRestrictedTo('user'), function(req, res){
    res.send({
      _id: req.project._id,
      title: req.project.title
    });
  });

  //|-----------|
  //| USER INFO |
  //|-----------|

  app.get('/api/user', access.isRestrictedTo('user'), function (req, res) {
    res.json(req.session.user);
  });

  //|-------|
  //| ITEMS |
  //|-------|


  app.get('/api/projects/:projectId/items', access.isRestrictedTo('user'), function(req, res){
    var items = req.project.items,
        response = [];

    for (var n = 0; n < items.length; n++) {
      response.push({
        _id: items[n]._id,
        title: items[n].title,
        order: items[n].order,
        counter: items[n].counter
      })
    }
    return res.json(response);
  });

  app.param('itemId', access.isRestrictedTo('user'), function(req, res, next, id){
    req.item = req.project.items.id(id);
    next();
  });

  app.get('/api/projects/:projectId/items/:itemId', access.isRestrictedTo('user'), function(req, res, next){

    var order = req.item.order,
        previous = req.project.items.findOne({order: order - 1})._id,
        next = req.project.items.findOne({order: order + 1})._id;

    res.send({
      _id: req.item._id,
      title: req.item.title,
      order: order,
      previous: previous,
      next: next
    });
  });

  app.put('/api/projects/:projectId/items/:itemId', access.isRestrictedTo('user'), function(req, res){

    req.item.title = req.body.title;
    req.item.order = req.body.order;

    req.project.save(function(err){
      if (!err) {
        console.log("updated");
      }
      return res.send(req.item);
    });
  });

  app.post('/api/projects/:projectId/items', access.isRestrictedTo('user'), function(req, res, next){

    var item = {
      title: req.body.title,
      order: req.body.order
    };

    req.project.items.push(item);
    req.project.save(function(err){
      if (!err) {
        console.log('Item created!');
        res.send(item);
      } else {
        next(err);
      }
    });

  });

  app.delete('/api/projects/:projectId/items/:itemId', access.isRestrictedTo('user'), function(req, res){

    req.item.remove();
    req.project.save(function(err, item) {
      if (!err) {
        console.log("removed");
        return res.send('')
      }
    });
  });

  //|---------|
  //| RECORDS |
  //|---------|

  app.get('/api/projects/:projectId/items/:itemId/records', access.isRestrictedTo('user'), function(req, res){
    var records = req.item.records;
    return res.send(records);
  });

  app.post('/api/projects/:projectId/items/:itemId/records', access.isRestrictedTo('user'), function(req, res, next) {

    var record = {
      created_at: req.body.date
    };

    req.project.items.id(req.params.itemId).records.push(record);
    req.project.save(function(err){
      if (!err) {
        return res.send(record);
      } else {
        next(err);
      }
    });
  });

}

module.exports = sampleton;