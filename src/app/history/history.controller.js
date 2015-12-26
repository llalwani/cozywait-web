(function() {
  'use strict';

  angular
  .module('app.history')
  .controller('HistoryController', HistoryController);

  HistoryController.$inject = ['$rootScope', 'partyService','user'];

  function HistoryController($rootScope, partyService, user) {
    var vm = this;
    vm.parties = partyService.getPartiesHistoryByUser(user.uid);
    console.log(vm.parties);
    $rootScope.$on('logout', function() {
      vm.parties.$destroy();
    });
  }

})();
