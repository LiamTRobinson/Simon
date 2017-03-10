const GameData = {
//this is all the data for the game. random sequence is the one that the computer will run. user sequence is the one the user
//inputs each turn. randomsequencerunning defines whether or not it is running. gameon defines whether or not the game is on.
//time delay sets the time delay for current difficulty. highscores stores the high scores. highnames stores the names for each
//score. nameloc stores the array location for the name to update. points is the number of points scored. multiplier changes points
//based on difficulty.
	randomSequence: [],
	userSequence: [],
	randomSequenceRunning: false,
	gameOn: false,
	successfulSequences: 0,
	timeDelay: 1000,
	highScores: [0,0,0,0,0],
	highNames: ["N/A","N/A","N/A","N/A","N/A"],
	nameLoc: 0,
	points: 0,
	multiplier: 1,
//these are explicit in their function. they manipulate the above data.
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
	},
	beginnerTime: function() {
		this.timeDelay = 1000;
	},
	intermediateTime: function() {
		this.timeDelay = 500;
	},
	hardTime: function() {
		this.timeDelay = 250;
	},
//this checks the final score against the high scores, bumps everything below it down one space, inserts the current at i, and stores the
//value of i in nameloc.
	checkScores: function() {
		for (var i = 0; i < this.highScores.length; i++) {
			if (this.points > this.highScores[i]) {
				for (var j = this.highScores.length - 1; j > i; j--) {
					this.highScores[j] = this.highScores[j-1];
				}
				this.highScores[i] = this.points;
				this.nameLoc = i;
				return true;
			}
		}
		return false;
	},
	updateNames: function(newName) {
		for (var k = this.highNames.length - 1; k > this.nameLoc; k--) {
			this.highNames[k] = this.highNames[k-1];
		}
		this.highNames[this.nameLoc] = newName;
	},
	makePoints: function() {
		this.points = this.successfulSequences*(1000/this.timeDelay)*this.multiplier;
	},
	expertMultiplierOn: function() {
		this.multiplier = 1.5;
	},
	expertMultiplierOff: function() {
		this.multiplier = 1;
	}
};

const AppControl = {
//this runs the computer turn
	runRandom: function() {
		if (GameData.gameOn === true){
			GameData.startRandom();
			var stopTime = 0;
			for (var i = 0; i < GameData.randomSequence.length; i++) {
				stopTime += 1;
				setTimeout(function(x) {
					return function(){
						if (GameData.randomSequence[x] === 1) {
							ViewControl.lightButtonOne();
						}
						else if (GameData.randomSequence[x] === 2) {
							ViewControl.lightButtonTwo();
						}
						else if (GameData.randomSequence[x] === 3) {
							ViewControl.lightButtonThree();
						}
						else if (GameData.randomSequence[x] === 4) {
							ViewControl.lightButtonFour();
						}
					}
				}(i), GameData.timeDelay*i)
			}
			setTimeout(function(){GameData.endRandom();}, GameData.timeDelay*stopTime)
		}
	},
//these add corresponding values to user sequence.
	userButtonOne: function() {
		GameData.addToUser(1);
	},
	userButtonTwo: function() {
		GameData.addToUser(2);
	},
	userButtonThree: function() {
		GameData.addToUser(3);
	},
	userButtonFour: function() {
		GameData.addToUser(4);
	},
//this checks if the user input is correct and if it is complete
	successCheck: function() {
		var checkTo = GameData.randomSequence.slice(0, GameData.userSequence.length);
		if (GameData.userSequence.toString() !== checkTo.toString()) {
			ViewControl.stopSpin();
			ViewControl.showUserNameSubmit();
			ViewControl.displayModal();
			GameData.expertMultiplierOff();
			GameData.randomClear();
			GameData.userClear();
			GameData.endGame();
			GameData.clearSuccessful();
			$("#inner-current").html(GameData.successfulSequences);
		}
		else if (GameData.userSequence.length === GameData.randomSequence.length) {
			GameData.increaseSuccessful();
			GameData.userClear();
			$("#inner-current").html(GameData.successfulSequences);
			GameData.addToRandom();
			GameData.startRandom();
			var _this = this;
			setTimeout(function(){_this.runRandom()}, 1000);
		}
	},
};

const ViewControl = {
//these light the buttons and play the button sounds
	lightButtonOne: function() {
		var audioOne = new Audio("sounds/ButtonOne.m4a");
		$("#button-1").css("background", "lightblue");
		$("#button-1-container").css("background", "rgba(0,255,255,.5)");
		setTimeout(function() {
			$("#button-1").css("background", "radial-gradient(ellipse at top left, #c5deea 0%,#8abbd7 31%,#066dab 100%)");
			$("#button-1-container").css("background", "");
		}, 200);
		audioOne.play();
	},
	lightButtonTwo: function() {
		var audioTwo = new Audio("sounds/ButtonTwo.m4a");
		$("#button-2").css("background", "salmon");
		$("#button-2-container").css("background", "rgba(255,69,0,.5)");
		setTimeout(function() {
			$("#button-2").css("background", "radial-gradient(ellipse at top right, #f85032 0%,#f16f5c 0%,#a8362b 99%,#a8362b 100%,#e73827 100%)");
			$("#button-2-container").css("background", "");
		}, 200);
		audioTwo.play();
	},
	lightButtonThree: function() {
		var audioThree = new Audio("sounds/ButtonThree.m4a");
		$("#button-3").css("background", "lightgreen");
		$("#button-3-container").css("background", "rgba(173,255,47,.5)");
		setTimeout(function() {
			$("#button-3").css("background", "radial-gradient(ellipse at bottom left, #b4ddb4 0%,#83c783 17%,#52b152 33%,#005700 83%,#002400 100%)");
			$("#button-3-container").css("background", "");
		}, 200);
		audioThree.play();
	},
	lightButtonFour: function() {
		var audioFour = new Audio("sounds/ButtonFour.m4a");
		$("#button-4").css("background", "lightyellow");
		$("#button-4-container").css("background", "rgba(255,230,140,.5)");
		setTimeout(function() {
			$("#button-4").css("background", "radial-gradient(ellipse at bottom right, #faf096 0%,#fefcea 0%,#e2ca10 100%)");
			$("#button-4-container").css("background", "");
		}, 200);
		audioFour.play();
	},
//these display and hide the end game modal
	displayModal: function() {
		$("#score").html(GameData.points);
		$("#modal").css("display", "flex");
	},
	hideModal: function() {
		$("#modal").css("display", "none");
	},
//this expands or collapses the high scores
	showAndHideHighScores: function() {
		if ($("#scoreboard-container").css("display") === "none") {
			$("#scoreboard-container").css("display", "block");
		}
		else {
			$("#scoreboard-container").css("display", "none")
		}
	},
//this updates the high scores on the dom
	updateHighScores: function() {
		for (var g = 0; g < GameData.highScores.length; g++) {
			$("#"+g+"-score").html(GameData.highScores[g]);
			$("#"+g+"-name").html(GameData.highNames[g]);
		}
	},
//these show and hide close modal and usersubmit if its a high score 
	hideCloseModal: function() {
		$("#close-modal").css("display", "none");
	},
	showCloseModal: function() {
		$("#close-modal").css("display", "flex");
	},
	showUserNameSubmit: function() {
		GameData.makePoints();
		if (GameData.checkScores() === true) {
			$("#name-submit").css("display", "flex");
			this.hideCloseModal();
		}
	},
	hideUserNameSubmit: function() {
		$("#name-submit").css("display", "none");
	},
//these start and stop expert spin
	startSpin: function() {
		$("#game-board").css("animation-name", "spin");
		$("#inner-current").css("animation-name", "reverseSpin");
	},
	stopSpin: function() {
		$("#game-board").css("animation-name", "");
		$("#inner-current").css("animation-name", "");
	}
};

const EventHandlers = {
//these do everything to start games for their given difficulties
	beginnerGame: function() {
		if (GameData.gameOn === false) {
			GameData.beginnerTime();
			GameData.startGame();
			GameData.addToRandom();
			AppControl.runRandom();
		}
	},
	intermediateGame: function() {
		if (GameData.gameOn === false) {
			GameData.intermediateTime();
			GameData.startGame();
			GameData.addToRandom();
			AppControl.runRandom();
		}
	},
	hardGame: function() {
		if (GameData.gameOn === false) {
			GameData.hardTime();
			GameData.startGame();
			GameData.addToRandom();
			AppControl.runRandom();
		}
	},
	expertGame: function() {
		if (GameData.gameOn === false) {
			ViewControl.startSpin();
			GameData.expertMultiplierOn();
			GameData.hardTime();
			GameData.startGame();
			GameData.addToRandom();
			AppControl.runRandom();
		}
	},
//these do everything needed for corresponding button clicks
	clickOne: function() {
		if (GameData.gameOn === true && GameData.randomSequenceRunning === false) {
			ViewControl.lightButtonOne();
			AppControl.userButtonOne();
			AppControl.successCheck();
		}
	},
	clickTwo: function() {
		if (GameData.gameOn === true && GameData.randomSequenceRunning === false) {
			ViewControl.lightButtonTwo();
			AppControl.userButtonTwo();
			AppControl.successCheck();
		}
	},
	clickThree: function() {
		if (GameData.gameOn === true && GameData.randomSequenceRunning === false) {
			ViewControl.lightButtonThree();
			AppControl.userButtonThree();
			AppControl.successCheck();
		}
	},
	clickFour: function() {
		if (GameData.gameOn === true && GameData.randomSequenceRunning === false) {
			ViewControl.lightButtonFour();
			AppControl.userButtonFour();
			AppControl.successCheck();
		}
	},
//this does everything needed upon a high score submit
	clickSubmit: function() {
		GameData.updateNames($("#userName").val());
		ViewControl.updateHighScores();
		ViewControl.hideModal();
		ViewControl.showCloseModal();
		ViewControl.hideUserNameSubmit();
		$("#userName").val("");
	},
};
//these tie all the above to the dom
$(function(){
	$("#expert").on("click", EventHandlers.expertGame);
	$("#submit-button").on("click", EventHandlers.clickSubmit);
	$("#close-modal").on("click", ViewControl.hideModal);
	$("#beginner").on("click", EventHandlers.beginnerGame);
	$("#intermediate").on("click", EventHandlers.intermediateGame);
	$("#hard").on("click", EventHandlers.hardGame);
	$("#button-1").on("click", EventHandlers.clickOne);
	$("#button-2").on("click", EventHandlers.clickTwo);
	$("#button-3").on("click", EventHandlers.clickThree);
	$("#button-4").on("click", EventHandlers.clickFour);
	$("#high-scores").on("click", ViewControl.showAndHideHighScores);
})