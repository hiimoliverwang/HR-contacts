
var request = require('request');
var Promise = require('bluebird');

module.exports = function (user) {
  // For this request we'll hit github's public users api endpoint.
  // It requires the User-Agent header to be set, so instead of passing the 
  // GET url directly into `request`, we'll pass this options hash, 
  // containing the url and the needed header, instead.
  var options = {
    url: 'https://api.github.com/users/'+user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  return new Promise(function (resolve, reject) {
    request.get(options, function (err, data, body) {
      if (err) { return reject(err); }
      
      var simpleProfile = {
        handle: body.login,
        name: body.name,
        avatarUrl: body.avatar_url+'.jpg', // extension necessary for image tagger
      };
      resolve(simpleProfile);
    });
  });
};
