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



	PartyTableController.$inject = ['$scope','$http'];

	function PartyTableController($scope,$http) {
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

			$.ajax({
				url : 'https://www.mywedstory.com/cozywait/index.php',
				type : 'POST',
				data : data,
				dataType:'json',
				success : function(data) {              
					vm.loading=false;
				},
				error : function(request,error) {
					vm.loading=false;
				},
				complete:function()
				{
					vm.loading=false;
					$scope.$apply();
				}
			});
		}

		function toggleDone(party) {
			vm.parties.$save(party);
		}

	}

})();
