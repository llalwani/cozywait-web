(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('textMessageService', textMessageService);

  textMessageService.$inject = ['$firebaseArray','$firebaseObject','firebaseDataService'];

  function textMessageService($firebaseArray,$firebaseObject,firebaseDataService) {
    var service = {
      sendTextMessage: sendTextMessage,
      messages:messages,
      credit:credit,
      sms:sms
    };

    return service;

    ////////////

    function sendTextMessage(party, parties) {
      var newTextMessage = {
        phoneNumber: party.phone,
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