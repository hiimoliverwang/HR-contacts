var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var mdb = require('./db');
var contactTable = mdb.mongoose.model('user', mdb.Contacts);


var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/../Client'));
// app.use(express.cookieParser('shhhh, very secret'));
// app.use(express.session());
var names = {
  oliver:"41241515"
}
app.all('/*', function (req , res, next){
  console.log(req.body)
  next();
})

app.get('/', function (req, res){
  console.log(req.url)
  res.render('index')
});

app.post('/numbers',function (req, res){
  console.log(req.body);
  console.log(names[req.body.name]);
  res.send(names[req.body.name]);
})


module.exports = app;
