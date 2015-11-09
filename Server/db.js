var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')
var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {
  console.log('connected!!!!!!!!!!!')
  // yay!
});
exports.Contacts = new mongoose.Schema({
  name: String,
  number: String
});
exports.mongoose = mongoose;
