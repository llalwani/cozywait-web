(function() {
  'use strict';

  angular
  .module('app.waitList')
  .controller('WaitListController', WaitListController);

  WaitListController.$inject = ['$rootScope', 'partyService','authService','user'];

  function WaitListController($rootScope, partyService, authService, user) {
    var vm = this;
    vm.profile = authService.profile(user.uid);
    vm.parties = partyService.getPartiesByUser(user.uid);
    
    console.log(vm);

    $rootScope.$on('logout', function() {
      vm.parties.$destroy();
      vm.profile.$destroy();
    });
  }

})();
