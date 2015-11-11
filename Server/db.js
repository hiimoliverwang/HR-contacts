var getProf = require('./githubHelper');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var bluebird = require('bluebird');

mongoose.connect('mongodb://localhost/test')
var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {
  console.log('connected!!!!!!!!!!!')
});
exports.Contacts = new mongoose.Schema({
  first: String,
  last: String,
  number: String,
  github: String,
  picUrl: String,
  githubUrl: String,
  email:String,
  password:String
});


exports.Contacts.pre('save', function (next) {
  var user = this;
  var cipher = bluebird.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;    
      getProf(user.github)
      .then(function(profile){
        var name = profile.name.split(' ')
        user.picUrl = profile.avatarUrl;
        user.githubUrl = profile.githubUrl;
        user.email = profile.email;
        user.first = name[0];
        user.last = name[1];
        console.log(user)
        next();
      })

    });
});

exports.mongoose = mongoose;
