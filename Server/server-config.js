var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var mdb = require('./db');
var contactTable = mdb.mongoose.model('contacts', mdb.Contacts);


var app = express();

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.use(partials());
app.use(bodyParser.json());
app.use('/',serveStatic(__dirname + '/../Client'));
// app.use(express.cookieParser('shhhh, very secret'));
// app.use(express.session());

app.all('/*', function (req , res, next){
  console.log(req.body)
  next();
})



app.get('/numbers',function (req, res){
  contactTable.find({})
  .then(function(result){
    res.send(201, result)
  })
  // res.send(names[req.body.name]);
})

app.post('/newNumber', function (req, res) {
  var newPerson = new contactTable({
    first:req.body.first,
    last:req.body.last,
    number:req.body.number,
    github:req.body.github
  });
  newPerson.save()
  res.send(201)
})


module.exports = app;
