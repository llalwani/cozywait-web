(function() {
  'use strict';

  angular
  .module('app.waitList')
  .controller('WaitListController', WaitListController);

  WaitListController.$inject = ['$rootScope', 'partyService','textMessageService','user'];

  function WaitListController($rootScope, partyService, textMessageService, user) {
    var vm = this;

    vm.parties = partyService.getPartiesByUser(user.uid);
    vm.messages = textMessageService.messages(user.uid);

    $rootScope.$on('logout', function() {
      vm.parties.$destroy();
      vm.messages.$destroy();
    });
  }

})();
