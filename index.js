var application_root = __dirname,
  express = require("express"),
  stylus = require("stylus"),
  nib = require("nib"),
  path = require("path"),
  mongoose = require('mongoose');

var app = module.exports = express.createServer();

mongoose.connect('mongodb://localhost/sampleton');

var Item = mongoose.model('Item', new mongoose.Schema({
  title: String,
  counter: Number,
  order: Number
}));

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'All work and no play makes Jack a dull boy' }));
  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/templates');
  app.set('view engine', 'jade');

});

// Routes

app.get('/', function(req, res){
  res.render('index', {title: "Sampling made simple ~ Sampleton"});
});

app.get('/api/items', function(req, res){
  return Item.find(function(err, items) {
    return res.send(items);
  });
});

app.get('/api/items/:id', function(req, res){
  return Item.findById(req.params.id, function(err, item) {
    if (!err) {
      return res.send(item);
    }
  });
});

app.put('/api/items/:id', function(req, res){
  return Item.findById(req.params.id, function(err, item) {
    item.title = req.body.title;
    item.counter = req.body.counter;
    item.order = req.body.order;
    return item.save(function(err) {
      if (!err) {
        console.log("updated");
      }
      return res.send(item);
    });
  });
});

app.post('/api/items', function(req, res){
  var item;
  item = new Item({
    title: req.body.title,
    counter: req.body.counter,
    order: req.body.order
  });
  item.save(function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  return res.send(item);
});

app.delete('/api/items/:id', function(req, res){
  return Item.findById(req.params.id, function(err, item) {
    return item.remove(function(err) {
      if (!err) {
        console.log("removed");
        return res.send('')
      }
    });
  });
});

app.get(/^\/tpl\/([^.]+).html$/, function(req, res){
  var path = req.params[0];
  res.render('public/' + path + '.jade', {layout: false});
});

app.listen(4000);