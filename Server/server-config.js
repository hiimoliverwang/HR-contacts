var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');



var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.bodyParser());
app.use(express.static(__dirname + '../client'));
// app.use(express.cookieParser('shhhh, very secret'));
// app.use(express.session());

app.get('/', function (req, res){
  res.render('index')
});


module.exports = app;
