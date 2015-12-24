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
        profile: '='
      }
    }
  }

  PartyTableController.$inject = ['$http'];

  function PartyTableController($http) {
    var vm = this;
    vm.removeParty = removeParty;
    vm.sendTextMessage = sendTextMessage;
    vm.toggleDone = toggleDone;
    vm.loading=false;

    function removeParty(party) {
      party.deleted = Firebase.ServerValue.TIMESTAMP;
      vm.parties.$save(party);
    }


    function sendTextMessage(party) {
      vm.loading=true;
      var local = JSON.parse(localStorage.getItem('firebase:session::cozywait'));
      var data = {
       number: party.phone,
       size: party.size,
       name: party.name,
       party_id : party.$id,
       uid:local.uid,
       token:local.token
     };
     
     $http.post("http://www.washkart.io/cozywait/index.php", data).success(function(data, status) {
      console.log("success");
      vm.loading=false;

      console.log(data);
    }).error(function()
    {
      vm.loading=false;
    });

  }

  function toggleDone(party) {
    vm.parties.$save(party);
  }

}

})();
