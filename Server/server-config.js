var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var mdb = require('./db');
var contactTable = mdb.mongoose.model('contacts', mdb.Contacts);
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');
var util = require('./util');
var jwt = require('jwt-simple');
var Q = require('q');



contactTable.comparePassword = function(candidatePassword, savedPassword, cb) {
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


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


app.post('/login', function(req, res, next) {
  var github = req.body.github;
  var password = req.body.password;

  contactTable.findOne({ github: github })
    .exec(function(err, user) {
      if (!user) {
        res.redirect('/login');
      } else {
        contactTable.comparePassword(password, user.password, function(err, match) {
          if (match) {
            var token = jwt.encode(user, 'secret');
            res.json({token: token});
          } else {
            res.send(201,'no')
          }
        });
      }
  });
})


app.get('/numbers',function (req, res){
  contactTable.find({})
  .then(function(result){
    res.send(201, result)
  })
  // res.send(names[req.body.name]);
})

app.post('/newNumber', function (req, res) {
  var github = req.body.github;
  var password = req.body.password;
  var number = req.body.number;

  contactTable.findOne({ github: github })
    .exec(function(err, user) {
      if (!user) {
        var newUser = new contactTable({
          github: github,
          password: password,
          number:number
        });
        newUser.save(function(err, newUser) {
          if (err) {
            res.send(500, err);
          }
          var token = jwt.encode(user, 'secret');
          res.json({token: token});
        });
      } else {
        console.log('Account already exists');
        res.send(203, 'already exist');

      }
    });
})

app.get('/signedin',function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  });


module.exports = app;
