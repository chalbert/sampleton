var application_root = __dirname,
  express = require("express"),
  stylus = require("stylus"),
  path = require("path"),
  mongoose = require('mongoose');

var app = module.exports = express.createServer();

mongoose.connect('mongodb://localhost/sampleton');

var Item = mongoose.model('Item', new mongoose.Schema({
  title: String,
  counter: Boolean,
  order: Number
}));

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'All work and no play makes Jack a dull boy' }));
  app.use(stylus.middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

});

// Routes

app.get('/', function(req, res){
  res.render('index', {title: "MongoDB Backed TODO App"});
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
    item.done = req.body.done;
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
    done: req.body.done,
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


app.listen(4000);