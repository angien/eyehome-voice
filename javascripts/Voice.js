var app = angular.module('Voice', ['ngResource', 'ngSanitize']);


app.controller('Voice', function($scope, $resource, $timeout) {

    /**
     * init controller and set defaults
     */
    function init () {
		$scope.messages = [];
		$scope.displayMessage = "";
		$scope.currentPage = 0;
		
    }


	$scope.currentScreen = 1;
	$scope.toScreen2 = function () {
		$scope.currentScreen = 2;
	};
	$scope.toScreen1 = function () {
		$scope.currentScreen = 1;
	};
	
	$scope.chooseMessage = function () {
		
		// load messages from file
		var file = 'metadata/message.txt';
		console.log(file);
		var reader = new FileReader();
		reader.onload = function(progressEvent){
			// Entire file
			console.log(this.result);

			// By lines
			var lines = this.result.split('\n');
			for(var line = 0; line < lines.length; line++){
			  	console.log(lines[line]);
			}
		};
		reader.readAsText(file);
		
		// should be read from file instead
		$scope.messages[0] = "I am tired";
		$scope.messages[1] = "I am thirsty";
		$scope.messages[2] = "Let's go outside";
		$scope.messages[3] = "I am bored";
		$scope.messages[4] = "I am hungry";
		
		$scope.toScreen2();
	};
	
	$scope.nextPage = function () {
		if ($scope.messages.length > ($scope.currentPage * 3) + 3) {
			$scope.currentPage++;
		}
	};
	
	$scope.messageSelected = function (message_num) {
	
		$scope.displayMessage = $scope.messages[$scope.currentPage*3 + message_num];
		$scope.currentPage = 0; // reset current page
		$scope.toScreen1();
	
	};
	
	$scope.playMessage = function () {
		responsiveVoice.speak($scope.displayMessage, 'UK English Male');
		
	};
	


// have yet to check which page we're on (only works on first page)
// may also want to refactor this out into its own controller
$scope.keyPress = function(e, currentScreen) {
    console.log('keyup', e);
    var key = e.keyCode ? e.keyCode : e.which;

    if (currentScreen == 1) {
       	if (key == '81') //left
        	$scope.writeMessage();
      	else if (key == '87') //up
          	$scope.chooseMessage();
      	else if (key == '69') // right
          	$scope.playMessage();
      	else if (key == '82') // down
          	$scope.quit();
      	else
          	console.log(e.keyCode);
    }
    else { // is 2

      	//TODO fix this because we don't want any pop ups (fix in index)
       	if (key == '81') //left
       		$scope.messageSelected(0);
    	else if (key == '87') //up
        	$scope.messageSelected(1);
    	else if (key == '69') // right
     	   	$scope.messageSelected(2);
    	else if (key == '82') // down
      	  	$scope.nextPage();
      	else if (key == '89') // disengage
      		$scope.toScreen1();
    	else
        	console.log(e.keyCode);
    	}
   
		console.log("current screen is " + currentScreen);
	}

    init();
});