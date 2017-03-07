const GameData = {
	randomSequence: [],
	userSequence: [],
	randomSequenceRunning: false,
	gameOn: false,
	successfulSequences: 0,
	buttonIds: ["button-1", "button-2", "button-3", "button-4"],

	addToRandom: function() {
		var randomNumber = Math.floor(Math.random() * 4) + 1;
		this.randomSequence.push(randomNumber);
	},
	addToUser: function(buttonNum) {
		this.userSequence.push(buttonNum);
	},
	increaseSuccessful: function() {
		this.successfulSequences += 1;
	},
	startGame: function() {
		if (this.gameOn === false) {
			this.gameOn = true;
		}
	},
	endGame: function() {
		if (this.gameOn === true) {
			this.gameOn = false;
		}
	},
	startRandom: function() {
		if (this.randomSequenceRunning === false) {
			this.randomSequenceRunning = true;
		}
	},
	endRandom: function() {
		if (this.randomSequenceRunning === true) {
			this.randomSequenceRunning = false;
		}
	},
	randomClear: function() {
		this.randomSequence = [];
	},
	userClear: function() {
		this.userSequence = [];
	},
	clearSuccessful: function() {
		this.successfulSequences = 0;
	}
};

// const AppControl = {
// 	runRandom: function() {
// 		if (GameData.gameOn === true){
// 			GameData.randomSequenceRunning = true;
// 			for (var i = 0; i < GameData.randomSequence.length; i++) {
// 				setTimeout(function(x) {
// 					return function(){
// 						if (GameData.randomSequence[x] === 1) {

// 						}
// 					}
// 				}(i), 1000*i)
// 			}
// 		}
// 	}
// };

const ViewControl = {
	lightButtonOne: function() {
		$("#button-1").css("background", "lightblue");
		setTimeout(function() {
			$("#button-1").css("background", "blue");
		}, 300);
	},
	lightButtonTwo: function() {
		$("#button-2").css("background", "red");
		setTimeout(function() {
			$("#button-2").css("background", "darkred");
		}, 300);
	},
	lightButtonThree: function() {
		$("#button-3").css("background", "lightgreen");
		setTimeout(function() {
			$("#button-3").css("background", "green");
		}, 300);
	},
	lightButtonFour: function() {
		$("#button-4").css("background", "lightyellow");
		setTimeout(function() {
			$("#button-4").css("background", "yellow");
		}, 300);
	}
};

