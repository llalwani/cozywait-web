(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('partyService', partyService);

  partyService.$inject = ['$firebaseArray', 'firebaseDataService'];

  function partyService($firebaseArray, firebaseDataService) {

    var service = {
      getPartiesByUser: getPartiesByUser,
      getPartiesHistoryByUser:getPartiesHistoryByUser,
      Party: Party
    };

    return service;

    ////////////

    function getPartiesByUser(uid) {
      return $firebaseArray(firebaseDataService.customers.child(uid).child('parties').orderByChild("deleted").equalTo(false));
    }

    function getPartiesHistoryByUser(uid) {
      return $firebaseArray(firebaseDataService.customers.child(uid).child('parties').orderByChild("created"));
    }

    function Party() {
      this.name = '';
      this.phone = '';
      this.size = '';
      this.quote = '';
      this.done = false;
      this.notified = false;
      this.deleted = false;
      this.created = Firebase.ServerValue.TIMESTAMP;
    }
  }

})();