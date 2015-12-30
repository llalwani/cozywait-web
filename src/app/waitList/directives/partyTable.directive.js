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



	PartyTableController.$inject = ['$scope','$http','$timeout','ngDialog'];

	function PartyTableController($scope,$http,$timeout,ngDialog) {
		var vm = this;
		vm.removeParty = removeParty;
		vm.sendTextMessage = sendTextMessage;
		vm.assignTable = assignTable;
        vm.showUserHistory=showUserHistory;
        vm.loading=false;
        vm.fromNow=fromNow;
        vm.dateDiff=dateDiff;
        vm.clock=moment();
        vm.tickInterval=1000;

        



        var tick = function() {
        	vm.clock = moment().valueOf(); // get the current time
        	$timeout(tick, vm.tickInterval); // reset the timer
        }

    	// Start the timer
    	$timeout(tick, vm.tickInterval);


    	function removeParty(party) {
    		party.deletedAt = Firebase.ServerValue.TIMESTAMP;
    		party.deleted = true;
            party.done = false;
            vm.parties.$save(party);
        }

        function showUserHistory(party){
            ngDialog.open({
                template: 'app/waitList/directives/user-history.html',
                controller: function Ctrl($scope,user,partyService) {
                    $scope.history = partyService.getUserHistoryByUser(user.uid,party.phone);
                    $scope.user=party;
                    $scope.loaded=false;
                    $scope.history.$loaded().then(function () {
                        $scope.loaded=true;
                    })
                },
                resolve: {
                    user: function resolveUser(authService) {
                        return authService.firebaseAuthObject.$requireAuth();
                    }
                }
            });
        }


        function sendTextMessage(party) {
          vm.loading=true;
          var local = JSON.parse(localStorage.getItem('firebase:session::cozywait'));
          var data = 
          {
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
            complete:function() {
                vm.loading=false;
                $scope.$apply();
            }
        });
      }

      function assignTable(party) {
        party.done=true;
        party.deleted = true;
        party.deletedAt = Firebase.ServerValue.TIMESTAMP;
        vm.parties.$save(party);
    }

    function fromNow(date)
    {
        var m=moment(date);
        return m.fromNow(true);
    }

    function dateDiff(date1,date2)
    {
        var date1=moment(date1);
        var date2=moment(date2);
        var duration = moment.duration(date2.diff(date1));
        var asMinutes=duration.asMinutes();
        return asMinutes.toFixed(0);
    }
}

})();
