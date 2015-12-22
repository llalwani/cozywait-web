(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('firebaseDataService', firebaseDataService);

  firebaseDataService.$inject = ['FIREBASE_URL'];

  function firebaseDataService(FIREBASE_URL  ) {
    var root = new Firebase(FIREBASE_URL);

    var service = {
      root: root,
      customers: root.child('customers'),
      users: root.child('users'),
      textMessages: root.child('textMessages')
    };

    return service;
  }

})();