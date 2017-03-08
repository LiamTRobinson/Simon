const GameData = {
	randomSequence: [],
	userSequence: [],
	randomSequenceRunning: false,
	gameOn: false,
	successfulSequences: 0,
	timeDelay: 1000,
	highScores: [0,0,0,0,0],
	highNames: ["N/A","N/A","N/A","N/A","N/A"],
	nameLoc: 0,

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
	checkScores: function() {
		for (var i = 0; i < this.highScores.length; i++) {
			if (this.successfulSequences > this.highScores[i]) {
				for (var j = this.highScores.length - 1; j > i; j--) {
					this.highScores[j] = this.highScores[j-1];
				}
				this.highScores[i] = this.successfulSequences;
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
};

const AppControl = {
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
	successCheck: function() {
		var checkTo = GameData.randomSequence.slice(0, GameData.userSequence.length);
		if (GameData.userSequence.toString() !== checkTo.toString()) {
			ViewControl.stopSpin();
			ViewControl.showUserNameSubmit();
			ViewControl.displayModal();
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
	displayModal: function() {
		$("#score").html(GameData.successfulSequences);
		$("#modal").css("display", "flex");
	},
	hideModal: function() {
		$("#modal").css("display", "none");
	},
	showAndHideHighScores: function() {
		if ($("#scoreboard-container").css("display") === "none") {
			$("#scoreboard-container").css("display", "block");
		}
		else {
			$("#scoreboard-container").css("display", "none")
		}
	},
	updateHighScores: function() {
		for (var g = 0; g < GameData.highScores.length; g++) {
			$("#"+g+"-score").html(GameData.highScores[g]);
			$("#"+g+"-name").html(GameData.highNames[g]);
		}
	},
	hideCloseModal: function() {
		$("#close-modal").css("display", "none");
	},
	showCloseModal: function() {
		$("#close-modal").css("display", "flex");
	},
	showUserNameSubmit: function() {
		if (GameData.checkScores() === true) {
			$("#name-submit").css("display", "flex");
			this.hideCloseModal();
		}
	},
	hideUserNameSubmit: function() {
		$("#name-submit").css("display", "none");
	},
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
			GameData.hardTime();
			GameData.startGame();
			GameData.addToRandom();
			AppControl.runRandom();
		}
	},
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
	clickSubmit: function() {
		GameData.updateNames($("#userName").val());
		ViewControl.updateHighScores();
		ViewControl.hideModal();
		ViewControl.showCloseModal();
		ViewControl.hideUserNameSubmit();
		$("#userName").val("");
	}
};

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