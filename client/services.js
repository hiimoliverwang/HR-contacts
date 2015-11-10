angular.module('contacts.services',[])
.factory('currentUser', function (){
  var curUser = {};
  return {setUser : setUser,
          getUser : getUser};

  function setUser (user) {
    curUser = user;
    console.log(curUser)
  }

  function getUser () {
    return curUser;
  }
})
