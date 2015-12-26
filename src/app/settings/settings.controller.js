(function() {
  'use strict';

  angular
  .module('app.settings')
  .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$rootScope','$scope', 'authService','user'];

  function SettingsController($rootScope, $scope, authService, user) {
    var unbind;
    var profile = authService.profile(user.uid);
    profile.$bindTo($scope, 'profile').then(function(ub) { unbind = ub; });

    $rootScope.$on('logout', function($scope) {
      delete $scope.profile;
    });
  }

})();
