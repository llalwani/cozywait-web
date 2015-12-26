(function() {
  'use strict';

  angular
    .module('app.settings')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/settings', {
      templateUrl: 'app/settings/settings.html',
      controller: 'SettingsController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });
  }

  resolveUser.$inject = ['authService'];

  function resolveUser(authService) {
    return authService.firebaseAuthObject.$requireAuth();
  }

})();
