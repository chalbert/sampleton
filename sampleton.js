var application_root = __dirname,
  express = require("express"),
  path = require("path"),
  mongoose = require('mongoose');

var app = express.createServer();

app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(3000);
