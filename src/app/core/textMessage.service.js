(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('textMessageService', textMessageService);

  textMessageService.$inject = ['$firebaseArray','firebaseDataService'];

  function textMessageService($firebaseArray,firebaseDataService) {
    var service = {
      sendTextMessage: sendTextMessage,
      messages:messages
    };

    return service;

    ////////////

    function sendTextMessage(party, parties) {
      var newTextMessage = {
        phoneNumber: party.phone,
        size: party.size,
        name: party.name
      };
      firebaseDataService.messages.push(newTextMessage);
      party.notified = Firebase.ServerValue.TIMESTAMP;
      parties.$save(party);
    }

    function messages(uid) {
      return $firebaseArray(firebaseDataService.messages.child(uid).child('parties'));
    }
  }

})();