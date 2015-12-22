(function() {
  'use strict';

  angular
  .module('app.auth')
  .factory('authService', authService);

  authService.$inject = ['$rootScope', '$firebaseAuth', 'firebaseDataService'];

  function authService($rootScope, $firebaseAuth, firebaseDataService) {
    var firebaseAuthObject = $firebaseAuth(firebaseDataService.root);

    var currentUser;

    firebaseAuthObject.$onAuth(function(auth) {
      currentUser = auth;
    });

    var service = {
      firebaseAuthObject: firebaseAuthObject,
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      sendWelcomeEmail: sendWelcomeEmail
    };

    return service;

    ////////////

    function register(user) {
      return firebaseAuthObject.$createUser(user);
    }

    function login(user) {
      return firebaseAuthObject.$authWithPassword(user);
    }

    function logout() {
      $rootScope.$broadcast('logout');
      firebaseAuthObject.$unauth();
    }

    function isLoggedIn() {
      return currentUser;
    }

    function sendWelcomeEmail(uid,email) {
      firebaseDataService.users.child(uid).set({email: email, name: name||firstPartOfEmail(email)});
    }

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@'))||'');
    }

    function ucfirst (str) {
      // inspired by: http://kevin.vanzonneveld.net
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }

  }

})();