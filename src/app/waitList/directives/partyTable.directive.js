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



	PartyTableController.$inject = ['$scope','$http','$timeout'];

	function PartyTableController($scope,$http,$timeout) {
		var vm = this;
		vm.removeParty = removeParty;
		vm.sendTextMessage = sendTextMessage;
		vm.assignTable = assignTable;
		vm.loading=false;
		vm.fromNow=fromNow;
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

  }

})();
