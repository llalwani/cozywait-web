(function() {
	'use strict';

	angular
	.module('app.history')
	.directive('gzHistoryTable', gzPartyTable);
	

	function gzPartyTable() {
		return {
			templateUrl: 'app/history/directives/history.html',
			restrict: 'E',
			controller: PartyTableController,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				parties: '='
			}
		}
	}



	PartyTableController.$inject = ['$scope','$http','$timeout'];

	function PartyTableController($scope,$http,$timeout) {
		var vm = this;
		vm.moveToWaitList = moveToWaitList;
		
        function moveToWaitList(party) {
            party.deleted = false;
            party.deletedAt = false;
            party.done = false;
            vm.parties.$save(party);
        }


    }

})();
