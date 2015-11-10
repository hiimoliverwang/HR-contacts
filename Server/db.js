var getProf = require('./githubHelper');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')
var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {
  console.log('connected!!!!!!!!!!!')
  // yay!
});
exports.Contacts = new mongoose.Schema({
  first: String,
  last: String,
  number: String,
  github: String,
  picUrl: String
});


exports.Contacts.pre('save', function (next) {
  var user = this;
  getProf(user.github)
  .then(function(profile){
    user.picUrl = profile.avatarUrl
    console.log(user)
    next();
  })

});

exports.mongoose = mongoose;
