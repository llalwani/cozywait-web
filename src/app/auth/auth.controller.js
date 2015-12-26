(function() {
  'use strict';

  angular
  .module('app.auth')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$location', 'authService'];

  function AuthController($location, authService) {
    var vm = this;

    vm.register = register;
    vm.login = login;
    vm.loading=false;

    function register(user) {
      vm.loading = true;
      return authService.register(user)
      .then(function() {
        return vm.login(user);
      })
      .then(function(auth) {
        return authService.sendWelcomeEmail(auth.uid,user.email,user.restaurant);
      })
      .catch(function(error) {
        vm.error = error;
        vm.loading=false;
      });
    }

    function login(user) {
     vm.loading=true;
     return authService.login(user)
     .then(function(response) {
      $location.path('/waitlist');
      return response;
    })
     .catch(function(error) {
      vm.error = error;
      vm.loading=false;
    });
   }

 }

})();