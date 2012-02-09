var application_root = __dirname,
    express = require("express"),
    stylus = require("stylus"),
    nib = require("nib"),
    path = require("path"),
    mongoose = require('mongoose');

var app = module.exports = express.createServer();

mongoose.connect('mongodb://localhost/sampleton');


var Item = mongoose.model('Item', (function() {
  var shema = new mongoose.Schema({
    title:String,
    records:[Record],
    order:Number
  });

  shema.virtual('counter').get(function(){
    return this.records.length;
  });
  return shema;
})());


var Record = new mongoose.Schema({
  date: { type: Date, 'default': Date.now }
});

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

//|-----------|
//| TEMPLATES |
//|-----------|

app.get(/^\/templates\/([^.]+).html$/, function(req, res){
  var path = req.params[0];
  res.render(path + '.jade', {layout: false});
});

//|-------|
//| ITEMS |
//|-------|

app.get('/api/items', function(req, res){
  return Item.find(function(err, items) {
    var response = [];
    items.forEach(function(item){
      response.push({
        _id: item._id,
        title: item.title,
        order: item.order,
        counter: item.counter
      });
    });
    return res.send(response);

    //return res.send(items);

  });
});

app.get('/api/items/:id', function(req, res){
  return Item.findById(req.params.id, function(err, item) {
    if (!err) {
      //item.records = new array(req.body.records.length);
      return res.send(item);
    }
  });
});

app.put('/api/items/:id', function(req, res){
  return Item.findById(req.params.id, function(err, item) {
    item.title = req.body.title;
    item.records = req.body.records;
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
  var item = new Item({
    title: req.body.title,
    records: req.body.records,
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

//|---------|
//| RECORDS |
//|---------|

app.get('/api/records/:itemId', function(req, res){
  console.log('get:records');

  return Item.findById(req.params.itemId, function(err, item) {
    return res.send(item.records);
  });

});

app.post('/api/records/:item', function(req, res){

  console.log('route' + req.params.item);

  Item.findById(req.params.item, function(err, item) {
    item.records.push({
      date: req.body.date
    });
    item.save();
    console.log('Record created');
    return res.send({success:1});
  });

});

//|---------

app.listen(4000);

express.createServer(function (req, res) {
  res.redirect('http://www.chalbert.com' + req.url, 301);
}).listen(5000);
