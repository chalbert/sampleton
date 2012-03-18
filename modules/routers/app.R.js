var access = require("../access.js"),
    User = require("../models/user.M"),
    Template = require("../models/template.M"),
    Project = require("../models/project.M"),
    Item = require("../models/item.M");


function find(query, one){
  var result = [];
  console.log('------');
  itemLoop: for  (var i = 0, l = this.length; i < l; i++) {
    for (var property in query) {
      if (query[property] instanceof Object) {
        var q = query[property],
            value = this[i].get(property),
            lt = (q.$lt && value >= q.$lt),
            lte = (q.$lte && value > q.$lte),
            gt = (q.$gt && value <= q.$gt),
            gte = (q.$gte && value < q.$gte);

        if (lt || lte || gt || gte) {
          continue itemLoop;
        }

        console.log('*');
        console.log('lt:' + q.$lt + ' / ' + value);
        console.log('gt:' + q.$gt + ' / ' + value);

      } else if (query[property] != this[i].get(property)) {
        continue itemLoop;
      }
    }
    if (one) return this[i]
    result.push(this[i]);
  }
  return result;
}

function findOne (query){
  return this.find.call(this, query, true);
}



var sampleton = function(app) {

  app.get('/', access.isRestrictedTo('user', {redirect: true}), function(req, res){
    res.render('app/index', {
      $title: "Sampling made simple ~ Sampleton",
      $style: 'app',
      $js: 'js/app',
      $name: req.session.user.name,
      $message: 'Loading...'
    });
  });

  //|-----|
  //| API |
  //|-----|

  app.param('projectId', access.isRestrictedTo('user'), function(req, res, next, id){
    Project.findById(id, function(err, project){
      project.items.find = find;
      project.items.findOne = findOne;

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
      title: req.project.title,
      template: req.project.template
    });

  });

  app.put('/api/projects/:projectId', access.isRestrictedTo('user'), function(req, res){

    req.project.title = req.body.title;
    req.project.template = req.body.template;

    req.project.save(function(err){
      if (!err) {
        console.log("project updated");
      }
      return res.send(req.project);
    });
  });

  app.delete('/api/projects/:projectId', access.isRestrictedTo('user'), function(req, res){
    req.project.remove(function(err, item) {
      if (!err) {
        console.log("removed");
        return res.send('')
      }
    });
  });

  //|-----------|
  //| TEMPLATES |
  //|-----------|

  app.get('/api/templates', access.isRestrictedTo('user'), function(req, res, next){

    Template.find({owner: req.session.user._id}, ['title', 'created_at', 'order'], function(err, templates){
      res.send(templates);
    });

  });

  app.post('/api/templates', access.isRestrictedTo('user'), function(req, res, next){

    var template = new Template({
      owner: req.session.user._id,
      title: req.body.title
    });

    template.save(function(err){
      if (!err) {
        console.log("updated");
        res.send(template);
      }
    });

  });

  app.param('templateId', access.isRestrictedTo('user'), function(req, res, next, id){
    Template.findById(id, function(err, template) {
      req.template = template;
      next();
    });
  });

  app.get('/api/templates/:templateId', access.isRestrictedTo('user'), function(req, res){
    res.send({
      _id: req.template._id,
      title: req.template.title
    });
  });

  app.put('/api/templates/:templateId', access.isRestrictedTo('user'), function(req, res){

    req.template.title = req.body.title;
    req.template.save(function(err){
      if (!err) {
        console.log("updated");
      }
      return res.send(req.template);
    });
  });

  app.delete('/api/templates/:templateId', access.isRestrictedTo('user'), function(req, res){
    req.template.remove(function(err, item) {
      if (!err) {
        console.log("removed");
        return res.send('')
      }
    });
  });

  //|-----------------|
  //| TEMPLATE FIELDS |
  //|-----------------|

  app.get('/api/templates/:templateId/fields', access.isRestrictedTo('user'), function(req, res){
    var fields = req.template.fields;
    return res.send(fields);
  });

  app.post('/api/templates/:templateId/fields', access.isRestrictedTo('user'), function(req, res, next) {

    var field = {
      title: req.body.title,
      order: req.body.order,
      created_at: req.body.date
    };

    req.template.fields.push(field);
    req.template.save(function(err){
      if (!err) {
        return res.send(field);
      } else {
        next(err);
      }
    });
  });

  app.put('/api/templates/:templateId/fields/:fieldId', access.isRestrictedTo('user'), function(req, res){

    var field = req.template.fields.id(req.params.fieldId);

    field.title = req.body.title;
    field.options = req.body.options;
    field.order = req.body.order;
    field.type = req.body.type;

    req.template.save(function(err){
      if (!err) {
        console.log("updated");
      }
      return res.send(req.item);
    });
  });

  app.delete('/api/templates/:templateId/fields/:fieldId', access.isRestrictedTo('user'), function(req, res){

    var field = req.template.fields.id(req.params.fieldId);
    field.remove();
    req.template.save(function(err, item) {
      if (!err) {
        console.log("field removed");
        return res.send('')
      }
    });
  });



  //|-----------|
  //| USER INFO |
  //|-----------|

  app.get('/api/user', access.isRestrictedTo('user'), function (req, res) {
    res.json(req.session.user);
  });

  //|---------|
  //| PROJECT |
  //|---------|

  app.get('/api/projects/:projectId/fields', access.isRestrictedTo('user'), function(req, res){

    if (req.project.template) {
      Template.findById(req.project.template, function(err, template){
        res.send(template.fields);
      });
    } else {
      res.send('[]');
    }
  });

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

    var order = req.item.order;

    req.project.items.sort(function(a, b){
      return b.order - a.order;
    })
    var previous = req.project.items.findOne({order: {$lt: order}})._id;
    req.project.items.sort(function(a, b){
      return a.order - b.order;
    })

    var next = req.project.items.findOne({order: {$gt: order }})._id;

    var response = {
          _id: req.item._id,
          title: req.item.title,
          order: order,
          previous: previous,
          next: next
        },
        last = function() {
          res.send(response);
        };


    if (req.project.template) {
      Template.findById(req.project.template, function(err, template){
        response.fields = template.fields;
        last();
      });
    } else {
      last();
    }
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
    req.project.save(function(err, project){
      if (!err) {
        console.log('Item created!');
        res.send(project.items[project.items.length - 1]);
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
//    var records = req.item.records,
//        fields,
//        template = req.project.template,
//        response = [],
//        last = function() {
////          for (var n = 0, l = records.length; n < l; n++) {
////
////
////
////            newRecord.values = {};
////            for (var field in fields) {
////              if (!fields.hasOwnProperty(field)) continue;
////              if(records[n]._id == _id) newRecord.values[id] = records[n][id];
//////             newRecord.values[field] = fields[field]._id;
////            }
////            newRecord.values = fields;
////
////            response.push(newRecord);
////          }
//          var record = {
//            _id: records[n]._id,
//            created_at: records[n].created_at
//          };
//
//          return res.send(response);
//        };
//
//    if (template) {
//      Template.findById(template, function(err, template){
//        fields = template.fields;
//        last();
//      });
//    } else {
//      last();
//    }
    return res.send(req.item.records);

  });

  app.post('/api/projects/:projectId/items/:itemId/records', access.isRestrictedTo('user'), function(req, res, next) {


    var template = req.project.template,
        record = {
          created_at: req.body.date
        },
        last = function() {
          req.item.records.push(record);
          req.project.save(function(err){
            if (!err) {
              return res.send(record);
            } else {
              next(err);
            }
          });
        };

    if (template) {
      Template.findById(template, function(err, template){
        for (var field in template.fields) {
          var id = template.fields[field].id;
          if (req.body[id]) record[id] = req.body[id];
        }
        last();
      });
    } else {
      last();
    }


  });
}

module.exports = sampleton;