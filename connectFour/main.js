const GameData = {
	gameBoard: [["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"],["p0","p0","p0","p0","p0","p0"]],
	playerTurn: "p1",
	currentTile: "",
	gameOn: false,
	playerOneScore: 0,
	playerTwoScore: 0,
	AIGame: false,
	clickTile: false,

	clickTileTrue: function() {
		this.clickTile = true;
	},
	clickTileFalse: function() {
		this.clickTile = false;
	},
	playerChange: function() {
		if (this.playerTurn === "p1"){
			this.playerTurn = "p2";
		}
		else {
			this.playerTurn = "p1";
		}
	},
	changeGameBoard: function(player, xValue, yValue) {
		this.gameBoard[xValue][yValue] = player;
	},
	resetGameBoard: function() {
		for (var i = 0; i < this.gameBoard.length; i++){
			for (var j = 0; j < this.gameBoard[i].length; j++) {
				this.gameBoard[i][j] = "p0";
			}
		}
	},
	changeCurrentTile: function(tile) {
		this.currentTile = tile;
	},
	startGame: function() {
		this.gameOn = true;
	},
	endGame: function() {
		this.gameOn = false;
		if (this.playerTurn === "p1") {
			this.playerOneScore += 1;
		}
		else {
			this.playerTwoScore += 1;
		}
		ViewControl.updateScores();
	},
	startAIGame: function() {
		this.AIGame = true;
	},
	endAIGame: function() {
		this.AIGame = false;
	}
};

const AppControl = {
	updateGameBoard: function() {
		var xValue = GameData.currentTile.slice(0, 1);
		var yValue = GameData.currentTile.slice(1);
		GameData.changeGameBoard(GameData.playerTurn, xValue, yValue);
	},
	checkColumn: function() {
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (j < 3 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i][j+1] && GameData.gameBoard[i][j] === GameData.gameBoard[i][j+2] && GameData.gameBoard[i][j] === GameData.gameBoard[i][j+3]){
					alert(GameData.playerTurn + "wins!")
					GameData.endGame();
					GameData.endAIGame();
					return;
				}
			}
		}
	},
	checkRow: function() {
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (i < 4 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j] && GameData.gameBoard[i][j] === GameData.gameBoard[i+2][j] && GameData.gameBoard[i][j] === GameData.gameBoard[i+3][j]){
					alert(GameData.playerTurn + "wins!")
					GameData.endGame();
					GameData.endAIGame();
					return;
				}
			}
		}
	},
	checkRightDiagonal: function() {
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (i < 4 && j < 3 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j+1] && GameData.gameBoard[i][j] === GameData.gameBoard[i+2][j+2] && GameData.gameBoard[i][j] === GameData.gameBoard[i+3][j+3]){
					alert(GameData.playerTurn + "wins!")
					GameData.endGame();
					GameData.endAIGame();
					return;
				}
			}
		}
	},
	checkLeftDiagonal: function() {
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (i > 2 && j < 3 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i-1][j+1] && GameData.gameBoard[i][j] === GameData.gameBoard[i-2][j+2] && GameData.gameBoard[i][j] === GameData.gameBoard[i-3][j+3]){
					alert(GameData.playerTurn + "wins!")
					GameData.endGame();
					GameData.endAIGame();
					return;
				}
			}
		}
	}
};

const ViewControl = {
	makeBoard: function() {
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {

				$("#column-"+i).append("<div class='p0' id="+i+j+"></div>");
			}
		}
	},
	changeTile: function(x) {
		var children = $(x).children();
		for (var i = 0; i < children.length; i++) {
			if (children.eq(i).attr("class") === "p0") {
				children.eq(i).attr("class", GameData.playerTurn);
				GameData.changeCurrentTile(children.eq(i).attr("id"));
				return;
			}
		}
	},
	updateScores: function() {
		$("#player-one-score").html(GameData.playerOneScore);
		$("#player-two-score").html(GameData.playerTwoScore);
	},
};

const AI = {
	runAI: function() {
		GameData.clickTileFalse();
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (i < 4 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j] && GameData.gameBoard[i][j] === GameData.gameBoard[i+2][j]){
					EventHandlers.clickTile("#column-"+(i+3));
					if (GameData.clickTile === true){
						return;
					}
				}
			}
		}
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (i < 4 && j < 3 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j+1] && GameData.gameBoard[i][j] === GameData.gameBoard[i+2][j+2]){
					EventHandlers.clickTile("#column-"+(i+3));
					if (GameData.clickTile === true){
						return;
					}
				}
			}
		}
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (i > 2 && j < 3 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i-1][j+1] && GameData.gameBoard[i][j] === GameData.gameBoard[i-2][j+2]){
					EventHandlers.clickTile("#column-"+(i-3));
					if (GameData.clickTile === true){
						return;
					}
				}
			}
		}
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (j < 3 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i][j+1] && GameData.gameBoard[i][j] === GameData.gameBoard[i][j+2]) {
					EventHandlers.clickTile("#column-"+i);
					if (GameData.clickTile === true){
					return;
					}
				}
			}
		}
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (i < 5 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j]){
					EventHandlers.clickTile("#column-"+(i+2));
					if (GameData.clickTile === true){
					return;
					}
				}
			}
		}
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (j < 4 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i][j+1]) {
					EventHandlers.clickTile("#column-"+i);
					if (GameData.clickTile === true){
					return;
					}
				}
			}
		}
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (i < 5 && j < 2 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i+1][j+1]){
					EventHandlers.clickTile("#column-"+(i+2));
					if (GameData.clickTile === true){
					return;
					}
				}
			}
		}
		for (var i = 0; i < GameData.gameBoard.length; i++) {
			for (var j = 0; j < GameData.gameBoard[i].length; j++) {
				if (i > 1 && j < 4 && GameData.gameBoard[i][j] !== "p0" && GameData.gameBoard[i][j] === GameData.gameBoard[i-1][j+1]){
					EventHandlers.clickTile("#column-"+(i-2));
					if (GameData.clickTile === true){
					return;
					}
				}
			}
		}
		var r = Math.floor(Math.random()*7);
		EventHandlers.clickTile("#column-"+r);
		return;
	},
};

const EventHandlers = {
	clickTile: function(x) {
		if (GameData.gameOn === true) {	
			var xValue = $(x).attr("id").slice($(x).attr("id").length-1);
			var newArray= [];
			for (var i = 0; i < GameData.gameBoard[xValue].length; i++){
				if (GameData.gameBoard[xValue][i] === "p0") {
					newArray.push("p0");
				}
			}
			if (newArray.length !== 0) {
				ViewControl.changeTile(x);
				GameData.clickTileTrue();
				AppControl.updateGameBoard();
				AppControl.checkColumn();
				AppControl.checkRow();
				AppControl.checkRightDiagonal();
				AppControl.checkLeftDiagonal();
				GameData.playerChange();
				if (GameData.AIGame === true && GameData.playerTurn === "p2") {
					AI.runAI();
				}
			}
		}
	},
	newGame: function() {
		if (GameData.gameOn === false) {
			GameData.resetGameBoard();
			$(".column").children().attr("class", "p0");
			GameData.startGame();
		}
	},
	newAIGame: function() {
		if (GameData.gameOn === false) {
			GameData.resetGameBoard();
			$(".column").children().attr("class", "p0");
			GameData.startGame();
			GameData.startAIGame();
			if (GameData.playerTurn === "p2"){
				AI.runAI();
			}
		}
	},
	getPlayerOneName: function() {
		$("#p-one").html($("#p-one-name").val()+":");
		$("#p-one-name").val("");
	},
	getPlayerTwoName: function() {
		$("#p-two").html($("#p-two-name").val()+":");
		$("#p-two-name").val("");
	}
};

$(function() {
	ViewControl.makeBoard();
	$("#new-ai-game").on("click", EventHandlers.newAIGame);
	$(".column").on("click", function(){EventHandlers.clickTile(this)});
	$("#new-game").on("click", EventHandlers.newGame);
	$("#p-one-submit").on("click", EventHandlers.getPlayerOneName);
	$("#p-two-submit").on("click", EventHandlers.getPlayerTwoName);
});	