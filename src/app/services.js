(function() {
  'use strict';

  /* Services */


  // Demonstrate how to register services
  // In this case it is a simple value service.
  angular.module('app.services', [])
    .value('FIREBASE_URL', 'https://gz-angularfire-test.firebaseio.com/')
    .factory('dataService', ['FIREBASE_URL', function(FIREBASE_URL) {
      var dataReference = new Firebase(FIREBASE_URL);

      return dataReference;
    }])
    .factory('partyService', ['$firebaseArray', 'FIREBASE_URL', 'dataService',
      function($firebaseArray, FIREBASE_URL, dataService) {

      var partyServiceObject = {
        saveParty: function(party, uid) {
          var user = $firebaseArray(dataService.child('users').child(uid));
          user.$add(party);
        },
        getPartiesByUser: function(uid) {
          return  $firebaseArray(dataService.child('users').child(uid));
        }
      };

      return partyServiceObject;
    }])
    .factory('authService', ['$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', 'dataService',
      function($rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, dataService) {
      var firebaseAuthObject = $firebaseAuth(dataService);

      $rootScope.currentUser = null;

      firebaseAuthObject.$onAuth(function(currentUser) {
        $rootScope.currentUser = currentUser;
      });

      var authServiceObject = {
        firebaseAuthObject: firebaseAuthObject,
        register: function(user) {
          return firebaseAuthObject.$createUser(user);
        },
        login: function(user) {
          return firebaseAuthObject.$authWithPassword(user);
        },
        logout: function() {
          $rootScope.$broadcast('logout');
          firebaseAuthObject.$unauth();
        },
        getCurrentUser: function() {
          return $rootScope.currentUser.uid;
        },
        sendWelcomeEmail: function(emailAddress) {
          dataService.child('emails')
            .push({emailAddress: emailAddress});
        }
      };

      return authServiceObject;
    }])
    .factory('textMessageService', ['$firebaseArray', 'FIREBASE_URL', 'partyService', 'dataService',
      function($firebaseArray, FIREBASE_URL, partyService, dataService) {

      var textMessageServiceObject = {
        sendTextMessage: function(party, uid, parties) {
          var newTextMessage = {
            phoneNumber: party.phone,
            size: party.size,
            name: party.name
          };
          dataService.child('textMessages').push(newTextMessage);
          party.notified = true;
          parties.$save(party);
        }
      };

      return textMessageServiceObject;
    }]);
})();
