(function() {
  'use strict';

  angular
  .module('app.waitList')
  .directive('gzPartyTable', gzPartyTable);

  function gzPartyTable() {
    return {
      templateUrl: 'app/waitList/directives/partyTable.html',
      restrict: 'E',
      controller: PartyTableController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        parties: '=',
        messages:'='
      }
    }
  }

  PartyTableController.$inject = [];

  function PartyTableController() {
    var vm = this;
    vm.removeParty = removeParty;
    vm.sendTextMessage = sendTextMessage;
    vm.toggleDone = toggleDone;

    function removeParty(party) {
      party.deleted = Firebase.ServerValue.TIMESTAMP;
      vm.parties.$save(party);
    }

    // function sendTextMessage(party) {
    //   textMessageService.sendTextMessage(party, vm.parties);
    // }

    function sendTextMessage(party) {
      var newTextMessage = {
        phoneNumber: party.phone,
        size: party.size,
        name: party.name,
        party_id : party.$id
      };
      vm.messages.$add(newTextMessage);
      party.notified = Firebase.ServerValue.TIMESTAMP;
      vm.parties.$save(party);
    }

    function toggleDone(party) {
      vm.parties.$save(party);
    }

  }

})();
