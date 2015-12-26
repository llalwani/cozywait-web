(function() {
  'use strict';

  angular
  .module('app.landing')
  .controller('LandingController', LandingController);

  LandingController.$inject = ['authService'];

  function LandingController(authService) {

    var vm = this;
    vm.isLoggedIn = authService.isLoggedIn;

  }

})();
